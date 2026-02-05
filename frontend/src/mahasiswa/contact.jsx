import { useCV } from './CVContext';
import { useRef } from 'react';

export default function ContactForm() {
    const { state, updateContact, nextStep } = useCV();
    const { contact } = state;
    const fileInputRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        updateContact({ [name]: value });
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                alert('Please select an image file');
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                alert('Image size must be less than 5MB');
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                updateContact({ photo: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemovePhoto = () => {
        updateContact({ photo: null });
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    // Shared input class for dark theme
    const inputClass = "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 focus:bg-white/10 outline-none transition-all duration-300";
    const labelClass = "block text-sm font-medium text-white/70 mb-2";

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-white">
                    Let's start with your{' '}
                    <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        contact
                    </span>{' '}
                    info
                </h1>
                <p className="text-white/50 mt-2 text-sm">
                    Add your details so recruiters can reach you easily
                </p>
            </div>

            {/* Profile Photo Upload - Glass Card */}
            <div className="glass rounded-2xl p-6">
                <label className={labelClass}>Profile Photo</label>
                <div className="flex items-center gap-6">
                    {/* Photo Preview */}
                    <div className="relative group">
                        <div className="w-28 h-28 rounded-2xl border-2 border-purple-500/50 flex items-center justify-center overflow-hidden bg-white/5 transition-all group-hover:border-purple-400">
                            {contact.photo ? (
                                <img
                                    src={contact.photo}
                                    alt="Profile Preview"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <svg className="w-12 h-12 text-white/30" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                </svg>
                            )}
                        </div>
                        {/* Gradient border effect */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity" />
                    </div>

                    {/* Upload Controls */}
                    <div className="flex flex-col gap-3">
                        <input
                            type="file"
                            ref={fileInputRef}
                            accept="image/*"
                            onChange={handlePhotoChange}
                            className="hidden"
                            id="photo-upload"
                        />
                        <label
                            htmlFor="photo-upload"
                            className="cursor-pointer inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-5 py-2.5 rounded-xl font-medium transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/30 text-sm"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {contact.photo ? 'Change Photo' : 'Upload Photo'}
                        </label>
                        {contact.photo && (
                            <button
                                type="button"
                                onClick={handleRemovePhoto}
                                className="inline-flex items-center gap-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 px-5 py-2.5 rounded-xl font-medium transition-all duration-200 text-sm border border-red-500/30"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Remove
                            </button>
                        )}
                        <p className="text-xs text-white/40">Max 5MB, JPG/PNG recommended</p>
                    </div>
                </div>
            </div>

            {/* Form Fields - Glass Card */}
            <div className="glass rounded-2xl p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                    {/* First Name */}
                    <div>
                        <label htmlFor="firstName" className={labelClass}>First Name</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={contact.firstName}
                            onChange={handleChange}
                            className={inputClass}
                            placeholder="Mezuu"
                        />
                    </div>

                    {/* Last Name */}
                    <div>
                        <label htmlFor="lastName" className={labelClass}>Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={contact.lastName}
                            onChange={handleChange}
                            className={inputClass}
                            placeholder="Dev"
                        />
                    </div>

                    {/* City */}
                    <div>
                        <label htmlFor="city" className={labelClass}>City</label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            value={contact.city}
                            onChange={handleChange}
                            className={inputClass}
                            placeholder="Jakarta"
                        />
                    </div>

                    {/* Postal Code */}
                    <div>
                        <label htmlFor="postalCode" className={labelClass}>Postal Code</label>
                        <input
                            type="text"
                            id="postalCode"
                            name="postalCode"
                            value={contact.postalCode}
                            onChange={handleChange}
                            className={inputClass}
                            placeholder="12345"
                        />
                    </div>

                    {/* Date of Birth */}
                    <div>
                        <label htmlFor="dateOfBirth" className={labelClass}>Date of Birth</label>
                        <input
                            type="date"
                            id="dateOfBirth"
                            name="dateOfBirth"
                            value={contact.dateOfBirth}
                            onChange={handleChange}
                            className={inputClass}
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className={labelClass}>Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={contact.email}
                            onChange={handleChange}
                            className={inputClass}
                            placeholder="mezuu@example.com"
                        />
                    </div>

                    {/* Phone - Full Width */}
                    <div className="md:col-span-2">
                        <label htmlFor="phone" className={labelClass}>Phone Number</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={contact.phone}
                            onChange={handleChange}
                            className={inputClass}
                            placeholder="+62 812 3456 7890"
                        />
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-end pt-4">
                <button
                    onClick={nextStep}
                    className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/30 hover:-translate-y-0.5"
                >
                    Continue to Experience
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
