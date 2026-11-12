import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'

function SkillCard({ name, description, category, project, usage }) {
  const { t } = useTranslation()
  return (
    <article
      className="
        min-w-0 rounded-xl border border-slate-200
        bg-white p-6 shadow-sm
        transition-all duration-300
        hover:-translate-y-1
        hover:border-sky-600 hover:shadow-lg
        dark:border-slate-700 dark:bg-slate-900
        dark:hover:border-cyan-400
        dark:hover:shadow-cyan-500/10
      "
    >
      <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
        {name}
      </h3>

      <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
        {description}
      </p>

      <span
        className="
          mt-5 inline-block rounded-md
          bg-sky-50 px-3 py-1
          text-xs text-sky-700
          dark:bg-slate-800 dark:text-cyan-400
        "
      >
        {category}
      </span>
      {project && <Link to={`/projects/${project.id}`} className="mt-5 flex min-h-11 items-center gap-2 text-sm font-medium text-sky-700 dark:text-cyan-400">{t('ux.related')}: {project.title} <span aria-hidden="true">→</span></Link>}
      {!project && usage && <p className="mt-5 text-sm leading-7 text-slate-600 dark:text-slate-400">{t('ux.study')}: {usage}</p>}
    </article>
  )
}

export default SkillCard
