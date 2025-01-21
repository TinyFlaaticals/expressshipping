'use client';

import { useState } from 'react';

interface EmailData {
  name: string;
  email: string;
  contact: string;
  message: string;
  service: string;
}

const QueryForm = ({ serviceId = '', serviceTitle = '' }) => {
  const [formData, setFormData] = useState<EmailData>({
    name: '',
    email: '',
    contact: '',
    message: '',
    service: serviceId,
  });

  const [status, setStatus] = useState<{
    message: string;
    isError: boolean;
  }>({
    message: '',
    isError: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.contact || !formData.message) {
      setStatus({
        message: "Please fill in all fields",
        isError: true
      });
      return;
    }

    try {
      setStatus({ message: "Sending...", isError: false });
      
      const response = await fetch('/api/email', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server response:', response.status, errorText);
        throw new Error(`Server error: ${response.status}`);
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Invalid response type from server');
      }

      const data = await response.json();

      if (data.success) {
        setStatus({ message: data.message || "Message sent successfully!", isError: false });
        setFormData({ name: '', email: '', contact: '', message: '', service: serviceId });
      } else {
        throw new Error(data.error || 'Failed to send message');
      }
      
    } catch (error) {
      console.error('Form submission error:', error);
      setStatus({
        message: error instanceof Error ? error.message : "An error occurred. Please try again later.",
        isError: true
      });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {status.message && (
        <div className={`p-3 rounded-lg text-center ${
          status.isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
        }`}>
          {status.message}
        </div>
      )}
      
      {serviceTitle && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-800">Selected Service:</h3>
          <p className="text-gray-600">{serviceTitle}</p>
        </div>
      )}
      
      <div className="space-y-4">
        <input
          type="hidden"
          name="service"
          value={formData.service}
        />
        
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        
        <input
          type="tel"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          placeholder="Contact Number"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Message"
          className="w-full p-3 border border-gray-300 rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          required
        />
      </div>
      
      <button
        type="submit"
        className="w-full bg-[#152C40] text-white py-3 rounded-lg hover:bg-[#1c3b57] 
                 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={status.message === "Sending..."}
      >
        {status.message === "Sending..." ? "Sending..." : "Submit"}
      </button>
    </form>
  );
};

export default QueryForm;