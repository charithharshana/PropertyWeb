'use client'

import { ReactNode, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Sidebar from './Sidebar'

interface MainLayoutProps {
  children: ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Check if we're on mobile on initial render and when window resizes
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024) // 1024px is the lg breakpoint in Tailwind
    }

    // Check on initial render
    checkIfMobile()

    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile)

    // Cleanup event listener
    return () => window.removeEventListener('resize', checkIfMobile)
  }, [])

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

  // Sidebar variants for mobile
  const sidebarVariants = {
    open: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
    closed: { x: '-100%', transition: { type: 'spring', stiffness: 300, damping: 30 } },
    visible: { x: 0, transition: { duration: 0 } } // Default state for desktop
  }

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Mobile sidebar toggle button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-md shadow-md text-primary-600 hover:bg-primary-50 transition-colors duration-200"
        aria-label="Toggle sidebar"
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile sidebar overlay */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <AnimatePresence>
        {(!isMobile || isSidebarOpen) && (
          <motion.div
            className={`${isMobile ? 'fixed z-50' : 'relative'} h-full`}
            initial={isMobile ? 'closed' : 'visible'}
            animate={isMobile ? 'open' : 'visible'}
            exit='closed'
            variants={sidebarVariants}
          >
            <Sidebar onLinkClick={isMobile ? toggleSidebar : undefined} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 bg-gradient-to-br from-primary-50 to-secondary-50">
        <motion.div
          className="max-w-7xl mx-auto pt-12 lg:pt-0" // Add padding top on mobile for the toggle button
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