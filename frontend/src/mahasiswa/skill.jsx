import { useCV } from './CVContext';

const LEVELS = [
    { value: 'beginner', label: 'Beginner', emoji: '🌱' },
    { value: 'skillful', label: 'Skillful', emoji: '🌿' },
    { value: 'experienced', label: 'Expert', emoji: '🌳' },
];

export default function SkillForm() {
    const { state, addSkill, updateSkill, removeSkill, updateSettings, nextStep, prevStep } = useCV();
    const { skills, settings } = state;

    const handleChange = (id, field, value) => {
        updateSkill(id, { [field]: value });
    };

    const getLevelIndex = (level) => {
        return LEVELS.findIndex((l) => l.value === level);
    };

    // Shared input class for dark theme
    const inputClass = "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 focus:bg-white/10 outline-none transition-all duration-300";

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-white">
                    Showcase your{' '}
                    <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        skills
                    </span>
                </h1>
                <p className="text-white/50 mt-2 text-sm">
                    Add skills that match the job you're applying for
                </p>
            </div>

            {/* Add Button */}
            <button
                onClick={addSkill}
                className="flex items-center gap-2 text-purple-400 hover:text-pink-400 font-medium transition-colors group"
            >
                <div className="w-8 h-8 rounded-full bg-purple-500/20 group-hover:bg-pink-500/20 flex items-center justify-center transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                    </svg>
                </div>
                Add Skill
            </button>

            {/* Skill Items */}
            <div className="space-y-3">
                {skills.map((skill, index) => (
                    <div key={skill.id} className="glass rounded-xl p-4 relative group">
                        <div className="flex flex-col md:flex-row gap-3 items-start md:items-end">
                            {/* Skill Name */}
                            <div className="flex-1 w-full md:w-auto">
                                <label className="block text-xs font-medium text-white/70 mb-1.5">
                                    Skill Name
                                </label>
                                <input
                                    type="text"
                                    value={skill.name}
                                    onChange={(e) => handleChange(skill.id, 'name', e.target.value)}
                                    className={inputClass}
                                    placeholder="React, Python, Figma..."
                                />
                            </div>

                            {/* Level Selector with Delete Button on Mobile */}
                            <div className="flex-1 w-full md:w-auto">
                                <label className="block text-xs font-medium text-white/70 mb-1.5">
                                    Level: <span className="text-purple-400">{LEVELS.find((l) => l.value === skill.level)?.label}</span>
                                </label>
                                <div className="flex gap-2 items-center">
                                    <div className="flex gap-1.5 flex-1">
                                        {LEVELS.map((level, levelIndex) => (
                                            <button
                                                key={level.value}
                                                onClick={() => handleChange(skill.id, 'level', level.value)}
                                                className={`
                                                    flex-1 py-2 px-2 rounded-lg text-xs font-medium transition-all duration-300
                                                    ${levelIndex <= getLevelIndex(skill.level)
                                                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30'
                                                        : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/80'
                                                    }
                                                `}
                                                title={level.label}
                                            >
                                                <span className="hidden sm:inline">{level.emoji}</span>
                                            </button>
                                        ))}
                                    </div>
                                    {/* Delete Button - Always visible on mobile, hover on desktop */}
                                    <button
                                        onClick={() => removeSkill(skill.id)}
                                        className="text-white/40 hover:text-red-400 transition-colors p-1.5 md:opacity-0 md:group-hover:opacity-100"
                                        title="Remove"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty state */}
            {skills.length === 0 && (
                <div className="glass rounded-2xl p-12 text-center">
                    <p className="text-white/50">No skills added yet</p>
                    <p className="text-white/30 text-sm mt-1">Click "Add Skill" to get started</p>
                </div>
            )}

            {/* Settings Toggles */}
            <div className="glass rounded-2xl p-5">
                <div className="flex flex-wrap gap-6">
                    {/* View as Tags Toggle */}
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <div
                            className={`relative w-12 h-6 rounded-full transition-all duration-300 ${settings.viewSkillsAsTags
                                ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                                : 'bg-white/10'
                                }`}
                            onClick={() => updateSettings({ viewSkillsAsTags: !settings.viewSkillsAsTags })}
                        >
                            <div
                                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-lg transition-transform duration-300 ${settings.viewSkillsAsTags ? 'translate-x-6' : 'translate-x-0'
                                    }`}
                            />
                        </div>
                        <span className="text-sm text-white/60 group-hover:text-white/80 transition-colors">Display as tags</span>
                    </label>

                    {/* Hide Level Toggle */}
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <div
                            className={`relative w-12 h-6 rounded-full transition-all duration-300 ${settings.hideExperienceLevel
                                ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                                : 'bg-white/10'
                                }`}
                            onClick={() => updateSettings({ hideExperienceLevel: !settings.hideExperienceLevel })}
                        >
                            <div
                                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-lg transition-transform duration-300 ${settings.hideExperienceLevel ? 'translate-x-6' : 'translate-x-0'
                                    }`}
                            />
                        </div>
                        <span className="text-sm text-white/60 group-hover:text-white/80 transition-colors">Hide skill levels</span>
                    </label>
                </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center pt-4">
                <button
                    onClick={prevStep}
                    className="flex items-center gap-2 text-white/60 hover:text-white font-medium transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Back
                </button>

                <button
                    onClick={nextStep}
                    className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/30 hover:-translate-y-0.5"
                >
                    Continue to About
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
