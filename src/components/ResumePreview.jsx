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
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Resume Preview</h2>
        <div className="flex gap-2">
          <button 
            onClick={() => toPDF()}
            className="btn btn-primary"
          >
            Download PDF
          </button>
        </div>
      </div>

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

      <div className="mt-4 flex flex-col sm:flex-row items-center gap-4 justify-between border-t border-gray-100 pt-4">
        <div>
          <p className="text-sm text-gray-500">Share your resume with the world</p>
        </div>
        <DeployButton />
      </div>
    </div>
  )
}

export default ResumePreview