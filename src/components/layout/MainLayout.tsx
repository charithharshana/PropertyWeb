'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import Sidebar from './Sidebar'

interface MainLayoutProps {
  children: ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  // Page transition variants
  const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
        when: 'beforeChildren',
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3
      }
    }
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <main className="flex-1 overflow-y-auto p-8 bg-gradient-to-br from-primary-50 to-secondary-50">
        <motion.div
          className="max-w-7xl mx-auto"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={pageVariants}
        >
          {children}
        </motion.div>
      </main>
    </div>
  )
}