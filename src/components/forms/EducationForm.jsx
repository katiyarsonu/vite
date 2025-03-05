import { v4 as uuidv4 } from 'uuid'

function EducationForm({ education, onChange }) {
  const addEducation = () => {
    const newEducation = {
      id: uuidv4(),
      degree: "",
      institution: "",
      location: "",
      startDate: "",
      endDate: "",
      description: ""
    }
    onChange([...education, newEducation])
  }

  const updateEducation = (id, field, value) => {
    const updatedEducation = education.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    )
    onChange(updatedEducation)
  }

  const removeEducation = (id) => {
    const updatedEducation = education.filter(edu => edu.id !== id)
    onChange(updatedEducation)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Education</h2>
        <button 
          onClick={addEducation}
          className="btn bg-green-600 text-white hover:bg-green-700"
        >
          Add Education
        </button>
      </div>
      
      {education.length === 0 ? (
        <p className="text-gray-500 italic">No education added yet. Click "Add Education" to get started.</p>
      ) : (
        <div className="space-y-6">
          {education.map(edu => (
            <div key={edu.id} className="border border-gray-200 rounded-md p-4">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold">{edu.degree || 'New Education'}</h3>
                <button 
                  onClick={() => removeEducation(edu.id)}
                  className="p-1 text-red-600 hover:text-red-800"
                  aria-label="Remove education"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Degree
                  </label>
                  <input
                    type="text"
                    value={edu.degree || ''}
                    onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                    className="input-field"
                    placeholder="Bachelor of Science in Computer Science"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Institution
                  </label>
                  <input
                    type="text"
                    value={edu.institution || ''}
                    onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                    className="input-field"
                    placeholder="University Name"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={edu.location || ''}
                    onChange={(e) => updateEducation(edu.id, 'location', e.target.value)}
                    className="input-field"
                    placeholder="City, State"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="month"
                    value={edu.startDate || ''}
                    onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                    className="input-field"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <input
                    type="month"
                    value={edu.endDate || ''}
                    onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                    className="input-field"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={edu.description || ''}
                  onChange={(e) => updateEducation(edu.id, 'description', e.target.value)}
                  rows="3"
                  className="input-field"
                  placeholder="Describe your studies, achievements, etc."
                ></textarea>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default EducationForm