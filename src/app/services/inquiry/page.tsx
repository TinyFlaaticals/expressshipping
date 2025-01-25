'use client';

import { useSearchParams } from 'next/navigation';
import QueryForm from '../../../components/QueryForm';
import { motion } from 'framer-motion';
import { generateServiceStructuredData } from '@/lib/structuredData';
import { useEffect, Suspense } from 'react';

// Simplified schema for testing
function generateBasicSchema(serviceId: string, serviceTitle: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": serviceTitle || "Express Shipping Service",
    "description": `Professional ${serviceTitle || 'shipping'} services in Maldives`,
    "provider": {
      "@type": "Organization",
      "name": "Express Shipping Maldives"
    }
  };
}

// Separate component for the content that uses useSearchParams
function InquiryContent() {
  const searchParams = useSearchParams();
  const serviceId = searchParams.get('service');
  const serviceTitle = searchParams.get('title') || serviceId || '';
  const description = searchParams.get('description');

  useEffect(() => {
    // Use the original structured data generator that was previously validated
    const structuredData = generateServiceStructuredData(
      serviceId || '',
      serviceTitle
    );

    let script = document.querySelector('#structured-data') as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = 'structured-data';
      script.setAttribute('type', 'application/ld+json');
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(structuredData);
  }, [serviceId, serviceTitle]);

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-sm p-8"
        >
          <h1 className="text-3xl font-bold text-[#152C40] mb-8 text-center">
            {serviceTitle ? `Inquiry for ${serviceTitle}` : 'Service Inquiry'}
          </h1>
          
          <p className="text-gray-700 mb-6 leading-relaxed">{description}</p>
          
          <QueryForm 
            serviceId={serviceId || ''} 
            serviceTitle={serviceTitle}
          />
        </motion.div>
      </div>
    </div>
  );
}

// Main component with Suspense wrapper
export default function ServiceInquiry() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    }>
      <InquiryContent />
    </Suspense>
  );
}