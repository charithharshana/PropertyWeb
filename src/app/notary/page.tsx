'use client'

import MainLayout from '@/components/layout/MainLayout'
import { ScaleIcon, FileTextIcon, CalendarIcon, InfoIcon, DownloadIcon } from 'lucide-react'

export default function NotaryInfo() {
  return (
    <MainLayout>
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Notary Information & Services (Estonia)</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* The Role of a Notary */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
            <ScaleIcon className="mr-2 text-indigo-500" /> The Role of a Notary in Estonia
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            In Estonia, a notary plays a crucial, impartial role in property transactions. Their key responsibilities include:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
            <li>Verifying the identities of the buyer and seller.</li>
            <li>Confirming there are no legal obstacles to the transaction.</li>
            <li>Drafting and certifying the sales contract.</li>
            <li>Explaining the legal implications to both parties.</li>
            <li>Handling the secure transfer of funds (via notary&apos;s deposit account).</li>
            <li>Submitting the necessary documentation to the Land Register.</li>
          </ul>
          <div className="mt-6 p-4 bg-indigo-50 rounded-md">
            <p className="text-sm text-indigo-700">
              <InfoIcon className="inline-block mr-1 h-4 w-4" />
              In Estonia, using a notary for property transactions is not just recommended—it&apos;s legally required.
            </p>
          </div>
        </div>

        {/* Required Documents */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
            <FileTextIcon className="mr-2 text-amber-500" /> Required Documents
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Before the notary appointment, ensure you have the following documents:
          </p>
          <div className="space-y-3">
            <div className="flex items-start">
              <div className="h-5 w-5 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 font-bold text-xs mt-0.5 mr-2">1</div>
              <div>
                <p className="font-medium text-gray-700">Identification</p>
                <p className="text-sm text-gray-600">Valid passport or ID card for all parties involved.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="h-5 w-5 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 font-bold text-xs mt-0.5 mr-2">2</div>
              <div>
                <p className="font-medium text-gray-700">Property Documents</p>
                <p className="text-sm text-gray-600">Land register extract, floor plan, energy certificate.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="h-5 w-5 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 font-bold text-xs mt-0.5 mr-2">3</div>
              <div>
                <p className="font-medium text-gray-700">Mortgage Information</p>
                <p className="text-sm text-gray-600">Details of any existing mortgages or liens on the property.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="h-5 w-5 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 font-bold text-xs mt-0.5 mr-2">4</div>
              <div>
                <p className="font-medium text-gray-700">Marriage Certificate</p>
                <p className="text-sm text-gray-600">If applicable, to confirm marital property status.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="h-5 w-5 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 font-bold text-xs mt-0.5 mr-2">5</div>
              <div>
                <p className="font-medium text-gray-700">Power of Attorney</p>
                <p className="text-sm text-gray-600">If someone is representing you (must be notarized).</p>
              </div>
            </div>
          </div>
        </div>

        {/* Notary Fees */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
            <ScaleIcon className="mr-2 text-green-500" /> Notary Fees & Costs
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Notary fees in Estonia are standardized and based on the transaction value. Typical costs include:
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left text-gray-700">Service</th>
                  <th className="px-4 py-2 text-right text-gray-700">Approximate Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-2 text-gray-700">Notary Fee</td>
                  <td className="px-4 py-2 text-right text-gray-700">0.2-0.4% of property value</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-gray-700">State Fee (Land Register)</td>
                  <td className="px-4 py-2 text-right text-gray-700">0.1% of property value</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-gray-700">VAT (on notary services)</td>
                  <td className="px-4 py-2 text-right text-gray-700">20%</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-gray-700">Translation (if needed)</td>
                  <td className="px-4 py-2 text-right text-gray-700">€30-50 per page</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            <p>For a €250,000 property, total notary and state fees typically range from €1,000-1,500.</p>
          </div>
          <div className="mt-4">
            <a href="#" className="text-green-600 hover:text-green-800 text-sm font-medium flex items-center">
              <DownloadIcon className="mr-1 h-4 w-4" /> Download Fee Calculator
            </a>
          </div>
        </div>

        {/* Finding a Notary */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
            <CalendarIcon className="mr-2 text-blue-500" /> Finding & Booking a Notary
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            How to find and book a notary for your property transaction:
          </p>
          <ol className="space-y-3 text-sm text-gray-700">
            <li className="flex items-start">
              <span className="font-bold mr-2">1.</span>
              <span>Search the <a href="https://www.notar.ee/en/notaries" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Estonian Chamber of Notaries website</a> for notaries in your area.</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">2.</span>
              <span>Contact several notaries to check availability and compare service levels.</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">3.</span>
              <span>Book an appointment at least 1-2 weeks in advance (longer during busy periods).</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">4.</span>
              <span>Send required documents to the notary office before the appointment.</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">5.</span>
              <span>Confirm the appointment and required attendees a few days before.</span>
            </li>
          </ol>
          <div className="mt-6 p-4 bg-blue-50 rounded-md">
            <p className="text-sm text-blue-700">
              <InfoIcon className="inline-block mr-1 h-4 w-4" />
              Many notaries in Estonia offer services in Estonian, English, and Russian. Specify your language preference when booking.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-8 bg-white p-8 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-700 mb-6">Frequently Asked Questions</h3>

        <div className="space-y-6">
          <div>
            <h4 className="font-medium text-gray-800 mb-2">Do I need to attend the notary appointment in person?</h4>
            <p className="text-sm text-gray-600">
              Generally, yes. Both buyer and seller should attend in person. If this is not possible, you can authorize someone with a notarized power of attorney to represent you.
            </p>
          </div>

          <div>
            <h4 className="font-medium text-gray-800 mb-2">How long does the notary appointment take?</h4>
            <p className="text-sm text-gray-600">
              Typically 1-2 hours. The notary will explain all documents, answer questions, and ensure both parties understand the agreement before signing.
            </p>
          </div>

          <div>
            <h4 className="font-medium text-gray-800 mb-2">When do I need to pay the notary fees?</h4>
            <p className="text-sm text-gray-600">
              Notary fees are usually paid at the end of the appointment. Most notaries accept bank transfers and card payments.
            </p>
          </div>

          <div>
            <h4 className="font-medium text-gray-800 mb-2">How long after the notary appointment will the property be registered to the new owner?</h4>
            <p className="text-sm text-gray-600">
              The notary submits the documents to the Land Register, and registration typically takes 5-10 business days.
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
