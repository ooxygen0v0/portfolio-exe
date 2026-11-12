import { Link, useParams } from 'react-router'
import { useTranslation } from 'react-i18next'
import { projects } from '../data/projects'
import { getLocalized } from '../utils/getLocalized'
import Reveal from '../components/Reveal'

function ProjectDetail() {
  const { id } = useParams()
  const { t, i18n } = useTranslation()
  const project = projects.find((item) => item.id === id)

  if (!project) {
    return (
      <main className="mx-auto max-w-6xl min-w-0 px-4 py-12 sm:px-6 sm:py-20">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          {t('projects.notFound')}
        </h1>
        <Link to="/projects" className="mt-6 inline-block text-sky-700 dark:text-cyan-400">
          ← {t('projects.back')}
        </Link>
      </main>
    )
  }

  const content = getLocalized(project, i18n.resolvedLanguage || i18n.language)
  const caseStudy = Array.isArray(content.caseStudy) ? content.caseStudy : []

  return (
    <main className="mx-auto max-w-4xl min-w-0 px-4 py-12 sm:px-6 sm:py-20">
      <Link
        to="/projects"
        className="font-mono text-sm text-sky-700 hover:text-sky-900 dark:text-cyan-400 dark:hover:text-cyan-300"
      >
        ← {t('projects.back')}
      </Link>

      <Reveal>
        <p className="mt-10 break-words font-mono text-xs text-sky-700 [overflow-wrap:anywhere] dark:text-cyan-400 sm:mt-12 sm:text-sm">
          $ cat projects/{project.id}/README.md
        </p>
        <h1 className="mt-4 break-words text-3xl font-bold text-slate-900 dark:text-white sm:text-5xl">
          {project.title}
        </h1>
        <p className="mt-4 text-sm font-medium text-sky-700 dark:text-cyan-400">{content.workType}</p>
        {project.subtitle && <p className="mt-2 text-slate-600 dark:text-slate-400">{project.subtitle}</p>}
        <p className="mt-6 break-words text-base leading-7 text-slate-600 dark:text-slate-400 sm:text-lg sm:leading-8">
          {content.description}
        </p>
      </Reveal>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
          {t('projects.techStack')}
        </h2>
        <div className="mt-5 flex flex-wrap gap-3">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm text-sky-700 dark:border-slate-700 dark:bg-slate-900 dark:text-cyan-400"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
          {t('projects.keyFeatures')}
        </h2>
        <div className="mt-6 space-y-4">
          {(content.highlights ?? []).map((feature, index) => (
            <div
              key={`${project.id}-feature-${index}`}
              className="rounded-lg border border-slate-200 bg-white p-5 text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
            >
              <span className="mr-3 text-sky-700 dark:text-cyan-400">✓</span>
              {feature}
            </div>
          ))}
        </div>
      </section>

      {caseStudy.length > 0 && (
        <section className="mt-14 grid min-w-0 gap-5 md:grid-cols-2">
          {caseStudy.map((section, index) => (
            <Reveal key={`${project.id}-case-${index}`} delay={Math.min(index * 0.07, 0.21)} className="h-full">
              <article className="h-full min-w-0 rounded-xl border border-slate-200 bg-white p-5 sm:p-6 dark:border-slate-700 dark:bg-slate-900">
                <span className="font-mono text-sm text-sky-700 dark:text-cyan-400">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h2 className="mt-3 text-xl font-semibold text-slate-900 dark:text-white">
                  {section.title}
                </h2>
                <p className="mt-4 break-words leading-7 text-slate-600 dark:text-slate-400 [overflow-wrap:anywhere] sm:leading-8">
                  {section.body}
                </p>
              </article>
            </Reveal>
          ))}
        </section>
      )}

      {project.githubUrl && (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-12 inline-block rounded-lg bg-cyan-400 px-6 py-3 font-medium text-slate-950 transition-colors hover:bg-cyan-300"
        >
          {t('projects.viewGithub')} ↗
        </a>
      )}
      {project.liveUrl && (
        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block rounded-lg border border-sky-700 px-6 py-3 font-medium text-sky-700 transition-colors hover:bg-sky-50 dark:border-cyan-400 dark:text-cyan-400 dark:hover:bg-slate-800 sm:ml-4">
          {t('projects.viewLive')} ↗
        </a>
      )}
    </main>
  )
}

export default ProjectDetail
