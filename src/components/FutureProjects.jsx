import { useTranslation } from 'react-i18next'
import { futureProjects } from '../data/futureProjects'
import { getLocalized } from '../utils/getLocalized'
import Reveal from './Reveal'

function FutureProjects() {
  const { t, i18n } = useTranslation()
  const language = i18n.resolvedLanguage || i18n.language
  return (
    <section aria-labelledby="future-projects-title" className="mt-20 border-t border-slate-200 pt-12 dark:border-slate-800">
      <p className="font-mono text-sm text-sky-700 dark:text-cyan-400">$ ls ~/projects/next</p>
      <h2 id="future-projects-title" className="mt-3 text-2xl font-semibold sm:text-3xl">{t('projects.futureTitle')}</h2>
      <p className="mt-4 max-w-3xl leading-8 text-slate-600 dark:text-slate-400">{t('projects.futureIntro')}</p>
      <div className="mt-8 grid min-w-0 gap-5 lg:grid-cols-3">
        {futureProjects.map((item, index) => {
          const content = getLocalized(item, language)
          return (
            <Reveal key={item.id} delay={index * 0.08} className="h-full">
              <article className="flex h-full min-w-0 flex-col rounded-xl border border-dashed border-slate-300 bg-white p-5 dark:border-slate-600 dark:bg-slate-900 sm:p-6">
                <span className="w-fit rounded-md bg-amber-50 px-3 py-1 text-sm font-medium text-amber-900 dark:bg-amber-950 dark:text-amber-200">{content.statusLabel}</span>
                <h3 className="mt-4 text-xl font-semibold [overflow-wrap:anywhere]">{item.title}</h3>
                <p className="mt-4 leading-8 text-slate-600 dark:text-slate-400">{content.description}</p>
                <ul className="mt-4 list-disc space-y-2 pl-5 leading-7 text-slate-700 dark:text-slate-300">
                  {content.goals.map(goal => <li key={goal}>{goal}</li>)}
                </ul>
                {item.technologies.length > 0 && <ul className="mt-auto flex flex-wrap gap-2 pt-6">{item.technologies.map(tech => <li key={tech} className="rounded-md border border-slate-300 px-3 py-1 text-xs text-slate-600 dark:border-slate-700 dark:text-slate-400">{tech}</li>)}</ul>}
              </article>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}

export default FutureProjects
