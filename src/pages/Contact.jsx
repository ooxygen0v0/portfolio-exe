import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'

import Reveal from '../components/Reveal'
import CopyButton from '../components/CopyButton'
import { githubUsername } from '../config/github'
import { contactEmail } from '../config/contact'

function Contact() {
  const { t } = useTranslation()

  const username = githubUsername.trim()
  const githubUrl = username
    ? `https://github.com/${encodeURIComponent(username)}`
    : null
  const email = contactEmail.trim()

  return (
    <main className="mx-auto max-w-6xl min-w-0 px-4 py-12 sm:px-6 sm:py-20">
      <Reveal>
        <p className="font-mono text-sm text-sky-700 dark:text-cyan-400">
          $ connect --with developer
        </p>
        <h1 className="mt-4 text-3xl font-bold text-slate-900 dark:text-white sm:text-5xl">
          {t('contact.title')}
        </h1>
        <p className="mt-6 max-w-2xl wrap-break-word leading-8 text-slate-600 dark:text-slate-400">
          {t('contact.intro')}
        </p>
      </Reveal>

      <section className={`mt-10 grid min-w-0 gap-4 sm:mt-12 sm:gap-6 ${email ? 'lg:grid-cols-2' : ''}`}>
        <Reveal className="h-full">
          <article className="flex h-full min-w-0 flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-colors hover:border-sky-600 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-cyan-400 sm:p-8">
            <span className="font-mono text-sm text-sky-700 dark:text-cyan-400">01 / GitHub</span>
            <h2 className="mt-5 text-2xl font-bold text-slate-900 dark:text-white">
              {t('contact.githubTitle')}
            </h2>
            <p className="mt-4 leading-7 text-slate-600 dark:text-slate-400">
              {t('contact.githubDescription')}
            </p>
            <p className="mt-5 wrap-break-word font-mono text-sm text-slate-700 dark:text-slate-300">
              {username ? `@${username}` : t('contact.githubNotSet')}
            </p>

            {githubUrl && (
              <div className="mt-auto flex flex-col gap-3 pt-8 sm:flex-row sm:flex-wrap">
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center justify-center rounded-lg bg-cyan-400 px-5 py-3 text-center text-sm font-semibold text-slate-950 transition-colors hover:bg-cyan-300"
                >
                  {t('contact.openGithub')} ↗
                </a>
                <CopyButton value={githubUrl} label={t('contact.copyLink')} success={t('contact.copied')} failure={t('contact.copyFailed')} />
              </div>
            )}

          </article>
        </Reveal>

        {email && (
          <Reveal delay={0.1} className="h-full">
            <article className="flex h-full min-w-0 flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-colors hover:border-sky-600 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-cyan-400 sm:p-8">
              <span className="font-mono text-sm text-sky-700 dark:text-cyan-400">02 / Email</span>
              <h2 className="mt-5 text-2xl font-bold text-slate-900 dark:text-white">
                {t('contact.emailTitle')}
              </h2>
              <p className="mt-4 leading-7 text-slate-600 dark:text-slate-400">
                {t('contact.emailDescription')}
              </p>
              <p className="mt-5 wrap-break-word font-mono text-sm text-slate-700 dark:text-slate-300">
                {email}
              </p>
              <div className="mt-auto flex flex-col gap-3 pt-8 sm:flex-row sm:flex-wrap">
                <a
                  href={`mailto:${email}`}
                  className="inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-cyan-300 sm:w-auto"
                >
                  {t('contact.sendEmail')} ↗
                </a>
                <CopyButton value={email} label={t('ux.copyEmail')} success={t('ux.emailCopied')} failure={t('ux.emailFailed')} />
              </div>
            </article>
          </Reveal>
        )}
      </section>

      <Reveal delay={0.15}>
        <section className="mt-12 min-w-0 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900 sm:mt-16 sm:p-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">
            {t('contact.projectsTitle')}
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400">
            {t('contact.projectsDescription')}
          </p>
          <Link to="/projects" className="mt-6 inline-flex min-h-11 items-center gap-2 font-medium text-sky-700 hover:text-sky-900 dark:text-cyan-400 dark:hover:text-cyan-300">
            {t('contact.viewProjects')} <span aria-hidden="true">→</span>
          </Link>
        </section>
      </Reveal>
    </main>
  )
}

export default Contact
