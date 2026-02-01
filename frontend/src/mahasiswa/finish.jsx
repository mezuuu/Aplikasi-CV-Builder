import { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useCV } from './CVContext';
import Preview from './Preview';

export default function FinishForm() {
    const { state, prevStep, setStep, updateContact } = useCV();
    const { contact, experience, education, skills, about } = state;
    const previewRef = useRef(null);
    const [isSaving, setIsSaving] = useState(false);
    const [saveStatus, setSaveStatus] = useState(null);

    const handlePrint = useReactToPrint({
        contentRef: previewRef,
        documentTitle: `CV_${contact.firstName}_${contact.lastName}`.replace(/\s+/g, '_') || 'My_CV',
        pageStyle: `
            @page {
                size: 215.9mm 330mm;
                margin: 0;
            }
            @media print {
                html, body {
                    width: 215.9mm;
                    height: 330mm;
                    margin: 0;
                    padding: 0;
                }
            }
        `,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        updateContact({ [name]: value });
    };

    // Summary counts
    const experienceCount = experience.length;
    const educationCount = education.length;
    const skillsCount = skills.length;
    const hasSummary = about.summary?.trim().length > 0;
    const hasContact = contact.firstName || contact.lastName || contact.email;

    // Shared input class for dark theme
    const inputClass = "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 focus:bg-white/10 outline-none transition-all duration-300";
    const selectClass = "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 focus:bg-white/10 outline-none transition-all duration-300 appearance-none cursor-pointer";
    const labelClass = "block text-sm font-medium text-white/70 mb-2";

    return (
        <div className="space-y-6">
            {/* Header with celebration */}
            <div className="text-center">
                <div className="text-5xl mb-3">🎉</div>
                <h1 className="text-3xl font-bold text-white">
                    Awesome! Your{' '}
                    <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        CV is ready
                    </span>
                </h1>
                <p className="text-white/50 mt-2 text-sm">
                    Review your details and download as PDF ✨
                </p>
            </div>

            {/* Summary Stats - Glass Card */}
            <div className="glass rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <span>📊</span> CV Summary
                </h2>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                    <div className="bg-white/5 p-4 rounded-xl text-center group hover:bg-white/10 transition-all cursor-pointer" onClick={() => setStep(0)}>
                        <div className={`text-2xl font-bold ${hasContact ? 'text-green-400' : 'text-white/30'}`}>
                            {hasContact ? '✓' : '—'}
                        </div>
                        <div className="text-xs text-white/50 mt-1">Contact</div>
                    </div>
                    <div className="bg-white/5 p-4 rounded-xl text-center group hover:bg-white/10 transition-all cursor-pointer" onClick={() => setStep(1)}>
                        <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            {experienceCount}
                        </div>
                        <div className="text-xs text-white/50 mt-1">Experience</div>
                    </div>
                    <div className="bg-white/5 p-4 rounded-xl text-center group hover:bg-white/10 transition-all cursor-pointer" onClick={() => setStep(2)}>
                        <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            {educationCount}
                        </div>
                        <div className="text-xs text-white/50 mt-1">Education</div>
                    </div>
                    <div className="bg-white/5 p-4 rounded-xl text-center group hover:bg-white/10 transition-all cursor-pointer" onClick={() => setStep(3)}>
                        <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            {skillsCount}
                        </div>
                        <div className="text-xs text-white/50 mt-1">Skills</div>
                    </div>
                    <div className="bg-white/5 p-4 rounded-xl text-center group hover:bg-white/10 transition-all cursor-pointer" onClick={() => setStep(4)}>
                        <div className={`text-2xl font-bold ${hasSummary ? 'text-green-400' : 'text-white/30'}`}>
                            {hasSummary ? '✓' : '—'}
                        </div>
                        <div className="text-xs text-white/50 mt-1">Summary</div>
                    </div>
                </div>
                <p className="text-xs text-white/30 mt-3 text-center">
                    Click any section to edit
                </p>
            </div>

            {/* Optional Personal Details - Glass Card */}
            <div className="glass rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                    <span>⚙️</span> Optional Details
                </h2>
                <p className="text-sm text-white/40 mb-4">
                    These will appear in your CV sidebar
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Nationality */}
                    <div>
                        <label htmlFor="nationality" className={labelClass}>Nationality</label>
                        <input
                            type="text"
                            id="nationality"
                            name="nationality"
                            value={contact.nationality || ''}
                            onChange={handleChange}
                            className={inputClass}
                            placeholder="Indonesian"
                        />
                    </div>

                    {/* Visa Status */}
                    <div className="relative">
                        <label htmlFor="visaStatus" className={labelClass}>Visa Status</label>
                        <select
                            id="visaStatus"
                            name="visaStatus"
                            value={contact.visaStatus || ''}
                            onChange={handleChange}
                            className={selectClass}
                        >
                            <option value="" className="bg-[#1a1a2e]">Select...</option>
                            <option value="Citizen" className="bg-[#1a1a2e]">Citizen</option>
                            <option value="Permanent Resident" className="bg-[#1a1a2e]">Permanent Resident</option>
                            <option value="Work Visa" className="bg-[#1a1a2e]">Work Visa</option>
                            <option value="Student Visa" className="bg-[#1a1a2e]">Student Visa</option>
                        </select>
                        <div className="absolute right-4 top-[42px] pointer-events-none text-white/40">
                            ▼
                        </div>
                    </div>

                    {/* Marital Status */}
                    <div className="relative">
                        <label htmlFor="maritalStatus" className={labelClass}>Marital Status</label>
                        <select
                            id="maritalStatus"
                            name="maritalStatus"
                            value={contact.maritalStatus || ''}
                            onChange={handleChange}
                            className={selectClass}
                        >
                            <option value="" className="bg-[#1a1a2e]">Select...</option>
                            <option value="Single" className="bg-[#1a1a2e]">Single</option>
                            <option value="Married" className="bg-[#1a1a2e]">Married</option>
                            <option value="Divorced" className="bg-[#1a1a2e]">Divorced</option>
                        </select>
                        <div className="absolute right-4 top-[42px] pointer-events-none text-white/40">
                            ▼
                        </div>
                    </div>
                </div>
            </div>

            {/* Download Button - Primary Action */}
            <div className="pt-2">
                <button
                    onClick={handlePrint}
                    className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-xl shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 hover:-translate-y-1"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                    </svg>
                    Download CV as PDF
                </button>
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
                    Back to About
                </button>

                <button
                    onClick={() => setStep(0)}
                    className="flex items-center gap-2 text-purple-400 hover:text-pink-400 font-medium transition-colors"
                >
                    Start Over
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>

            {/* Hidden Preview for Print */}
            <div className="hidden">
                <Preview ref={previewRef} forPrint={true} />
            </div>
        </div>
    );
}
