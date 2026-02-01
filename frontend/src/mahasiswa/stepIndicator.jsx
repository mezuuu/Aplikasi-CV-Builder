import { useCV } from './CVContext';

const steps = [
    { label: 'Contact', icon: '👤', index: 0 },
    { label: 'Experience', icon: '💼', index: 1 },
    { label: 'Education', icon: '🎓', index: 2 },
    { label: 'Skills', icon: '⚡', index: 3 },
    { label: 'About', icon: '📝', index: 4 },
    { label: 'Finish', icon: '🎉', index: 5 },
];

export default function StepIndicator() {
    const { state, setStep } = useCV();
    const { currentStep } = state;

    // Calculate progress percentage
    const progressPercent = (currentStep / (steps.length - 1)) * 100;

    return (
        <div className="bg-gradient-to-r from-purple-900/80 via-indigo-900/80 to-purple-900/80 backdrop-blur-xl py-6 px-6 border-b border-white/10">
            {/* Progress bar container */}
            <div className="relative max-w-3xl mx-auto">
                {/* Background track */}
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-white/10 rounded-full -translate-y-1/2" />

                {/* Active progress bar with glow */}
                <div
                    className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 rounded-full -translate-y-1/2 transition-all duration-500 ease-out"
                    style={{
                        width: `${progressPercent}%`,
                        boxShadow: '0 0 20px rgba(168, 85, 247, 0.5)'
                    }}
                />

                {/* Step buttons */}
                <div className="relative flex justify-between items-center">
                    {steps.map((step) => {
                        const isActive = step.index === currentStep;
                        const isCompleted = step.index < currentStep;

                        return (
                            <button
                                key={step.index}
                                onClick={() => setStep(step.index)}
                                className="flex flex-col items-center gap-2 group"
                            >
                                {/* Step circle */}
                                <div
                                    className={`
                                        relative w-10 h-10 rounded-full flex items-center justify-center text-lg
                                        transition-all duration-300 ease-out
                                        ${isActive
                                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 scale-110 shadow-lg shadow-purple-500/50'
                                            : isCompleted
                                                ? 'bg-gradient-to-r from-purple-500/80 to-pink-500/80'
                                                : 'bg-white/10 group-hover:bg-white/20'
                                        }
                                    `}
                                >
                                    {isCompleted ? (
                                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    ) : (
                                        <span>{step.icon}</span>
                                    )}

                                    {/* Pulse effect for active */}
                                    {isActive && (
                                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-ping opacity-30" />
                                    )}
                                </div>

                                {/* Label */}
                                <span
                                    className={`
                                        text-xs font-medium transition-all duration-200 whitespace-nowrap
                                        ${isActive
                                            ? 'text-white'
                                            : isCompleted
                                                ? 'text-purple-300'
                                                : 'text-white/50 group-hover:text-white/80'
                                        }
                                    `}
                                >
                                    {step.label}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Current step title - Mobile */}
            <div className="mt-4 text-center lg:hidden">
                <span className="text-white/60 text-sm">Step {currentStep + 1} of {steps.length}</span>
                <h2 className="text-white font-semibold">{steps[currentStep]?.label}</h2>
            </div>
        </div>
    );
}
