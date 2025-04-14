'use client'

import { useState } from 'react'
import MainLayout from '@/components/layout/MainLayout'
import { MoveIcon, HomeIcon, FileTextIcon, BellIcon, CheckSquareIcon } from 'lucide-react'

export default function AfterSale() {
  const [moveOutChecklist, setMoveOutChecklist] = useState({
    'utilities': false,
    'address-change': false,
    'packing': false,
    'cleaning': false,
    'keys': false,
    'documents': false,
    'inspection': false,
    'neighbors': false
  })

  const [legalChecklist, setLegalChecklist] = useState({
    'tax-declaration': false,
    'mortgage-closure': false,
    'insurance-cancel': false,
    'utility-contracts': false,
    'property-tax': false
  })

  const handleMoveOutChange = (id: string) => {
    setMoveOutChecklist(prev => ({
      ...prev,
      [id]: !prev[id as keyof typeof prev]
    }))
  }

  const handleLegalChange = (id: string) => {
    setLegalChecklist(prev => ({
      ...prev,
      [id]: !prev[id as keyof typeof prev]
    }))
  }

  const moveOutProgress = Object.values(moveOutChecklist).filter(Boolean).length / Object.values(moveOutChecklist).length * 100
  const legalProgress = Object.values(legalChecklist).filter(Boolean).length / Object.values(legalChecklist).length * 100

  return (
    <MainLayout>
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">After Sale Guidance</h2>

      <div className="bg-white p-8 rounded-lg shadow-md space-y-8">
        {/* Moving Out Tips */}
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
            <MoveIcon className="mr-2 text-blue-500" /> Moving Out Tips
          </h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
            <li>Plan your move well in advance. Book movers or arrange transport.</li>
            <li>Start packing non-essential items early. Label boxes clearly.</li>
            <li>Notify relevant parties of your change of address (banks, subscriptions, government agencies).</li>
            <li>Arrange for final meter readings for utilities (electricity, water, gas).</li>
            <li>Clean the property thoroughly before handing it over.</li>
            <li>Take photos of the empty property as documentation.</li>
            <li>Prepare all keys, access cards, and remote controls for handover.</li>
          </ul>
        </div>

        {/* Moving Out Checklist */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
            <CheckSquareIcon className="mr-2 text-blue-500" /> Moving Out Checklist
          </h3>

          <div className="mb-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-gray-600">Progress</span>
              <span className="text-sm font-medium text-blue-600">{Math.round(moveOutProgress)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${moveOutProgress}%` }}
              ></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { id: 'utilities', label: 'Arrange final utility readings and close accounts' },
              { id: 'address-change', label: 'Submit change of address notifications' },
              { id: 'packing', label: 'Pack and label all belongings' },
              { id: 'cleaning', label: 'Clean property thoroughly' },
              { id: 'keys', label: 'Prepare all keys and access devices for handover' },
              { id: 'documents', label: 'Gather all property-related documents' },
              { id: 'inspection', label: 'Conduct final walkthrough with buyer' },
              { id: 'neighbors', label: 'Notify neighbors and collect contact information' }
            ].map(item => (
              <div key={item.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`move-${item.id}`}
                  checked={moveOutChecklist[item.id as keyof typeof moveOutChecklist]}
                  onChange={() => handleMoveOutChange(item.id)}
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor={`move-${item.id}`} className="ml-3 text-sm text-gray-700">{item.label}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Legal & Financial Matters */}
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
            <FileTextIcon className="mr-2 text-purple-500" /> Legal & Financial Matters
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            After selling your property, there are several legal and financial matters to address:
          </p>

          <div className="mb-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-gray-600">Progress</span>
              <span className="text-sm font-medium text-purple-600">{Math.round(legalProgress)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-500 h-2 rounded-full"
                style={{ width: `${legalProgress}%` }}
              ></div>
            </div>
          </div>

          <div className="space-y-3">
            {[
              { id: 'tax-declaration', label: 'File income tax declaration for property sale' },
              { id: 'mortgage-closure', label: 'Ensure mortgage is properly closed and documented' },
              { id: 'insurance-cancel', label: 'Cancel property insurance policies' },
              { id: 'utility-contracts', label: 'Terminate all utility contracts' },
              { id: 'property-tax', label: 'Settle any outstanding property taxes' }
            ].map(item => (
              <div key={item.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`legal-${item.id}`}
                  checked={legalChecklist[item.id as keyof typeof legalChecklist]}
                  onChange={() => handleLegalChange(item.id)}
                  className="h-5 w-5 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <label htmlFor={`legal-${item.id}`} className="ml-3 text-sm text-gray-700">{item.label}</label>
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 bg-purple-50 rounded-md">
            <p className="text-sm text-purple-700 flex items-start">
              <BellIcon className="h-5 w-5 mr-2 flex-shrink-0" />
              <span>
                <strong>Tax Reminder:</strong> In Estonia, you may be exempt from income tax on the sale of your primary residence if you lived there for at least 2 years. Consult with a tax advisor for your specific situation.
              </span>
            </p>
          </div>
        </div>

        {/* Finding Your Next Home */}
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
            <HomeIcon className="mr-2 text-green-500" /> Finding Your Next Home
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            If you&apos;re looking for a new property, consider these tips:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
            <li>Start your search early, ideally before completing your sale.</li>
            <li>Get pre-approved for financing if you need a mortgage.</li>
            <li>Make a list of must-have features for your new home.</li>
            <li>Research neighborhoods thoroughly, including schools, transport, and amenities.</li>
            <li>Consider temporary accommodation if there&apos;s a gap between selling and buying.</li>
            <li>Budget for all moving and setup costs for your new home.</li>
          </ul>
          <div className="mt-4">
            <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out flex items-center text-sm">
              <HomeIcon className="mr-2 h-4 w-4" /> Browse Properties
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
