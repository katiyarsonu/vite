import React from 'react';

const ClassicTemplate = ({ data, themeOptions, sectionOrder }) => {
  const { personalInfo, skills, experience, education, customSections } = data;

  // Helper to render section based on ID
  const renderSection = (sectionId) => {
    if (sectionId === 'personalInfo') {
      return null; // Personal info is already at the top
    } else if (sectionId === 'skills') {
      return <SkillsSection skills={skills} themeOptions={themeOptions} />;
    } else if (sectionId === 'experience') {
      return <ExperienceSection experience={experience} themeOptions={themeOptions} />;
    } else if (sectionId === 'education') {
      return <EducationSection education={education} themeOptions={themeOptions} />;
    } else if (sectionId.startsWith('customSection-')) {
      const customSectionId = sectionId.replace('customSection-', '');
      const section = customSections.find(s => s.id === customSectionId);
      if (section) {
        return <CustomSection section={section} themeOptions={themeOptions} />;
      }
    }
    return null;
  };

  return (
    <div className="classic-template p-8 h-full">
      {/* Header */}
      <header className="text-center mb-6" data-section-id="personalInfo">
        <h1 className="text-2xl font-bold uppercase tracking-wide mb-1" style={{ color: themeOptions.accentColor }}>
          {personalInfo?.name || 'Your Name'}
        </h1>
        <p className="text-lg mb-2">{personalInfo?.title || 'Your Title'}</p>

        <div className="flex justify-center flex-wrap text-sm gap-x-4">
          {personalInfo?.email && <div>{personalInfo.email}</div>}
          {personalInfo?.phone && <div>|</div>}
          {personalInfo?.phone && <div>{personalInfo.phone}</div>}
          {personalInfo?.address && <div>|</div>}
          {personalInfo?.address && <div>{personalInfo.address}</div>}
        </div>

        {personalInfo?.summary && (
          <p className="mt-4 text-sm mx-auto max-w-2xl">{personalInfo.summary}</p>
        )}
      </header>

      {/* Main Content */}
      <main>
        {sectionOrder.map((section) => (
          <React.Fragment key={section.id}>
            {renderSection(section.id)}
          </React.Fragment>
        ))}
      </main>
    </div>
  );
};

// Skills Section Component
const SkillsSection = ({ skills, themeOptions }) => {
  if (!skills || skills.length === 0) return null;

  return (
    <section className="mb-6" data-section-id="skills">
      <h2 className="text-lg font-bold uppercase mb-2 border-b pb-1" style={{ borderColor: themeOptions.accentColor }}>
        Skills
      </h2>
      <div className="flex flex-wrap gap-x-4 gap-y-1">
        {skills.map(skill => (
          <span key={skill.id} className="text-sm">
            {skill.name}
          </span>
        ))}
      </div>
    </section>
  );
};

// Experience Section Component
const ExperienceSection = ({ experience, themeOptions }) => {
  if (!experience || experience.length === 0) return null;

  return (
    <section className="mb-6" data-section-id="experience">
      <h2 className="text-lg font-bold uppercase mb-2 border-b pb-1" style={{ borderColor: themeOptions.accentColor }}>
        Work Experience
      </h2>

      <div className="space-y-4">
        {experience.map(exp => (
          <div key={exp.id}>
            <div className="flex justify-between font-semibold">
              <div>
                {exp.jobTitle} at {exp.company}
              </div>
              <div className="text-sm">
                {exp.startDate && (
                  <>
                    {formatDate(exp.startDate)} - {exp.endDate === 'Present' ? 'Present' : formatDate(exp.endDate)}
                  </>
                )}
              </div>
            </div>

            {exp.location && <p className="text-sm italic">{exp.location}</p>}

            {exp.description && <p className="text-sm mt-1">{exp.description}</p>}

            {/* Render Bullet Points */}
            {exp.bullets && exp.bullets.length > 0 && (
              <ul className="list-disc list-outside ml-5 mt-1 text-sm">
                {exp.bullets
                  .filter(bullet => bullet.checked)
                  .map(bullet => (
                    <li key={bullet.id}>{bullet.text}</li>
                  ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

// Education Section Component
const EducationSection = ({ education, themeOptions }) => {
  if (!education || education.length === 0) return null;

  return (
    <section className="mb-6" data-section-id="education">
      <h2 className="text-lg font-bold uppercase mb-2 border-b pb-1" style={{ borderColor: themeOptions.accentColor }}>
        Education
      </h2>

      <div className="space-y-4">
        {education.map(edu => (
          <div key={edu.id}>
            <div className="flex justify-between font-semibold">
              <div>
                {edu.degree}
              </div>
              <div className="text-sm">
                {edu.startDate && (
                  <>
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </>
                )}
              </div>
            </div>

            <p className="text-sm">{edu.institution}{edu.location ? `, ${edu.location}` : ''}</p>

            {edu.description && <p className="text-sm mt-1">{edu.description}</p>}

            {/* Render Bullet Points */}
            {edu.bullets && edu.bullets.length > 0 && (
              <ul className="list-disc list-outside ml-5 mt-1 text-sm">
                {edu.bullets
                  .filter(bullet => bullet.checked)
                  .map(bullet => (
                    <li key={bullet.id}>{bullet.text}</li>
                  ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

// Custom Section Component
const CustomSection = ({ section, themeOptions }) => {
  if (!section || !section.items || section.items.length === 0) return null;

  return (
    <section className="mb-6" data-section-id={section.id}>
      <h2 className="text-lg font-bold uppercase mb-2 border-b pb-1" style={{ borderColor: themeOptions.accentColor }}>
        {section.title}
      </h2>

      <div className="space-y-3">
        {section.items.map(item => (
          <div key={item.id}>
            {item.title && <h3 className="font-semibold">{item.title}</h3>}

            {item.description && <p className="text-sm mt-1">{item.description}</p>}

            {/* Render Bullet Points */}
            {item.bullets && item.bullets.length > 0 && (
              <ul className="list-disc list-outside ml-5 mt-1 text-sm">
                {item.bullets
                  .filter(bullet => bullet.checked)
                  .map(bullet => (
                    <li key={bullet.id}>{bullet.text}</li>
                  ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

// Helper function to format dates
const formatDate = (dateString) => {
  if (!dateString) return '';

  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  } catch (e) {
    return dateString;
  }
};

export default ClassicTemplate;