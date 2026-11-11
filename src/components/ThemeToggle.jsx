import { useTranslation } from 'react-i18next'
import { useTheme } from '../hooks/useTheme'

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const { t } = useTranslation()

  const isDark = theme === 'dark'

  const label = isDark
    ? t('theme.light')
    : t('theme.dark')

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      className="
        rounded-lg border border-slate-300
        bg-white px-4 py-2 text-sm
        font-medium text-slate-800
        transition-colors hover:bg-slate-100
        dark:border-slate-700 dark:bg-slate-900
        dark:text-white dark:hover:bg-slate-800
      "
    >
      {isDark ? '☀️' : '🌙'} {label}
    </button>
  )
}

export default ThemeToggle
