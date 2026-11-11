import { useTranslation } from 'react-i18next'
import Terminal from '../components/Terminal'
import Reveal from '../components/Reveal'

function Home() {
  const { t } = useTranslation()

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
