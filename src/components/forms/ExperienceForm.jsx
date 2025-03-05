import { v4 as uuidv4 } from 'uuid'

function ExperienceForm({ experience, onChange }) {
  const addExperience = () => {
    const newExperience = {
      id: uuidv4(),
      jobTitle: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      description: ""
    }
    onChange([...experience, newExperience])
  }

  const updateExperience = (id, field, value) => {
    const updatedExperience = experience.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    )
    onChange(updatedExperience)
  }

  const removeExperience = (id) => {
    const updatedExperience = experience.filter(exp => exp.id !== id)
    onChange(updatedExperience)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Work Experience</h2>
        <button 
          onClick={addExperience}
          className="btn bg-green-600 text-white hover:bg-green-700"
        >
          Add Experience
        </button>
      </div>
      
      {experience.length === 0 ? (
        <p className="text-gray-500 italic">No work experience added yet. Click "Add Experience" to get started.</p>
      ) : (
        <div className="space-y-6">
          {experience.map(exp => (
            <div key={exp.id} className="border border-gray-200 rounded-md p-4">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold">{exp.jobTitle || 'New Position'}</h3>
                <button 
                  onClick={() => removeExperience(exp.id)}
                  className="p-1 text-red-600 hover:text-red-800"
                  aria-label="Remove experience"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Job Title
                  </label>
                  <input
                    type="text"
                    value={exp.jobTitle || ''}
                    onChange={(e) => updateExperience(exp.id, 'jobTitle', e.target.value)}
                    className="input-field"
                    placeholder="Software Developer"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    value={exp.company || ''}
                    onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                    className="input-field"
                    placeholder="Tech Company Inc."
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
                    value={exp.location || ''}
                    onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                    className="input-field"
                    placeholder="San Francisco, CA"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="month"
                    value={exp.startDate || ''}
                    onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                    className="input-field"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <input
                    type="month"
                    value={exp.endDate || ''}
                    onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                    className="input-field"
                    placeholder="Present"
                  />
                  <div className="mt-1">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={exp.endDate === 'Present'}
                        onChange={(e) => {
                          updateExperience(exp.id, 'endDate', e.target.checked ? 'Present' : '')
                        }}
                        className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      />
                      <span className="ml-2 text-sm text-gray-600">Current Position</span>
                    </label>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={exp.description || ''}
                  onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                  rows="3"
                  className="input-field"
                  placeholder="Describe your responsibilities and achievements"
                ></textarea>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ExperienceForm