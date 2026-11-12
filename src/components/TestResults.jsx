import { useTranslation } from 'react-i18next'

// 기존 miniOS 콘텐츠에서 확인한 수치만 표시합니다. 원본 캡처를 대신하지 않습니다.
function TestResults({ context }) {
  const { t } = useTranslation()
  return (
    <div className="mt-6 rounded-xl border border-sky-200 bg-sky-50 p-5 dark:border-cyan-900 dark:bg-slate-900">
      <h3 className="text-base font-medium text-sky-800 dark:text-cyan-300">{t('ux.tests')}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300">{context}</p>
      <dl className="mt-4 grid grid-cols-2 gap-5">
        {[['Lab03', '13/13'], ['Lab04', '16/16']].map(([lab, result]) => <div key={lab}><dt className="font-mono text-sm text-slate-600 dark:text-slate-400">{lab}</dt><dd className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white sm:text-3xl">{result}<span className="mt-1 block text-xs font-medium text-sky-800 dark:text-cyan-300">{t('ux.passed')}</span></dd></div>)}
      </dl>
      <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">{t('ux.testRecord')}</p>
    </div>
  )
}

export default TestResults
