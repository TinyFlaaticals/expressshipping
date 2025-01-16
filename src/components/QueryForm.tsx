import { useState } from 'react';
import Image from 'next/image';

export default function QueryForm() {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-[398px] h-[613.25px] bg-[#FAFAFA] border-[0.3px] border-[#8F8F8F] rounded-[40px] p-5">
      {/* Header */}
      <div className="flex items-center gap-4 mt-6 mb-6">
        <div className="relative w-[29px] h-[29px]">
          <Image 
            src="/icons/query.svg"
            alt="Query"
            fill
            className="object-contain"
          />
        </div>
        <div className="w-[3px] h-[41px] bg-[#F22929] rounded-full" />
        <h2 className="text-[#152C40] text-[20px] font-bold">
          Submit your Query
        </h2>
      </div>

      {/* Form Fields */}
      <form className="space-y-[22px] mt-10">
        <div className="space-y-1">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-[356px] h-[43px] px-6 rounded-[50px] 
                     border-[0.3px] border-[#8F8F8F] bg-[#F5F5F5]
                     focus:outline-none focus:border-[#152C40]
                     placeholder:text-[#8F8F8F] text-[14px]"
          />
        </div>

        <div className="space-y-1">
          <input
            type="tel"
            name="contact"
            placeholder="Contact Number"
            value={formData.contact}
            onChange={handleChange}
            className="w-[356px] h-[43px] px-6 rounded-[50px] 
                     border-[0.3px] border-[#8F8F8F] bg-[#F5F5F5]
                     focus:outline-none focus:border-[#152C40]
                     placeholder:text-[#8F8F8F] text-[14px]"
          />
        </div>

        <div className="space-y-1">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-[356px] h-[43px] px-6 rounded-[50px] 
                     border-[0.3px] border-[#8F8F8F] bg-[#F5F5F5]
                     focus:outline-none focus:border-[#152C40]
                     placeholder:text-[#8F8F8F] text-[14px]"
          />
        </div>

        <div className="space-y-1">
          <textarea
            name="message"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
            className="w-[356px] h-[141px] px-6 py-4 rounded-[35px] 
                     border-[0.3px] border-[#8F8F8F] bg-[#F5F5F5]
                     focus:outline-none focus:border-[#152C40] resize-none
                     placeholder:text-[#8F8F8F] text-[14px]"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-[18px]">
          <button
            type="submit"
            className="w-[165px] h-[43px] bg-[#152C40] text-white text-[16px]
                     rounded-[50px] hover:bg-[#1c3b57] transition-colors"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
} 