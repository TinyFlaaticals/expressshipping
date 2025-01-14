import { useState, useEffect } from 'react';

interface ServiceOption {
  type: string;
  details: string[];
}

const serviceOptions: ServiceOption[] = [
  {
    type: "Express Shipping",
    details: ["International", "Domestic", "Same Day", "Next Day"]
  },
  {
    type: "Freight Forwarding",
    details: ["Air Freight", "Sea Freight", "Land Freight", "Multi-modal"]
  },
  {
    type: "Customs Clearance",
    details: ["Import", "Export", "Transit", "Documentation"]
  }
];

interface QueryFormProps {
  initialService?: string;
  serviceDetails?: string[];
}

export default function QueryForm({ initialService, serviceDetails }: QueryFormProps) {
  // Add state variables
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [selectedDetail, setSelectedDetail] = useState('');
  const [availableDetails, setAvailableDetails] = useState<string[]>([]);
  
  // Add submitStatus state
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (initialService) {
      setSelectedService(initialService);
      
      // Find the corresponding service option and set its details
      const service = serviceOptions.find(s => s.type === initialService);
      if (service) {
        setAvailableDetails(serviceDetails || service.details);
      }
    }
  }, [initialService, serviceDetails]);

  useEffect(() => {
    const service = serviceOptions.find(s => s.type === selectedService);
    setAvailableDetails(service?.details || []);
    setSelectedDetail('');
  }, [selectedService]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          message,
          serviceType: selectedService,
          serviceDetail: selectedDetail
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        // Reset form
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
        setSelectedService('');
        setSelectedDetail('');
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
    }

    // Reset status after 3 seconds
    setTimeout(() => setSubmitStatus('idle'), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-8">
      <h3 className="text-[32px] font-black text-[#152C40]">
        SEND US A MESSAGE
      </h3>

      <div className="flex flex-col gap-5">
        <div className="input_container">
          <label className="text-[#6B7280] text-sm mb-2 block">
            Service Type
          </label>
          <div className="relative">
            <select
              id="serviceType"
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="w-full h-[50px] px-4 rounded-[30px] bg-[#F9FAFB] border border-[#E5E5E5]
                       appearance-none outline-none transition-all duration-300 
                       focus:border-[#152C40] focus:bg-white pr-12"
              required
            >
              <option value="">Select a Service</option>
              {serviceOptions.map((service) => (
                <option key={service.type} value={service.type}>
                  {service.type}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <div className="w-6 h-6 rounded-full bg-[#152C40] flex items-center justify-center">
                <svg 
                  width="14" 
                  height="14" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="white"
                  className="transform -rotate-90"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {selectedService && (
          <div className="input_container">
            <label className="text-[#6B7280] text-sm mb-2 block">
              Service Detail
            </label>
            <div className="relative">
              <select
                id="serviceDetail"
                value={selectedDetail}
                onChange={(e) => setSelectedDetail(e.target.value)}
                className="w-full h-[50px] px-4 rounded-[30px] bg-[#F9FAFB] border border-[#E5E5E5]
                         appearance-none outline-none transition-all duration-300 
                         focus:border-[#152C40] focus:bg-white pr-12"
                required
              >
                <option value="">Select Service Detail</option>
                {availableDetails.map((detail) => (
                  <option key={detail} value={detail}>
                    {detail}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <div className="w-6 h-6 rounded-full bg-[#152C40] flex items-center justify-center">
                  <svg 
                    width="14" 
                    height="14" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="white"
                    className="transform -rotate-90"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="input_container">
          <label className="text-[#6B7280] text-sm mb-2 block">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full h-[50px] px-4 rounded-[30px] bg-[#F9FAFB] border border-[#E5E5E5]
                     outline-none transition-all duration-300 
                     focus:border-[#152C40] focus:bg-white"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="input_container">
            <label className="text-[#6B7280] text-sm mb-2 block">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-[50px] px-4 rounded-[30px] bg-[#F9FAFB] border border-[#E5E5E5]
                       outline-none transition-all duration-300 
                       focus:border-[#152C40] focus:bg-white"
              required
            />
          </div>

          <div className="input_container">
            <label className="text-[#6B7280] text-sm mb-2 block">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full h-[50px] px-4 rounded-[30px] bg-[#F9FAFB] border border-[#E5E5E5]
                       outline-none transition-all duration-300 
                       focus:border-[#152C40] focus:bg-white"
              required
            />
          </div>
        </div>

        <div className="input_container">
          <label className="text-[#6B7280] text-sm mb-2 block">
            Message
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className="w-full p-4 rounded-[30px] bg-[#F9FAFB] border border-[#E5E5E5]
                     outline-none transition-all duration-300 
                     focus:border-[#152C40] focus:bg-white resize-none"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full h-[50px] bg-[#152C40] text-white font-medium rounded-[30px]
                 transition-all duration-300 hover:bg-[#1e3a54]"
      >
        Send Message
      </button>

      {submitStatus === 'success' && (
        <p className="text-green-600 text-center text-sm">Message sent successfully!</p>
      )}
      {submitStatus === 'error' && (
        <p className="text-red-600 text-center text-sm">Failed to send message. Please try again.</p>
      )}
    </form>
  );
} 