import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'
import { getLocalized } from '../utils/getLocalized'

function ProjectCard({ project }) {
  const { t, i18n } = useTranslation()
  const content = getLocalized(project, i18n.resolvedLanguage || i18n.language)

  return (
    <article className="group flex h-full min-w-0 flex-col rounded-xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-sky-600 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-cyan-400">
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="rounded-md bg-sky-50 px-3 py-1 text-xs text-sky-700 dark:bg-slate-800 dark:text-cyan-400">
          {t(`projects.categories.${project.category}`)}
        </span>
        <span className="max-w-32 truncate font-mono text-xs text-slate-500">{project.id}</span>
      </div>

      <h2 className="wrap-break-word text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">{project.title}</h2>
      <p className="mt-4 flex-1 leading-7 text-slate-600 dark:text-slate-400">
        {content.summary}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.technologies.map((tech) => (
          <span
            key={tech}
            className="rounded-md border border-slate-300 px-3 py-1 text-xs text-slate-700 dark:border-slate-700 dark:text-slate-300"
          >
            {tech}
          </span>
        ))}
      </div>

      <Link
        to={`/projects/${project.id}`}
        className="mt-8 inline-flex w-fit items-center gap-2 font-medium text-sky-700 hover:text-sky-900 dark:text-cyan-400 dark:hover:text-cyan-300"
      >
        {t('projects.viewDetails')}
        <span aria-hidden="true">→</span>
      </Link>
    </article>
  )
}

export default ProjectCard
