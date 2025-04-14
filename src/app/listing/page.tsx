'use client'

import { useState } from 'react'
import MainLayout from '@/components/layout/MainLayout'
import { ImageIcon, SendIcon, CheckCircleIcon, AlertCircleIcon, Loader2Icon } from 'lucide-react'

export default function Listing() {
  const [isPublishing, setIsPublishing] = useState(false)
  const [publishStatus, setPublishStatus] = useState({
    city23: 'pending',
    kv: 'pending',
    olx: 'pending'
  })
  
  // Mock property data (would come from database in real app)
  const property = {
    address: '123 Main Street, Tallinn',
    type: 'Apartment',
    size: 75,
    bedrooms: 2,
    bathrooms: 1,
    price: 255000,
    description: 'Discover this wonderful property! Key features include: sunny, renovated kitchen, close to transport, quiet street. Located in a desirable area, this property offers tremendous value. Enjoy bright, sunlit rooms throughout the day. The property benefits from recent renovations, offering modern comforts. Located on a peaceful street, ensuring a tranquil living environment. Don\'t miss this opportunity to own such a charming property. Contact us today to schedule a viewing of this exceptional home.',
    photos: [
      { id: 'photo1', url: 'https://placehold.co/600x400/e6f7ff/0369a1?text=Living+Room', caption: 'Living Room' },
      { id: 'photo2', url: 'https://placehold.co/600x400/e6f7ff/0369a1?text=Kitchen', caption: 'Kitchen' },
      { id: 'photo3', url: 'https://placehold.co/600x400/e6f7ff/0369a1?text=Bedroom', caption: 'Bedroom' },
      { id: 'photo4', url: 'https://placehold.co/600x400/e6f7ff/0369a1?text=Bathroom', caption: 'Bathroom' },
    ]
  }
  
  const handlePublish = () => {
    setIsPublishing(true)
    
    // Simulate publishing process
    setTimeout(() => {
      setPublishStatus({
        city23: 'success',
        kv: 'success',
        olx: 'success'
      })
      setIsPublishing(false)
    }, 3000)
  }
  
  const getStatusIcon = (status: string) => {
    if (status === 'success') return <CheckCircleIcon className="h-5 w-5 text-green-500" />
    if (status === 'error') return <AlertCircleIcon className="h-5 w-5 text-red-500" />
    if (status === 'pending') return <div className="h-5 w-5 rounded-full border-2 border-gray-300"></div>
    return null
  }
  
  const allPublished = Object.values(publishStatus).every(status => status === 'success')
  
  return (
    <MainLayout>
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Listing & Publish</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Property details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Property summary */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Property Summary</h3>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Address</p>
                <p className="text-gray-800">{property.address}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Type</p>
                <p className="text-gray-800">{property.type}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Size</p>
                <p className="text-gray-800">{property.size} m²</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Rooms</p>
                <p className="text-gray-800">{property.bedrooms} bedrooms, {property.bathrooms} bathroom</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Price</p>
                <p className="text-gray-800 font-semibold">€ {property.price.toLocaleString('de-DE')}</p>
              </div>
            </div>
            
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Description</p>
              <p className="text-gray-800 text-sm">{property.description}</p>
            </div>
          </div>
          
          {/* Photos */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-700">Photos</h3>
              <button className="text-sky-600 hover:text-sky-800 text-sm font-medium flex items-center">
                <ImageIcon className="h-4 w-4 mr-1" /> Manage Photos
              </button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {property.photos.map(photo => (
                <div key={photo.id} className="relative group">
                  <img 
                    src={photo.url} 
                    alt={photo.caption} 
                    className="w-full h-32 object-cover rounded-md"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 rounded-md"></div>
                  <p className="text-xs text-center mt-1 text-gray-600">{photo.caption}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Right column - Publishing */}
        <div className="space-y-6">
          {/* Publish panel */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
              <SendIcon className="mr-2 text-sky-500" /> Publish Listing
            </h3>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">
                Your listing will be published to the following platforms:
              </p>
              
              <div className="space-y-3 mt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-blue-600 font-semibold text-xs">C23</span>
                    </div>
                    <span className="text-gray-700">City23.ee</span>
                  </div>
                  {getStatusIcon(publishStatus.city23)}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-green-600 font-semibold text-xs">KV</span>
                    </div>
                    <span className="text-gray-700">KV.ee</span>
                  </div>
                  {getStatusIcon(publishStatus.kv)}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-purple-600 font-semibold text-xs">OLX</span>
                    </div>
                    <span className="text-gray-700">OLX.ua</span>
                  </div>
                  {getStatusIcon(publishStatus.olx)}
                </div>
              </div>
            </div>
            
            <button
              onClick={handlePublish}
              disabled={isPublishing || allPublished}
              className={`w-full py-2 px-4 rounded-md font-medium text-white flex items-center justify-center ${
                isPublishing 
                  ? 'bg-yellow-500 cursor-wait' 
                  : allPublished
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-sky-600 hover:bg-sky-700'
              }`}
            >
              {isPublishing ? (
                <>
                  <Loader2Icon className="animate-spin mr-2 h-4 w-4" /> Publishing...
                </>
              ) : allPublished ? (
                <>
                  <CheckCircleIcon className="mr-2 h-4 w-4" /> Published Successfully
                </>
              ) : (
                <>
                  <SendIcon className="mr-2 h-4 w-4" /> Publish Listing
                </>
              )}
            </button>
            
            {allPublished && (
              <div className="mt-4 p-3 bg-green-50 rounded-md text-sm text-green-700">
                Your listing has been successfully published to all platforms. You can now manage inquiries in the CRM section.
              </div>
            )}
          </div>
          
          {/* Tips panel */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Publishing Tips</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Ensure all property details are accurate</li>
              <li>• Include high-quality photos from multiple angles</li>
              <li>• Set a competitive price based on market research</li>
              <li>• Highlight unique selling points in your description</li>
              <li>• Be responsive to inquiries once published</li>
            </ul>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
