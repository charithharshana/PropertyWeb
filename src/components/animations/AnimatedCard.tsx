'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface AnimatedCardProps {
  children: ReactNode
  delay?: number
  className?: string
  hoverEffect?: boolean
}

export default function AnimatedCard({
  children,
  delay = 0,
  className = '',
  hoverEffect = true
}: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={
        hoverEffect
          ? {
              y: -5,
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              transition: { duration: 0.2 }
            }
          : undefined
      }
      className={`bg-white rounded-lg shadow-md transition-all duration-300 p-3 sm:p-4 md:p-6 ${className}`}
    >
      {children}
    </motion.div>
  )
}
