function ClassicTemplate({ data, themeOptions, sectionOrder = [] }) {
  // Add safety checks for undefined data
  const safeData = data || {};
  const personalInfo = safeData.personalInfo || {};
  const skills = safeData.skills || [];
  const experience = safeData.experience || [];
  const education = safeData.education || [];
  const customSections = safeData.customSections || [];
  
  const formatDate = (dateString) => {
    if (!dateString) return '';
    if (dateString === 'Present') return 'Present';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
    } catch (e) {
      return dateString;
    }
  };

  // Determine which sections go in which column
  const getColumnSections = () => {
    // Use provided section order or generate default order
    const allSections = sectionOrder.length > 0 
      ? sectionOrder 
      : [
          'personalInfo',
          'skills',
          'experience',
          'education',
          ...customSections.map(section => `customSection-${section.id}`)
        ];
    
    // Decide which sections go in which column
    // By default, put skills and custom sections in the right column
    const leftColumnSections = [];
    const rightColumnSections = [];
    
    allSections.forEach(sectionId => {
      if (sectionId === 'skills' || sectionId.startsWith('customSection-')) {
        rightColumnSections.push(sectionId);
      } else {
        leftColumnSections.push(sectionId);
      }
    });
    
    return { leftColumnSections, rightColumnSections };
  };

  // Render a section based on its type
  const renderSection = (sectionId) => {
    // Handle standard sections
    if (sectionId === 'personalInfo' && personalInfo.summary) {
      return (
        <section key={sectionId} className="mb-6">
          <h2 className="text-lg font-bold uppercase mb-2" style={{ color: themeOptions.primaryColor }}>
            Professional Summary
          </h2>
          <p>{personalInfo.summary}</p>
        </section>
      );
    }
    
    if (sectionId === 'skills' && skills.length > 0) {
      return (
        <section key={sectionId} className="mb-6">
          <h2 className="text-lg font-bold uppercase mb-3" style={{ color: themeOptions.primaryColor }}>
            Skills
          </h2>
          <ul className="list-disc list-inside space-y-1">
            {skills.map(skill => (
              <li key={skill.id}>{skill.name}</li>
            ))}
          </ul>
        </section>
      );
    }
    
    if (sectionId === 'experience' && experience.length > 0) {
      return (
        <section key={sectionId} className="mb-6">
          <h2 className="text-lg font-bold uppercase mb-3" style={{ color: themeOptions.primaryColor }}>
            Work Experience
          </h2>
          <div className="space-y-4">
            {experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold">{exp.jobTitle}</h3>
                  <p className="text-sm italic">
                    {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                  </p>
                </div>
                <p className="text-sm font-medium">{exp.company}{exp.location && `, ${exp.location}`}</p>
                <p className="mt-1 text-sm">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      );
    }
    
    if (sectionId === 'education' && education.length > 0) {
      return (
        <section key={sectionId} className="mb-6">
          <h2 className="text-lg font-bold uppercase mb-3" style={{ color: themeOptions.primaryColor }}>
            Education
          </h2>
          <div className="space-y-4">
            {education.map(edu => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold">{edu.degree}</h3>
                  <p className="text-sm italic">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </p>
                </div>
                <p className="text-sm font-medium">{edu.institution}{edu.location && `, ${edu.location}`}</p>
                {edu.description && <p className="mt-1 text-sm">{edu.description}</p>}
              </div>
            ))}
          </div>
        </section>
      );
    }
    
    // Handle custom sections
    if (sectionId.startsWith('customSection-')) {
      const customSectionId = sectionId.replace('customSection-', '');
      const customSection = customSections.find(section => section.id === customSectionId);
      
      if (customSection && customSection.items && customSection.items.length > 0) {
        return (
          <section key={sectionId} className="mb-6">
            <h2 className="text-lg font-bold uppercase mb-3" style={{ color: themeOptions.primaryColor }}>
              {customSection.title}
            </h2>
            <div className="space-y-3">
              {customSection.items.map(item => (
                <div key={item.id}>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </section>
        );
      }
    }
    
    return null;
  };

  const { leftColumnSections, rightColumnSections } = getColumnSections();

  return (
    <div className="p-8">
      {/* Header */}
      <header className="mb-6 border-b-2 pb-4" style={{ borderColor: themeOptions.primaryColor }}>
        <h1 className="text-3xl font-bold uppercase tracking-wider mb-1">
          {personalInfo.name || ''}
        </h1>
        <p className="text-xl mb-2">{personalInfo.title || ''}</p>
        <div className="flex flex-wrap gap-4 text-sm">
          {personalInfo.email && (
            <div className="flex items-center gap-1">
              <span>Email:</span>
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-1">
              <span>Phone:</span>
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.address && (
            <div className="flex items-center gap-1">
              <span>Location:</span>
              <span>{personalInfo.address}</span>
            </div>
          )}
        </div>
      </header>

      {/* Two-column layout */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left column */}
        <div className="md:w-2/3">
          {leftColumnSections.map(sectionId => renderSection(sectionId))}
        </div>

        {/* Right column */}
        <div className="md:w-1/3">
          {rightColumnSections.map(sectionId => renderSection(sectionId))}
        </div>
      </div>
    </div>
  );
}

export default ClassicTemplate;