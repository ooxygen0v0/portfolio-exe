import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'
import { getLocalized } from '../utils/getLocalized'

function ProjectCard({ project }) {
  const { t, i18n } = useTranslation()
  const content = getLocalized(project, i18n.resolvedLanguage || i18n.language)

  return (
    <article className="group flex h-full min-w-0 flex-col rounded-xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-sky-600 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-cyan-400">
      <h3 className="text-xl font-bold leading-snug text-slate-900 [overflow-wrap:anywhere] dark:text-white sm:text-2xl">{content.cardTitle}</h3>
      <p className="mt-4 flex-1 leading-7 text-slate-600 dark:text-slate-400">
        {content.summary}
      </p>
      <p className="mt-5 font-mono text-sm text-sky-700 [overflow-wrap:anywhere] dark:text-cyan-400">{project.title}</p>
      <p className="mt-2 text-xs leading-6 text-slate-600 dark:text-slate-400">{content.workType}</p>
      <p className="mt-4 border-t border-slate-200 pt-4 text-xs leading-6 text-slate-600 dark:border-slate-700 dark:text-slate-400">{project.technologies.join(' · ')}</p>

      <Link
        to={`/projects/${project.id}`}
        aria-label={`${project.title} · ${t('projects.viewDetails')}`}
        className="mt-8 inline-flex min-h-11 w-fit items-center gap-2 font-medium text-sky-700 hover:text-sky-900 dark:text-cyan-400 dark:hover:text-cyan-300"
      >
        {t('projects.viewDetails')}
        <span aria-hidden="true">→</span>
      </Link>
    </article>
  )
}

export default ProjectCard
