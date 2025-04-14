'use client'

import { useState, useEffect } from 'react'
import MainLayout from '@/components/layout/MainLayout'
import Link from 'next/link'
import {
  ListChecksIcon, DollarSignIcon, BrushIcon, SendIcon,
  UsersIcon, BookOpenIcon, ArrowRightIcon, CheckCircleIcon,
  LoaderIcon, CircleDashedIcon, FileTextIcon
} from 'lucide-react'

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
    sky: 'from-sky-500 to-sky-600',
    green: 'from-emerald-500 to-emerald-600',
    amber: 'from-amber-500 to-amber-600',
    indigo: 'from-indigo-500 to-indigo-600',
    purple: 'from-purple-500 to-purple-600',
    teal: 'from-teal-500 to-teal-600',
  }[accentColor] || 'from-sky-500 to-sky-600';

  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 relative overflow-hidden group">
      {/* Accent color gradient line at top */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${accentClasses}`}></div>

      <div className="flex items-start">
        <div className={`flex-shrink-0 p-3 rounded-lg bg-gradient-to-br ${accentClasses} text-white shadow-md`}>
          {icon}
        </div>

        <h3 className="text-lg font-semibold text-gray-800 ml-4 mt-2">
          {title}
        </h3>
      </div>

      <div className="mt-4">{children}</div>

      {linkText && linkHref && (
        <Link
          href={linkHref}
          className={`mt-5 inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r ${accentClasses} rounded-lg shadow-sm hover:shadow transition-all duration-200`}
        >
          {linkText} <ArrowRightIcon className="ml-1 h-4 w-4" />
        </Link>
      )}
    </div>
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

  return (
    <MainLayout>
      <h2 className="text-3xl font-bold bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent mb-2">Dashboard Overview</h2>
      <p className="text-gray-500 mb-8">Welcome back! Here's an overview of your property selling journey.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <div
                  className="bg-gradient-to-r from-emerald-400 to-emerald-500 h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${sellingProgress.evaluation.progress}%` }}
                ></div>
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
                <div
                  className="bg-gradient-to-r from-amber-400 to-amber-500 h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${sellingProgress.preparation.progress}%` }}
                ></div>
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
                <div
                  className="bg-gray-300 h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${sellingProgress.listing.progress}%` }}
                ></div>
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
      </div>
    </MainLayout>
  )
}