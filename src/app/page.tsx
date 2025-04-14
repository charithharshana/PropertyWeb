'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { HomeIcon, ArrowRightIcon, CheckCircleIcon, BuildingIcon, StarIcon, ShieldIcon } from 'lucide-react'

export default function Home() {
  const router = useRouter()
  const [countdown, setCountdown] = useState(3)

  // In a real app, we might check auth status here and redirect accordingly
  useEffect(() => {
    // For now, automatically redirect to the dashboard after a brief delay
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          router.push('/dashboard')
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [router])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  }

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20,
        delay: 0.3
      }
    }
  }

  const backgroundVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 1.5 }
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 bg-gradient-to-br from-primary-50 to-secondary-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full overflow-hidden z-0"
        variants={backgroundVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="absolute top-10 left-10 w-64 h-64 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-10 w-72 h-72 bg-secondary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-accent-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </motion.div>

      <motion.div
        className="z-10 w-full max-w-xs sm:max-w-sm md:max-w-md flex flex-col items-center justify-center text-center px-4 sm:px-0"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="bg-gradient-to-r from-primary-500 to-secondary-500 p-3 rounded-xl shadow-lg mb-4"
          variants={iconVariants}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
        >
          <HomeIcon className="h-8 w-8 text-white" />
        </motion.div>

        <motion.h1
          className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-2"
          variants={itemVariants}
        >
          HomeFlow
        </motion.h1>
        <motion.p
          className="text-lg text-gray-600 mb-8"
          variants={itemVariants}
        >
          Simplify Your Property Sale
        </motion.p>

        <motion.div
          className="w-full bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100"
          variants={itemVariants}
          whileHover={{ y: -5, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
        >
          <div className="p-1 bg-gradient-to-r from-primary-500 to-secondary-500"></div>
          <div className="p-8">
            <motion.h2
              className="text-2xl font-semibold text-gray-800 mb-4"
              variants={itemVariants}
            >
              Welcome
            </motion.h2>
            <motion.p
              className="text-gray-600 mb-6"
              variants={itemVariants}
            >
              Your complete solution for selling property online.
            </motion.p>

            <motion.div
              className="space-y-3 mb-6"
              variants={containerVariants}
            >
              <motion.div
                className="flex items-center text-gray-700"
                variants={itemVariants}
                whileHover={{ x: 5, transition: { duration: 0.2 } }}
              >
                <BuildingIcon className="h-5 w-5 text-primary-500 mr-2 animate-bounce-light" />
                <span>AI-powered property valuation</span>
              </motion.div>
              <motion.div
                className="flex items-center text-gray-700"
                variants={itemVariants}
                whileHover={{ x: 5, transition: { duration: 0.2 } }}
              >
                <StarIcon className="h-5 w-5 text-secondary-500 mr-2 animate-pulse-light" />
                <span>Automated listing creation</span>
              </motion.div>
              <motion.div
                className="flex items-center text-gray-700"
                variants={itemVariants}
                whileHover={{ x: 5, transition: { duration: 0.2 } }}
              >
                <ShieldIcon className="h-5 w-5 text-accent-500 mr-2 animate-bounce-light" />
                <span>Integrated CRM for buyer management</span>
              </motion.div>
            </motion.div>

            <motion.div
              className="flex justify-center"
              variants={itemVariants}
            >
              <motion.button
                onClick={() => router.push('/dashboard')}
                className="group relative bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-medium py-3 px-8 rounded-lg shadow-md overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center">
                  Enter Dashboard <ArrowRightIcon className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                </span>
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-primary-600 to-accent-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0, transition: { duration: 0.4 } }}
                ></motion.span>
              </motion.button>
            </motion.div>

            <motion.div
              className="mt-6 flex items-center justify-center"
              variants={itemVariants}
            >
              <motion.div
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 text-sm font-medium"
                animate={{
                  scale: [1, 1.1, 1],
                  transition: { duration: 1, repeat: Infinity }
                }}
              >
                {countdown}
              </motion.div>
              <p className="text-sm text-gray-500 ml-2">
                Redirecting to dashboard...
              </p>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </main>
  )
}
