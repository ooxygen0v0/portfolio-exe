import { useReducedMotion } from 'motion/react'

function SectionJump({ target, children, className = '' }) {
  const reducedMotion = useReducedMotion()
  function jump() {
    const heading = document.getElementById(`biography-${target}`)
    if (!heading) return
    heading.focus({ preventScroll: true })
    heading.scrollIntoView({ block: 'start', behavior: reducedMotion ? 'instant' : 'smooth' })
  }
  // 버튼으로 URL의 HashRouter 경로를 바꾸지 않고 문서 내 위치를 이동합니다.
  return <button type="button" onClick={jump} aria-controls={`biography-${target}`} className={`min-h-11 min-w-11 text-left ${className}`}>{children}</button>
}

export default SectionJump
