'use client'

import { useState } from 'react'
import MainLayout from '@/components/layout/MainLayout'
import { motion } from 'framer-motion'
import { BrushIcon, FileTextIcon, ImageIcon, CheckSquareIcon, Loader2Icon } from 'lucide-react'
import { generateAdText } from '@/lib/openai'
import { AnimatedSection, AnimatedCard, AnimatedButton, AnimatedList } from '@/components/animations'

export default function PropertyPreparation() {
  const [activeTab, setActiveTab] = useState('ad-text')
  const [adHighlights, setAdHighlights] = useState('')
  const [generatedText, setGeneratedText] = useState('')
  const [editedText, setEditedText] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  // Staging checklist state
  const [checklist, setChecklist] = useState({
    'clean-surfaces': false,
    'declutter': false,
    'lighting': false,
    'personal-items': false,
    'repairs': false,
    'neutral-decor': false,
    'furniture-arrangement': false,
    'curb-appeal': false
  })

  const handleChecklistChange = (id: string) => {
    setChecklist(prev => ({
      ...prev,
      [id]: !prev[id as keyof typeof prev]
    }))
  }

  const handleGenerateText = async () => {
    if (!adHighlights.trim()) return

    setIsGenerating(true)
    try {
      // Call the OpenAI integration
      const text = await generateAdText(adHighlights)
      setGeneratedText(text)
      setEditedText(text) // Initialize edited text with generated text
    } catch (error) {
      console.error('Error generating ad text:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const checklistProgress = Object.values(checklist).filter(Boolean).length / Object.values(checklist).length * 100

  // Animation variants
  const tabVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    active: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
      borderBottom: '2px solid #0ea5e9',
      color: '#0284c7'
    }
  }

  const contentVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
  }

  return (
    <MainLayout>
      <AnimatedSection animation="fadeIn">
        <h2 className="text-3xl font-semibold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-6">Property Preparation</h2>
      </AnimatedSection>

      {/* Tabs */}
      <motion.div className="flex border-b border-gray-200 mb-6" initial="hidden" animate="visible" variants={contentVariants}>
        <motion.button
          onClick={() => setActiveTab('ad-text')}
          className={`py-3 px-6 font-medium text-sm focus:outline-none ${
            activeTab === 'ad-text'
              ? 'text-primary-600 border-b-2 border-primary-500'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          variants={tabVariants}
          animate={activeTab === 'ad-text' ? 'active' : 'visible'}
          whileHover={{ y: -2 }}
          whileTap={{ y: 0 }}
        >
          <FileTextIcon className="inline-block mr-2 h-4 w-4" /> Ad Text
        </motion.button>
        <motion.button
          onClick={() => setActiveTab('photos')}
          className={`py-3 px-6 font-medium text-sm focus:outline-none ${
            activeTab === 'photos'
              ? 'text-primary-600 border-b-2 border-primary-500'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          variants={tabVariants}
          animate={activeTab === 'photos' ? 'active' : 'visible'}
          whileHover={{ y: -2 }}
          whileTap={{ y: 0 }}
        >
          <ImageIcon className="inline-block mr-2 h-4 w-4" /> Photos
        </motion.button>
        <motion.button
          onClick={() => setActiveTab('staging')}
          className={`py-3 px-6 font-medium text-sm focus:outline-none ${
            activeTab === 'staging'
              ? 'text-primary-600 border-b-2 border-primary-500'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          variants={tabVariants}
          animate={activeTab === 'staging' ? 'active' : 'visible'}
          whileHover={{ y: -2 }}
          whileTap={{ y: 0 }}
        >
          <BrushIcon className="inline-block mr-2 h-4 w-4" /> Staging Checklist
        </motion.button>
      </div>

      {/* Ad Text Tab */}
      {activeTab === 'ad-text' && (
        <AnimatedCard delay={0.2}>
          <motion.div
            className="p-8"
            initial="hidden"
            animate="visible"
            variants={contentVariants}
          >
            <motion.h3
              className="text-xl font-semibold text-gray-700 mb-4 flex items-center"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <FileTextIcon className="mr-2 text-primary-500 animate-pulse-light" /> Ad Text Generation (AI Assisted)
            </motion.h3>
            <motion.p
              className="text-sm text-gray-600 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Provide some key highlights, and our AI will help craft a compelling description. You can then review and edit.
            </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="ad-highlights" className="block text-sm font-medium text-gray-700 mb-1">
                Key Highlights (Keywords)
              </label>
              <textarea
                id="ad-highlights"
                value={adHighlights}
                onChange={(e) => setAdHighlights(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-sky-500 focus:border-sky-500 h-40"
                placeholder="Enter keywords or highlights about your property (e.g., sunny, renovated kitchen, close to transport, quiet street)"
              ></textarea>
              <AnimatedButton
                onClick={handleGenerateText}
                disabled={isGenerating || !adHighlights.trim()}
                variant={isGenerating || !adHighlights.trim() ? 'ghost' : 'primary'}
                className={`mt-2 ${
                  isGenerating || !adHighlights.trim()
                    ? 'bg-gray-300 cursor-not-allowed'
                    : ''
                } text-white font-medium py-2 px-4 rounded-md flex items-center`}
              >
                {isGenerating ? (
                  <>
                    <Loader2Icon className="mr-2 h-4 w-4 animate-spin" /> Generating...
                  </>
                ) : (
                  'Generate Ad Text'
                )}
              </AnimatedButton>
            </div>

            <div>
              <label htmlFor="ad-generated-text" className="block text-sm font-medium text-gray-700 mb-1">
                Generated Description
              </label>
              <textarea
                id="ad-generated-text"
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-sky-500 focus:border-sky-500 h-40"
                placeholder={isGenerating ? 'Generating...' : 'Your generated text will appear here'}
                readOnly={isGenerating}
              ></textarea>
              <div className="mt-2 flex justify-between">
                <button
                  onClick={() => setEditedText(generatedText)}
                  disabled={!generatedText || isGenerating}
                  className={`${
                    !generatedText || isGenerating
                      ? 'bg-gray-300 cursor-not-allowed'
                      : 'bg-gray-200 hover:bg-gray-300'
                  } text-gray-700 font-medium py-1 px-3 text-sm rounded-md transition duration-150 ease-in-out`}
                >
                  Reset to Original
                </button>
                <button
                  disabled={!editedText.trim()}
                  className={`${
                    !editedText.trim()
                      ? 'bg-gray-300 cursor-not-allowed'
                      : 'bg-green-600 hover:bg-green-700'
                  } text-white font-medium py-1 px-3 text-sm rounded-md transition duration-150 ease-in-out`}
                >
                  Save Description
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-sky-50 rounded-md text-sm text-gray-600">
            <p className="font-medium text-sky-700 mb-2">Tips for effective property descriptions:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Focus on unique selling points that make your property stand out</li>
              <li>Mention nearby amenities and transport options</li>
              <li>Highlight recent renovations or upgrades</li>
              <li>Describe the atmosphere and feeling of the space</li>
              <li>Keep it concise but comprehensive</li>
            </ul>
          </div>
        </div>
      )}

      {/* Photos Tab */}
      {activeTab === 'photos' && (
        <AnimatedCard delay={0.2}>
          <motion.div
            className="p-8"
            initial="hidden"
            animate="visible"
            variants={contentVariants}
          >
            <motion.h3
              className="text-xl font-semibold text-gray-700 mb-4 flex items-center"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ImageIcon className="mr-2 text-primary-500 animate-pulse-light" /> Property Photos
            </motion.h3>
            <motion.p
              className="text-sm text-gray-600 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Upload high-quality photos of your property. Good photos significantly increase buyer interest.
            </motion.p>

            <motion.div
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center"
              whileHover={{ borderColor: '#0ea5e9', scale: 1.01 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                animate={{
                  y: [0, -5, 0],
                  transition: { duration: 2, repeat: Infinity }
                }}
              >
                <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
              </motion.div>
              <p className="mt-2 text-sm text-gray-600">Drag and drop photos here, or click to select files</p>
              <AnimatedButton
                className="mt-4"
                variant="primary"
              >
                Select Photos
              </AnimatedButton>
              <p className="mt-2 text-xs text-gray-500">Supported formats: JPG, PNG. Max size: 10MB per image.</p>
            </motion.div>

          <motion.div
            className="mt-6 p-4 bg-primary-50 rounded-md text-sm text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <p className="font-medium text-primary-700 mb-2">Photo tips:</p>
            <AnimatedList className="list-disc list-inside space-y-1" staggerDelay={0.1}>
              <li>Use natural lighting when possible</li>
              <li>Take photos during daylight hours</li>
              <li>Ensure the property is clean and decluttered</li>
              <li>Include photos of all rooms and outdoor spaces</li>
              <li>Consider wide-angle shots to show the full space</li>
            </AnimatedList>
          </motion.div>
          </motion.div>
        </AnimatedCard>
      )}

      {/* Staging Checklist Tab */}
      {activeTab === 'staging' && (
        <AnimatedCard delay={0.2}>
          <motion.div
            className="p-8"
            initial="hidden"
            animate="visible"
            variants={contentVariants}
          >
            <motion.h3
              className="text-xl font-semibold text-gray-700 mb-4 flex items-center"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <CheckSquareIcon className="mr-2 text-primary-500 animate-bounce-light" /> Staging Checklist
            </motion.h3>
            <motion.p
              className="text-sm text-gray-600 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Use this checklist to prepare your property for viewings and photos.
            </motion.p>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-600">Staging Progress</span>
                <span className="text-sm font-medium text-primary-600">{Math.round(checklistProgress)}% Complete</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  className="bg-primary-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${checklistProgress}%` }}
                  transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                ></motion.div>
              </div>
            </div>

          <AnimatedList
            className="space-y-3"
            staggerDelay={0.05}
          >
            {[
              { id: 'clean-surfaces', label: 'Clean all surfaces, floors, and windows' },
              { id: 'declutter', label: 'Remove clutter and excess personal items' },
              { id: 'lighting', label: 'Ensure all lights are working and rooms are well-lit' },
              { id: 'personal-items', label: 'Store away personal photos and items' },
              { id: 'repairs', label: 'Fix minor issues (leaky faucets, loose handles, etc.)' },
              { id: 'neutral-decor', label: 'Neutralize bold decor choices where possible' },
              { id: 'furniture-arrangement', label: 'Arrange furniture to maximize space' },
              { id: 'curb-appeal', label: 'Enhance curb appeal (tidy garden, clean entrance)' }
            ].map(item => (
              <motion.div
                key={item.id}
                className="flex items-center"
                whileHover={{ x: 5, transition: { duration: 0.2 } }}
              >
                <motion.input
                  type="checkbox"
                  id={item.id}
                  checked={checklist[item.id as keyof typeof checklist]}
                  onChange={() => handleChecklistChange(item.id)}
                  className="h-5 w-5 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
                <label htmlFor={item.id} className="ml-3 text-sm text-gray-700">{item.label}</label>
              </motion.div>
            ))}
          </AnimatedList>

          <motion.div
            className="mt-6 p-4 bg-primary-50 rounded-md text-sm text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <p className="font-medium text-primary-700 mb-2">Why staging matters:</p>
            <p>
              Well-staged properties typically sell faster and for higher prices. Staging helps buyers
              visualize themselves living in the space and highlights your property&apos;s best features.
            </p>
          </motion.div>
          </motion.div>
        </AnimatedCard>
      )}
    </MainLayout>
  )
}
