import { useState } from 'react'

function TemplateSelector({ selectedTemplate, onTemplateChange, themeOptions, onThemeChange }) {
  const [showThemeOptions, setShowThemeOptions] = useState(false)
  
  const templates = [
    { id: 'modern', name: 'Modern' },
    { id: 'classic', name: 'Classic' }
  ]
  
  const fontFamilies = [
    { id: 'sans', name: 'Sans-serif' },
    { id: 'serif', name: 'Serif' },
    { id: 'mono', name: 'Monospace' }
  ]

  return (
    <div className="flex items-center gap-4">
      <div>
        <label htmlFor="template-select" className="block text-sm font-medium text-gray-700 mb-1">
          Template
        </label>
        <select
          id="template-select"
          value={selectedTemplate}
          onChange={(e) => onTemplateChange(e.target.value)}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        >
          {templates.map(template => (
            <option key={template.id} value={template.id}>
              {template.name}
            </option>
          ))}
        </select>
      </div>
      
      <button
        type="button"
        onClick={() => setShowThemeOptions(!showThemeOptions)}
        className="btn btn-secondary"
      >
        Customize Theme
      </button>
      
      {showThemeOptions && (
        <div className="absolute right-4 top-4 mt-82 w-64 bg-white rounded-md shadow-lg z-10 p-4">

<button 
  onClick={() => setShowThemeOptions(false)} 
  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
>
  &times;
</button>
          <h3 className="text-lg font-medium text-gray-900 mb-3">Theme Options</h3>
          
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Font Family
            </label>
            <select
              value={themeOptions.fontFamily}
              onChange={(e) => onThemeChange({ fontFamily: e.target.value })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              {fontFamilies.map(font => (
                <option key={font.id} value={font.id}>
                  {font.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Primary Color
            </label>
            <input
              type="color"
              value={themeOptions.primaryColor}
              onChange={(e) => onThemeChange({ primaryColor: e.target.value })}
              className="block w-full h-8 rounded-md border-gray-300"
            />
          </div>
          
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Background Color
            </label>
            <input
              type="color"
              value={themeOptions.backgroundColor}
              onChange={(e) => onThemeChange({ backgroundColor: e.target.value })}
              className="block w-full h-8 rounded-md border-gray-300"
            />
          </div>
          
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Text Color
            </label>
            <input
              type="color"
              value={themeOptions.textColor}
              onChange={(e) => onThemeChange({ textColor: e.target.value })}
              className="block w-full h-8 rounded-md border-gray-300"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default TemplateSelector