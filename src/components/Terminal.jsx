import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { runTerminalCommand } from '../utils/terminalEngine'

function Terminal() {
  const { t, i18n } = useTranslation()
  const language = i18n.resolvedLanguage || i18n.language
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([])
  const [directory, setDirectory] = useState('home')
  const nextId = useRef(0)
  const historyRef = useRef(null)

  useEffect(() => {
    const element = historyRef.current
    if (element) element.scrollTop = element.scrollHeight
  }, [history, language])

  function handleSubmit(event) {
    event.preventDefault()
    const command = input.trim()
    if (!command) return

    const response = runTerminalCommand(command, directory, t, language)
    if (response.clear) {
      setHistory([])
    } else {
      setHistory((previous) => [
        ...previous,
        { id: nextId.current++, command, directory },
      ])
    }
    setDirectory(response.directory)
    setInput('')
  }

  function getPrompt(path) {
    return path === 'home' ? '~' : '~/projects'
  }

  return (
    <section className="min-w-0 w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-900 shadow-2xl">
      <div className="flex min-w-0 items-center gap-2 border-b border-slate-700 px-3 py-3 sm:px-5 sm:py-4">
        <span aria-hidden="true" className="h-3 w-3 shrink-0 rounded-full bg-red-400" />
        <span aria-hidden="true" className="h-3 w-3 shrink-0 rounded-full bg-yellow-400" />
        <span aria-hidden="true" className="h-3 w-3 shrink-0 rounded-full bg-green-400" />
        <span className="ml-2 min-w-0 truncate font-mono text-[11px] text-slate-400 sm:ml-4 sm:text-xs">
          portfolio — interactive terminal
        </span>
      </div>

      <div ref={historyRef} className="h-72 min-w-0 overflow-y-auto p-3 font-mono text-xs leading-relaxed sm:h-80 sm:p-5 sm:text-sm">
        <p className="break-words text-cyan-400 [overflow-wrap:anywhere]">{t('terminal.welcome')}</p>
        <p className="mt-2 break-words text-slate-500 [overflow-wrap:anywhere]">{t('terminal.hint')}</p>

        <div className="mt-6 space-y-5">
          {history.map((item) => {
            const response = runTerminalCommand(item.command, item.directory, t, language)
            return (
              <div key={item.id}>
                <p className="break-words text-green-400 [overflow-wrap:anywhere]">
                  visitor@portfolio:{getPrompt(item.directory)}$ {item.command}
                </p>
                <div className="mt-2 space-y-1">
                  {response.output.map((line, index) => (
                    <p key={index} className="whitespace-pre-wrap break-words text-slate-300 [overflow-wrap:anywhere]">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        <form onSubmit={handleSubmit} className="mt-5 flex min-w-0 items-center gap-2">
          <label htmlFor="terminal-input" className="shrink-0 whitespace-nowrap text-green-400">
            <span className="sm:hidden">$</span>
            <span className="hidden sm:inline">{`visitor@portfolio:${getPrompt(directory)}$`}</span>
          </label>
          <input
            id="terminal-input"
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            autoComplete="off"
            spellCheck={false}
            aria-label={t('terminal.inputLabel')}
            className="min-w-0 flex-1 bg-transparent text-white caret-cyan-400 outline-none placeholder:text-slate-500 focus-visible:ring-1 focus-visible:ring-cyan-400"
            placeholder="help"
          />
        </form>
      </div>
    </section>
  )
}

export default Terminal
