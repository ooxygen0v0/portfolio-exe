import { Link, useParams } from 'react-router'
import { useTranslation } from 'react-i18next'
import { projects } from '../data/projects'
import { getLocalized } from '../utils/getLocalized'
import Reveal from '../components/Reveal'
import TestResults from '../components/TestResults'

// 실제 자료가 있을 때만 표시합니다. 언어별 media에 src·alt·caption을 지정합니다.
function ProjectMedia({ items = [] }) {
  return items.map(item => (
    <figure key={item.src} className="mt-6">
      <img src={item.src} alt={item.alt} loading="lazy" className="h-auto w-full rounded-xl border border-slate-200 dark:border-slate-700" />
      {item.caption && <figcaption className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">{item.caption}</figcaption>}
    </figure>
  ))
}

function ProjectDetail() {
  const { id } = useParams()
  const { t, i18n } = useTranslation()
  const project = projects.find(item => item.id === id)
  const backLink = <Link to="/projects" className="inline-flex min-h-11 items-center gap-2 font-mono text-sm text-sky-700 dark:text-cyan-400">{t('projects.back')} <span aria-hidden="true">→</span></Link>

  if (!project) return <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20"><h1 className="mb-6 text-3xl font-bold">{t('projects.notFound')}</h1>{backLink}</main>

  const content = getLocalized(project, i18n.resolvedLanguage || i18n.language)

  return (
    <main className="mx-auto max-w-4xl min-w-0 px-4 py-12 sm:px-6 sm:py-20">
      {backLink}
      <Reveal>
        <p className="mt-10 font-mono text-xs text-sky-700 [overflow-wrap:anywhere] dark:text-cyan-400 sm:text-sm">$ cat projects/{project.id}/README.md</p>
        <h1 className="mt-4 text-3xl font-bold leading-snug [overflow-wrap:anywhere] sm:text-4xl">{content.cardTitle}</h1>
        <p className="mt-4 font-mono text-lg text-sky-700 [overflow-wrap:anywhere] dark:text-cyan-400">{project.title}</p>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{content.workType}</p>
        <p className="mt-6 max-w-[68ch] text-base leading-[1.8] text-slate-700 dark:text-slate-300 sm:text-lg">{content.description}</p>
      </Reveal>

      <div className="mt-12 space-y-12 sm:space-y-16">
        {content.caseStudy.map((stage, index) => (
          <section key={stage.id} aria-labelledby={`project-${stage.id}`}>
            <Reveal>
              <p aria-hidden="true" className="font-mono text-sm text-sky-700 dark:text-cyan-400">{String(index + 1).padStart(2, '0')}</p>
              <h2 id={`project-${stage.id}`} className="mt-3 text-2xl font-semibold">{stage.title}</h2>
              <p className="mt-5 max-w-[68ch] text-base leading-[1.8] text-slate-700 dark:text-slate-300 sm:text-lg">{stage.body}</p>
              {stage.id === 'process' && (
                <ul className="mt-5 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-600 dark:text-slate-400">
                  {content.highlights.map(feature => <li key={feature}>{feature}</li>)}
                </ul>
              )}
              {stage.id === 'verification' && project.id === 'minios' && <TestResults context={content.verificationContext} />}
              <ProjectMedia items={stage.media} />
              {stage.id === 'verification' && project.id === 'minios' && !stage.media?.length && <p className="mt-5 text-sm leading-7 text-slate-600 dark:text-slate-400">{t('ux.evidenceMissing')}</p>}
            </Reveal>
          </section>
        ))}
      </div>

      <section aria-labelledby="project-technologies" className="mt-14 border-t border-slate-200 pt-7 dark:border-slate-800">
        <h2 id="project-technologies" className="text-sm font-semibold">{t('projects.techStack')}</h2>
        <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">{project.technologies.join(' · ')}</p>
      </section>
      <div className="mt-8 flex flex-wrap gap-3">
        {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center rounded-lg bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-cyan-300">{t('projects.viewGithub')} <span aria-hidden="true" className="ml-2">↗</span></a>}
        {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center rounded-lg border border-sky-700 px-5 py-3 text-sm font-medium text-sky-700 dark:border-cyan-400 dark:text-cyan-400">{t('projects.viewLive')} <span aria-hidden="true" className="ml-2">↗</span></a>}
      </div>
    </main>
  )
}

export default ProjectDetail
