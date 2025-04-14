'use client'

import MainLayout from '@/components/layout/MainLayout'
import { 
  LayoutDashboardIcon, DollarSignIcon, BrushIcon, SendIcon, 
  FileTextIcon, PackageCheckIcon, UsersIcon, ArrowRightIcon 
} from 'lucide-react'
import Link from 'next/link'

export default function InitialSetup() {
  return (
    <MainLayout>
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">How HomeFlow Works</h2>
      
      <div className="bg-white p-8 rounded-lg shadow-md mb-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Your Property Selling Journey</h3>
        <p className="text-gray-600 mb-6">
          HomeFlow guides you through the entire process of selling your property online, from evaluation to after-sale support.
          Our platform simplifies each step, providing you with the tools and knowledge needed for a successful sale.
        </p>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-sky-100 z-0"></div>
          
          {/* Timeline steps */}
          <div className="space-y-8 relative z-10">
            {/* Step 1 */}
            <div className="flex">
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-sky-500 flex items-center justify-center text-white font-bold text-xl">
                1
              </div>
              <div className="ml-6">
                <h4 className="text-lg font-medium text-gray-800 flex items-center">
                  <LayoutDashboardIcon className="mr-2 text-sky-500" /> Dashboard Overview
                </h4>
                <p className="text-gray-600 mt-1">
                  Your central hub for monitoring progress, accessing tools, and tracking buyer inquiries.
                </p>
                <Link href="/dashboard" className="inline-flex items-center text-sky-600 hover:text-sky-800 mt-2 text-sm font-medium">
                  Go to Dashboard <ArrowRightIcon className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="flex">
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-sky-500 flex items-center justify-center text-white font-bold text-xl">
                2
              </div>
              <div className="ml-6">
                <h4 className="text-lg font-medium text-gray-800 flex items-center">
                  <DollarSignIcon className="mr-2 text-sky-500" /> Property Evaluation
                </h4>
                <p className="text-gray-600 mt-1">
                  Complete a detailed questionnaire to receive an estimated property value based on market data.
                </p>
                <Link href="/evaluation" className="inline-flex items-center text-sky-600 hover:text-sky-800 mt-2 text-sm font-medium">
                  Start Evaluation <ArrowRightIcon className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="flex">
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-sky-500 flex items-center justify-center text-white font-bold text-xl">
                3
              </div>
              <div className="ml-6">
                <h4 className="text-lg font-medium text-gray-800 flex items-center">
                  <BrushIcon className="mr-2 text-sky-500" /> Property Preparation
                </h4>
                <p className="text-gray-600 mt-1">
                  Create compelling ad text with AI assistance, upload high-quality photos, and follow our staging checklist.
                </p>
                <Link href="/property-preparation" className="inline-flex items-center text-sky-600 hover:text-sky-800 mt-2 text-sm font-medium">
                  Prepare Property <ArrowRightIcon className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
            
            {/* Step 4 */}
            <div className="flex">
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-sky-500 flex items-center justify-center text-white font-bold text-xl">
                4
              </div>
              <div className="ml-6">
                <h4 className="text-lg font-medium text-gray-800 flex items-center">
                  <SendIcon className="mr-2 text-sky-500" /> Listing & Publishing
                </h4>
                <p className="text-gray-600 mt-1">
                  Review your property details and publish your listing to multiple platforms with a single click.
                </p>
                <Link href="/listing" className="inline-flex items-center text-sky-600 hover:text-sky-800 mt-2 text-sm font-medium">
                  Manage Listing <ArrowRightIcon className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
            
            {/* Step 5 */}
            <div className="flex">
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-sky-500 flex items-center justify-center text-white font-bold text-xl">
                5
              </div>
              <div className="ml-6">
                <h4 className="text-lg font-medium text-gray-800 flex items-center">
                  <UsersIcon className="mr-2 text-sky-500" /> Buyer Management (CRM)
                </h4>
                <p className="text-gray-600 mt-1">
                  Track and manage inquiries from potential buyers, schedule viewings, and follow up on leads.
                </p>
                <Link href="/crm" className="inline-flex items-center text-sky-600 hover:text-sky-800 mt-2 text-sm font-medium">
                  Open CRM <ArrowRightIcon className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
            
            {/* Step 6 */}
            <div className="flex">
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-sky-500 flex items-center justify-center text-white font-bold text-xl">
                6
              </div>
              <div className="ml-6">
                <h4 className="text-lg font-medium text-gray-800 flex items-center">
                  <FileTextIcon className="mr-2 text-sky-500" /> Notary Process
                </h4>
                <p className="text-gray-600 mt-1">
                  Access comprehensive information about the notary process in Estonia, required documents, and fees.
                </p>
                <Link href="/notary" className="inline-flex items-center text-sky-600 hover:text-sky-800 mt-2 text-sm font-medium">
                  Notary Information <ArrowRightIcon className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
            
            {/* Step 7 */}
            <div className="flex">
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-sky-500 flex items-center justify-center text-white font-bold text-xl">
                7
              </div>
              <div className="ml-6">
                <h4 className="text-lg font-medium text-gray-800 flex items-center">
                  <PackageCheckIcon className="mr-2 text-sky-500" /> After Sale Support
                </h4>
                <p className="text-gray-600 mt-1">
                  Get guidance on moving out, legal requirements after selling, and finding your next home.
                </p>
                <Link href="/after-sale" className="inline-flex items-center text-sky-600 hover:text-sky-800 mt-2 text-sm font-medium">
                  After Sale Guide <ArrowRightIcon className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Benefits of Using HomeFlow</h3>
          <ul className="space-y-2">
            <li className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-xs mt-0.5 mr-2">✓</div>
              <span className="text-gray-600">Save money by selling without traditional agent commissions</span>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-xs mt-0.5 mr-2">✓</div>
              <span className="text-gray-600">AI-powered tools to create professional listings</span>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-xs mt-0.5 mr-2">✓</div>
              <span className="text-gray-600">Publish to multiple platforms with a single click</span>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-xs mt-0.5 mr-2">✓</div>
              <span className="text-gray-600">Comprehensive guides for every step of the process</span>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-xs mt-0.5 mr-2">✓</div>
              <span className="text-gray-600">Integrated CRM to manage buyer inquiries efficiently</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Getting Started</h3>
          <p className="text-gray-600 mb-4">
            To begin your property selling journey with HomeFlow, follow these simple steps:
          </p>
          <ol className="space-y-2 list-decimal list-inside text-gray-600">
            <li>Complete the property evaluation to get an estimated value</li>
            <li>Gather information about your property (measurements, features, etc.)</li>
            <li>Take high-quality photos or arrange for professional photography</li>
            <li>Use our AI tool to generate compelling ad text</li>
            <li>Review and publish your listing</li>
          </ol>
          <div className="mt-4">
            <Link 
              href="/evaluation" 
              className="bg-sky-600 hover:bg-sky-700 text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out inline-block"
            >
              Start Your Journey
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
