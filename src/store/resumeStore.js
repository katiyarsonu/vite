import { create } from 'zustand'
import { defaultResumeData } from '../data/defaultData'

const useResumeStore = create((set) => ({
  resumeData: defaultResumeData,
  sectionOrder: [
    { id: 'personalInfo', title: 'Personal Info' },
    { id: 'skills', title: 'Skills' },
    { id: 'experience', title: 'Experience' },
    { id: 'education', title: 'Education' },
    ...(defaultResumeData.customSections || []).map(section => ({
      id: `customSection-${section.id}`,
      title: section.title
    }))
  ],
  isSidebarCollapsed: false,

  updatePersonalInfo: (personalInfo) => 
    set((state) => ({
      resumeData: { ...state.resumeData, personalInfo }
    })),

  updateSkills: (skills) =>
    set((state) => ({
      resumeData: { ...state.resumeData, skills }
    })),

  updateExperience: (experience) =>
    set((state) => ({
      resumeData: { ...state.resumeData, experience }
    })),

  updateEducation: (education) =>
    set((state) => ({
      resumeData: { ...state.resumeData, education }
    })),

  updateCustomSections: (customSections) =>
    set((state) => {
      const newSectionOrder = state.sectionOrder.filter(
        section => !section.id.startsWith('customSection-')
      )

      customSections.forEach(section => {
        newSectionOrder.push({
          id: `customSection-${section.id}`,
          title: section.title
        })
      })

      return {
        resumeData: { ...state.resumeData, customSections },
        sectionOrder: newSectionOrder
      }
    }),

  updateSectionOrder: (newOrder) =>
    set((state) => {
      // Update custom sections order in resumeData based on the new order
      const customSectionIds = newOrder
        .filter(section => section.id.startsWith('customSection-'))
        .map(section => section.id.replace('customSection-', ''))

      const reorderedCustomSections = customSectionIds
        .map(id => state.resumeData.customSections.find(section => section.id === id))
        .filter(Boolean)

      return {
        sectionOrder: newOrder,
        resumeData: {
          ...state.resumeData,
          customSections: reorderedCustomSections
        }
      }
    }),

  toggleSidebar: () =>
    set((state) => ({
      isSidebarCollapsed: !state.isSidebarCollapsed
    }))
}))

export default useResumeStore