
// import { create } from 'zustand'
// import { v4 as uuidv4 } from 'uuid'
// import { persist } from 'zustand/middleware'

// const useResumeStore = create(
//   persist(
//     (set) => ({
//       isSidebarCollapsed: false,
//       activeTargetSection: null,
//       pageMargins: {
//         top: 20,
//         bottom: 20,
//         left: 20,
//         right: 20
//       },
//       resumeData: {
//         personalInfo: {
//           name: 'Your Name',
//           title: 'Professional Title',
//           email: 'email@example.com',
//           phone: '(123) 456-7890',
//           location: 'City, State',
//           website: 'yourwebsite.com',
//           summary: 'Professional summary goes here. Highlight your skills, experience, and career goals concisely.'
//         },
//         skills: [
//           'Skill 1',
//           'Skill 2',
//           'Skill 3',
//           'Skill 4',
//           'Skill 5',
//           'Skill 6'
//         ],
//         experience: [
//           {
//             id: uuidv4(),
//             title: 'Job Title',
//             company: 'Company Name',
//             location: 'City, State',
//             startDate: '2020-01',
//             endDate: 'Present',
//             current: true,
//             description: 'Job description and achievements.'
//           }
//         ],
//         education: [
//           {
//             id: uuidv4(),
//             degree: 'Degree Name',
//             institution: 'Institution Name',
//             location: 'City, State',
//             startDate: '2016-09',
//             endDate: '2020-05',
//             description: 'Education details and achievements.'
//           }
//         ],
//         customSections: []
//       },
//       sectionOrder: [
//         { id: 'personalInfo', title: 'Personal Info' },
//         { id: 'skills', title: 'Skills' },
//         { id: 'experience', title: 'Experience' },
//         { id: 'education', title: 'Education' }
//       ],

//       // Update personal info
//       updatePersonalInfo: (personalInfo) =>
//         set((state) => ({
//           resumeData: {
//             ...state.resumeData,
//             personalInfo
//           }
//         })),

//       // Update skills
//       updateSkills: (skills) =>
//         set((state) => ({
//           resumeData: {
//             ...state.resumeData,
//             skills
//           }
//         })),

//       // Update experience
//       updateExperience: (experience) =>
//         set((state) => ({
//           resumeData: {
//             ...state.resumeData,
//             experience
//           }
//         })),

//       // Update education
//       updateEducation: (education) =>
//         set((state) => ({
//           resumeData: {
//             ...state.resumeData,
//             education
//           }
//         })),

//       // Update custom sections
//       updateCustomSections: (customSections) =>
//         set((state) => {
//           // Get current section IDs from sectionOrder
//           const existingSectionIds = new Set(
//             state.sectionOrder
//               .filter(section => section.id.startsWith('customSection-'))
//               .map(section => section.id.replace('customSection-', ''))
//           )

//           // Find new sections that need to be added to sectionOrder
//           const sectionsToAdd = customSections
//             .filter(section => !existingSectionIds.has(section.id))
//             .map(section => ({
//               id: `customSection-${section.id}`,
//               title: section.title
//             }))

//           // Get updated sectionOrder with removed custom sections
//           const updatedSectionOrder = state.sectionOrder.filter(section => {
//             if (!section.id.startsWith('customSection-')) return true
//             const sectionId = section.id.replace('customSection-', '')
//             return customSections.some(cs => cs.id === sectionId)
//           })

//           return {
//             resumeData: {
//               ...state.resumeData,
//               customSections
//             },
//             sectionOrder: [...updatedSectionOrder, ...sectionsToAdd]
//           }
//         }),

//       updateSectionOrder: (newOrder) =>
//         set((state) => {
//           // Update custom sections order in resumeData based on the new order
//           const customSectionIds = newOrder
//             .filter(section => section.id.startsWith('customSection-'))
//             .map(section => section.id.replace('customSection-', ''))

//           const reorderedCustomSections = customSectionIds
//             .map(id => state.resumeData.customSections.find(section => section.id === id))
//             .filter(Boolean)

//           return {
//             sectionOrder: newOrder,
//             resumeData: {
//               ...state.resumeData,
//               customSections: reorderedCustomSections
//             }
//           }
//         }),

//       toggleSidebar: () =>
//         set((state) => ({
//           isSidebarCollapsed: !state.isSidebarCollapsed
//         })),
        
//       setActiveTargetSection: (sectionId) =>
//         set(() => ({
//           activeTargetSection: sectionId
//         })),
        
//       updatePageMargins: (margins) =>
//         set((state) => ({
//           pageMargins: { ...state.pageMargins, ...margins }
//         }))
//     }),
//     {
//       name: 'resume-storage'
//     }
//   )
// )

// export default useResumeStore

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