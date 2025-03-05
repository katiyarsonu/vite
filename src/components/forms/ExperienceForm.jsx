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
                  <div className="relative">
                    <input
                      type="date"
                      value={exp.startDate || ''}
                      onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                      className="input-field w-full pr-10"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  {exp.endDate !== 'Present' ? (
                    <div className="relative">
                      <input
                        type="date"
                        value={exp.endDate || ''}
                        onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                        className="input-field w-full pr-10"
                        disabled={exp.endDate === 'Present'}
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  ) : (
                    <div className="input-field bg-gray-100">Present</div>
                  )}
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
                <div className="mt-2 flex gap-2">
                  <button
                    type="button"
                    className="px-3 py-1 bg-purple-600 text-white text-sm rounded hover:bg-purple-700 transition-colors"
                  >
                    Generate with AI
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const bullets = exp.bullets || [];
                      updateExperience(exp.id, 'bullets', [...bullets, { id: uuidv4(), text: '', checked: true }]);
                    }}
                    className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
                  >
                    Add Bullet
                  </button>
                </div>
                
                {/* Bullet Points */}
                {exp.bullets && exp.bullets.length > 0 && (
                  <div className="mt-3 space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Bullet Points</label>
                    {exp.bullets.map((bullet, index) => (
                      <div key={bullet.id} className="flex items-start gap-2">
                        <input
                          type="checkbox"
                          checked={bullet.checked}
                          onChange={() => {
                            const updatedBullets = [...exp.bullets];
                            updatedBullets[index] = { ...bullet, checked: !bullet.checked };
                            updateExperience(exp.id, 'bullets', updatedBullets);
                          }}
                          className="mt-1"
                        />
                        <input
                          type="text"
                          value={bullet.text}
                          onChange={(e) => {
                            const updatedBullets = [...exp.bullets];
                            updatedBullets[index] = { ...bullet, text: e.target.value };
                            updateExperience(exp.id, 'bullets', updatedBullets);
                          }}
                          className="flex-grow input-field py-1"
                          placeholder="Bullet point"
                        />
                        <div className="flex space-x-1">
                          <button
                            type="button"
                            onClick={() => {
                              const updatedBullets = [...exp.bullets];
                              updatedBullets.splice(index, 1);
                              updateExperience(exp.id, 'bullets', updatedBullets);
                            }}
                            className="p-1 text-red-600 hover:text-red-800"
                            aria-label="Delete bullet"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          </button>
                          <button
                            type="button"
                            className="p-1 text-purple-600 hover:text-purple-800"
                            aria-label="Generate with AI"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M13.5 9.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 1 0v-3a.5.5 0 0 0-.5-.5z"/>
                              <path d="M10 2.5c-1.8 0-3.5.9-4.6 2.4v-.9H4.3v.8c-1.1 1.5-1.7 3.4-1.7 5.2 0 4.9 4 8.9 8.9 8.9s8.9-4 8.9-8.9-4-8.9-8.9-8.9h-.5zM5.8 9.6c0-.6.5-1.1 1.1-1.1s1.1.5 1.1 1.1-.5 1.1-1.1 1.1-1.1-.5-1.1-1.1zm6.3 0c0-.6.5-1.1 1.1-1.1s1.1.5 1.1 1.1-.5 1.1-1.1 1.1-1.1-.5-1.1-1.1zM10 15.3c-2.3 0-4.3-1.6-4.8-3.7h9.6c-.5 2.1-2.5 3.7-4.8 3.7z"/>
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ExperienceForm