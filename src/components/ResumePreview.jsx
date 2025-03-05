import { useRef, useEffect } from 'react'
import ModernTemplate from './templates/ModernTemplate'
import ClassicTemplate from './templates/ClassicTemplate'
import { usePDF } from 'react-to-pdf'
import DeployButton from './DeployButton'
import useResumeStore from '../store/resumeStore'

function ResumePreview({ template, themeOptions }) {
  const { resumeData, sectionOrder, activeTargetSection, pageMargins } = useResumeStore()
  const resumeRef = useRef(null)
  const previewContainerRef = useRef(null)
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

  // Effect to scroll to the active target section
  useEffect(() => {
    if (activeTargetSection && previewContainerRef.current) {
      const targetElement = previewContainerRef.current.querySelector(`[data-section-id="${activeTargetSection}"]`);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [activeTargetSection]);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Resume Preview</h2>
        <div className="flex gap-2">
          <button 
            onClick={() => toPDF()}
            className="btn bg-blue-600 text-white hover:bg-blue-700"
          >
            Download PDF
          </button>
        </div>
      </div>
      
      <div 
        ref={(node) => {
          targetRef(node);
          previewContainerRef.current = node;
        }}
        className="resume-preview-container a4"
        style={{
          backgroundColor: themeOptions.backgroundColor,
          color: themeOptions.textColor,
          fontFamily: themeOptions.fontFamily === 'sans' 
            ? 'Inter, sans-serif' 
            : themeOptions.fontFamily === 'serif' 
              ? 'Merriweather, serif' 
              : 'Roboto Mono, monospace',
          padding: `${pageMargins.top}mm ${pageMargins.right}mm ${pageMargins.bottom}mm ${pageMargins.left}mm`
        }}
      >
        {renderTemplate()}
      </div>
      
      <DeployButton />
    </div>
  )
}

export default ResumePreview