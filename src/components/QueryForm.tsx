'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function QueryForm() {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState({
    message: '',
    isError: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({ message: '', isError: false }); // Reset status
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.contact,
          email: formData.email,
          message: formData.message,
          serviceType: 'General Query',
          serviceDetail: 'Query Form Submission'
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      // Clear form on success
      setFormData({
        name: '',
        contact: '',
        email: '',
        message: ''
      });
      setStatus({ 
        message: 'Message sent successfully! We will get back to you soon.',
        isError: false 
      });
      
    } catch (error) {
      console.error('Error details:', error);
      setStatus({ 
        message: `Failed to send message: ${error instanceof Error ? error.message : 'Unknown error'}`,
        isError: true 
      });
    }
  };

  return (
    <div className="w-full md:w-[720px] min-h-[570px] bg-[#FAFAFA] border-[0.3px] border-[#8F8F8F] rounded-[25px] md:rounded-[50px] px-6 py-4 md:p-8">
      {/* Header */}
      <div className="flex items-center gap-2 md:gap-4 mb-4 md:mb-6">
        <div className="relative w-[24px] h-[24px] md:w-[29px] md:h-[29px]">
          <Image 
            src="/icons/query.svg"
            alt="Query"
            fill
            className="object-contain"
          />
        </div>
        <div className="w-[3px] md:w-[4px] h-[35px] md:h-[41px] bg-[#F22929] rounded-full" />
        <h2 className="text-[#152C40] text-[16px] md:text-[20px] font-bold">
          Submit your Query
        </h2>
      </div>

      {/* Status Message */}
      {status.message && (
        <div className={`mb-4 p-2 md:p-3 rounded-lg text-center text-sm md:text-base ${
          status.isError 
            ? 'bg-red-100 text-red-700' 
            : 'bg-green-100 text-green-700'
        }`}>
          {status.message}
        </div>
      )}

      {/* Form Fields */}
      <form className="space-y-4 md:space-y-[22px] mt-8 md:mt-12" onSubmit={handleSubmit}>
        <div className="space-y-1">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full h-[40px] md:h-[43px] px-4 md:px-6 rounded-[25px] md:rounded-[50px] 
                     border-[0.3px] border-[#8F8F8F] bg-[#F5F5F5]
                     focus:outline-none focus:border-[#152C40]
                     placeholder:text-[#8F8F8F] text-[13px] md:text-[14px]"
          />
        </div>

        <div className="space-y-1">
          <input
            type="tel"
            name="contact"
            placeholder="Contact Number"
            value={formData.contact}
            onChange={handleChange}
            className="w-full h-[40px] md:h-[43px] px-4 md:px-6 rounded-[25px] md:rounded-[50px] 
                     border-[0.3px] border-[#8F8F8F] bg-[#F5F5F5]
                     focus:outline-none focus:border-[#152C40]
                     placeholder:text-[#8F8F8F] text-[13px] md:text-[14px]"
          />
        </div>

        <div className="space-y-1">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full h-[40px] md:h-[43px] px-4 md:px-6 rounded-[25px] md:rounded-[50px] 
                     border-[0.3px] border-[#8F8F8F] bg-[#F5F5F5]
                     focus:outline-none focus:border-[#152C40]
                     placeholder:text-[#8F8F8F] text-[13px] md:text-[14px]"
          />
        </div>

        <div className="space-y-1">
          <textarea
            name="message"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
            className="w-full h-[120px] md:h-[141px] px-4 md:px-6 py-3 md:py-4 rounded-[25px] md:rounded-[35px] 
                     border-[0.3px] border-[#8F8F8F] bg-[#F5F5F5]
                     focus:outline-none focus:border-[#152C40] resize-none
                     placeholder:text-[#8F8F8F] text-[13px] md:text-[14px]"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-16 md:mt-24">
          <button
            type="submit"
            className="w-[140px] md:w-[165px] h-[40px] md:h-[43px] bg-[#152C40] text-white text-[14px] md:text-[16px]
                     rounded-[25px] md:rounded-[50px] hover:bg-[#1c3b57] transition-colors"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
} 