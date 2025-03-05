import { useState } from 'react'
import PersonalInfoForm from './forms/PersonalInfoForm'
import SkillsForm from './forms/SkillsForm'
import ExperienceForm from './forms/ExperienceForm'
import EducationForm from './forms/EducationForm'
import CustomSectionForm from './forms/CustomSectionForm'
import DraggableSections from './DraggableSections'
import { v4 as uuidv4 } from 'uuid'
import { FaArrowsAlt, FaEye, FaArrowRight } from 'react-icons/fa'
import useResumeStore from '../store/resumeStore'

function ResumeForm() {
  const [activeSection, setActiveSection] = useState('personalInfo')
  const [showReorderMode, setShowReorderMode] = useState(false)
  
  const {
    resumeData,
    sectionOrder,
    updatePersonalInfo,
    updateSkills,
    updateExperience,
    updateEducation,
    updateCustomSections,
    updateSectionOrder
  } = useResumeStore()

  const addCustomSection = () => {
    const newSection = {
      id: uuidv4(),
      title: "New Section",
      items: []
    }
    
    const updatedCustomSections = [...(resumeData.customSections || []), newSection]
    updateCustomSections(updatedCustomSections)
    setActiveSection(`customSection-${newSection.id}`)
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 relative">
      <div className="absolute top-4 right-4">
        <button 
          className={`p-2 rounded-full transition-colors ${showReorderMode ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}`}
          onClick={() => setShowReorderMode(!showReorderMode)}
          title={showReorderMode ? "Exit reorder mode" : "Reorder sections"}
        >
          <FaArrowsAlt />
        </button>
      </div>

      {showReorderMode ? (
        <DraggableSections 
          sections={sectionOrder} 
          onSectionOrderChange={updateSectionOrder} 
        />
      ) : (
        <>
          <div className="mb-6">
            <div className="flex flex-wrap gap-2 mb-4">
              <div className="flex items-center">
                <button 
                  className={`btn ${activeSection === 'personalInfo' ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => setActiveSection('personalInfo')}
                >
                  Personal Info
                </button>
                <button 
                  onClick={() => useResumeStore.getState().setActiveTargetSection('personalInfo')}
                  className="ml-1 p-1 text-blue-600 hover:text-blue-800 bg-gray-100 hover:bg-gray-200 rounded"
                  title="Locate in preview"
                >
                  <FaArrowRight size={14} />
                </button>
              </div>
              <div className="flex items-center">
                <button 
                  className={`btn ${activeSection === 'skills' ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => setActiveSection('skills')}
                >
                  Skills
                </button>
                <button 
                  onClick={() => useResumeStore.getState().setActiveTargetSection('skills')}
                  className="ml-1 p-1 text-blue-600 hover:text-blue-800 bg-gray-100 hover:bg-gray-200 rounded"
                  title="Locate in preview"
                >
                  <FaArrowRight size={14} />
                </button>
              </div>
              <div className="flex items-center">
                <button 
                  className={`btn ${activeSection === 'experience' ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => setActiveSection('experience')}
                >
                  Experience
                </button>
                <button 
                  onClick={() => useResumeStore.getState().setActiveTargetSection('experience')}
                  className="ml-1 p-1 text-blue-600 hover:text-blue-800 bg-gray-100 hover:bg-gray-200 rounded"
                  title="Locate in preview"
                >
                  <FaArrowRight size={14} />
                </button>
              </div>
              <div className="flex items-center">
                <button 
                  className={`btn ${activeSection === 'education' ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => setActiveSection('education')}
                >
                  Education
                </button>
                <button 
                  onClick={() => useResumeStore.getState().setActiveTargetSection('education')}
                  className="ml-1 p-1 text-blue-600 hover:text-blue-800 bg-gray-100 hover:bg-gray-200 rounded"
                  title="Locate in preview"
                >
                  <FaArrowRight size={14} />
                </button>
              </div>
              {resumeData.customSections.map(section => (
                <div className="flex items-center" key={section.id}>
                  <button 
                    className={`btn ${activeSection === `customSection-${section.id}` ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setActiveSection(`customSection-${section.id}`)}
                  >
                    {section.title}
                  </button>
                  <button 
                    onClick={() => useResumeStore.getState().setActiveTargetSection(`customSection-${section.id}`)}
                    className="ml-1 p-1 text-blue-600 hover:text-blue-800 bg-gray-100 hover:bg-gray-200 rounded"
                    title="Locate in preview"
                  >
                    <FaArrowRight size={14} />
                  </button>
                </div>
              ))}
              <button 
                className="btn bg-green-600 text-white hover:bg-green-700"
                onClick={addCustomSection}
              >
                + Add Section
              </button>
            </div>
          </div>

          <div className="form-container">
            {activeSection === 'personalInfo' && (
              <PersonalInfoForm 
                data={resumeData.personalInfo} 
                onChange={updatePersonalInfo} 
              />
            )}
            
            {activeSection === 'skills' && (
              <SkillsForm 
                skills={resumeData.skills} 
                onChange={updateSkills} 
              />
            )}
            
            {activeSection === 'experience' && (
              <ExperienceForm 
                experience={resumeData.experience} 
                onChange={updateExperience} 
              />
            )}
            
            {activeSection === 'education' && (
              <EducationForm 
                education={resumeData.education} 
                onChange={updateEducation} 
              />
            )}
            
            {activeSection.startsWith('customSection-') && (
              <CustomSectionForm 
                sections={resumeData.customSections}
                currentSectionId={activeSection.replace('customSection-', '')}
                onChange={updateCustomSections}
              />
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default ResumeForm