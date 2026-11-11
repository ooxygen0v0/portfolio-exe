import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import Terminal from '../components/Terminal'
import Reveal from '../components/Reveal'

const actionLabels = {
  ko: { projects: '대표 프로젝트 보기', contact: '연락하기' },
  en: { projects: 'View featured projects', contact: 'Get in touch' },
  ja: { projects: '代表プロジェクトを見る', contact: 'お問い合わせ' },
}

function Home() {
  const { t, i18n } = useTranslation()
  const language = (i18n.resolvedLanguage || i18n.language || 'ko').split('-')[0]
  const labels = actionLabels[language] || actionLabels.ko

  return (    
      <main className="mx-auto grid w-full min-w-0 grid-cols-1 gap-8 px-6 py-12 sm:py-16 lg:min-h-[80vh] lg:max-w-6xl lg:grid-cols-2 lg:items-center lg:gap-12 lg:py-20">


      {/* 자기소개 영역 */}
      <Reveal className="min-w-0">
        <section>
          <p className="mb-4 font-mono text-sky-700 dark:text-cyan-400">
            {t('home.greeting')}
          </p>

          <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl dark:text-white">
            {t('home.line1')}
            <br />
            {t('home.line2')}
            <br />
            <span className="text-sky-700 dark:text-cyan-400">
              {t('home.line3')}
            </span>
          </h1>

          <p className="mt-6 leading-8 text-slate-600 dark:text-slate-400">
            {t('home.intro')}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              to="/projects"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-cyan-400 px-6 py-3 text-center font-semibold text-slate-950 transition-colors hover:bg-cyan-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-700 dark:focus-visible:outline-cyan-400"
            >
              {labels.projects}
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              to="/contact"
              className="inline-flex min-h-12 items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3 text-center font-semibold text-sky-700 transition-colors hover:border-sky-600 hover:bg-sky-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-700 dark:border-slate-700 dark:bg-slate-900 dark:text-cyan-400 dark:hover:border-cyan-400 dark:hover:bg-slate-800 dark:focus-visible:outline-cyan-400"
            >
              {labels.contact}
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {['React', 'Python', 'Linux'].map((tech) => (
              <span
                key={tech}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-700 dark:border-slate-700 dark:text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>
      </Reveal>

      {/* 터미널은 기존 기능 유지 */}
      
      <Reveal delay={0.15} className="w-full min-w-0">
        <Terminal />
      </Reveal>


    </main>
  )
}

export default Home
