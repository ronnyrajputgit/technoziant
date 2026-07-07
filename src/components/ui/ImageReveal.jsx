import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export function ImageReveal({ src, alt, className = '', style = {} }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <div ref={ref} className={className} style={{ overflow: 'hidden', ...style }}>
      <motion.div
        initial={{ clipPath: 'inset(0 0 100% 0)' }}
        animate={isInView ? { clipPath: 'inset(0 0 0% 0)' } : { clipPath: 'inset(0 0 100% 0)' }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        style={{ width: '100%', height: '100%' }}
      >
        <motion.img
          src={src}
          alt={alt}
          initial={{ scale: 1.3 }}
          animate={isInView ? { scale: 1 } : { scale: 1.3 }}
          transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </motion.div>
    </div>
  )
}
