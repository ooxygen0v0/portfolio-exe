/**
 * Portfolio.exe STEP 18 — 읽기 전용 정적/콘텐츠 점검
 * 실행: node scripts/step18-check.mjs
 * 외부 패키지, 서버, GitHub 토큰 불필요.
 * 실제 UI 상호작용은 브라우저에서 별도 확인해야 합니다.
 */
import { access, readFile } from 'node:fs/promises'
import { dirname, extname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { projects, projectCategories } from '../src/data/projects.js'
import { skills, categories } from '../src/data/skills.js'
import { profile, experiences, certifications } from '../src/data/profile.js'
import { getLocalized } from '../src/utils/getLocalized.js'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const languages = ['ko', 'en', 'ja']
const errors = []
const warnings = []
const results = []

function ok(label) { results.push(`  ✓ ${label}`) }
function fail(message) { errors.push(message) }
function warn(message) { warnings.push(message) }
function nonEmptyText(value) { return typeof value === 'string' && value.trim().length > 0 }
function isObject(value) { return value !== null && typeof value === 'object' && !Array.isArray(value) }
async function exists(relativePath) {
  try { await access(join(root, relativePath)); return true } catch { return false }
}
async function load(relativePath) { return readFile(join(root, relativePath), 'utf8') }

function checkUnique(items, label, getId = item => item.id) {
  const ids = items.map(getId)
  const unique = new Set(ids.map(String))
  if (unique.size !== ids.length) fail(`${label}: 중복된 ID가 있습니다`)
  else ok(`${label}: ID 중복 없음 (${items.length}개)`)
}

function leafPaths(value, prefix = '') {
  if (!isObject(value)) return [prefix]
  return Object.entries(value).flatMap(([key, child]) =>
    leafPaths(child, prefix ? `${prefix}.${key}` : key)
  )
}

function getByPath(value, path) {
  return path.split('.').reduce((current, part) => current?.[part], value)
}

console.log('\nPortfolio.exe · STEP 18 자동 점검\n')

const requiredFiles = [
  'index.html', 'src/main.jsx', 'src/App.jsx', 'src/i18n.js',
  'src/pages/Home.jsx', 'src/pages/About.jsx', 'src/pages/Skills.jsx',
  'src/pages/Projects.jsx', 'src/pages/ProjectDetail.jsx', 'src/pages/Contact.jsx',
  'src/components/Navbar.jsx', 'src/components/Terminal.jsx',
  'src/components/GitHubSection.jsx', 'src/components/ProfileStory.jsx',
  'src/config/github.js', 'src/config/contact.js',
  'src/hooks/useGithub.js', 'src/utils/terminalEngine.js',
  'src/utils/githubApi.js', 'src/utils/getLocalized.js',
]
const missing = []
for (const path of requiredFiles) if (!(await exists(path))) missing.push(path)
if (missing.length) for (const path of missing) fail(`필수 파일 누락: ${path}`)
else ok(`필수 파일 ${requiredFiles.length}개 확인`)

if (await exists('index.html')) {
  const html = await load('index.html')
  if (/name=["']viewport["']/.test(html)) ok('모바일 viewport 메타 태그 존재')
  else fail('index.html에 viewport 메타 태그가 없습니다')
}

if (await exists('src/App.jsx')) {
  const app = await load('src/App.jsx')
  for (const route of ['/', '/about', '/skills', '/projects', '/projects/:id', '/contact']) {
    // React Router JSX의 path="..." 형식 검사. 실제 클릭/라우팅 작동까지 증명하지는 않습니다.
    const escaped = route.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const matcher = new RegExp(`\\bpath\\s*=\\s*['\"]${escaped}['\"]`)
    if (!matcher.test(app)) fail(`App.jsx에서 경로를 찾지 못함: ${route}`)
  }
  if (/\bPlaceholder\b/.test(app)) warn('App.jsx에 Placeholder가 남아 있는지 확인하세요 (미사용이면 삭제)')
  ok('App.jsx 경로 선언 정적 확인 (실제 이동 테스트는 별도)')
}

const dictionaries = {}
for (const language of languages) {
  const combined = {}
  for (const suffix of ['', '-extra']) {
    const filename = `src/locales/${language}${suffix}.json`
    if (!(await exists(filename))) { fail(`번역 파일 누락: ${filename}`); continue }
    try {
      const data = JSON.parse(await load(filename))
      if (!isObject(data)) throw new Error('최상위 JSON은 객체여야 합니다')
      Object.assign(combined, data)
    } catch (error) { fail(`${filename} 파싱 오류: ${error.message}`) }
  }
  dictionaries[language] = combined
}

if (languages.every(l => Object.keys(dictionaries[l]).length > 0)) {
  const baseline = new Set(leafPaths(dictionaries.ko))
  for (const language of ['en', 'ja']) {
    const other = new Set(leafPaths(dictionaries[language]))
    const missingPaths = [...baseline].filter(path => !other.has(path))
    const extraPaths = [...other].filter(path => !baseline.has(path))
    if (missingPaths.length) fail(`${language} 번역 누락: ${missingPaths.slice(0, 10).join(', ')}${missingPaths.length > 10 ? ` 외 ${missingPaths.length - 10}개` : ''}`)
    if (extraPaths.length) warn(`${language}에만 있는 번역 키: ${extraPaths.slice(0, 5).join(', ')}`)
    if (!missingPaths.length && !extraPaths.length) ok(`${language} UI 번역 키 구조 일치`)
  }
  for (const language of languages) {
    for (const path of ['nav.home', 'nav.about', 'nav.skills', 'nav.projects', 'nav.contact', 'contact.title', 'contact.intro', 'github.title']) {
      if (!nonEmptyText(getByPath(dictionaries[language], path))) fail(`${language} UI 번역이 비어 있음: ${path}`)
    }
    for (const path of ['responsive.openMenu', 'responsive.closeMenu', 'responsive.mobileNavigation']) {
      if (!nonEmptyText(getByPath(dictionaries[language], path))) warn(`${language} 반응형 메뉴 번역 확인 필요: ${path}`)
    }
  }
  ok('핵심 UI 번역 키 확인')
}

if (!Array.isArray(projects) || !Array.isArray(projectCategories)) {
  fail('projects 또는 projectCategories 데이터가 배열이 아닙니다')
} else {
  checkUnique(projects, '프로젝트')
  const projectCats = new Set(projectCategories.map(item => item.id))
  for (const project of projects) {
    if (!nonEmptyText(project.id) || !nonEmptyText(project.title)) fail('프로젝트 id/title 누락')
    if (!projectCats.has(project.category)) fail(`${project.id}: 알 수 없는 카테고리 ${project.category}`)
    if (!Array.isArray(project.technologies) || project.technologies.length === 0) fail(`${project.id}: 기술 스택 목록 누락`)
    if (project.githubUrl) {
      try {
        const url = new URL(project.githubUrl)
        if (url.protocol !== 'https:') warn(`${project.id}: GitHub 링크 HTTPS 사용 권장`)
      } catch { fail(`${project.id}: githubUrl 주소 형식 오류`) }
    }
    for (const language of languages) {
      const item = project.translations?.[language]
      if (!nonEmptyText(item?.summary) || !nonEmptyText(item?.description)) fail(`${project.id}/${language}: 프로젝트 설명 누락`)
      if (!Array.isArray(item?.highlights) || !item.highlights.length || item.highlights.some(x => !nonEmptyText(x))) fail(`${project.id}/${language}: 주요 기능 설명 누락`)
      if (!Array.isArray(item?.caseStudy) || !item.caseStudy.length || item.caseStudy.some(x => !nonEmptyText(x.title) || !nonEmptyText(x.body))) fail(`${project.id}/${language}: Case Study 누락`)
    }
    if (getLocalized(project, 'en-US').summary !== project.translations?.en?.summary) fail(`${project.id}: getLocalized('en-US') 확인 실패`)
    if (getLocalized(project, 'xx').summary !== project.translations?.ko?.summary) fail(`${project.id}: 언어 fallback 확인 실패`)
  }
  ok(`프로젝트 ${projects.length}개 × 3개 언어 상세 콘텐츠 확인`)
}

if (!Array.isArray(skills) || !Array.isArray(categories)) {
  fail('skills 또는 categories 데이터가 배열이 아닙니다')
} else {
  checkUnique(skills, '스킬')
  const valid = new Set(categories.map(item => item.id))
  for (const skill of skills) {
    if (!nonEmptyText(skill.name) || !valid.has(skill.category)) fail(`스킬 데이터 오류: ${skill.name ?? skill.id}`)
    for (const language of languages) {
      if (!nonEmptyText(skill.translations?.[language]?.description)) fail(`${skill.name}/${language}: 기술 설명 누락`)
    }
  }
  ok(`스킬 ${skills.length}개 × 3개 언어 설명 확인`)
}

if (!isObject(profile) || !Array.isArray(experiences) || !Array.isArray(certifications)) {
  fail('profile / experiences / certifications 구조가 올바르지 않습니다')
} else {
  checkUnique(experiences, '경험/활동')
  for (const language of languages) {
    if (!nonEmptyText(profile.translations?.[language]?.title) || !nonEmptyText(profile.translations?.[language]?.intro)) fail(`profile/${language}: 소개 누락`)
    for (const experience of experiences) {
      if (!nonEmptyText(experience.translations?.[language]?.title) || !nonEmptyText(experience.translations?.[language]?.description)) fail(`경험 ${experience.id}/${language}: 내용 누락`)
    }
  }
  ok(`자기소개, 활동 ${experiences.length}개, 자격증 ${certifications.length}개 확인`)
}

console.log(results.join('\n'))
if (warnings.length) {
  console.log(`\n⚠ 확인 권장 ${warnings.length}건`)
  for (const item of warnings) console.log(`  - ${item}`)
}
if (errors.length) {
  console.error(`\n✖ 필수 검사 실패 ${errors.length}건`)
  for (const item of errors) console.error(`  - ${item}`)
  process.exitCode = 1
} else {
  console.log('\n✓ 자동 정적/콘텐츠 검사 완료')
  console.log('※ 브라우저 클릭, API 통신, 실제 반응형 동작은 수동 테스트가 필요합니다.\n')
}
