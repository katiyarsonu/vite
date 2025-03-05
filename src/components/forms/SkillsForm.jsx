import { v4 as uuidv4 } from 'uuid'

function SkillsForm({ skills, onChange }) {
  const addSkill = () => {
    const newSkill = {
      id: uuidv4(),
      name: ""
    }
    onChange([...skills, newSkill])
  }

  const updateSkill = (id, name) => {
    const updatedSkills = skills.map(skill => 
      skill.id === id ? { ...skill, name } : skill
    )
    onChange(updatedSkills)
  }

  const removeSkill = (id) => {
    const updatedSkills = skills.filter(skill => skill.id !== id)
    onChange(updatedSkills)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Skills</h2>
        <button 
          onClick={addSkill}
          className="btn bg-green-600 text-white hover:bg-green-700"
        >
          Add Skill
        </button>
      </div>
      
      {skills.length === 0 ? (
        <p className="text-gray-500 italic">No skills added yet. Click "Add Skill" to get started.</p>
      ) : (
        <div className="space-y-3">
          {skills.map(skill => (
            <div key={skill.id} className="flex items-center gap-2">
              <input
                type="text"
                value={skill.name}
                onChange={(e) => updateSkill(skill.id, e.target.value)}
                className="input-field"
                placeholder="e.g., JavaScript, Project Management, etc."
              />
              <button 
                onClick={() => removeSkill(skill.id)}
                className="p-2 text-red-600 hover:text-red-800"
                aria-label="Remove skill"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SkillsForm