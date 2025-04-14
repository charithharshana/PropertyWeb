'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  HomeIcon, DollarSignIcon, SettingsIcon, BrushIcon, SendIcon,
  FileTextIcon, PackageCheckIcon, UsersIcon, BookOpenIcon,
  LayoutDashboardIcon, LogOutIcon, ChevronRightIcon
} from 'lucide-react'

// Interface for the sidebar link items
interface SidebarLinkProps {
  href: string
  label: string
  icon: React.ReactNode
  active?: boolean
  onClick?: () => void
}

// Individual sidebar link component
const SidebarLink: React.FC<SidebarLinkProps> = ({
  href, label, icon, active, onClick
}) => {
  return (
    <Link href={href}
      className={`group flex items-center px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-sky-50 hover:to-indigo-50 rounded-lg transition-all duration-200 ${active ? 'bg-gradient-to-r from-sky-100 to-indigo-100 text-sky-700 font-medium shadow-sm' : ''}`}
      onClick={onClick}>
      <span className={`flex items-center justify-center w-8 h-8 mr-3 rounded-lg ${active ? 'bg-white text-sky-600 shadow-sm' : 'text-gray-500 group-hover:text-sky-600'}`}>
        {icon}
      </span>
      <span>{label}</span>
      {active && <ChevronRightIcon className="ml-auto h-4 w-4 text-sky-600" />}
    </Link>
  )
}

// Main Sidebar component
export default function Sidebar() {
  const pathname = usePathname()
  const [activePath, setActivePath] = useState<string>('')

  // Update active path when pathname changes
  useEffect(() => {
    if (pathname) {
      // Extract the first segment of the path
      const mainPath = '/' + pathname.split('/')[1]
      setActivePath(mainPath)
    }
  }, [pathname])

  // Define sidebar navigation links
  const navigationLinks = [
    { href: '/dashboard', label: 'Dashboard', icon: <LayoutDashboardIcon className="h-5 w-5" /> },
    { href: '/evaluation', label: 'Evaluation', icon: <DollarSignIcon className="h-5 w-5" /> },
    { href: '/initial-setup', label: 'How it Works', icon: <SettingsIcon className="h-5 w-5" /> },
    { href: '/property-preparation', label: 'Preparation', icon: <BrushIcon className="h-5 w-5" /> },
    { href: '/listing', label: 'Listing & Publish', icon: <SendIcon className="h-5 w-5" /> },
    { href: '/notary', label: 'Notary Info', icon: <FileTextIcon className="h-5 w-5" /> },
    { href: '/after-sale', label: 'After Sale', icon: <PackageCheckIcon className="h-5 w-5" /> },
    { href: '/crm', label: 'CRM', icon: <UsersIcon className="h-5 w-5" /> },
    { href: '/knowledge-base', label: 'Knowledge Base', icon: <BookOpenIcon className="h-5 w-5" /> },
  ]

  // Handle logout (placeholder function)
  const handleLogout = () => {
    // TODO: Implement actual logout functionality
    console.log('Logout clicked')
  }

  return (
    <aside className="w-72 bg-white shadow-lg overflow-y-auto flex flex-col h-screen border-r border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center space-x-2">
          <div className="bg-gradient-to-r from-sky-500 to-indigo-500 p-2 rounded-lg shadow-md">
            <HomeIcon className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent">
              HomeFlow
            </h1>
            <p className="text-sm text-gray-500">Simplify Your Sale</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        <div className="mb-4 px-4">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Main Menu</p>
        </div>
        {navigationLinks.map((link) => (
          <SidebarLink
            key={link.href}
            href={link.href}
            label={link.label}
            icon={link.icon}
            active={activePath === link.href}
          />
        ))}
      </nav>

      <div className="p-4 m-4 border border-gray-100 rounded-xl bg-gradient-to-r from-sky-50 to-indigo-50">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white rounded-lg shadow-sm">
            <UsersIcon className="h-5 w-5 text-sky-600" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-800">Need Help?</h3>
            <p className="text-xs text-gray-500">Contact our support team</p>
          </div>
        </div>
        <button className="mt-3 w-full bg-white text-sky-600 hover:text-sky-700 font-medium py-2 px-4 rounded-lg shadow-sm hover:shadow transition-all duration-200 text-sm">
          Get Support
        </button>
      </div>

      <div className="p-4 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
        >
          <LogOutIcon className="mr-2 h-4 w-4" /> Logout
        </button>
      </div>
    </aside>
  )
}