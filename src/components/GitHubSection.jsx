import { useTranslation } from 'react-i18next'
import { githubUsername } from '../config/github'
import { useGithub } from '../hooks/useGithub'

function GitHubSection() {
  const { t } = useTranslation()
  const { status, profile, repositories, error } = useGithub()

  return (
    <section className="mt-20 border-t border-slate-200 pt-12 dark:border-slate-800" aria-labelledby="github-heading">
      <p className="font-mono text-sm text-sky-700 dark:text-cyan-400">$ gh repo list</p>
      <h2 id="github-heading" className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">
        {t('github.title')}
      </h2>
      <p className="mt-3 text-slate-600 dark:text-slate-400">{t('github.intro')}</p>

      {status === 'unconfigured' && (
        <p className="mt-6 rounded-lg border border-slate-200 bg-white p-5 text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
          {t('github.configure')}
        </p>
      )}

      {status === 'loading' && (
        <p role="status" className="mt-6 text-slate-600 dark:text-slate-400">{t('github.loading')}</p>
      )}

      {status === 'error' && (
        <div role="alert" className="mt-6 rounded-lg border border-amber-300 bg-amber-50 p-5 text-amber-900 dark:border-amber-700 dark:bg-slate-900 dark:text-amber-300">
          {t(error === 'NOT_FOUND' ? 'github.notFound' : error === 'RATE_LIMIT' ? 'github.rateLimit' : 'github.failed')}
          {githubUsername && (
            <a className="mt-3 block underline" href={`https://github.com/${encodeURIComponent(githubUsername.trim())}`} target="_blank" rel="noopener noreferrer">
              {t('github.profileLink')}
            </a>
          )}
        </div>
      )}

      {status === 'success' && profile && (
        <>
          <div className="mt-7 flex min-w-0 flex-col items-start gap-5 rounded-xl border border-slate-200 bg-white p-5 sm:flex-row sm:items-center dark:border-slate-700 dark:bg-slate-900">
            <img src={profile.avatarUrl} alt="GitHub avatar" width="72" height="72" className="h-18 w-18 shrink-0 rounded-full" />
            <div className="min-w-0 flex-1">
              <p className="break-words text-lg font-semibold text-slate-900 dark:text-white [overflow-wrap:anywhere]">{profile.name || profile.login}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">@{profile.login}</p>
              {profile.bio && <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">{profile.bio}</p>}
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                {t('github.repositoryCount', { count: profile.publicRepos })}
              </p>
            </div>
            <a href={profile.htmlUrl} target="_blank" rel="noopener noreferrer" className="inline-flex w-full shrink-0 justify-center rounded-lg bg-cyan-400 px-4 py-3 text-center text-sm font-medium text-slate-950 hover:bg-cyan-300 sm:w-auto">
              {t('github.profileLink')} ↗
            </a>
          </div>

          {repositories.length === 0 ? (
            <p className="mt-6 text-slate-600 dark:text-slate-400">{t('github.empty')}</p>
          ) : (
            <div className="mt-6 grid min-w-0 gap-4 sm:grid-cols-2">
              {repositories.map((repo) => (
                <a key={repo.id} href={repo.htmlUrl} target="_blank" rel="noopener noreferrer" className="min-w-0 rounded-xl border border-slate-200 bg-white p-4 transition-colors hover:border-sky-600 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-cyan-400 sm:p-5">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="break-all font-semibold text-sky-700 dark:text-cyan-400">{repo.name}</h3>
                    <span className="shrink-0 text-sm text-slate-500 dark:text-slate-400">★ {repo.stars}</span>
                  </div>
                  <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">{repo.description || t('github.noDescription')}</p>
                  {repo.language && <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">{repo.language}</p>}
                </a>
              ))}
            </div>
          )}
        </>
      )}
    </section>
  )
}

export default GitHubSection
