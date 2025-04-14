'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { HomeIcon, ArrowRightIcon, CheckCircleIcon } from 'lucide-react'

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

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-sky-50 to-indigo-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-10 left-10 w-64 h-64 bg-sky-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="z-10 w-full max-w-md flex flex-col items-center justify-center text-center">
        <div className="bg-gradient-to-r from-sky-500 to-indigo-500 p-3 rounded-xl shadow-lg mb-4">
          <HomeIcon className="h-8 w-8 text-white" />
        </div>

        <h1 className="text-4xl font-bold bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent mb-2">
          HomeFlow
        </h1>
        <p className="text-lg text-gray-600 mb-8">Simplify Your Property Sale</p>

        <div className="w-full bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
          <div className="p-1 bg-gradient-to-r from-sky-500 to-indigo-500"></div>
          <div className="p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Welcome</h2>
            <p className="text-gray-600 mb-6">
              Your complete solution for selling property online.
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex items-center text-gray-700">
                <CheckCircleIcon className="h-5 w-5 text-emerald-500 mr-2" />
                <span>AI-powered property valuation</span>
              </div>
              <div className="flex items-center text-gray-700">
                <CheckCircleIcon className="h-5 w-5 text-emerald-500 mr-2" />
                <span>Automated listing creation</span>
              </div>
              <div className="flex items-center text-gray-700">
                <CheckCircleIcon className="h-5 w-5 text-emerald-500 mr-2" />
                <span>Integrated CRM for buyer management</span>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => router.push('/dashboard')}
                className="group relative bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-medium py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  Enter Dashboard <ArrowRightIcon className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-sky-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </button>
            </div>

            <div className="mt-6 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 text-sm font-medium">
                {countdown}
              </div>
              <p className="text-sm text-gray-500 ml-2">
                Redirecting to dashboard...
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}