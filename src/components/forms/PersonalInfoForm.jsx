function PersonalInfoForm({ data, onChange }) {
  // Add a default empty object if data is undefined
  const safeData = data || {};
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({
      ...safeData,
      [name]: value
    });
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Personal Information</h2>

      {/* Full Name */}
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Full Name
        </label>
        <input
          id="name"
          type="text"
          name="name"
          value={safeData.name || ''}
          onChange={handleChange}
          className="input-field w-full"
          placeholder="John Doe"
        />
      </div>

      {/* Professional Title */}
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Professional Title
        </label>
        <input
          id="title"
          type="text"
          name="title"
          value={safeData.title || ''}
          onChange={handleChange}
          className="input-field w-full"
          placeholder="Software Developer"
        />
      </div>

      {/* Email */}
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          value={safeData.email || ''}
          onChange={handleChange}
          className="input-field w-full"
          placeholder="john.doe@example.com"
          required
        />
      </div>

      {/* Phone */}
      <div className="mb-4">
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
          Phone
        </label>
        <input
          id="phone"
          type="tel"
          name="phone"
          value={safeData.phone || ''}
          onChange={handleChange}
          className="input-field w-full"
          placeholder="(123) 456-7890"
          pattern="^[0-9-+\s()]*$"
          required
        />
      </div>

      {/* Address */}
      <div className="mb-4">
        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
          Address
        </label>
        <input
          id="address"
          type="text"
          name="address"
          value={safeData.address || ''}
          onChange={handleChange}
          className="input-field w-full"
          placeholder="San Francisco, CA"
        />
      </div>

      {/* Professional Summary */}
      <div className="mb-4">
        <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-1">
          Professional Summary
        </label>
        <textarea
          id="summary"
          name="summary"
          value={safeData.summary || ''}
          onChange={handleChange}
          rows="4"
          className="input-field w-full"
          placeholder="Brief overview of your professional background and key strengths"
        ></textarea>
        <button
          type="button"
          className="mt-2 px-3 py-1 bg-purple-600 text-white text-sm rounded hover:bg-purple-700 transition-colors"
        >
          Generate with AI
        </button>
      </div>
    </div>
  );
}

export default PersonalInfoForm;