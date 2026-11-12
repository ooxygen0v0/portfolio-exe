import { useTranslation } from 'react-i18next'
import Reveal from '../components/Reveal'
import ProfileStory from '../components/ProfileStory'
import { profile } from '../data/profile'
import { aboutLayout } from '../data/aboutLayout'
import { getLocalized } from '../utils/getLocalized'
import SectionJump from '../components/SectionJump'

function About() {
  const { t, i18n } = useTranslation()
  const language = i18n.resolvedLanguage || i18n.language
  const content = getLocalized(profile, language)
  const copy = getLocalized(aboutLayout, language)
  return (
    <main className="mx-auto max-w-6xl min-w-0 px-4 py-12 sm:px-6 sm:py-20">
      <section aria-labelledby="about-title" className="border-b border-slate-200 pb-12 dark:border-slate-800 sm:pb-16">
        <Reveal>
          <p className="font-mono text-sm text-sky-700 dark:text-cyan-400">$ whoami <span className="text-slate-500 dark:text-slate-400">/ {t('about.title')}</span></p>
          <h1 id="about-title" className="mt-7 max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">{content.title}</h1>
          <p className="mt-7 max-w-[65ch] text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg sm:leading-9">{content.intro}</p>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 font-mono text-xs text-sky-700 dark:text-cyan-400 sm:text-sm">
            {[copy.degree, 'KATUSA · IMO / MOS 25B', 'Systems / Web / Data'].map(item => <li key={item} className="border-l-2 border-sky-600 pl-3 dark:border-cyan-400">{item}</li>)}
          </ul>
        </Reveal>
      </section>
      <section aria-labelledby="experience-overview" className="pt-10">
        <h2 id="experience-overview" className="text-lg font-semibold">{t('ux.overview')}</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {t('ux.summary', { returnObjects: true }).map(item => <SectionJump key={item.target} target={item.target} className="rounded-xl border border-slate-200 bg-white p-5 transition-colors hover:border-sky-700 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-cyan-400"><span className="block font-semibold">{item.title} <span aria-hidden="true">→</span></span><span className="mt-3 block text-sm leading-7 text-slate-600 dark:text-slate-400">{item.detail}</span></SectionJump>)}
        </div>
        <nav aria-label={t('ux.sections')} className="mt-6 flex flex-wrap gap-2">
          {content.biography.map(section => <SectionJump key={section.id} target={section.id} className="rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm text-sky-700 dark:border-slate-700 dark:text-cyan-400">{section.label} <span aria-hidden="true">→</span></SectionJump>)}
        </nav>
      </section>
      <ProfileStory />
    </main>
  )
}

export default About
