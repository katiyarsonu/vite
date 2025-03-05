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
                <div className="mt-2 flex gap-2">
                  <button
                    type="button"
                    className="px-3 py-1 bg-purple-600 text-white text-sm rounded hover:bg-purple-700 transition-colors"
                  >
                    Generate with AI
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const bullets = item.bullets || [];
                      const updatedItem = { ...item, bullets: [...bullets, { id: uuidv4(), text: '', checked: true }] };
                      updateItem(item.id, 'bullets', updatedItem.bullets);
                    }}
                    className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
                  >
                    Add Bullet
                  </button>
                </div>
                
                {/* Bullet Points */}
                {item.bullets && item.bullets.length > 0 && (
                  <div className="mt-3 space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Bullet Points</label>
                    {item.bullets.map((bullet, index) => (
                      <div key={bullet.id} className="flex items-start gap-2">
                        <input
                          type="checkbox"
                          checked={bullet.checked}
                          onChange={() => {
                            const updatedBullets = [...item.bullets];
                            updatedBullets[index] = { ...bullet, checked: !bullet.checked };
                            updateItem(item.id, 'bullets', updatedBullets);
                          }}
                          className="mt-1"
                        />
                        <input
                          type="text"
                          value={bullet.text}
                          onChange={(e) => {
                            const updatedBullets = [...item.bullets];
                            updatedBullets[index] = { ...bullet, text: e.target.value };
                            updateItem(item.id, 'bullets', updatedBullets);
                          }}
                          className="flex-grow input-field py-1"
                          placeholder="Bullet point"
                        />
                        <div className="flex space-x-1">
                          <button
                            type="button"
                            onClick={() => {
                              const updatedBullets = [...item.bullets];
                              updatedBullets.splice(index, 1);
                              updateItem(item.id, 'bullets', updatedBullets);
                            }}
                            className="p-1 text-red-600 hover:text-red-800"
                            aria-label="Delete bullet"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          </button>
                          <button
                            type="button"
                            className="p-1 text-purple-600 hover:text-purple-800"
                            aria-label="Generate with AI"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M13.5 9.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 1 0v-3a.5.5 0 0 0-.5-.5z"/>
                              <path d="M10 2.5c-1.8 0-3.5.9-4.6 2.4v-.9H4.3v.8c-1.1 1.5-1.7 3.4-1.7 5.2 0 4.9 4 8.9 8.9 8.9s8.9-4 8.9-8.9-4-8.9-8.9-8.9h-.5zM5.8 9.6c0-.6.5-1.1 1.1-1.1s1.1.5 1.1 1.1-.5 1.1-1.1 1.1-1.1-.5-1.1-1.1zm6.3 0c0-.6.5-1.1 1.1-1.1s1.1.5 1.1 1.1-.5 1.1-1.1 1.1-1.1-.5-1.1-1.1zM10 15.3c-2.3 0-4.3-1.6-4.8-3.7h9.6c-.5 2.1-2.5 3.7-4.8 3.7z"/>
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CustomSectionForm