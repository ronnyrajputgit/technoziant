import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export function TextReveal({ children, delay = 0, className = '', as: Component = 'div' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <Component ref={ref} className={className} style={{ overflow: 'hidden' }}>
      <motion.div
        initial={{ y: '110%' }}
        animate={isInView ? { y: 0 } : { y: '110%' }}
        transition={{
          duration: 1,
          delay,
          ease: [0.76, 0, 0.24, 1]
        }}
      >
        {children}
      </motion.div>
    </Component>
  )
}
