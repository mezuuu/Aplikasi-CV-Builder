import { useRef } from 'react';
import React from 'react';
import { CVProvider, useCV } from './CVContext';
import StepIndicator from './stepIndicator';
import Preview from './preview';
import ContactForm from './contact';
import ExperienceForm from './experience';
import EducationForm from './education';
import SkillForm from './skill';
import AboutForm from './about';
import FinishForm from './finish';

// Step components mapping
const STEP_COMPONENTS = [
    ContactForm,
    ExperienceForm,
    EducationForm,
    SkillForm,
    AboutForm,
    FinishForm,
];

function CVBuilderContent() {
    const { state } = useCV();
    const { currentStep } = state;
    const previewRef = useRef(null);

    // Get current step component
    const CurrentStepComponent = STEP_COMPONENTS[currentStep] || ContactForm;

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0f0f23] via-[#1a1a2e] to-[#0f0f23] flex flex-col relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute top-1/2 -left-40 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute -bottom-40 right-1/3 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
            </div>

            <div className="flex flex-col lg:flex-row flex-1 relative z-10">
                {/* Left Side - Form Area */}
                <div className="w-full lg:w-[55%] min-h-screen flex flex-col">
                    {/* Step Indicator Header */}
                    <StepIndicator />

                    {/* Form Content */}
                    <div className="flex-1 p-6 lg:p-10 lg:pr-12 overflow-y-auto">
                        <div className="animate-slide-up">
                            <CurrentStepComponent previewRef={previewRef} />
                        </div>
                    </div>

                    {/* Footer - Modern, no branding */}
                    <div className="bg-gradient-to-r from-purple-600/90 to-pink-600/90 backdrop-blur-lg text-white py-4 px-6 border-t border-white/10">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium opacity-90">Build your career story ✨</span>
                            <div className="flex items-center gap-2 text-xs opacity-70">
                                <p>Made By <span className="font-bold">Mezuu Dev</span> with Vite + React and Tailwind CSS</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Preview Area */}
                <div className="hidden lg:block w-[45%] bg-gradient-to-b from-[#1a1a2e] to-[#0f0f23] min-h-screen p-8 overflow-y-auto border-l border-white/5">
                    <div className="sticky top-8">
                        <h3 className="text-white/60 text-sm font-medium mb-4 uppercase tracking-wider">Live Preview</h3>
                        <div className="glass rounded-2xl p-4 shadow-2xl">
                            <Preview ref={previewRef} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Preview Toggle */}
            <div className="lg:hidden fixed bottom-6 right-6 z-50">
                <MobilePreviewButton previewRef={previewRef} />
            </div>
        </div>
    );
}

// Mobile preview button with modal
function MobilePreviewButton({ previewRef }) {
    const [showPreview, setShowPreview] = React.useState(false);

    return (
        <>
            <button
                onClick={() => setShowPreview(true)}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white p-4 rounded-2xl shadow-lg shadow-purple-500/30 transition-all hover:scale-105 hover:shadow-purple-500/50"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                </svg>
            </button>

            {/* Mobile Preview Modal */}
            {showPreview && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="glass-strong rounded-3xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto relative animate-slide-up">
                        <button
                            onClick={() => setShowPreview(false)}
                            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-white"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                        <h3 className="text-white font-semibold mb-4">CV Preview</h3>
                        <Preview ref={previewRef} />
                    </div>
                </div>
            )}
        </>
    );
}

// Main component with Provider wrapper
export default function CVBuilder() {
    return (
        <CVProvider>
            <CVBuilderContent />
        </CVProvider>
    );
}
