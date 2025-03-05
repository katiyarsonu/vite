import { useRef } from 'react'
import ModernTemplate from './templates/ModernTemplate'
import ClassicTemplate from './templates/ClassicTemplate'
import { usePDF } from 'react-to-pdf'
import DeployButton from './DeployButton'
import useResumeStore from '../store/resumeStore'

function ResumePreview({ template, themeOptions }) {
  const { resumeData, sectionOrder } = useResumeStore()
  const resumeRef = useRef(null)
  const { toPDF, targetRef } = usePDF({
    filename: 'resume.pdf',
    page: { 
      format: 'A4',
      orientation: 'portrait',
      margin: 20
    }
  })

  const renderTemplate = () => {
    switch (template) {
      case 'modern':
        return <ModernTemplate data={resumeData} themeOptions={themeOptions} sectionOrder={sectionOrder} />
      case 'classic':
        return <ClassicTemplate data={resumeData} themeOptions={themeOptions} sectionOrder={sectionOrder} />
      default:
        return <ModernTemplate data={resumeData} themeOptions={themeOptions} sectionOrder={sectionOrder} />
    }
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <path d="M14 2v6h6"></path>
              <path d="M16 13H8"></path>
              <path d="M16 17H8"></path>
              <path d="M10 9H8"></path>
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Resume Preview</h2>
            <p className="text-gray-600 text-sm">See how your resume will look when printed</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => toPDF()}
            className="btn btn-primary"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Download PDF
          </button>
        </div>
      </div>
      
      <div className="relative mb-8 rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-gray-100 rounded-lg transform scale-[0.97] -z-10"></div>
        <div 
          ref={targetRef}
          className="resume-preview-container a4"
          style={{
            backgroundColor: themeOptions.backgroundColor,
            color: themeOptions.textColor,
            fontFamily: themeOptions.fontFamily === 'sans' 
              ? 'Inter, sans-serif' 
              : themeOptions.fontFamily === 'serif' 
                ? 'Merriweather, serif' 
                : 'Roboto Mono, monospace'
          }}
        >
          {renderTemplate()}
        </div>
      </div>
      
      <div className="mt-4 flex flex-col sm:flex-row items-center gap-4 justify-between border-t border-gray-100 pt-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 9l-5 5-5-5M12 12.8V2.5"></path>
            </svg>
          </div>
          <span className="text-sm text-gray-700">Share your resume with the world</span>
        </div>
        <DeployButton />
      </div>
    </div>
  )
}

export default ResumePreview