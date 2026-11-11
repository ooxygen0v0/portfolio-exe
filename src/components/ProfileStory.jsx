import { useTranslation } from 'react-i18next'
import Reveal from './Reveal'
import { profile, experiences, certifications } from '../data/profile'
import { getLocalized } from '../utils/getLocalized'

function ProfileStory() {
  const { i18n } = useTranslation()
  const language = i18n.resolvedLanguage || i18n.language
  const content = getLocalized(profile, language)

  return (
    <section className="mt-14 min-w-0 border-t border-slate-200 pt-12 dark:border-slate-800 sm:mt-20 sm:pt-16">
      <Reveal>
        <p className="font-mono text-sm text-sky-700 dark:text-cyan-400">
          {content.eyebrow}
        </p>
        <h2 className="mt-4 max-w-3xl text-3xl font-bold leading-tight text-slate-900 dark:text-white sm:text-4xl">
          {content.title}
        </h2>
        <p className="mt-6 max-w-3xl leading-8 text-slate-600 dark:text-slate-400">
          {content.intro}
        </p>
      </Reveal>

      <div className="mt-14">
        <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">
          {content.focusTitle}
        </h3>
        <div className="mt-6 grid min-w-0 gap-4 sm:gap-5 md:grid-cols-3">
          {(content.focus ?? []).map((item, index) => (
            <Reveal key={item.title} delay={index * 0.08} className="h-full">
              <article className="h-full min-w-0 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-6">
                <span className="font-mono text-sm text-sky-700 dark:text-cyan-400">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h4 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
                  {item.title}
                </h4>
                <p className="mt-3 leading-7 text-slate-600 dark:text-slate-400">
                  {item.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="mt-12 grid min-w-0 gap-8 lg:mt-16 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <section aria-labelledby="experience-title">
          <h3 id="experience-title" className="text-2xl font-semibold text-slate-900 dark:text-white">
            {content.experienceTitle}
          </h3>
          <ol className="mt-6 space-y-4">
            {experiences.map((item, index) => {
              const experience = getLocalized(item, language)
              return (
                <li key={item.id}>
                  <Reveal delay={Math.min(index * 0.06, 0.18)}>
                    <article className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
                      <p className="font-mono text-sm text-sky-700 dark:text-cyan-400">
                        {item.period}
                      </p>
                      <h4 className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                        {experience.title}
                      </h4>
                      <p className="mt-2 leading-7 text-slate-600 dark:text-slate-400">
                        {experience.description}
                      </p>
                    </article>
                  </Reveal>
                </li>
              )
            })}
          </ol>
        </section>

        <section aria-labelledby="certifications-title">
          <h3 id="certifications-title" className="text-2xl font-semibold text-slate-900 dark:text-white">
            {content.certificationTitle}
          </h3>
          <Reveal delay={0.1}>
            <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
              <ul className="flex flex-wrap gap-3">
                {certifications.map((item) => (
                  <li
                    key={item.id}
                    className="rounded-lg border border-slate-300 px-4 py-2 font-medium text-slate-700 dark:border-slate-600 dark:text-slate-200"
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xs leading-6 text-slate-500 dark:text-slate-400">
                {content.certificationNote}
              </p>
            </div>
          </Reveal>
        </section>
      </div>
    </section>
  )
}

export default ProfileStory
