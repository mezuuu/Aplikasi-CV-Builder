import { forwardRef } from 'react';
import { useCV } from './CVContext';

const Preview = forwardRef(function Preview({ forPrint = false }, ref) {
    const { state } = useCV();
    const { contact, experience, education, skills, about, settings } = state;

    const fullName = `${contact.firstName} ${contact.lastName}`.trim() || 'YOUR NAME';

    // Format date of birth
    const formatDate = (dateString) => {
        if (!dateString) return '20-08-2004';
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' });
    };

    // Get skill level percentage
    const getLevelPercentage = (level) => {
        switch (level) {
            case 'beginner': return 33;
            case 'skillful': return 66;
            case 'experienced': return 100;
            default: return 50;
        }
    };

    // Modern color palette
    const colors = {
        primary: '#8B5CF6',      // Purple
        secondary: '#EC4899',    // Pink
        dark: '#1E1B4B',         // Deep purple-black
        sidebar: '#2D2A5A',      // Dark purple
        accent: '#A78BFA',       // Light purple
        light: '#FAFAFF',        // Off-white
        text: '#374151',         // Gray text
        textLight: '#9CA3AF',    // Light gray
    };

    return (
        <div className={forPrint ? '' : 'sticky top-8 w-full h-fit flex justify-center'}>
            {/* CV Paper - A4 Size - Modern Design */}
            <div
                ref={ref}
                className="overflow-hidden flex"
                style={{
                    width: forPrint ? '100%' : '380px',
                    height: forPrint ? '100%' : '580px',
                    fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                    boxShadow: forPrint ? 'none' : '0 25px 50px rgba(139, 92, 246, 0.15)',
                    borderRadius: forPrint ? '0' : '16px',
                }}
            >
                {/* Left Sidebar - Modern Gradient */}
                <div
                    style={{
                        width: '35%',
                        height: '100%',
                        background: `linear-gradient(180deg, ${colors.dark} 0%, ${colors.sidebar} 100%)`,
                        padding: forPrint ? '20mm 12mm' : '28px 16px',
                        color: 'white',
                    }}
                >
                    {/* Profile Photo with gradient border */}
                    <div className="flex justify-center" style={{ marginBottom: forPrint ? '16mm' : '22px' }}>
                        <div
                            style={{
                                width: forPrint ? '32mm' : '80px',
                                height: forPrint ? '32mm' : '80px',
                                borderRadius: '50%',
                                background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                                padding: '3px',
                            }}
                        >
                            <div
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: '50%',
                                    backgroundColor: colors.sidebar,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    overflow: 'hidden',
                                }}
                            >
                                {contact.photo ? (
                                    <img src={contact.photo} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                    <svg style={{ width: '60%', height: '60%', color: colors.accent }} fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                    </svg>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* About Me Section */}
                    <div style={{ marginBottom: forPrint ? '14mm' : '20px' }}>
                        <div
                            style={{
                                fontSize: forPrint ? '10pt' : '10px',
                                fontWeight: '700',
                                letterSpacing: '2px',
                                marginBottom: forPrint ? '4mm' : '8px',
                                color: colors.accent,
                            }}
                        >
                            ABOUT ME
                        </div>
                        <div
                            style={{
                                width: forPrint ? '8mm' : '20px',
                                height: '2px',
                                background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
                                marginBottom: forPrint ? '4mm' : '8px',
                                borderRadius: '2px',
                            }}
                        />
                        <p
                            style={{
                                fontSize: forPrint ? '9pt' : '8px',
                                lineHeight: '1.6',
                                color: 'rgba(255,255,255,0.8)',
                            }}
                        >
                            {about.summary || 'Creative and passionate individual seeking opportunities to grow and contribute.'}
                        </p>
                    </div>

                    {/* Personal Details */}
                    <div style={{ marginBottom: forPrint ? '14mm' : '20px' }}>
                        <div
                            style={{
                                fontSize: forPrint ? '10pt' : '10px',
                                fontWeight: '700',
                                letterSpacing: '2px',
                                marginBottom: forPrint ? '4mm' : '8px',
                                color: colors.accent,
                            }}
                        >
                            DETAILS
                        </div>
                        <div
                            style={{
                                width: forPrint ? '8mm' : '20px',
                                height: '2px',
                                background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
                                marginBottom: forPrint ? '4mm' : '8px',
                                borderRadius: '2px',
                            }}
                        />
                        <div style={{ fontSize: forPrint ? '8pt' : '7px' }}>
                            {[
                                { label: 'Birthday', value: formatDate(contact.dateOfBirth) },
                                { label: 'Nationality', value: contact.nationality || 'Indonesian' },
                                { label: 'Status', value: contact.maritalStatus || 'Single' },
                            ].map((item, i) => (
                                <div key={i} style={{ marginBottom: forPrint ? '3mm' : '6px' }}>
                                    <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: forPrint ? '7pt' : '6px' }}>{item.label}</div>
                                    <div style={{ color: colors.accent, fontWeight: '500' }}>{item.value}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Skills Section in Sidebar */}
                    <div>
                        <div
                            style={{
                                fontSize: forPrint ? '10pt' : '10px',
                                fontWeight: '700',
                                letterSpacing: '2px',
                                marginBottom: forPrint ? '4mm' : '8px',
                                color: colors.accent,
                            }}
                        >
                            SKILLS
                        </div>
                        <div
                            style={{
                                width: forPrint ? '8mm' : '20px',
                                height: '2px',
                                background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
                                marginBottom: forPrint ? '4mm' : '8px',
                                borderRadius: '2px',
                            }}
                        />
                        {settings.viewSkillsAsTags ? (
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: forPrint ? '2mm' : '4px' }}>
                                {skills.map((skill) => (
                                    <span
                                        key={skill.id}
                                        style={{
                                            background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                                            color: 'white',
                                            padding: forPrint ? '1.5mm 3mm' : '3px 6px',
                                            borderRadius: '10px',
                                            fontSize: forPrint ? '7pt' : '6px',
                                            fontWeight: '500',
                                        }}
                                    >
                                        {skill.name || 'Skill'}
                                    </span>
                                ))}
                            </div>
                        ) : (
                            <div style={{ fontSize: forPrint ? '8pt' : '7px' }}>
                                {skills.slice(0, 5).map((skill) => (
                                    <div key={skill.id} style={{ marginBottom: forPrint ? '3mm' : '5px' }}>
                                        <div style={{ color: 'white', marginBottom: '2px' }}>{skill.name || 'Skill'}</div>
                                        {!settings.hideExperienceLevel && (
                                            <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '10px', height: forPrint ? '2mm' : '4px', overflow: 'hidden' }}>
                                                <div
                                                    style={{
                                                        height: '100%',
                                                        width: `${getLevelPercentage(skill.level)}%`,
                                                        background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
                                                        borderRadius: '10px',
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Content - Clean White */}
                <div
                    style={{
                        width: '65%',
                        height: '100%',
                        backgroundColor: colors.light,
                        padding: forPrint ? '18mm 16mm' : '26px 20px',
                    }}
                >
                    {/* Header with Name */}
                    <div style={{ marginBottom: forPrint ? '8mm' : '16px' }}>
                        <h1
                            style={{
                                fontSize: forPrint ? '20pt' : '22px',
                                fontWeight: '800',
                                color: colors.dark,
                                letterSpacing: '1px',
                                marginBottom: forPrint ? '2mm' : '4px',
                            }}
                        >
                            {fullName.toUpperCase()}
                        </h1>
                        <div
                            style={{
                                width: forPrint ? '15mm' : '40px',
                                height: '3px',
                                background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
                                borderRadius: '2px',
                            }}
                        />
                    </div>

                    {/* Contact Info - Modern Pills */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: forPrint ? '2mm' : '5px', marginBottom: forPrint ? '10mm' : '16px' }}>
                        {[
                            { icon: '📍', value: contact.city || 'Yogyakarta' },
                            { icon: '📱', value: contact.phone || '+62 812 3456 789' },
                            { icon: '✉️', value: contact.email || 'email@example.com' },
                        ].map((item, i) => (
                            <div
                                key={i}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: forPrint ? '1.5mm' : '3px',
                                    backgroundColor: 'rgba(139, 92, 246, 0.1)',
                                    padding: forPrint ? '1.5mm 3mm' : '4px 8px',
                                    borderRadius: '20px',
                                    fontSize: forPrint ? '8pt' : '7px',
                                    color: colors.text,
                                }}
                            >
                                <span>{item.icon}</span>
                                <span>{item.value}</span>
                            </div>
                        ))}
                    </div>

                    {/* Work Experience */}
                    <div style={{ marginBottom: forPrint ? '10mm' : '14px' }}>
                        <div
                            style={{
                                fontSize: forPrint ? '11pt' : '11px',
                                fontWeight: '700',
                                color: colors.dark,
                                letterSpacing: '1px',
                                marginBottom: forPrint ? '3mm' : '6px',
                            }}
                        >
                            EXPERIENCE
                        </div>
                        <div
                            style={{
                                width: '100%',
                                height: '1px',
                                background: `linear-gradient(90deg, ${colors.primary}, transparent)`,
                                marginBottom: forPrint ? '4mm' : '8px',
                            }}
                        />
                        {experience.length > 0 ? (
                            experience.slice(0, 2).map((exp, index) => (
                                <div key={exp.id} style={{ marginBottom: forPrint ? '4mm' : '8px', position: 'relative', paddingLeft: forPrint ? '4mm' : '10px' }}>
                                    <div
                                        style={{
                                            position: 'absolute',
                                            left: 0,
                                            top: forPrint ? '1.5mm' : '4px',
                                            width: forPrint ? '2mm' : '5px',
                                            height: forPrint ? '2mm' : '5px',
                                            borderRadius: '50%',
                                            background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                                        }}
                                    />
                                    <div style={{ fontSize: forPrint ? '9pt' : '9px', fontWeight: '600', color: colors.dark }}>{exp.jobTitle || 'Job Title'}</div>
                                    <div style={{ fontSize: forPrint ? '8pt' : '7px', color: colors.primary, fontWeight: '500' }}>{exp.employer || 'Company'}</div>
                                    <div style={{ fontSize: forPrint ? '7pt' : '6px', color: colors.textLight }}>{exp.startDate || '2024'} - {exp.current ? 'Present' : (exp.endDate || '2024')}</div>
                                    {exp.description && (
                                        <div style={{ fontSize: forPrint ? '7pt' : '6px', color: colors.text, marginTop: '2px' }}>{exp.description.slice(0, 80)}...</div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p style={{ fontSize: forPrint ? '8pt' : '7px', color: colors.textLight, fontStyle: 'italic' }}>No experience added</p>
                        )}
                    </div>

                    {/* Education */}
                    <div>
                        <div
                            style={{
                                fontSize: forPrint ? '11pt' : '11px',
                                fontWeight: '700',
                                color: colors.dark,
                                letterSpacing: '1px',
                                marginBottom: forPrint ? '3mm' : '6px',
                            }}
                        >
                            EDUCATION
                        </div>
                        <div
                            style={{
                                width: '100%',
                                height: '1px',
                                background: `linear-gradient(90deg, ${colors.primary}, transparent)`,
                                marginBottom: forPrint ? '4mm' : '8px',
                            }}
                        />
                        {education.length > 0 ? (
                            education.slice(0, 2).map((edu) => (
                                <div key={edu.id} style={{ marginBottom: forPrint ? '4mm' : '8px', position: 'relative', paddingLeft: forPrint ? '4mm' : '10px' }}>
                                    <div
                                        style={{
                                            position: 'absolute',
                                            left: 0,
                                            top: forPrint ? '1.5mm' : '4px',
                                            width: forPrint ? '2mm' : '5px',
                                            height: forPrint ? '2mm' : '5px',
                                            borderRadius: '50%',
                                            background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                                        }}
                                    />
                                    <div style={{ fontSize: forPrint ? '9pt' : '9px', fontWeight: '600', color: colors.dark }}>{edu.degree || 'Degree'}</div>
                                    <div style={{ fontSize: forPrint ? '8pt' : '7px', color: colors.primary, fontWeight: '500' }}>{edu.school || 'University'}</div>
                                    <div style={{ fontSize: forPrint ? '7pt' : '6px', color: colors.textLight }}>{edu.graduationDate || '2024'} • {edu.city || 'City'}</div>
                                </div>
                            ))
                        ) : (
                            <p style={{ fontSize: forPrint ? '8pt' : '7px', color: colors.textLight, fontStyle: 'italic' }}>No education added</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Print Styles */}
            <style>{`
                @media print {
                    @page {
                        size: 215.9mm 330mm;
                        margin: 0 !important;
                        padding: 0 !important;
                    }
                    * {
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                        color-adjust: exact !important;
                    }
                    html, body {
                        margin: 0 !important;
                        padding: 0 !important;
                        width: 100% !important;
                        height: 100% !important;
                        overflow: hidden !important;
                    }
                }
            `}</style>
        </div>
    );
});

export default Preview;
