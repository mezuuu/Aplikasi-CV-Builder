import { useCV } from './CVContext';

const steps = [
    { label: 'Contact', index: 0 },
    { label: 'Experience', index: 1 },
    { label: 'Education', index: 2 },
    { label: 'Skills', index: 3 },
    { label: 'About', index: 4 },
    { label: 'Finish', index: 5 },
];

// SVG Icons matching the screenshot style
const StepIcon = ({ type, isActive, isCompleted }) => {
    const baseClass = "w-5 h-5";
    const color = isActive || isCompleted ? "white" : "rgba(255,255,255,0.6)";

    const icons = {
        Contact: (
            <svg className={baseClass} fill={color} viewBox="0 0 24 24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
            </svg>
        ),
        Experience: (
            <svg className={baseClass} fill={color} viewBox="0 0 24 24">
                <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" />
            </svg>
        ),
        Education: (
            <svg className={baseClass} fill={color} viewBox="0 0 24 24">
                <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
            </svg>
        ),
        Skills: (
            <svg className={baseClass} fill={color} viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
        ),
        About: (
            <svg className={baseClass} fill={color} viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
        ),
        Finish: (
            <svg className={baseClass} fill={color} viewBox="0 0 24 24">
                <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
            </svg>
        ),
    };

    return icons[type] || null;
};

export default function StepIndicator() {
    const { state, setStep } = useCV();
    const { currentStep } = state;

    return (
        <div className="bg-[#0f0f23] py-8 px-4 border-b border-white/5">
            <div className="relative max-w-2xl mx-auto">
                {/* Progress line - behind icons */}
                <div className="absolute top-6 left-[5%] right-[5%] h-0.5 bg-white/10 z-0" />

                {/* Active progress line */}
                <div
                    className="absolute top-6 left-[5%] h-0.5 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 z-0 transition-all duration-500"
                    style={{
                        width: `${(currentStep / (steps.length - 1.5)) * 80}%`,
                    }}
                />

                {/* Step buttons */}
                <div className="relative flex justify-between items-start z-10">
                    {steps.map((step) => {
                        const isActive = step.index === currentStep;
                        const isCompleted = step.index < currentStep;

                        return (
                            <button
                                key={step.index}
                                onClick={() => setStep(step.index)}
                                className="flex flex-col items-center gap-3 group"
                            >
                                {/* Icon container */}
                                <div
                                    className={`
                                        relative z-20 w-12 h-12 rounded-full flex items-center justify-center
                                        transition-all duration-300 ease-out
                                        ${isActive
                                            ? 'bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 shadow-lg shadow-purple-500/40 scale-105'
                                            : isCompleted
                                                ? 'bg-gradient-to-br from-cyan-500/80 to-purple-600/80'
                                                : 'bg-[#1a1a3e] border border-white/10 group-hover:border-purple-500/50'
                                        }
                                    `}
                                >
                                    {isCompleted ? (
                                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    ) : (
                                        <StepIcon
                                            type={step.label}
                                            isActive={isActive}
                                            isCompleted={isCompleted}
                                        />
                                    )}
                                </div>

                                {/* Label */}
                                <span
                                    className={`
                                        text-xs font-medium transition-all duration-200 whitespace-nowrap
                                        ${isActive
                                            ? 'text-white'
                                            : isCompleted
                                                ? 'text-cyan-400'
                                                : 'text-white/40 group-hover:text-white/70'
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
        </div>
    );
}
