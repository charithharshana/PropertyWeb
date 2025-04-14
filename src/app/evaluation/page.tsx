'use client'

import { useState } from 'react'
import MainLayout from '@/components/layout/MainLayout'
import { ArrowLeftIcon, ArrowRightIcon, CheckCircleIcon, HomeIcon } from 'lucide-react'

export default function PropertyEvaluation() {
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 5
  const [formData, setFormData] = useState({
    propertyType: 'Apartment',
    address: '',
    size: '',
    bedrooms: '',
    bathrooms: '',
    yearBuilt: '',
    condition: 'Average',
    features: [] as string[],
    hasBalcony: false
  })
  const [estimatedValue, setEstimatedValue] = useState<number | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    if (name === 'hasBalcony') {
      setFormData(prev => ({ ...prev, hasBalcony: checked }))
    } else {
      // Handle features array
      const featureName = name.replace('feature-', '')
      setFormData(prev => {
        const features = checked 
          ? [...prev.features, featureName]
          : prev.features.filter(f => f !== featureName)
        return { ...prev, features }
      })
    }
  }

  const navigateStep = (direction: number) => {
    const nextStep = currentStep + direction
    if (nextStep >= 1 && nextStep <= totalSteps) {
      setCurrentStep(nextStep)
    }
  }

  const calculateEstimate = () => {
    // Simple estimation logic (would be more complex in a real app)
    const size = parseFloat(formData.size) || 75
    const baseValue = size * 3000
    
    // Adjust based on condition
    let multiplier = 1
    if (formData.condition === 'Excellent') multiplier = 1.2
    else if (formData.condition === 'Good') multiplier = 1.05
    else if (formData.condition === 'Fair') multiplier = 0.85
    else if (formData.condition === 'Poor') multiplier = 0.7
    
    // Additional adjustments
    if (formData.hasBalcony) multiplier += 0.05
    if (formData.features.includes('Parking')) multiplier += 0.03
    if (formData.features.includes('Sauna')) multiplier += 0.04
    
    const estimate = Math.round((baseValue * multiplier) / 1000) * 1000
    setEstimatedValue(estimate)
    navigateStep(1) // Move to results step
  }

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Property Evaluation</h2>
        
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Step {currentStep} of {totalSteps}</span>
            <span className="text-sm font-medium text-sky-600">{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-sky-500 h-2 rounded-full" 
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>
        
        {/* Step 1: Property Basics */}
        {currentStep === 1 && (
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Property Basics</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
                <select 
                  id="propertyType" 
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-sky-500 focus:border-sky-500"
                >
                  <option>Apartment</option>
                  <option>House</option>
                  <option>Townhouse</option>
                  <option>Land</option>
                </select>
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input 
                  type="text" 
                  id="address" 
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-sky-500 focus:border-sky-500"
                  placeholder="Enter property address"
                />
              </div>
              <div>
                <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-1">Size (m²)</label>
                <input 
                  type="number" 
                  id="size" 
                  name="size"
                  value={formData.size}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-sky-500 focus:border-sky-500"
                  placeholder="Enter size in square meters"
                />
              </div>
            </div>
          </div>
        )}
        
        {/* Step 2: Rooms & Details */}
        {currentStep === 2 && (
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Rooms & Details</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
                  <input 
                    type="number" 
                    id="bedrooms" 
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-sky-500 focus:border-sky-500"
                    placeholder="Number of bedrooms"
                  />
                </div>
                <div>
                  <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700 mb-1">Bathrooms</label>
                  <input 
                    type="number" 
                    id="bathrooms" 
                    name="bathrooms"
                    value={formData.bathrooms}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-sky-500 focus:border-sky-500"
                    placeholder="Number of bathrooms"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="yearBuilt" className="block text-sm font-medium text-gray-700 mb-1">Year Built</label>
                <input 
                  type="number" 
                  id="yearBuilt" 
                  name="yearBuilt"
                  value={formData.yearBuilt}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-sky-500 focus:border-sky-500"
                  placeholder="Year of construction"
                />
              </div>
              <div>
                <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
                <select 
                  id="condition" 
                  name="condition"
                  value={formData.condition}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-sky-500 focus:border-sky-500"
                >
                  <option>Excellent</option>
                  <option>Good</option>
                  <option>Average</option>
                  <option>Fair</option>
                  <option>Poor</option>
                </select>
              </div>
            </div>
          </div>
        )}
        
        {/* Step 3: Features */}
        {currentStep === 3 && (
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Features & Amenities</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="hasBalcony" 
                  name="hasBalcony"
                  checked={formData.hasBalcony}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
                />
                <label htmlFor="hasBalcony" className="ml-2 block text-sm text-gray-700">Has Balcony</label>
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Additional Features</p>
                <div className="grid grid-cols-2 gap-2">
                  {['Parking', 'Sauna', 'Storage', 'Elevator', 'Garden', 'Security System'].map(feature => (
                    <div key={feature} className="flex items-center">
                      <input 
                        type="checkbox" 
                        id={`feature-${feature}`} 
                        name={`feature-${feature}`}
                        checked={formData.features.includes(feature)}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
                      />
                      <label htmlFor={`feature-${feature}`} className="ml-2 block text-sm text-gray-700">{feature}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Step 4: Confirmation */}
        {currentStep === 4 && (
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Confirm Details</h3>
            <p className="text-sm text-gray-600 mb-4">Please review the information below before getting your estimate.</p>
            
            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-gray-700">Property Type:</p>
                  <p className="text-gray-600">{formData.propertyType}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700">Size:</p>
                  <p className="text-gray-600">{formData.size} m²</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700">Bedrooms:</p>
                  <p className="text-gray-600">{formData.bedrooms || 'Not specified'}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700">Bathrooms:</p>
                  <p className="text-gray-600">{formData.bathrooms || 'Not specified'}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700">Year Built:</p>
                  <p className="text-gray-600">{formData.yearBuilt || 'Not specified'}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700">Condition:</p>
                  <p className="text-gray-600">{formData.condition}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700">Balcony:</p>
                  <p className="text-gray-600">{formData.hasBalcony ? 'Yes' : 'No'}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700">Features:</p>
                  <p className="text-gray-600">
                    {formData.features.length > 0 
                      ? formData.features.join(', ') 
                      : 'None selected'}
                  </p>
                </div>
              </div>
              
              <div className="pt-4">
                <p className="text-gray-600 italic">
                  Click "Get Estimate" to calculate the approximate value of your property based on the information provided.
                </p>
              </div>
            </div>
          </div>
        )}
        
        {/* Step 5: Results */}
        {currentStep === 5 && (
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <CheckCircleIcon className="h-8 w-8 text-green-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Evaluation Complete</h3>
            
            <div className="my-6 p-6 bg-sky-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Estimated Property Value</p>
              <p className="text-4xl font-bold text-sky-700">
                € {estimatedValue?.toLocaleString('de-DE')}*
              </p>
              <p className="text-xs text-gray-500 mt-2">*Based on provided information and market averages</p>
            </div>
            
            <div className="text-sm text-gray-600 mt-4 text-left">
              <p className="mb-2">This estimate is based on:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li>Property size and type</li>
                <li>Location and condition</li>
                <li>Features and amenities</li>
                <li>Current market trends</li>
              </ul>
              <p className="mt-4">For a more accurate valuation, we recommend consulting with a professional real estate agent or appraiser.</p>
            </div>
            
            <div className="mt-8">
              <button
                onClick={() => window.location.href = '/dashboard'}
                className="bg-sky-600 hover:bg-sky-700 text-white font-medium py-2 px-6 rounded-md transition duration-150 ease-in-out flex items-center mx-auto"
              >
                <HomeIcon className="mr-2 h-4 w-4" /> Return to Dashboard
              </button>
            </div>
          </div>
        )}
        
        {/* Navigation buttons */}
        <div className="mt-6 flex justify-between">
          {currentStep > 1 && (
            <button
              onClick={() => navigateStep(-1)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out flex items-center"
            >
              <ArrowLeftIcon className="mr-2 h-4 w-4" /> Previous
            </button>
          )}
          
          {currentStep < 4 && (
            <button
              onClick={() => navigateStep(1)}
              className="bg-sky-600 hover:bg-sky-700 text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out flex items-center ml-auto"
            >
              Next <ArrowRightIcon className="ml-2 h-4 w-4" />
            </button>
          )}
          
          {currentStep === 4 && (
            <button
              onClick={calculateEstimate}
              className="bg-sky-600 hover:bg-sky-700 text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out flex items-center ml-auto"
            >
              Get Estimate <ArrowRightIcon className="ml-2 h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </MainLayout>
  )
}
