import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'
import Reveal from './Reveal'
import { profile, professionalExperience, experiences, languageExperiences, certifications } from '../data/profile'
import { projects } from '../data/projects'
import { aboutLayout } from '../data/aboutLayout'
import { getLocalized } from '../utils/getLocalized'

const bodyClass = 'max-w-[68ch] space-y-5 text-base leading-[1.8] text-slate-700 dark:text-slate-300 sm:text-lg [overflow-wrap:anywhere]'
const focusClass = 'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-700 dark:focus-visible:outline-cyan-400'

function StoryHeading({ section, number }) {
  return (
    <header className="mb-6">
      <p className="font-mono text-xs tracking-wider text-sky-700 dark:text-cyan-400 sm:text-sm">{number} / {section.label}</p>
      <h3 id={`biography-${section.id}`} tabIndex={-1} className="mt-3 scroll-mt-28 rounded-sm text-2xl font-semibold leading-snug tracking-tight sm:text-3xl">{section.title}</h3>
    </header>
  )
}

function StoryText({ section }) {
  return <div className={bodyClass}>{section.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>
}

function ProjectConnection({ id, language, label, linkLabel }) {
  const project = projects.find(item => item.id === id)
  if (!project) return null
  const content = getLocalized(project, language)
  return (
    <Link to={`/projects/${project.id}`} aria-label={`${project.title} · ${linkLabel}`} className={`group block min-w-0 rounded-xl border border-slate-200 bg-white p-6 transition-colors hover:border-sky-600 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-cyan-400 ${focusClass}`}>
      <p className="font-mono text-xs text-sky-700 dark:text-cyan-400">$ open /projects/{project.id}</p>
      <p className="mt-5 text-xs text-slate-500 dark:text-slate-400">{label}</p>
      <h4 className="mt-2 text-xl font-semibold leading-snug tracking-tight">{content.cardTitle}</h4>
      <p className="mt-2 font-mono text-sm text-sky-700 dark:text-cyan-400">{project.title}</p>
      <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">{content.summary}</p>
      <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-sky-700 dark:text-cyan-400">{linkLabel}<span aria-hidden="true">→</span></span>
    </Link>
  )
}

function ProfileStory() {
  const { t, i18n } = useTranslation()
  const language = i18n.resolvedLanguage || i18n.language
  const content = getLocalized(profile, language)
  const copy = getLocalized(aboutLayout, language)
  const professional = getLocalized(professionalExperience, language)
  const [background, experience, learning, development, nextStep] = content.biography
  const connectionProps = { language, label: copy.connection, linkLabel: t('projects.viewDetails') }

  return (
    <div className="min-w-0">
      <section aria-labelledby="story-title" className="py-14 sm:py-20">
        <h2 id="story-title" className="mb-12 font-mono text-sm text-sky-700 dark:text-cyan-400">$ cat my-story.md <span className="mt-2 block font-sans text-slate-500 dark:text-slate-400">{copy.story}</span></h2>

        <Reveal>
          <section aria-labelledby="biography-background" className="grid gap-6 pb-14 sm:pb-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16">
            <StoryHeading section={background} number="01" />
            <StoryText section={background} />
          </section>
        </Reveal>

        <Reveal>
          <section aria-labelledby="biography-experience" className="rounded-2xl border border-sky-200 bg-sky-50/60 p-5 dark:border-cyan-900 dark:bg-slate-900 sm:p-8 lg:p-10">
            <div className="grid min-w-0 gap-10 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-12">
              <div><StoryHeading section={experience} number="02" /><StoryText section={experience} /></div>
              <div className="min-w-0 border-t border-sky-200 pt-6 dark:border-slate-700 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
                <p className="font-mono text-xs text-sky-700 dark:text-cyan-400">{copy.professional}</p>
                <h4 className="mt-4 text-xl font-semibold">{professional.title}</h4>
                <p className="mt-3 text-sm leading-7 text-sky-800 dark:text-cyan-300 [overflow-wrap:anywhere]">{professionalExperience.role}</p>
                <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400"><time dateTime={professionalExperience.startDate}>{professional.period.split(' – ')[0]}</time>{' – '}<time dateTime={professionalExperience.endDate}>{professional.period.split(' – ')[1]}</time></p>
                <ul className="mt-5 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700 dark:text-slate-300">{professional.responsibilities.map(item => <li key={item}>{item}</li>)}</ul>
              </div>
            </div>
          </section>
        </Reveal>

        <section aria-labelledby="biography-learning" className="py-14 sm:py-20">
          <Reveal><StoryHeading section={learning} number="03" /></Reveal>
          <div className="grid min-w-0 items-start gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:gap-16">
            <Reveal><StoryText section={learning} /></Reveal>
            <Reveal><ProjectConnection id="minios" {...connectionProps} /></Reveal>
          </div>
        </section>

        <section aria-labelledby="biography-development" className="border-t border-slate-200 py-14 dark:border-slate-800 sm:py-20">
          <div className="grid min-w-0 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16">
            <Reveal className="lg:col-start-2 lg:row-start-1"><StoryHeading section={development} number="04" /><StoryText section={development} /></Reveal>
            <Reveal className="lg:col-start-1 lg:row-start-1"><ProjectConnection id="portfolio-exe" {...connectionProps} /></Reveal>
          </div>
        </section>

        <Reveal>
          <section aria-labelledby="biography-next-step" className="border-y border-slate-200 py-10 dark:border-slate-800 sm:py-14">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16"><StoryHeading section={nextStep} number="05" /><StoryText section={nextStep} /></div>
          </section>
        </Reveal>
      </section>

      <section aria-labelledby="journey-title" className="pb-14 sm:pb-20">
        <Reveal>
          <p className="font-mono text-sm text-sky-700 dark:text-cyan-400">$ git log --oneline</p>
          <h2 id="journey-title" className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">{content.experienceTitle}</h2>
          <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">{copy.journeyHint}</p>
        </Reveal>
        <ol className="mt-8 border-t border-slate-200 dark:border-slate-800">
          {experiences.map((item, index) => {
            const entry = getLocalized(item, language)
            return (
              <li key={item.id} className="border-b border-slate-200 dark:border-slate-800">
                <details className="group" open={index === 0}>
                  <summary className={`cursor-pointer rounded-sm py-6 pr-2 marker:text-sky-700 dark:marker:text-cyan-400 ${focusClass}`}>
                    <span className="ml-2 inline-grid w-[calc(100%-2rem)] gap-3 align-middle sm:grid-cols-[160px_minmax(0,1fr)] sm:gap-8">
                      <span className="font-mono text-sm text-sky-700 dark:text-cyan-400">{entry.period || item.period}</span>
                      <span><span className="mb-2 block text-xs text-slate-500 dark:text-slate-400">{item.id === 'it-practice' ? copy.professional : copy.academic}</span><span className="text-lg font-semibold sm:text-xl">{entry.title}</span></span>
                    </span>
                  </summary>
                  <p className="max-w-[68ch] pb-7 pl-6 text-base leading-[1.8] text-slate-700 dark:text-slate-300 sm:ml-[192px]">{t(`ux.transitions.${index}`)}</p>
                </details>
              </li>
            )
          })}
        </ol>
      </section>

      <div className="grid min-w-0 gap-12 border-t border-slate-200 pt-10 dark:border-slate-800 sm:pt-14 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-16">
        <section aria-labelledby="certifications-title">
          <h2 id="certifications-title" className="text-2xl font-semibold">{content.certificationTitle}</h2>
          <ul className="mt-6 divide-y divide-slate-200 dark:divide-slate-800">{certifications.map((item, index) => <li key={item.id} className="flex items-baseline gap-5 py-4"><span aria-hidden="true" className="font-mono text-xs text-sky-700 dark:text-cyan-400">{String(index + 1).padStart(2, '0')}</span><span className="font-medium">{getLocalized(item, language).name || item.name}</span></li>)}</ul>
        </section>
        <section aria-labelledby="language-experience-title">
          <h2 id="language-experience-title" className="text-2xl font-semibold">{copy.language}</h2>
          {languageExperiences.map(item => {
            const entry = getLocalized(item, language)
            return <article key={item.id} className="mt-6"><p className="font-mono text-sm text-sky-700 dark:text-cyan-400">{item.period}</p><h3 className="mt-3 text-lg font-medium">{entry.title}</h3><p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">{entry.description}</p></article>
          })}
        </section>
      </div>
    </div>
  )
}

export default ProfileStory
