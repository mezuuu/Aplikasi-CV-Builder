import { useCV } from './CVContext';

export default function AboutForm() {
    const { state, updateAbout, nextStep, prevStep } = useCV();
    const { about } = state;

    const handleChange = (field, value) => {
        updateAbout({ [field]: value });
    };

    // Shared input class for dark theme
    const inputClass = "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 focus:bg-white/10 outline-none transition-all duration-300";
    const labelClass = "block text-sm font-medium text-white/70 mb-2";

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-white">
                    Tell us{' '}
                    <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        about you
                    </span>
                </h1>
                <p className="text-white/50 mt-2 text-sm">
                    Write a compelling summary that showcases who you are 📝
                </p>
            </div>

            {/* Summary Textarea - Glass Card */}
            <div className="glass rounded-2xl p-6">
                <label htmlFor="summary" className={labelClass}>Professional Summary</label>
                <p className="text-white/40 text-xs mb-3">Write 2-4 sentences about your experience, strengths, and career goals.</p>
                <textarea
                    id="summary"
                    value={about.summary || ''}
                    onChange={(e) => handleChange('summary', e.target.value)}
                    rows={6}
                    className={`${inputClass} resize-none`}
                    placeholder="I'm a passionate developer with 2+ years of experience building web applications..."
                />
                <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-white/30">
                        {(about.summary || '').length} characters
                    </span>
                    <span className="text-xs text-white/30">
                        Recommended: 100-300 characters
                    </span>
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
                    Finish & Download
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
