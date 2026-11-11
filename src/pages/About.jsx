import { useTranslation } from 'react-i18next'
import Reveal from '../components/Reveal'
import ProfileStory from '../components/ProfileStory'

// 화면에 표시할 경험 항목의 ID
const experiences = [
  'engineering',
  'development',
  'systems',
]

function About() {
  const { t } = useTranslation()

  return (
    <main className="mx-auto max-w-6xl px-6 py-20">

      <Reveal>
        <p className="font-mono text-sky-700 dark:text-cyan-400">
          $ cat about.txt
        </p>

        <h1 className="mt-4 text-4xl font-bold text-slate-900 dark:text-white">
          {t('about.title')}
        </h1>

        <p className="mt-6 max-w-3xl leading-8 text-slate-600 dark:text-slate-400">
          {t('about.intro')}
        </p>
      </Reveal>

      <section className="mt-16">
        <h2 className="mb-8 text-2xl font-semibold text-slate-900 dark:text-white">
          {t('about.journey')}
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          {experiences.map((id, index) => (
            <Reveal
              key={id}
              delay={index * 0.1}
              className="h-full"
            >
              <article
                className="
                  h-full rounded-xl border
                  border-slate-200 bg-white p-6
                  shadow-sm transition-colors
                  hover:border-sky-600
                  dark:border-slate-700
                  dark:bg-slate-900
                  dark:hover:border-cyan-400
                "
              >
                <h3 className="text-lg font-semibold text-sky-700 dark:text-cyan-400">
                  {t(`about.experiences.${id}.title`)}
                </h3>

                <p className="mt-4 leading-7 text-slate-600 dark:text-slate-400">
                  {t(`about.experiences.${id}.description`)}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

            <ProfileStory />

    </main>
  )
}

export default About
