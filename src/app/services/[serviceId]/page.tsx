'use client';

import { useParams } from 'next/navigation';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';

// Define types for service data
type ServiceData = {
  title: string;
  description: string;
}

type ServicesDataType = {
  [key in 'sea-to-air-freight-forwarding' | 
        'freight-forwarding' | 
        'customs-brokerage-services' | 
        'courier-services' | 
        'warehousing' | 
        'local-logistics-in-the-maldives']: ServiceData;
}

// Map of valid service IDs and their titles
const SERVICES_DATA: ServicesDataType = {
  'sea-to-air-freight-forwarding': {
    title: 'Sea-to-Air Freight Forwarding',
    description: 'A cost-effective solution combining the affordability of sea freight with the speed of air transport to seamlessly meet your logistics needs.',
  },
  'freight-forwarding': {
    title: 'Freight Forwarding',
    description: 'Leveraging our global network, we provide reliable sea and air freight services, ensuring that your cargo reaches its destination securely and on time.',
  },
  'customs-brokerage-services': {
    title: 'Customs Brokerage Services',
    description: 'Professional customs clearance services ensuring smooth and hassle-free clearance for your shipments.',
  },
  'courier-services': {
    title: 'Courier Services',
    description: 'Swift and reliable package delivery services across various destinations.',
  },
  'warehousing': {
    title: 'Warehousing',
    description: 'Strategic warehousing facilities offering secure and scalable storage solutions.',
  },
  'local-logistics-in-the-maldives': {
    title: 'Local Logistics in the Maldives',
    description: 'Comprehensive island-to-island logistics solutions in the Maldives.',
  }
};

export default function ServicePage() {
  const { serviceId } = useParams();
  
  // Type guard and validation
  if (typeof serviceId !== 'string' || !(serviceId in SERVICES_DATA)) {
    notFound();
  }

  // Type assertion since we've validated the serviceId
  const serviceData = SERVICES_DATA[serviceId as keyof ServicesDataType];

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-sm p-8"
        >
          <h1 className="text-4xl font-bold text-[#152C40] mb-6">
            {serviceData.title}
          </h1>
          
          <p className="text-lg text-gray-700 mb-8">
            {serviceData.description}
          </p>

          <div className="mt-8">
            <a
              href={`/services/inquiry?service=${serviceId}&title=${encodeURIComponent(serviceData.title)}`}
              className="inline-block bg-[#152C40] text-white px-8 py-3 rounded-lg hover:bg-[#1f3d5c] transition-colors"
            >
              Get a Quote
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 