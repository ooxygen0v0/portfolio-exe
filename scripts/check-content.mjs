// npm 명령이 아니라 `node scripts/check-content.mjs`로 실행합니다.
// 프로젝트 폴더의 package.json에는 "type": "module"이 있어야 합니다(Vite 기본 구성).
import { projects } from '../src/data/projects.js'
import { profile, experiences, certifications } from '../src/data/profile.js'

const languages = ['ko', 'en', 'ja']
const errors = []

for (const item of projects) {
  for (const language of languages) {
    const text = item.translations?.[language]
    if (!text?.summary || !text?.description || !Array.isArray(text.highlights)) {
      errors.push(`${item.id}: ${language} 기본 콘텐츠 누락`)
    }
    if (!Array.isArray(text?.caseStudy) || text.caseStudy.some(section => !section.title || !section.body)) {
      errors.push(`${item.id}: ${language} 개발 과정 누락`)
    }
  }
}
for (const language of languages) {
  const text = profile.translations?.[language]
  if (!text?.title || !text?.intro || !Array.isArray(text.focus)) {
    errors.push(`profile: ${language} 소개 콘텐츠 누락`)
  }
}
for (const experience of experiences) {
  for (const language of languages) {
    if (!experience.translations?.[language]?.title || !experience.translations?.[language]?.description) {
      errors.push(`experience ${experience.id}: ${language} 누락`)
    }
  }
}

if (errors.length > 0) {
  console.error('콘텐츠 검사 실패:\n' + errors.join('\n'))
  process.exitCode = 1
} else {
  console.log(`콘텐츠 검사 통과: 프로젝트 ${projects.length}개, 활동 ${experiences.length}개, 자격증 ${certifications.length}개, ${languages.length}개 언어`)
}
