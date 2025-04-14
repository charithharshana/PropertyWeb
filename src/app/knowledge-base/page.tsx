'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import MainLayout from '@/components/layout/MainLayout'
import { BookOpenIcon, BrushIcon, HomeIcon, ImageIcon, ScaleIcon, TruckIcon, ArrowLeftIcon, UsersIcon } from 'lucide-react'

export default function KnowledgeBase() {
  const searchParams = useSearchParams()
  const articleParam = searchParams.get('article')

  const [activeArticle, setActiveArticle] = useState<string | null>(null)

  useEffect(() => {
    if (articleParam) {
      setActiveArticle(articleParam)
    }
  }, [articleParam])

  // Knowledge base articles
  const articles = {
    'staging-tips': {
      title: 'Effective Home Staging Tips',
      category: 'Property Preparation',
      icon: <BrushIcon className="h-5 w-5 text-sky-500" />,
      content: `
        <h2 class="text-xl font-semibold mb-4">Effective Home Staging Tips</h2>

        <p class="mb-4">Home staging is the process of preparing your property to make it as appealing as possible to potential buyers. Well-staged homes typically sell faster and for higher prices.</p>

        <h3 class="text-lg font-medium mb-2 mt-6">General Staging Principles</h3>
        <ul class="list-disc list-inside space-y-2 mb-4">
          <li>Declutter every room, removing personal items and excess furniture</li>
          <li>Deep clean all surfaces, floors, and windows</li>
          <li>Aim for neutral colors that appeal to a wide range of buyers</li>
          <li>Maximize natural light by opening curtains and blinds</li>
          <li>Create a sense of space by removing bulky furniture</li>
          <li>Add strategic decorative touches like fresh flowers or plants</li>
        </ul>

        <h3 class="text-lg font-medium mb-2 mt-6">Room-by-Room Staging Tips</h3>

        <h4 class="font-medium mb-1 mt-4">Living Room</h4>
        <ul class="list-disc list-inside space-y-1 mb-3 ml-4">
          <li>Arrange furniture to create conversation areas</li>
          <li>Remove family photos and personal collections</li>
          <li>Add accent pillows and throws for color and texture</li>
        </ul>

        <h4 class="font-medium mb-1 mt-4">Kitchen</h4>
        <ul class="list-disc list-inside space-y-1 mb-3 ml-4">
          <li>Clear countertops of small appliances and clutter</li>
          <li>Clean inside cabinets and appliances thoroughly</li>
          <li>Add a bowl of fresh fruit or a small herb plant</li>
        </ul>

        <h4 class="font-medium mb-1 mt-4">Bedrooms</h4>
        <ul class="list-disc list-inside space-y-1 mb-3 ml-4">
          <li>Make beds with fresh, neutral bedding</li>
          <li>Remove personal items from nightstands</li>
          <li>Ensure closets are organized and not overfilled</li>
        </ul>

        <h4 class="font-medium mb-1 mt-4">Bathrooms</h4>
        <ul class="list-disc list-inside space-y-1 mb-3 ml-4">
          <li>Remove all personal toiletries</li>
          <li>Hang fresh, clean towels</li>
          <li>Fix any leaky faucets or other minor issues</li>
        </ul>

        <h3 class="text-lg font-medium mb-2 mt-6">Virtual Staging</h3>
        <p class="mb-4">If your property is empty or you prefer not to invest in physical staging, virtual staging is an increasingly popular alternative. This involves digitally adding furniture and decor to photos of your empty rooms.</p>

        <div class="bg-sky-50 p-4 rounded-md mt-6">
          <p class="text-sky-800 font-medium">Professional Help</p>
          <p class="text-sky-700 text-sm">Consider hiring a professional stager for the best results, especially for high-value properties. The investment typically pays for itself through a faster sale and higher selling price.</p>
        </div>
      `
    },
    'photo-guide': {
      title: 'Property Photography Guide',
      category: 'Property Preparation',
      icon: <ImageIcon className="h-5 w-5 text-sky-500" />,
      content: `
        <h2 class="text-xl font-semibold mb-4">Property Photography Guide</h2>

        <p class="mb-4">High-quality photos are crucial for attracting potential buyers. In today's digital-first market, most buyers will see your property online before deciding to view it in person.</p>

        <h3 class="text-lg font-medium mb-2 mt-6">Preparation</h3>
        <ul class="list-disc list-inside space-y-2 mb-4">
          <li>Clean and stage the property before taking any photos</li>
          <li>Turn on all lights to create a bright, welcoming atmosphere</li>
          <li>Open curtains and blinds to maximize natural light</li>
          <li>Remove personal items and clutter from all surfaces</li>
          <li>Consider the time of day - morning or late afternoon often provides the best natural light</li>
        </ul>

        <h3 class="text-lg font-medium mb-2 mt-6">Equipment Recommendations</h3>
        <ul class="list-disc list-inside space-y-2 mb-4">
          <li>Use a wide-angle lens (but avoid fisheye distortion)</li>
          <li>A tripod is essential for sharp, consistent images</li>
          <li>Consider using a flash or additional lighting for darker rooms</li>
          <li>If using a smartphone, use a smartphone tripod and HDR mode</li>
        </ul>

        <h3 class="text-lg font-medium mb-2 mt-6">Essential Shots Checklist</h3>
        <ul class="list-disc list-inside space-y-2 mb-4">
          <li>Exterior front view (curb appeal shot)</li>
          <li>Living room (from multiple angles if possible)</li>
          <li>Kitchen (showing countertops and appliances)</li>
          <li>All bedrooms</li>
          <li>All bathrooms</li>
          <li>Dining area</li>
          <li>Outdoor spaces (garden, balcony, terrace)</li>
          <li>Special features (fireplace, built-ins, etc.)</li>
          <li>Views from windows (if noteworthy)</li>
        </ul>

        <h3 class="text-lg font-medium mb-2 mt-6">Photography Tips</h3>
        <ul class="list-disc list-inside space-y-2 mb-4">
          <li>Shoot from corners to show the full size of rooms</li>
          <li>Position the camera at chest height (about 1.5m from the floor)</li>
          <li>Ensure the camera is level to avoid distorted lines</li>
          <li>Take multiple shots of each room from different angles</li>
          <li>Focus on features that make your property unique</li>
        </ul>

        <h3 class="text-lg font-medium mb-2 mt-6">Post-Processing</h3>
        <ul class="list-disc list-inside space-y-2 mb-4">
          <li>Adjust brightness and contrast for a balanced look</li>
          <li>Correct color temperature to ensure accurate colors</li>
          <li>Straighten horizons and vertical lines</li>
          <li>Crop images to improve composition if needed</li>
          <li>Avoid over-editing that misrepresents the property</li>
        </ul>

        <div class="bg-sky-50 p-4 rounded-md mt-6">
          <p class="text-sky-800 font-medium">Professional Photography</p>
          <p class="text-sky-700 text-sm">For the best results, consider hiring a professional real estate photographer. Their expertise and equipment can make a significant difference in the quality of your listing photos.</p>
        </div>
      `
    },
    'notary-role': {
      title: 'Understanding the Notary Role',
      category: 'Legal Information',
      icon: <ScaleIcon className="h-5 w-5 text-indigo-500" />,
      content: `
        <h2 class="text-xl font-semibold mb-4">Understanding the Notary Role in Estonian Property Transactions</h2>

        <p class="mb-4">In Estonia, notaries play a crucial role in real estate transactions. Unlike some countries where notaries simply verify signatures, Estonian notaries have broader responsibilities and authority.</p>

        <h3 class="text-lg font-medium mb-2 mt-6">The Notary's Legal Position</h3>
        <p class="mb-4">Estonian notaries are independent public officials who act as impartial legal advisors to all parties involved in a transaction. They are appointed by the state but operate as independent professionals.</p>

        <h3 class="text-lg font-medium mb-2 mt-6">Key Responsibilities in Property Transactions</h3>
        <ul class="list-disc list-inside space-y-2 mb-4">
          <li>Verifying the identities of all parties</li>
          <li>Checking the legal status of the property in the Land Register</li>
          <li>Drafting the sales agreement according to the parties' wishes</li>
          <li>Explaining the legal implications of the agreement to all parties</li>
          <li>Ensuring the transaction complies with all legal requirements</li>
          <li>Handling the secure transfer of funds (via notary's deposit account)</li>
          <li>Submitting the necessary documentation to the Land Register</li>
        </ul>

        <h3 class="text-lg font-medium mb-2 mt-6">The Notary Appointment Process</h3>
        <ol class="list-decimal list-inside space-y-2 mb-4">
          <li>Parties agree on terms and select a notary</li>
          <li>Required documents are submitted to the notary in advance</li>
          <li>Notary prepares the draft agreement</li>
          <li>All parties attend the notary appointment</li>
          <li>Notary reads and explains the agreement</li>
          <li>Parties sign the agreement</li>
          <li>Payment is made according to the agreed method</li>
          <li>Notary submits documents to the Land Register</li>
        </ol>

        <h3 class="text-lg font-medium mb-2 mt-6">Notary Fees</h3>
        <p class="mb-4">Notary fees in Estonia are regulated by law and depend on the transaction value. For a typical property sale, fees include:</p>
        <ul class="list-disc list-inside space-y-2 mb-4">
          <li>Notary fee: 0.2-0.4% of the property value</li>
          <li>State fee for Land Register entry: 0.1% of property value</li>
          <li>VAT (20%) on the notary's services</li>
        </ul>

        <h3 class="text-lg font-medium mb-2 mt-6">Language Considerations</h3>
        <p class="mb-4">Notary appointments in Estonia are typically conducted in Estonian. However, many notaries also speak English and Russian. If you don't speak Estonian, you should:</p>
        <ul class="list-disc list-inside space-y-2 mb-4">
          <li>Inform the notary in advance about your language preference</li>
          <li>Consider bringing a certified translator if needed</li>
          <li>Request that documents be prepared in your language as well as Estonian</li>
        </ul>

        <div class="bg-indigo-50 p-4 rounded-md mt-6">
          <p class="text-indigo-800 font-medium">Important Note</p>
          <p class="text-indigo-700 text-sm">While notaries are impartial, they cannot provide personalized legal advice that favors one party over another. If you have complex legal questions or concerns, consider consulting with a private attorney before the notary appointment.</p>
        </div>
      `
    },
    'moving-tips': {
      title: 'Moving Day Tips & Checklist',
      category: 'After Sale',
      icon: <TruckIcon className="h-5 w-5 text-blue-500" />,
      content: `
        <h2 class="text-xl font-semibold mb-4">Moving Day Tips & Checklist</h2>

        <p class="mb-4">Moving day can be stressful, but proper planning and organization can make the process much smoother. Use this guide to prepare for a successful move.</p>

        <h3 class="text-lg font-medium mb-2 mt-6">Before Moving Day</h3>
        <ul class="list-disc list-inside space-y-2 mb-4">
          <li>Book movers or a rental truck at least 2-4 weeks in advance</li>
          <li>Notify utility companies about your move (both old and new addresses)</li>
          <li>Change your address with postal services, banks, and other important institutions</li>
          <li>Gather packing supplies: boxes, tape, bubble wrap, markers</li>
          <li>Start packing non-essential items early</li>
          <li>Create an inventory of valuable items</li>
          <li>Arrange for pet and plant transportation</li>
          <li>Confirm details with your moving company</li>
        </ul>

        <h3 class="text-lg font-medium mb-2 mt-6">Packing Tips</h3>
        <ul class="list-disc list-inside space-y-2 mb-4">
          <li>Pack room by room and label boxes clearly</li>
          <li>Use color-coded labels for different rooms</li>
          <li>Pack a separate "essentials box" with items you'll need immediately</li>
          <li>Take photos of electronic setups before disconnecting</li>
          <li>Use clothing, towels, and linens to wrap fragile items</li>
          <li>Don't overpack boxes - keep them at a manageable weight</li>
          <li>Keep important documents and valuables with you, not in the moving truck</li>
        </ul>

        <h3 class="text-lg font-medium mb-2 mt-6">Moving Day Checklist</h3>
        <ul class="list-disc list-inside space-y-2 mb-4">
          <li>Wake up early and have a good breakfast</li>
          <li>Wear comfortable clothes and sturdy shoes</li>
          <li>Have water and snacks available</li>
          <li>Do a final walkthrough of your old home</li>
          <li>Check all closets, cabinets, and storage spaces</li>
          <li>Take final meter readings and photos for records</li>
          <li>Make sure your phone is fully charged</li>
          <li>Have payment ready for movers (and tip if appropriate)</li>
        </ul>

        <h3 class="text-lg font-medium mb-2 mt-6">At Your New Home</h3>
        <ul class="list-disc list-inside space-y-2 mb-4">
          <li>Arrive before the moving truck if possible</li>
          <li>Check for any damage or issues before movers arrive</li>
          <li>Have a floor plan for furniture placement</li>
          <li>Direct movers where to place furniture and boxes</li>
          <li>Check all delivered items against your inventory</li>
          <li>Set up essential furniture first (beds, basic kitchen)</li>
          <li>Locate circuit breakers and water shut-off valve</li>
          <li>Test smoke detectors and replace batteries if needed</li>
        </ul>

        <h3 class="text-lg font-medium mb-2 mt-6">First Night Essentials</h3>
        <ul class="list-disc list-inside space-y-2 mb-4">
          <li>Bedding and pillows</li>
          <li>Toiletries and shower curtain</li>
          <li>Basic kitchen items (kettle, mugs, plates, utensils)</li>
          <li>Cleaning supplies</li>
          <li>Toilet paper and paper towels</li>
          <li>Basic tools (screwdriver, pliers, hammer)</li>
          <li>Phone chargers</li>
          <li>Medications</li>
        </ul>

        <div class="bg-blue-50 p-4 rounded-md mt-6">
          <p class="text-blue-800 font-medium">Moving with Children or Pets</p>
          <p class="text-blue-700 text-sm">Consider arranging for children and pets to stay with friends or family on moving day. If that's not possible, prepare a special bag with toys, treats, and comfort items, and set up a safe space at the new home where they can stay while the chaos of moving continues around them.</p>
        </div>
      `
    },
    'property-valuation': {
      title: 'Understanding Property Valuation',
      category: 'Evaluation',
      icon: <HomeIcon className="h-5 w-5 text-green-500" />,
      content: `
        <h2 class="text-xl font-semibold mb-4">Understanding Property Valuation</h2>

        <p class="mb-4">Property valuation is the process of determining the current market value of a property. Understanding how properties are valued can help you set realistic expectations and make informed decisions.</p>

        <h3 class="text-lg font-medium mb-2 mt-6">Valuation Methods</h3>

        <h4 class="font-medium mb-1 mt-4">Comparative Market Analysis (CMA)</h4>
        <p class="mb-3 ml-4">This is the most common method, comparing your property to similar properties (comparables or "comps") that have recently sold in your area. Adjustments are made for differences in features, condition, and location.</p>

        <h4 class="font-medium mb-1 mt-4">Income Approach</h4>
        <p class="mb-3 ml-4">Used primarily for investment properties, this method calculates value based on the income the property generates or could generate.</p>

        <h4 class="font-medium mb-1 mt-4">Cost Approach</h4>
        <p class="mb-3 ml-4">This estimates what it would cost to rebuild the property from scratch, plus the value of the land, minus depreciation.</p>

        <h3 class="text-lg font-medium mb-2 mt-6">Key Factors Affecting Property Value</h3>
        <ul class="list-disc list-inside space-y-2 mb-4">
          <li><strong>Location:</strong> Often the most significant factor, including neighborhood, proximity to amenities, schools, and transport</li>
          <li><strong>Property Size:</strong> Both the land and the living space</li>
          <li><strong>Age and Condition:</strong> Newer properties or those in excellent condition typically command higher prices</li>
          <li><strong>Renovations and Updates:</strong> Modern kitchens, bathrooms, and energy-efficient features add value</li>
          <li><strong>Market Conditions:</strong> Supply and demand in your local market</li>
          <li><strong>Economic Factors:</strong> Interest rates, employment rates, and overall economic health</li>
        </ul>

        <h3 class="text-lg font-medium mb-2 mt-6">Value-Adding Improvements</h3>
        <p class="mb-2">Some renovations offer better return on investment than others:</p>
        <ul class="list-disc list-inside space-y-2 mb-4">
          <li>Kitchen updates (moderate renovation, not luxury)</li>
          <li>Bathroom renovations</li>
          <li>Energy efficiency improvements</li>
          <li>Adding usable space (finishing a basement, attic conversion)</li>
          <li>Improving curb appeal</li>
        </ul>

        <h3 class="text-lg font-medium mb-2 mt-6">Professional Valuations</h3>
        <p class="mb-4">While online estimators and our evaluation tool provide useful starting points, consider getting a professional valuation from:</p>
        <ul class="list-disc list-inside space-y-2 mb-4">
          <li>Licensed real estate appraisers</li>
          <li>Experienced real estate agents (often provide free CMAs)</li>
          <li>Property surveyors (for more detailed structural assessments)</li>
        </ul>

        <h3 class="text-lg font-medium mb-2 mt-6">Valuation vs. Asking Price</h3>
        <p class="mb-4">Your asking price strategy might differ from the valuation based on:</p>
        <ul class="list-disc list-inside space-y-2 mb-4">
          <li>How quickly you need to sell</li>
          <li>Current market conditions (buyer's vs. seller's market)</li>
          <li>Unique features that might appeal to specific buyers</li>
          <li>Room for negotiation</li>
        </ul>

        <div class="bg-green-50 p-4 rounded-md mt-6">
          <p class="text-green-800 font-medium">Realistic Expectations</p>
          <p class="text-green-700 text-sm">While emotional attachment may make you value your home higher, buyers will compare it objectively against other available properties. Setting a realistic price based on solid valuation methods typically results in a faster sale and better overall outcome.</p>
        </div>
      `
    }
  }

  const handleBackToList = () => {
    setActiveArticle(null)
  }

  return (
    <MainLayout>
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 flex items-center">
        <BookOpenIcon className="mr-2 text-teal-500" /> Knowledge Base
      </h2>

      {activeArticle ? (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <button
              onClick={handleBackToList}
              className="text-teal-600 hover:text-teal-800 font-medium flex items-center mb-6"
            >
              <ArrowLeftIcon className="mr-1 h-4 w-4" /> Back to Articles
            </button>

            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{
                __html: articles[activeArticle as keyof typeof articles]?.content || 'Article not found'
              }}
            />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Property Preparation */}
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
              <BrushIcon className="mr-2 text-sky-500" /> Property Preparation
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => setActiveArticle('staging-tips')}
                  className="text-sky-600 hover:underline block w-full text-left"
                >
                  Effective Home Staging Tips
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveArticle('photo-guide')}
                  className="text-sky-600 hover:underline block w-full text-left"
                >
                  Property Photography Guide
                </button>
              </li>
              <li>
                <button className="text-sky-600 hover:underline block w-full text-left">
                  Decluttering Guide for Sellers
                </button>
              </li>
              <li>
                <button className="text-sky-600 hover:underline block w-full text-left">
                  Quick Fixes Before Selling
                </button>
              </li>
            </ul>
          </div>

          {/* Legal Information */}
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
              <ScaleIcon className="mr-2 text-indigo-500" /> Legal Information
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => setActiveArticle('notary-role')}
                  className="text-sky-600 hover:underline block w-full text-left"
                >
                  Understanding the Notary Role
                </button>
              </li>
              <li>
                <button className="text-sky-600 hover:underline block w-full text-left">
                  Required Documents for Sale
                </button>
              </li>
              <li>
                <button className="text-sky-600 hover:underline block w-full text-left">
                  Tax Implications of Property Sale
                </button>
              </li>
              <li>
                <button className="text-sky-600 hover:underline block w-full text-left">
                  Disclosure Requirements
                </button>
              </li>
            </ul>
          </div>

          {/* After Sale */}
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
              <TruckIcon className="mr-2 text-blue-500" /> After Sale
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => setActiveArticle('moving-tips')}
                  className="text-sky-600 hover:underline block w-full text-left"
                >
                  Moving Day Tips & Checklist
                </button>
              </li>
              <li>
                <button className="text-sky-600 hover:underline block w-full text-left">
                  Changing Address Notifications
                </button>
              </li>
              <li>
                <button className="text-sky-600 hover:underline block w-full text-left">
                  Utility Transfer Guide
                </button>
              </li>
              <li>
                <button className="text-sky-600 hover:underline block w-full text-left">
                  Post-Sale Tax Considerations
                </button>
              </li>
            </ul>
          </div>

          {/* Evaluation */}
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
              <HomeIcon className="mr-2 text-green-500" /> Evaluation
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => setActiveArticle('property-valuation')}
                  className="text-sky-600 hover:underline block w-full text-left"
                >
                  Understanding Property Valuation
                </button>
              </li>
              <li>
                <button className="text-sky-600 hover:underline block w-full text-left">
                  Factors That Affect Property Value
                </button>
              </li>
              <li>
                <button className="text-sky-600 hover:underline block w-full text-left">
                  Setting the Right Asking Price
                </button>
              </li>
              <li>
                <button className="text-sky-600 hover:underline block w-full text-left">
                  Value-Adding Home Improvements
                </button>
              </li>
            </ul>
          </div>

          {/* Listing & Marketing */}
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
              <ImageIcon className="mr-2 text-amber-500" /> Listing & Marketing
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button className="text-sky-600 hover:underline block w-full text-left">
                  Writing Effective Property Descriptions
                </button>
              </li>
              <li>
                <button className="text-sky-600 hover:underline block w-full text-left">
                  Online Listing Platforms Comparison
                </button>
              </li>
              <li>
                <button className="text-sky-600 hover:underline block w-full text-left">
                  Social Media Marketing for Properties
                </button>
              </li>
              <li>
                <button className="text-sky-600 hover:underline block w-full text-left">
                  Hosting Successful Open Houses
                </button>
              </li>
            </ul>
          </div>

          {/* Buyer Management */}
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
              <UsersIcon className="mr-2 text-purple-500" /> Buyer Management
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button className="text-sky-600 hover:underline block w-full text-left">
                  Screening Potential Buyers
                </button>
              </li>
              <li>
                <button className="text-sky-600 hover:underline block w-full text-left">
                  Conducting Effective Property Viewings
                </button>
              </li>
              <li>
                <button className="text-sky-600 hover:underline block w-full text-left">
                  Negotiation Strategies for Sellers
                </button>
              </li>
              <li>
                <button className="text-sky-600 hover:underline block w-full text-left">
                  Handling Multiple Offers
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </MainLayout>
  )
}
