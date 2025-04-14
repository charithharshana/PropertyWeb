'use client'

import { useState } from 'react'
import MainLayout from '@/components/layout/MainLayout'
import { UsersIcon, PlusIcon, SearchIcon, PhoneIcon, MailIcon, EditIcon, TrashIcon } from 'lucide-react'

export default function CRM() {
  // Mock data for contacts
  const initialContacts = [
    { 
      id: 1, 
      name: 'Anna Schmidt', 
      email: 'anna.s@email.com', 
      phone: '+372 555 1111', 
      dateAdded: '2025-04-10', 
      interest: 'High', 
      status: 'Viewing Scheduled', 
      notes: 'Interested in the kitchen renovation. Has financing pre-approved.' 
    },
    { 
      id: 2, 
      name: 'Markus Tamm', 
      email: 'markus.t@email.com', 
      phone: '+372 555 2222', 
      dateAdded: '2025-04-11', 
      interest: 'Medium', 
      status: 'Follow-up Needed', 
      notes: 'Asked about parking options and nearby schools.' 
    },
    { 
      id: 3, 
      name: 'Liisa Kask', 
      email: 'liisa.k@email.com', 
      phone: '+372 555 3333', 
      dateAdded: '2025-04-12', 
      interest: 'Low', 
      status: 'Initial Inquiry', 
      notes: 'Requested more photos of the bathroom.' 
    }
  ]
  
  const [contacts, setContacts] = useState(initialContacts)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedContact, setSelectedContact] = useState<any>(null)
  const [isAddingContact, setIsAddingContact] = useState(false)
  const [newContact, setNewContact] = useState({
    name: '',
    email: '',
    phone: '',
    interest: 'Medium',
    status: 'Initial Inquiry',
    notes: ''
  })
  
  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.status.toLowerCase().includes(searchTerm.toLowerCase())
  )
  
  const handleContactSelect = (contact: any) => {
    setSelectedContact(contact)
    setIsAddingContact(false)
  }
  
  const handleAddNewClick = () => {
    setIsAddingContact(true)
    setSelectedContact(null)
    setNewContact({
      name: '',
      email: '',
      phone: '',
      interest: 'Medium',
      status: 'Initial Inquiry',
      notes: ''
    })
  }
  
  const handleNewContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setNewContact(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const handleAddContact = () => {
    if (!newContact.name) return
    
    const newId = Math.max(0, ...contacts.map(c => c.id)) + 1
    const today = new Date().toISOString().split('T')[0]
    
    const contactToAdd = {
      ...newContact,
      id: newId,
      dateAdded: today
    }
    
    setContacts(prev => [...prev, contactToAdd])
    setIsAddingContact(false)
    setSelectedContact(contactToAdd)
  }
  
  const handleDeleteContact = (id: number) => {
    setContacts(prev => prev.filter(contact => contact.id !== id))
    if (selectedContact && selectedContact.id === id) {
      setSelectedContact(null)
    }
  }
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Initial Inquiry':
        return 'bg-blue-100 text-blue-800'
      case 'Viewing Scheduled':
        return 'bg-green-100 text-green-800'
      case 'Follow-up Needed':
        return 'bg-yellow-100 text-yellow-800'
      case 'Offer Made':
        return 'bg-purple-100 text-purple-800'
      case 'Negotiating':
        return 'bg-indigo-100 text-indigo-800'
      case 'Closed':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }
  
  const getInterestColor = (interest: string) => {
    switch (interest) {
      case 'High':
        return 'text-green-600'
      case 'Medium':
        return 'text-yellow-600'
      case 'Low':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }
  
  return (
    <MainLayout>
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 flex items-center">
        <UsersIcon className="mr-2 text-purple-500" /> CRM - Buyer Inquiries
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Contact list */}
        <div className="lg:col-span-1 bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Contacts</h3>
              <button 
                onClick={handleAddNewClick}
                className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-full"
              >
                <PlusIcon className="h-4 w-4" />
              </button>
            </div>
            
            <div className="relative">
              <input
                type="text"
                placeholder="Search contacts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              />
              <SearchIcon className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          </div>
          
          <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 280px)' }}>
            {filteredContacts.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No contacts found
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {filteredContacts.map(contact => (
                  <li 
                    key={contact.id}
                    onClick={() => handleContactSelect(contact)}
                    className={`p-4 hover:bg-gray-50 cursor-pointer ${
                      selectedContact && selectedContact.id === contact.id ? 'bg-purple-50' : ''
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-gray-800">{contact.name}</h4>
                        <p className="text-sm text-gray-500">{contact.email}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(contact.status)}`}>
                        {contact.status}
                      </span>
                    </div>
                    <div className="mt-2 flex justify-between items-center">
                      <p className="text-xs text-gray-500">Added: {new Date(contact.dateAdded).toLocaleDateString()}</p>
                      <p className={`text-xs font-medium ${getInterestColor(contact.interest)}`}>
                        {contact.interest} Interest
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        
        {/* Right column - Contact details or Add new */}
        <div className="lg:col-span-2">
          {selectedContact ? (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-xl font-semibold text-gray-800">{selectedContact.name}</h3>
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
                    <EditIcon className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={() => handleDeleteContact(selectedContact.id)}
                    className="p-2 text-red-500 hover:text-red-700 rounded-full hover:bg-red-50"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Contact Information</h4>
                  <div className="space-y-2">
                    <p className="flex items-center text-gray-800">
                      <MailIcon className="h-4 w-4 mr-2 text-gray-400" />
                      {selectedContact.email}
                    </p>
                    <p className="flex items-center text-gray-800">
                      <PhoneIcon className="h-4 w-4 mr-2 text-gray-400" />
                      {selectedContact.phone}
                    </p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Status Information</h4>
                  <div className="space-y-2">
                    <p className="text-gray-800">
                      <span className="text-gray-500">Interest Level:</span>{' '}
                      <span className={getInterestColor(selectedContact.interest)}>
                        {selectedContact.interest}
                      </span>
                    </p>
                    <p className="text-gray-800">
                      <span className="text-gray-500">Status:</span>{' '}
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(selectedContact.status)}`}>
                        {selectedContact.status}
                      </span>
                    </p>
                    <p className="text-gray-800">
                      <span className="text-gray-500">Date Added:</span>{' '}
                      {new Date(selectedContact.dateAdded).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-500 mb-1">Notes</h4>
                <p className="text-gray-800 bg-gray-50 p-3 rounded-md min-h-[100px]">
                  {selectedContact.notes || 'No notes added yet.'}
                </p>
              </div>
              
              <div className="flex space-x-3">
                <button className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out flex items-center">
                  <MailIcon className="mr-2 h-4 w-4" /> Send Email
                </button>
                <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out flex items-center">
                  <PhoneIcon className="mr-2 h-4 w-4" /> Call
                </button>
              </div>
            </div>
          ) : isAddingContact ? (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Add New Contact</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={newContact.name}
                    onChange={handleNewContactChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={newContact.email}
                    onChange={handleNewContactChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Email address"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={newContact.phone}
                    onChange={handleNewContactChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Phone number"
                  />
                </div>
                <div>
                  <label htmlFor="interest" className="block text-sm font-medium text-gray-700 mb-1">Interest Level</label>
                  <select
                    id="interest"
                    name="interest"
                    value={newContact.interest}
                    onChange={handleNewContactChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    id="status"
                    name="status"
                    value={newContact.status}
                    onChange={handleNewContactChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option>Initial Inquiry</option>
                    <option>Viewing Scheduled</option>
                    <option>Follow-up Needed</option>
                    <option>Offer Made</option>
                    <option>Negotiating</option>
                    <option>Closed</option>
                  </select>
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  id="notes"
                  name="notes"
                  value={newContact.notes}
                  onChange={handleNewContactChange}
                  rows={4}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Add any relevant notes about this contact"
                ></textarea>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={handleAddContact}
                  disabled={!newContact.name}
                  className={`${
                    !newContact.name ? 'bg-gray-300 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'
                  } text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out`}
                >
                  Add Contact
                </button>
                <button
                  onClick={() => setIsAddingContact(false)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center" style={{ minHeight: '400px' }}>
              <UsersIcon className="h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-xl font-medium text-gray-700 mb-2">No Contact Selected</h3>
              <p className="text-gray-500 text-center mb-6">
                Select a contact from the list to view details or add a new contact.
              </p>
              <button
                onClick={handleAddNewClick}
                className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out flex items-center"
              >
                <PlusIcon className="mr-2 h-4 w-4" /> Add New Contact
              </button>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  )
}
