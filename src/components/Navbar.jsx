import { useRef, useState } from 'react'
import { NavLink } from 'react-router'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from './LanguageSwitcher'
import ThemeToggle from './ThemeToggle'

const menuItems = [
  { key: 'home', path: '/' },
  { key: 'about', path: '/about' },
  { key: 'skills', path: '/skills' },
  { key: 'projects', path: '/projects' },
  { key: 'contact', path: '/contact' },
]

function Navbar() {
  const { t } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)
  const toggleRef = useRef(null)

  const desktopLinkClass = ({ isActive }) =>
    `whitespace-nowrap rounded-md px-2 py-2 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 ${
      isActive
        ? 'font-semibold text-sky-700 dark:text-cyan-400'
        : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
    }`

  const mobileLinkClass = ({ isActive }) =>
    `block rounded-lg px-4 py-3 text-base font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 ${
      isActive
        ? 'bg-sky-50 text-sky-700 dark:bg-slate-800 dark:text-cyan-400'
        : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
    }`

  function handleKeyDown(event) {
    if (event.key === 'Escape' && menuOpen) {
      setMenuOpen(false)
      toggleRef.current?.focus()
    }
  }

  return (
    <header
      onKeyDown={handleKeyDown}
      className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/95"
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:gap-4">
        <NavLink
          to="/"
          end
          onClick={() => setMenuOpen(false)}
          className="min-w-0 shrink-0 text-lg font-bold tracking-tight text-sky-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400 dark:text-cyan-400 sm:text-xl"
        >
          Portfolio.exe
        </NavLink>

        <nav aria-label={t('responsive.navigation')} className="ml-auto hidden items-center gap-1 lg:flex">
          {menuItems.map((item) => (
            <NavLink key={item.key} to={item.path} end={item.path === '/'} className={desktopLinkClass}>
              {t(`nav.${item.key}`)}
            </NavLink>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>

        <button
          ref={toggleRef}
          type="button"
          aria-controls="mobile-navigation"
          aria-expanded={menuOpen}
          aria-label={t(menuOpen ? 'responsive.closeMenu' : 'responsive.openMenu')}
          onClick={() => setMenuOpen((previous) => !previous)}
          className="ml-auto inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-slate-300 text-slate-800 transition-colors hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 dark:border-slate-700 dark:text-white dark:hover:bg-slate-800 lg:hidden"
        >
          {menuOpen ? (
            <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6 6 18 M6 6l12 12" />
            </svg>
          ) : (
            <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 6h16 M4 12h16 M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {menuOpen && (
        <nav
          id="mobile-navigation"
          aria-label={t('responsive.mobileNavigation')}
          className="border-t border-slate-200 bg-white px-4 pb-5 pt-3 shadow-lg dark:border-slate-800 dark:bg-slate-950 sm:px-6 lg:hidden"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {menuItems.map((item) => (
              <NavLink
                key={item.key}
                to={item.path}
                end={item.path === '/'}
                onClick={() => setMenuOpen(false)}
                className={mobileLinkClass}
              >
                {t(`nav.${item.key}`)}
              </NavLink>
            ))}

            <div className="mt-3 flex flex-wrap items-center gap-3 border-t border-slate-200 pt-4 dark:border-slate-800">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
          </div>
        </nav>
      )}
    </header>
  )
}

export default Navbar
