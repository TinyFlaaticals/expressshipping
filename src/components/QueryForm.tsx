'use client';

import { useState, useEffect } from 'react';

interface EmailData {
  name: string;
  email: string;
  contact: string;
  message: string;
  service: string;
  // Sea to Air fields
  countryOfLoading?: string;
  destination?: string;
  commodity?: string;
  weight?: string;
  dimensions?: string;
  // Freight Forwarding fields
  deliveryAddress?: string;
  shippingMode?: 'Sea' | 'Air';
}

const QueryForm = ({ serviceId = '', serviceTitle = '' }) => {
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState<EmailData>({
    name: '',
    email: '',
    contact: '',
    message: '',
    service: serviceId,
    countryOfLoading: '',
    destination: '',
    commodity: '',
    weight: '',
    dimensions: '',
    deliveryAddress: '',
    shippingMode: undefined,
  });

  const [status, setStatus] = useState({
    message: '',
    isError: false
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({ message: "Sending...", isError: false });

    try {
      const response = await fetch('/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          contact: formData.contact,
          message: formData.message,
          service: serviceTitle || serviceId,
          // Include all service-specific fields
          ...(isSeaToAir && {
            countryOfLoading: formData.countryOfLoading,
            destination: formData.destination,
            commodity: formData.commodity,
            weight: formData.weight,
            dimensions: formData.dimensions,
          }),
          ...(isFreightForwarding && {
            countryOfLoading: formData.countryOfLoading,
            deliveryAddress: formData.deliveryAddress,
            shippingMode: formData.shippingMode,
            commodity: formData.commodity,
            weight: formData.weight,
            dimensions: formData.dimensions,
          }),
          ...(isCourierServices && {
            countryOfLoading: formData.countryOfLoading,
            deliveryAddress: formData.deliveryAddress,
            commodity: formData.commodity,
            weight: formData.weight,
            dimensions: formData.dimensions,
          }),
          ...(isCustomsBrokerage && {
            deliveryAddress: formData.deliveryAddress,
            shippingMode: formData.shippingMode,
            commodity: formData.commodity,
            weight: formData.weight,
            dimensions: formData.dimensions,
          }),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send message');
      }

      setStatus({ message: "Message sent successfully!", isError: false });
      // Reset form
      setFormData({
        name: '',
        email: '',
        contact: '',
        message: '',
        service: serviceId,
        countryOfLoading: '',
        destination: '',
        deliveryAddress: '',
        shippingMode: undefined,
        commodity: '',
        weight: '',
        dimensions: '',
      });
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus({
        message: "Failed to send message. Please try again.",
        isError: true
      });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const isSeaToAir = serviceId === 'sea-to-air-freight-forwarding';
  const isFreightForwarding = serviceId === 'freight-forwarding';
  const isCourierServices = serviceId === 'courier-services';
  const isCustomsBrokerage = serviceId === 'customs-brokerage-services';

  if (!mounted) {
    return null; // or a loading spinner
  }

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

        {/* Sea to Air specific fields */}
        {isSeaToAir && mounted && (
          <>
            <input
              type="text"
              name="countryOfLoading"
              value={formData.countryOfLoading}
              onChange={handleChange}
              placeholder="Country of Loading"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            
            <input
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              placeholder="Destination"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            
            <input
              type="text"
              name="commodity"
              value={formData.commodity}
              onChange={handleChange}
              placeholder="Commodity"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            
            <input
              type="text"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              placeholder="Estimate Weight in KG"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            
            <input
              type="text"
              name="dimensions"
              value={formData.dimensions}
              onChange={handleChange}
              placeholder="Dimension in Meters"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </>
        )}

        {/* Freight Forwarding specific fields */}
        {isFreightForwarding && mounted && (
          <>
            <input
              type="text"
              name="countryOfLoading"
              value={formData.countryOfLoading}
              onChange={handleChange}
              placeholder="Country of Loading"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            
            <input
              type="text"
              name="deliveryAddress"
              value={formData.deliveryAddress}
              onChange={handleChange}
              placeholder="Delivery Address"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            
            <select
              name="shippingMode"
              value={formData.shippingMode || ''}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              required
            >
              <option value="" disabled>Select Shipping Mode</option>
              <option value="Sea">Sea</option>
              <option value="Air">Air</option>
            </select>
            
            <input
              type="text"
              name="commodity"
              value={formData.commodity}
              onChange={handleChange}
              placeholder="Commodity"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            
            <input
              type="text"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              placeholder="Estimate Weight in KG"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            
            <input
              type="text"
              name="dimensions"
              value={formData.dimensions}
              onChange={handleChange}
              placeholder="Size in Dimension"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </>
        )}
        
        {isCourierServices && mounted && (
          <>
            <input
              type="text"
              name="countryOfLoading"
              value={formData.countryOfLoading}
              onChange={handleChange}
              placeholder="Country of Loading"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            
            <input
              type="text"
              name="deliveryAddress"
              value={formData.deliveryAddress}
              onChange={handleChange}
              placeholder="Delivery Address"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            
            <input
              type="text"
              name="commodity"
              value={formData.commodity}
              onChange={handleChange}
              placeholder="Commodity"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            
            <input
              type="text"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              placeholder="Estimate Weight in KG"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            
            <input
              type="text"
              name="dimensions"
              value={formData.dimensions}
              onChange={handleChange}
              placeholder="Size in Dimension"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </>
        )}
        
        {isCustomsBrokerage && mounted && (
          <>
            <input
              type="text"
              name="deliveryAddress"
              value={formData.deliveryAddress}
              onChange={handleChange}
              placeholder="Delivery Address"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            
            <select
              name="shippingMode"
              value={formData.shippingMode || ''}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              required
            >
              <option value="" disabled>Select Shipping Mode</option>
              <option value="Sea">Sea</option>
              <option value="Air">Air</option>
            </select>
            
            <input
              type="text"
              name="commodity"
              value={formData.commodity}
              onChange={handleChange}
              placeholder="Commodity"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            
            <input
              type="text"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              placeholder="Estimate Weight in KG"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            
            <input
              type="text"
              name="dimensions"
              value={formData.dimensions}
              onChange={handleChange}
              placeholder="Size in Dimension"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </>
        )}
        
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