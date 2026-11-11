import { useEffect, useState } from 'react'
import { ThemeContext } from './ThemeContext'

// 저장된 테마 또는 시스템 기본 설정 확인
function getInitialTheme() {
  try {
    const saved = localStorage.getItem('portfolio-theme')

    if (saved === 'dark' || saved === 'light') {
      return saved
    }
  } catch {
    // 저장소를 사용할 수 없는 환경에서도 동작
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme)

  // 테마가 변경될 때 HTML 클래스와 저장소 갱신
  useEffect(() => {
    const root = document.documentElement

    root.classList.toggle('dark', theme === 'dark')
    root.style.colorScheme = theme

    try {
      localStorage.setItem('portfolio-theme', theme)
    } catch {
      // 저장 실패 시에도 현재 화면의 테마는 유지
    }
  }, [theme])

  function toggleTheme() {
    setTheme((current) =>
      current === 'dark' ? 'light' : 'dark'
    )
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
