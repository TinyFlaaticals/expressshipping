'use client';

import React, { useState, FormEvent, Suspense } from 'react';
import { motion } from "framer-motion";
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import ServiceCardExpanded from '@/components/ServiceCardExpanded';
import QueryForm from '@/components/QueryForm';
import Link from 'next/link';

interface ServiceDetail {
  title: string;
  icon: string;
  description: string;
  details: string[];
}

interface ServiceDetails {
  [key: string]: ServiceDetail;
}

function DetailsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const service = searchParams?.get('service') || '';
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const serviceDetails = {
    'sea-to-air': {
      title: 'Sea-to-Air\nFreight Forwarding',
      icon: 'plane',
      description: 'A cost-effective solution combining the affordability of sea freight with the speed of air transport to seamlessly meet your logistics needs.',
      details: [
        'Combined sea-air transportation',
        'Cost-effective shipping solutions',
        'Reduced transit times',
        'Global network coverage',
        'Real-time tracking',
        'Flexible scheduling options'
      ]
    },
    'freight': {
      title: 'Freight\nForwarding',
      icon: 'truck',
      description: 'Leveraging our global network, we provide reliable sea and air freight services, ensuring that your cargo reaches its destination securely and on time.',
      details: [
        'Global logistics network',
        'Sea and air freight services',
        'Secure cargo handling',
        'On-time delivery guarantee',
        'End-to-end tracking',
        'Custom documentation support'
      ]
    },
    'customs': {
      title: 'Customs\nBrokerage Services',
      icon: 'customs',
      description: 'Ensuring smooth and hassle-free clearance for your shipments, managing key main regulatory requirements and optimizing your supply chain efficiency.',
      details: [
        'Customs clearance expertise',
        'Regulatory compliance',
        'Documentation management',
        'Supply chain optimization',
        'Import/Export facilitation',
        'Real-time status updates'
      ]
    },
    'courier': {
      title: 'Courier Services',
      icon: 'courier',
      description: 'With a focus on speed and reliability, we deliver packages of all sizes swiftly, ensuring seamless delivery across various destinations.',
      details: [
        'Swift package delivery',
        'All size accommodations',
        'Reliable service',
        'Multiple destinations',
        'Real-time tracking',
        'Express delivery options'
      ]
    },
    'warehousing': {
      title: 'Warehousing',
      icon: 'warehouse',
      description: 'Top-notch facilities, strategically located around the globe, offer scalable and secure storage solutions for your cargo.',
      details: [
        'Strategic global locations',
        'Secure storage facilities',
        'Scalable solutions',
        'Inventory management',
        'Modern facilities',
        'Temperature-controlled options'
      ]
    },
    'local-logistics': {
      title: 'Local Logistics in\nthe Maldives',
      icon: 'location',
      description: 'From island-to-island logistics for less-than-container-load (LCL) shipments to large-scale project cargo, we provide comprehensive solutions across the Maldives.',
      details: [
        'Island-to-island logistics',
        'LCL shipment handling',
        'Project cargo management',
        'Comprehensive solutions',
        'Local expertise',
        'Nationwide coverage'
      ]
    }
  };

  const currentService = serviceDetails[service as keyof typeof serviceDetails];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="w-full min-h-screen bg-white">
      <div className="max-w-[1398px] mx-auto px-4 sm:px-6 lg:px-[57px] py-12">
        <div className="flex flex-col lg:flex-row gap-10 items-center justify-center">
          {/* Service Details Card */}
          <motion.div 
            className="w-full lg:w-[398px] bg-[#152C40] rounded-[40px] overflow-hidden
                       shadow-xl hover:shadow-2xl transition-shadow duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Service Content */}
            <div className="p-10">
              <div className="flex items-center gap-6 mb-8">
                <div className="relative w-[39px] h-[37px]">
                  <Image 
                    src={`/icons/${currentService?.icon}_w.svg`}
                    alt={currentService?.title || ''}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="w-[4px] h-[75px] bg-[#F22929] rounded-full" />
                <h1 className="text-2xl font-bold text-white">
                  {currentService?.title}
                </h1>
              </div>

              <p className="text-white/90 text-lg leading-relaxed mb-8">
                {currentService?.description}
              </p>

              <div className="space-y-4">
                {currentService?.details.map((detail, index) => (
                  <div key={index} className="flex items-center gap-4 text-white">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#2B84EA]" />
                    <span className="text-lg">{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Query Form */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center"
          >
            <QueryForm />
          </motion.div>
        </div>

        {/* Back Button */}
        <div className="w-full flex justify-center">
          <motion.button
            onClick={() => router.push('/')}
            className="mt-16 mb-20 flex items-center gap-3 
                     px-6 py-3 rounded-full border border-transparent
                     hover:border-[#2B84EA]/20 hover:bg-[#2B84EA]/5
                     transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              className="flex items-center justify-center w-10 h-10 rounded-full 
                       bg-[#152C40] text-white"
              whileHover={{ rotate: -360 }}
              transition={{ duration: 0.5 }}
            >
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor"
                className="transform"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </motion.div>
            <span className="text-[#152C40] font-medium text-lg">Back to Home</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}

export default function DetailsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DetailsContent />
    </Suspense>
  );
} 