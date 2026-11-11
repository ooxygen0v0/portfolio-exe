import { motion, useReducedMotion } from 'motion/react'

function Reveal({ children, delay = 0, className = '' }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={className}

      // 처음에는 투명하고 아래에 위치
      initial={
        reduceMotion
          ? false
          : { opacity: 0, y: 24 }
      }

      // 화면에 들어오면 원래 위치로 이동
      whileInView={
        reduceMotion
          ? undefined
          : { opacity: 1, y: 0 }
      }

      // 처음 한 번만 실행
      viewport={{
        once: true,
        amount: 0.15,
      }}

      // 애니메이션 속도
      transition={{
        duration: 0.5,
        delay,
        ease: 'easeOut',
      }}
    >
      {children}
    </motion.div>
  )
}

export default Reveal
