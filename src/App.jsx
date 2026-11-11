import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router'
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from 'motion/react'

import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import Skills from './pages/Skills'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import Contact from './pages/Contact'


// 페이지 이동 애니메이션 관리
function AnimatedRoutes() {
  const location = useLocation()
  const reduceMotion = useReducedMotion()

  // 다른 페이지로 이동하면 스크롤을 맨 위로 이동
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={
          reduceMotion
            ? false
            : { opacity: 0, y: 12 }
        }
        animate={{ opacity: 1, y: 0 }}
        exit={
          reduceMotion
            ? { opacity: 1 }
            : { opacity: 0, y: -8 }
        }
        transition={{
          duration: reduceMotion ? 0 : 0.22,
          ease: 'easeOut',
        }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          <Route
            path="/projects/:id"
            element={<ProjectDetail />}
          />          
        <Route path="/contact" element={<Contact />} />

        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-200 dark:bg-slate-950 dark:text-white">
      <Navbar />
      <AnimatedRoutes />
    </div>
  )
}

export default App
