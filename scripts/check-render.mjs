// 실제 컴포넌트의 3개 언어 렌더링을 검사합니다. 브라우저 시각/상호작용 검사를 대체하지 않습니다.
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { MemoryRouter, Routes, Route } from 'react-router'
import { createInstance } from 'i18next'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import { createServer } from 'vite'

const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' })
try {
  const { default: About } = await server.ssrLoadModule('/src/pages/About.jsx')
  const { default: Projects } = await server.ssrLoadModule('/src/pages/Projects.jsx')
  const { default: ProjectDetail } = await server.ssrLoadModule('/src/pages/ProjectDetail.jsx')
  for (const language of ['ko', 'en', 'ja']) {
    const base = JSON.parse(await readFile(new URL(`../src/locales/${language}.json`, import.meta.url), 'utf8'))
    const extra = JSON.parse(await readFile(new URL(`../src/locales/${language}-extra.json`, import.meta.url), 'utf8'))
    const i18n = createInstance()
    await i18n.use(initReactI18next).init({ lng: language, resources: { [language]: { translation: { ...base, ...extra } } }, interpolation: { escapeValue: false } })
    function render(Component, path, route) {
      const routes = React.createElement(Routes, null,
        React.createElement(Route, { path: route, element: React.createElement(Component) }))
      const router = React.createElement(MemoryRouter, { initialEntries: [path] }, routes)
      return renderToString(React.createElement(I18nextProvider, { i18n }, router))
    }
    const about = render(About, '/about', '/about')
    for (const id of ['background', 'experience', 'learning', 'development', 'next-step']) {
      assert.ok(about.includes(`id="biography-${id}"`))
    }
    assert.ok(about.includes('Systems / Web / Data'))
    assert.ok(about.includes('href="/projects/minios"') && about.includes('href="/projects/portfolio-exe"'))
    assert.equal((about.match(/<details/g) || []).length, 4)
    assert.ok(!about.includes('<aside') && !about.includes('overflow-y-auto'))
    assert.ok(about.includes('2020-05-18') && about.includes('2021-11-21'))
    assert.ok(about.includes('MOS 25B') && about.includes('SQLD') && about.includes('JLPT N2'))
    assert.ok(about.includes({ ko: '네트워크관리사 2급', en: 'Network Administrator Level 2', ja: 'ネットワーク管理士2級' }[language]))
    const projects = render(Projects, '/projects', '/projects')
    for (const id of ['minios', 'portfolio-exe', 'linux-kernel-analysis']) assert.ok(projects.includes(`/projects/${id}`))
    for (const name of ['Campus Scheduler', 'Nodebird']) assert.ok(!projects.includes(name))
    assert.ok(projects.includes('OS Scheduling Visualizer') && projects.includes('Python Data Analysis Project') && projects.includes('Software Competition / Hackathon'))
    assert.ok(projects.includes(extra.projects.futureTitle.replaceAll('&', '&amp;')))
    for (const id of ['minios', 'portfolio-exe', 'linux-kernel-analysis']) {
      const detail = render(ProjectDetail, `/projects/${id}`, '/projects/:id')
      assert.ok(!detail.includes(extra.projects.notFound))
      if (id === 'portfolio-exe') {
        assert.ok(detail.includes('https://github.com/ooxygen0v0/portfolio-exe'))
        assert.ok(detail.includes('https://ooxygen0v0.github.io/portfolio-exe/'))
      }
      if (id === 'linux-kernel-analysis') assert.ok(detail.includes({ ko: '기술 분석·실험', en: 'Technical analysis and experiments', ja: '技術分析・実験' }[language]))
    }
    assert.ok(render(ProjectDetail, '/projects/missing', '/projects/:id').includes(extra.projects.notFound))
    console.log(`${language}: About / Projects / 대표 작업 상세 3개 / 미존재 ID 렌더링 통과`)
  }
} finally {
  await server.close()
}
