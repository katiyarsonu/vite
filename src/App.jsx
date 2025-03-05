import { useState } from 'react'
import ResumeForm from './components/ResumeForm'
import ResumePreview from './components/ResumePreview'
import TemplateSelector from './components/TemplateSelector'
import Sidebar from './components/Sidebar'
import useResumeStore from './store/resumeStore'
import './App.css'

function App() {
  const [selectedTemplate, setSelectedTemplate] = useState(() => {
    try {
      const savedTemplate = localStorage.getItem('selectedTemplate')
      return savedTemplate || 'modern'
    } catch (error) {
      console.error("Error loading template from localStorage:", error)
      return 'modern'
    }
  })
  
  const [themeOptions, setThemeOptions] = useState(() => {
    try {
      const savedTheme = localStorage.getItem('themeOptions')
      return savedTheme ? JSON.parse(savedTheme) : {
        fontFamily: 'sans',
        primaryColor: '#3b82f6',
        backgroundColor: '#ffffff',
        textColor: '#333333'
      }
    } catch (error) {
      console.error("Error loading theme options from localStorage:", error)
      return {
        fontFamily: 'sans',
        primaryColor: '#3b82f6',
        backgroundColor: '#ffffff',
        textColor: '#333333'
      }
    }
  })

  const isSidebarCollapsed = useResumeStore((state) => state.isSidebarCollapsed)

  // Handle template change
  const handleTemplateChange = (template) => {
    setSelectedTemplate(template)
    localStorage.setItem('selectedTemplate', template)
  }

  // Handle theme options change
  const handleThemeChange = (newThemeOptions) => {
    const updatedThemeOptions = { ...themeOptions, ...newThemeOptions }
    setThemeOptions(updatedThemeOptions)
    localStorage.setItem('themeOptions', JSON.stringify(updatedThemeOptions))
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      
      <div 
        className={`transition-all duration-300 ease-in-out ${
          isSidebarCollapsed ? 'md:ml-16' : 'md:ml-64'
        }`}
      >
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-3 py-3 sm:px-6 sm:py-4 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Resume Builder</h1>
            <TemplateSelector 
              selectedTemplate={selectedTemplate} 
              onTemplateChange={handleTemplateChange}
              themeOptions={themeOptions}
              onThemeChange={handleThemeChange}
            />
          </div>
        </header>
        
        <main className="max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
            <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
              <ResumeForm />
            </div>
            <div className="lg:w-1/2 w-full">
              <div className="sticky top-4">
                <ResumePreview 
                  template={selectedTemplate}
                  themeOptions={themeOptions}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App