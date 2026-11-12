import { useTranslation } from 'react-i18next'

function LanguageSwitcher() {
  const { t, i18n } = useTranslation()

  function handleLanguageChange(event) {
    i18n.changeLanguage(event.target.value)
  }

  return (
    <select
      aria-label={t('ux.selectLanguage')}
      value={i18n.resolvedLanguage || i18n.language}
      onChange={handleLanguageChange}
      className="
        min-h-11 max-w-full cursor-pointer rounded-lg
        border border-slate-300 bg-white
        px-3 py-2 text-sm text-slate-800
        outline-none transition-colors
        focus:border-sky-600
        dark:border-slate-700 dark:bg-slate-900
        dark:text-white dark:focus:border-cyan-400
      "
    >
      <option value="ko">🇰🇷 한국어</option>
      <option value="en">🇺🇸 English</option>
      <option value="ja">🇯🇵 日本語</option>
    </select>
  )
}

export default LanguageSwitcher
