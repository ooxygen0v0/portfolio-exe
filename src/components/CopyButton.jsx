import { useState } from 'react'

function CopyButton({ value, label, success, failure }) {
  const [status, setStatus] = useState('idle')
  async function copy() {
    setStatus('idle')
    try {
      await navigator.clipboard.writeText(value)
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }
  return (
    <div className="min-w-0">
      <button type="button" onClick={copy} className="min-h-11 w-full rounded-lg border border-slate-300 px-5 py-3 text-center text-sm font-medium text-slate-700 transition-colors hover:border-sky-700 dark:border-slate-700 dark:text-slate-300 dark:hover:border-cyan-400">{label}</button>
      <p role="status" aria-live="polite" className="mt-3 text-sm leading-7 text-sky-700 dark:text-cyan-400">{status === 'success' ? success : status === 'error' ? failure : ''}</p>
    </div>
  )
}

export default CopyButton
