import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { projects, projectCategories } from '../data/projects'
import { getLocalized } from '../utils/getLocalized'
import ProjectCard from '../components/ProjectCard'
import Reveal from '../components/Reveal'
import GitHubSection from '../components/GitHubSection'
import FutureProjects from '../components/FutureProjects'

function Projects() {
  const { t, i18n } = useTranslation()
  const language = i18n.resolvedLanguage || i18n.language
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')

  const filteredProjects = projects.filter((project) => {
    const matchesCategory = category === 'all' || project.category === category
    const keyword = search.trim().toLowerCase()
    const content = getLocalized(project, language)
    const searchText = [
      project.title,
      content.cardTitle,
      content.summary,
      content.description,
      ...project.technologies,
    ].join(' ').toLowerCase()
    return matchesCategory && searchText.includes(keyword)
  })

  return (
    <main className="mx-auto max-w-6xl min-w-0 px-4 py-12 sm:px-6 sm:py-20">
      <p className="font-mono text-sky-700 dark:text-cyan-400">$ ls ~/projects</p>
      <h1 className="mt-4 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
        {t('projects.title')}
      </h1>
      <p className="mt-6 max-w-2xl leading-8 text-slate-600 dark:text-slate-400">
        {t('projects.intro')}
      </p>

      <h2 id="featured-projects-title" className="mt-10 text-2xl font-semibold">{t('projects.featuredTitle')}</h2>
      <div className="mt-6 sm:mt-8">
        <label htmlFor="project-search" className="mb-3 block text-sm text-slate-600 dark:text-slate-400">
          {t('projects.searchLabel')}
        </label>
        <input
          id="project-search"
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t('projects.searchPlaceholder')}
          className="w-full min-w-0 rounded-xl border border-slate-300 bg-white px-4 py-3 sm:px-5 sm:py-4 text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-sky-600 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-cyan-400"
        />
      </div>

      <div className="mt-6 flex flex-wrap gap-2 sm:gap-3" aria-label={t('projects.categoryLabel')}>
        {projectCategories.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={category === item.id}
            onClick={() => setCategory(item.id)}
            className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors sm:px-5 ${
              category === item.id
                ? 'bg-cyan-400 text-slate-950'
                : 'border border-slate-300 bg-white text-slate-600 hover:text-sky-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            {t(`projects.categories.${item.id}`)}
          </button>
        ))}
      </div>

      <section aria-labelledby="featured-projects-title" className="mt-9 grid min-w-0 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project, index) => (
          <Reveal key={project.id} delay={index * 0.1} className="h-full">
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </section>

      {filteredProjects.length === 0 && (
        <div className="mt-10 rounded-xl border border-slate-300 bg-white p-10 text-center text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
          {t('projects.noResults')}
        </div>
      )}

      <p role="status" aria-live="polite" className="mt-8 font-mono text-sm text-slate-500">
        {t('projects.count', { visible: filteredProjects.length, total: projects.length })}
      </p>

      <GitHubSection />
      <FutureProjects />
    </main>
  )
}

export default Projects
