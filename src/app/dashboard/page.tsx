'use client'

import { useState, useEffect } from 'react'
import MainLayout from '@/components/layout/MainLayout'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ListChecksIcon, DollarSignIcon, BrushIcon, SendIcon,
  UsersIcon, BookOpenIcon, ArrowRightIcon, CheckCircleIcon,
  LoaderIcon, CircleDashedIcon, FileTextIcon
} from 'lucide-react'
import { AnimatedCard, AnimatedSection, AnimatedList } from '@/components/animations'

// Dashboard widget component for reuse
interface DashboardWidgetProps {
  title: string
  icon: React.ReactNode
  children: React.ReactNode
  linkText?: string
  linkHref?: string
  accentColor?: string
}

const DashboardWidget: React.FC<DashboardWidgetProps> = ({
  title, icon, children, linkText, linkHref, accentColor = 'sky'
}) => {
  const accentClasses = {
    sky: 'from-primary-500 to-primary-600',
    green: 'from-emerald-500 to-emerald-600',
    amber: 'from-amber-500 to-amber-600',
    indigo: 'from-secondary-500 to-secondary-600',
    purple: 'from-purple-500 to-purple-600',
    teal: 'from-teal-500 to-teal-600',
    accent: 'from-accent-500 to-accent-600'
  }[accentColor] || 'from-primary-500 to-primary-600';

  return (
    <motion.div
      className="bg-white p-4 sm:p-5 md:p-6 rounded-xl shadow-md border border-gray-100 relative overflow-hidden group"
      whileHover={{
        y: -5,
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        transition: { duration: 0.3 }
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Accent color gradient line at top */}
      <motion.div
        className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${accentClasses}`}
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ duration: 0.8, delay: 0.2 }}
      ></motion.div>

      <div className="flex items-start">
        <motion.div
          className={`flex-shrink-0 p-3 rounded-lg bg-gradient-to-br ${accentClasses} text-white shadow-md`}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
        >
          {icon}
        </motion.div>

        <motion.h3
          className="text-base sm:text-lg font-semibold text-gray-800 ml-3 sm:ml-4 mt-1 sm:mt-2"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {title}
        </motion.h3>
      </div>

      <div className="mt-4">{children}</div>

      {linkText && linkHref && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link
            href={linkHref}
            className={`mt-5 inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r ${accentClasses} rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 transform`}
          >
            {linkText} <ArrowRightIcon className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </motion.div>
      )}
    </motion.div>
  )
}

export default function Dashboard() {
  // This would eventually be pulled from API/database
  const [sellingProgress, setSellingProgress] = useState({
    evaluation: { status: 'completed', progress: 100 },
    preparation: { status: 'in-progress', progress: 60 },
    listing: { status: 'not-started', progress: 0 }
  })

  const [propertyValue, setPropertyValue] = useState('€255,000*')
  const [newLeads, setNewLeads] = useState(3)

  // Animation variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <MainLayout>
      <AnimatedSection animation="fadeIn" delay={0.1}>
        <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-2">Dashboard Overview</h2>
        <p className="text-gray-500 mb-8">Welcome back! Here&apos;s an overview of your property selling journey.</p>
      </AnimatedSection>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Selling Progress Widget */}
        <DashboardWidget
          title="Selling Progress"
          icon={<ListChecksIcon className="h-5 w-5" />}
          linkText="Continue Preparation"
          linkHref="/property-preparation"
          accentColor="sky"
        >
          <div className="space-y-4 mt-2">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Evaluation</span>
                <span className="text-sm font-medium text-emerald-600 flex items-center">
                  <CheckCircleIcon className="mr-1 h-4 w-4" /> Completed
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                <motion.div
                  className="bg-gradient-to-r from-emerald-400 to-emerald-500 h-2.5 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${sellingProgress.evaluation.progress}%` }}
                  transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                ></motion.div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Preparation</span>
                <span className="text-sm font-medium text-amber-600 flex items-center">
                  <LoaderIcon className="mr-1 h-4 w-4 animate-spin" /> In Progress
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                <motion.div
                  className="bg-gradient-to-r from-amber-400 to-amber-500 h-2.5 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${sellingProgress.preparation.progress}%` }}
                  transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
                ></motion.div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Listing</span>
                <span className="text-sm font-medium text-gray-500 flex items-center">
                  <CircleDashedIcon className="mr-1 h-4 w-4" /> Not Started
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                <motion.div
                  className="bg-gray-300 h-2.5 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${sellingProgress.listing.progress}%` }}
                  transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
                ></motion.div>
              </div>
            </div>
          </div>
        </DashboardWidget>

        {/* Estimated Value Widget */}
        <DashboardWidget
          title="Estimated Value"
          icon={<DollarSignIcon className="h-5 w-5" />}
          linkText="View Details"
          linkHref="/evaluation"
          accentColor="green"
        >
          <div className="flex flex-col items-center justify-center py-4">
            <p className="text-4xl font-bold bg-gradient-to-r from-emerald-500 to-emerald-600 bg-clip-text text-transparent">
              {propertyValue}
            </p>
            <p className="text-xs text-gray-500 mt-3 text-center max-w-xs">
              *Based on initial data. Subject to market changes and professional appraisal.
            </p>
          </div>
        </DashboardWidget>

        {/* Preparation Status Widget */}
        <DashboardWidget
          title="Preparation Status"
          icon={<BrushIcon className="h-5 w-5" />}
          linkText="Manage Preparation"
          linkHref="/property-preparation"
          accentColor="amber"
        >
          <ul className="space-y-3 mt-2">
            <li className="flex items-center p-2 bg-emerald-50 rounded-lg border border-emerald-100">
              <div className="p-1 bg-white rounded-full mr-3">
                <CheckCircleIcon className="h-5 w-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Ad Text</p>
                <p className="text-xs text-gray-500">Draft Saved</p>
              </div>
            </li>
            <li className="flex items-center p-2 bg-amber-50 rounded-lg border border-amber-100">
              <div className="p-1 bg-white rounded-full mr-3">
                <LoaderIcon className="h-5 w-5 text-amber-500 animate-spin" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Photos</p>
                <p className="text-xs text-gray-500">Pending Upload</p>
              </div>
            </li>
            <li className="flex items-center p-2 bg-gray-50 rounded-lg border border-gray-100">
              <div className="p-1 bg-white rounded-full mr-3">
                <CircleDashedIcon className="h-5 w-5 text-gray-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Staging</p>
                <p className="text-xs text-gray-500">Checklist Started</p>
              </div>
            </li>
          </ul>
        </DashboardWidget>

        {/* Listing Status Widget */}
        <DashboardWidget
          title="Listing Status"
          icon={<SendIcon className="h-5 w-5" />}
          linkText="Go to Listing"
          linkHref="/listing"
          accentColor="indigo"
        >
          <div className="bg-indigo-50 p-3 rounded-lg border border-indigo-100 mb-3">
            <p className="text-sm font-medium text-gray-700 mb-1">Publishing Status</p>
            <p className="text-xs text-gray-500">Not yet initiated</p>
          </div>

          <p className="text-sm font-medium text-gray-700 mb-2">Target Portals:</p>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-white border border-gray-200 text-gray-700 shadow-sm">
              City23.ee
            </span>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-white border border-gray-200 text-gray-700 shadow-sm">
              KV.ee
            </span>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-white border border-gray-200 text-gray-700 shadow-sm">
              OLX.ua
            </span>
          </div>
        </DashboardWidget>

        {/* Buyer Inquiries Widget */}
        <DashboardWidget
          title="Buyer Inquiries"
          icon={<UsersIcon className="h-5 w-5" />}
          linkText="Manage Leads"
          linkHref="/crm"
          accentColor="purple"
        >
          <div className="flex items-center justify-center py-4">
            <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mr-4">
              <span className="text-2xl font-bold text-purple-600">{newLeads}</span>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-800">New Leads</p>
              <p className="text-sm text-gray-500">1 Follow-up due today</p>
            </div>
          </div>
        </DashboardWidget>

        {/* Quick Resources Widget */}
        <DashboardWidget
          title="Quick Resources"
          icon={<BookOpenIcon className="h-5 w-5" />}
          accentColor="teal"
        >
          <ul className="space-y-2 mt-2">
            <li>
              <Link href="/knowledge-base?article=staging-tips"
                className="flex items-center p-2 hover:bg-teal-50 rounded-lg transition-colors duration-200">
                <div className="p-1 bg-teal-100 rounded-lg mr-3">
                  <BookOpenIcon className="h-4 w-4 text-teal-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Staging Tips</p>
                  <p className="text-xs text-gray-500">Prepare your home for viewing</p>
                </div>
              </Link>
            </li>
            <li>
              <Link href="/knowledge-base?article=photo-guide"
                className="flex items-center p-2 hover:bg-teal-50 rounded-lg transition-colors duration-200">
                <div className="p-1 bg-teal-100 rounded-lg mr-3">
                  <BookOpenIcon className="h-4 w-4 text-teal-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Photography Guide</p>
                  <p className="text-xs text-gray-500">Take stunning property photos</p>
                </div>
              </Link>
            </li>
            <li>
              <Link href="/notary"
                className="flex items-center p-2 hover:bg-teal-50 rounded-lg transition-colors duration-200">
                <div className="p-1 bg-teal-100 rounded-lg mr-3">
                  <FileTextIcon className="h-4 w-4 text-teal-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Notary Role</p>
                  <p className="text-xs text-gray-500">Legal aspects of property sale</p>
                </div>
              </Link>
            </li>
          </ul>
        </DashboardWidget>
      </motion.div>
    </MainLayout>
  )
}