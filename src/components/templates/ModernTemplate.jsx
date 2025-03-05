function ModernTemplate({ data, themeOptions, sectionOrder = [] }) {
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

  // Render a section based on its type
  const renderSection = (sectionId) => {
    // Ensure sectionId is a string
    const sectionKey = String(sectionId?.id || sectionId || '');
    
    // Handle standard sections
    if (sectionKey === 'personalInfo' && personalInfo.summary) {
      return (
        <section key={sectionKey} className="mb-6">
          <h2 className="text-lg font-bold mb-2 pb-1 border-b-2" style={{ borderColor: themeOptions.primaryColor }}>
            Professional Summary
          </h2>
          <p>{personalInfo.summary}</p>
        </section>
      );
    }
    
    if (sectionKey === 'skills' && skills.length > 0) {
      return (
        <section key={sectionKey} className="mb-6">
          <h2 className="text-lg font-bold mb-2 pb-1 border-b-2" style={{ borderColor: themeOptions.primaryColor }}>
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map(skill => (
              <span 
                key={skill.id} 
                className="px-3 py-1 rounded-full text-sm"
                style={{ 
                  backgroundColor: `${themeOptions.primaryColor}20`,
                  color: themeOptions.textColor
                }}
              >
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      );
    }
    
    if (sectionKey === 'experience' && experience.length > 0) {
      return (
        <section key={sectionKey} className="mb-6">
          <h2 className="text-lg font-bold mb-2 pb-1 border-b-2" style={{ borderColor: themeOptions.primaryColor }}>
            Work Experience
          </h2>
          <div className="space-y-4">
            {experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{exp.jobTitle}</h3>
                    <p className="text-sm">
                      {exp.company}
                      {exp.location && ` • ${exp.location}`}
                    </p>
                  </div>
                  <p className="text-sm">
                    {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                  </p>
                </div>
                <p className="mt-1 text-sm">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      );
    }
    
    if (sectionKey === 'education' && education.length > 0) {
      return (
        <section key={sectionKey} className="mb-6">
          <h2 className="text-lg font-bold mb-2 pb-1 border-b-2" style={{ borderColor: themeOptions.primaryColor }}>
            Education
          </h2>
          <div className="space-y-4">
            {education.map(edu => (
              <div key={edu.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{edu.degree}</h3>
                    <p className="text-sm">
                      {edu.institution}
                      {edu.location && ` • ${edu.location}`}
                    </p>
                  </div>
                  <p className="text-sm">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </p>
                </div>
                {edu.description && <p className="mt-1 text-sm">{edu.description}</p>}
              </div>
            ))}
          </div>
        </section>
      );
    }
    
    // Handle custom sections
    if (sectionKey.startsWith('customSection-')) {
      const customSectionId = sectionKey.replace('customSection-', '');
      const customSection = customSections.find(section => section.id === customSectionId);
      
      if (customSection && customSection.items && customSection.items.length > 0) {
        return (
          <section key={sectionKey} className="mb-6">
            <h2 className="text-lg font-bold mb-2 pb-1 border-b-2" style={{ borderColor: themeOptions.primaryColor }}>
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

  // Use provided section order or generate default order
  const sectionsToRender = sectionOrder.length > 0 
    ? sectionOrder 
    : [
        'personalInfo',
        'skills',
        'experience',
        'education',
        ...customSections.map(section => `customSection-${section.id}`)
      ];

  return (
    <div className="p-8">
      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2" style={{ color: themeOptions.primaryColor }}>
          {personalInfo.name || ''}
        </h1>
        <p className="text-xl mb-3">{personalInfo.title || ''}</p>
        <div className="flex flex-wrap justify-center gap-3 text-sm">
          {personalInfo.email && (
            <span>{personalInfo.email}</span>
          )}
          {personalInfo.phone && (
            <span>{personalInfo.phone}</span>
          )}
          {personalInfo.address && (
            <span>{personalInfo.address}</span>
          )}
        </div>
      </header>

      {/* Render sections in the specified order */}
      {sectionsToRender.map(section => renderSection(section))}
    </div>
  );
}

export default ModernTemplate;