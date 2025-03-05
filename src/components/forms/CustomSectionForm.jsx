import { v4 as uuidv4 } from 'uuid'

function CustomSectionForm({ sections, currentSectionId, onChange }) {
  const currentSection = sections.find(section => section.id === currentSectionId)
  
  if (!currentSection) {
    return <div>Section not found</div>
  }

  const updateSectionTitle = (title) => {
    const updatedSections = sections.map(section => 
      section.id === currentSectionId ? { ...section, title } : section
    )
    onChange(updatedSections)
  }

  const addItem = () => {
    const newItem = {
      id: uuidv4(),
      title: "",
      description: ""
    }
    
    const updatedSections = sections.map(section => {
      if (section.id === currentSectionId) {
        return {
          ...section,
          items: [...section.items, newItem]
        }
      }
      return section
    })
    
    onChange(updatedSections)
  }

  const updateItem = (itemId, field, value) => {
    const updatedSections = sections.map(section => {
      if (section.id === currentSectionId) {
        return {
          ...section,
          items: section.items.map(item => 
            item.id === itemId ? { ...item, [field]: value } : item
          )
        }
      }
      return section
    })
    
    onChange(updatedSections)
  }

  const removeItem = (itemId) => {
    const updatedSections = sections.map(section => {
      if (section.id === currentSectionId) {
        return {
          ...section,
          items: section.items.filter(item => item.id !== itemId)
        }
      }
      return section
    })
    
    onChange(updatedSections)
  }

  const removeSection = () => {
    const updatedSections = sections.filter(section => section.id !== currentSectionId)
    onChange(updatedSections)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={currentSection.title}
            onChange={(e) => updateSectionTitle(e.target.value)}
            className="text-xl font-bold bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500"
            placeholder="Section Title"
          />
        </div>
        <div className="flex gap-2">
          <button 
            onClick={addItem}
            className="btn bg-green-600 text-white hover:bg-green-700"
          >
            Add Item
          </button>
          <button 
            onClick={removeSection}
            className="btn bg-red-600 text-white hover:bg-red-700"
          >
            Delete Section
          </button>
        </div>
      </div>
      
      {currentSection.items.length === 0 ? (
        <p className="text-gray-500 italic">No items added yet. Click "Add Item" to get started.</p>
      ) : (
        <div className="space-y-4">
          {currentSection.items.map(item => (
            <div key={item.id} className="border border-gray-200 rounded-md p-4">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold">{item.title || 'New Item'}</h3>
                <button 
                  onClick={() => removeItem(item.id)}
                  className="p-1 text-red-600 hover:text-red-800"
                  aria-label="Remove item"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={item.title || ''}
                  onChange={(e) => updateItem(item.id, 'title', e.target.value)}
                  className="input-field"
                  placeholder="Item Title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={item.description || ''}
                  onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                  rows="3"
                  className="input-field"
                  placeholder="Describe this item"
                ></textarea>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CustomSectionForm