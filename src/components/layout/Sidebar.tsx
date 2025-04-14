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

// Interface for the Sidebar component
interface SidebarProps {
  onLinkClick?: () => void
}

// Individual sidebar link component
const SidebarLink: React.FC<SidebarLinkProps> = ({
  href, label, icon, active, onClick
}) => {
  return (
    <Link href={href}
      className={`group flex items-center px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50 rounded-lg transition-all duration-300 ${active ? 'bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-700 font-medium shadow-sm' : ''}`}
      onClick={onClick}>
      <span className={`flex items-center justify-center w-8 h-8 mr-3 rounded-lg transition-all duration-300 ${active ? 'bg-white text-primary-600 shadow-sm animate-bounce-light' : 'text-gray-500 group-hover:text-primary-600'}`}>
        {icon}
      </span>
      <span className="transition-all duration-300">{label}</span>
      {active && (
        <span className="ml-auto">
          <ChevronRightIcon className="h-4 w-4 text-primary-600 animate-pulse-light" />
        </span>
      )}
    </Link>
  )
}

// Main Sidebar component
export default function Sidebar({ onLinkClick }: SidebarProps) {
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

  // Handle link click with optional callback
  const handleLinkClick = () => {
    if (onLinkClick) {
      onLinkClick()
    }
  }

  return (
    <aside className="w-72 bg-white shadow-lg overflow-y-auto flex flex-col h-screen border-r border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center space-x-2">
          <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
            <HomeIcon className="h-6 w-6 text-white animate-spin-slow" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent hover:from-primary-500 hover:to-accent-500 transition-all duration-500">
              HomeFlow
            </h1>
            <p className="text-sm text-gray-500 animate-pulse-light">Simplify Your Sale</p>
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
            onClick={handleLinkClick}
          />
        ))}
      </nav>

      <div className="p-4 m-4 border border-gray-100 rounded-xl bg-gradient-to-r from-primary-50 to-secondary-50 hover:from-primary-100 hover:to-accent-100 transition-all duration-500 shadow-md hover:shadow-lg">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white rounded-lg shadow-sm animate-bounce-light">
            <UsersIcon className="h-5 w-5 text-primary-600" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-800">Need Help?</h3>
            <p className="text-xs text-gray-500">Contact our support team</p>
          </div>
        </div>
        <button className="mt-3 w-full bg-white text-primary-600 hover:text-primary-700 font-medium py-2 px-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 text-sm hover:scale-105 transform">
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