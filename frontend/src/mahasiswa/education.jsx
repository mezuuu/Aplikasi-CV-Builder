import { useCV } from './CVContext';

export default function EducationForm() {
    const { state, addEducation, updateEducation, removeEducation, nextStep, prevStep } = useCV();
    const { education } = state;

    const handleChange = (id, field, value) => {
        updateEducation(id, { [field]: value });
    };

    // Shared input class for dark theme
    const inputClass = "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 focus:bg-white/10 outline-none transition-all duration-300";
    const labelClass = "block text-sm font-medium text-white/70 mb-2";

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-white">
                    Share your{' '}
                    <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        education
                    </span>
                </h1>
                <p className="text-white/50 mt-2 text-sm">
                    Add your academic background 🎓
                </p>
            </div>

            {/* Add Button */}
            <button
                onClick={addEducation}
                className="flex items-center gap-2 text-purple-400 hover:text-pink-400 font-medium transition-colors group"
            >
                <div className="w-8 h-8 rounded-full bg-purple-500/20 group-hover:bg-pink-500/20 flex items-center justify-center transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                    </svg>
                </div>
                Add Education
            </button>

            {/* Education Items */}
            {education.map((edu, index) => (
                <div key={edu.id} className="glass rounded-2xl p-6 relative group">
                    {/* Remove Button */}
                    <button
                        onClick={() => removeEducation(edu.id)}
                        className="absolute top-4 right-4 text-white/30 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                        title="Remove"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>

                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 flex items-center justify-center text-lg">
                            🎓
                        </div>
                        <span className="text-white/60 text-sm font-medium">Education {index + 1}</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                        {/* School */}
                        <div>
                            <label className={labelClass}>School / University</label>
                            <input
                                type="text"
                                value={edu.school}
                                onChange={(e) => handleChange(edu.id, 'school', e.target.value)}
                                className={inputClass}
                                placeholder="Universitas Indonesia"
                            />
                        </div>

                        {/* Degree */}
                        <div>
                            <label className={labelClass}>Degree</label>
                            <input
                                type="text"
                                value={edu.degree}
                                onChange={(e) => handleChange(edu.id, 'degree', e.target.value)}
                                className={inputClass}
                                placeholder="Bachelor of Computer Science"
                            />
                        </div>

                        {/* Graduation Date */}
                        <div>
                            <label className={labelClass}>Graduation Year</label>
                            <input
                                type="text"
                                value={edu.graduationDate}
                                onChange={(e) => handleChange(edu.id, 'graduationDate', e.target.value)}
                                className={inputClass}
                                placeholder="2024"
                            />
                        </div>

                        {/* City */}
                        <div>
                            <label className={labelClass}>City</label>
                            <input
                                type="text"
                                value={edu.city}
                                onChange={(e) => handleChange(edu.id, 'city', e.target.value)}
                                className={inputClass}
                                placeholder="Jakarta"
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="mt-4">
                        <label className={labelClass}>Description</label>
                        <textarea
                            value={edu.description}
                            onChange={(e) => handleChange(edu.id, 'description', e.target.value)}
                            rows={3}
                            className={`${inputClass} resize-none`}
                            placeholder="Key achievements, GPA, relevant coursework..."
                        />
                    </div>
                </div>
            ))}

            {/* Empty state */}
            {education.length === 0 && (
                <div className="glass rounded-2xl p-12 text-center">
                    <div className="text-5xl mb-4">🎓</div>
                    <p className="text-white/50">No education added yet</p>
                    <p className="text-white/30 text-sm mt-1">Click "Add Education" to get started</p>
                </div>
            )}

            {/* Help Text */}
            <p className="text-sm text-white/30">
                💡 Include your highest degree first, along with relevant achievements.
            </p>

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
                    Continue to Skills
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
