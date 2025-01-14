'use client';

import React, { useState, FormEvent } from 'react';
import { motion } from "framer-motion";
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import ServiceCardExpanded from '@/components/ServiceCardExpanded';
import QueryForm from '@/components/QueryForm';

interface ServiceDetail {
  title: string;
  icon: string;
  description: string;
  details: string[];
}

interface ServiceDetails {
  [key: string]: ServiceDetail;
}

const ServiceDetailsPage: React.FC = () => {
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
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 bg-white flex flex-col items-center">
        {/* Header */}
        <motion.div 
          className="w-full max-w-[1512px] flex justify-between items-start px-[57px] pt-[64px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Image 
            src="/logo-icon.svg" 
            alt="Express Shipping Logo" 
            width={128} 
            height={129}
            style={{ width: '128px', height: '129px' }}
            priority
            className="cursor-pointer hover:scale-105 transition-transform duration-300"
            onClick={() => router.push('/')}
          />
          <Image 
            src="/logo_text.svg" 
            alt="Express Shipping & Logistics" 
            width={411} 
            height={108}
            style={{ width: '411px', height: '108px' }}
            priority
          />
        </motion.div>

        {/* Service Content Section */}
        <div className="w-full max-w-[1398px] flex flex-col lg:flex-row gap-8 px-4 mt-16">
          {/* Expanded Service Card */}
          {currentService && (
            <div className="lg:w-1/2">
              <ServiceCardExpanded
                title={currentService.title}
                icon={currentService.icon}
                description={currentService.description}
                details={currentService.details}
              />
            </div>
          )}

          {/* Query Form Section */}
          <motion.div 
            className="lg:w-1/2 bg-[#FAFAFA] border border-[#8F8F8F] rounded-[50px] p-16
                       shadow-lg hover:shadow-xl transition-shadow duration-300"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <QueryForm 
              initialService={currentService?.title.split('\n')[0] || ''} 
              serviceDetails={currentService?.details || []}
            />
          </motion.div>
        </div>

        {/* Back Button - Centered Below Content */}
        <motion.button
          onClick={() => router.push('/')}
          className="mx-auto mt-16 mb-20 flex items-center gap-3 
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
          <span className="text-[#152C40] font-medium text-lg">Back to Services</span>
        </motion.button>

        {/* Divider with animation */}
        <motion.div 
          className="w-full max-w-[1398px] h-[1px] bg-[#444444] rounded-full my-20 mt-24"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        />

        {/* Enhanced Get In Touch Section */}
        <motion.div 
          className="w-full max-w-[1398px] flex justify-between items-start mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex gap-20">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image 
                src="/logo_full.svg" 
                alt="Express Shipping & Logistics" 
                width={239} 
                height={192} 
                className="object-contain hover:brightness-110 transition-all"
              />
            </motion.div>
            <div className="flex flex-col">
              <motion.h3 
                className="text-[32px] font-black text-[#152C40] mb-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                GET IN TOUCH
              </motion.h3>
              <motion.p 
                className="max-w-[400px] text-[17px] text-[#152C40] line-clamp-6 leading-[32px] mb-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Connect with us and discover how Express Shipping & Logistics can be your partner in success. 
                Reach out to us today to discuss your specific needs and explore the possibilities of working together.
              </motion.p>
            </div>
          </div>

          {/* Contact Information with Hover Effects */}
          <motion.div 
            className="text-[17px] text-[#152C40] leading-[24px]"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="mb-2 hover:text-[#2B84EA] transition-colors duration-300 cursor-pointer"
              whileHover={{ x: 5 }}
            >
              <p>Address : M. Bunberuge, 2 Floor, Shairu</p>
              <p>Varudhee, K. Malé, Maldives</p>
            </motion.div>
            <motion.p 
              className="mb-2 hover:text-[#2B84EA] transition-colors duration-300 cursor-pointer"
              whileHover={{ x: 5 }}
            >
              Mobile : +960 9381818
            </motion.p>
            <motion.p 
              className="mb-2 hover:text-[#2B84EA] transition-colors duration-300 cursor-pointer"
              whileHover={{ x: 5 }}
            >
              Email : info@expressshipping.mv
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Enhanced Social Icons */}
        <motion.div 
          className="w-full max-w-[1398px] flex justify-end gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {['fb', 'insta', 'linkedin'].map((social) => (
            <motion.a
              key={social}
              href="#"
              className="w-[30px] h-[30px] flex items-center justify-center relative group"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                className="absolute inset-0 bg-[#152C40] rounded-full opacity-0 group-hover:opacity-10
                         transition-opacity duration-300"
                initial={false}
              />
              <Image 
                src={`/icons/social_${social}.svg`}
                alt={social.charAt(0).toUpperCase() + social.slice(1)}
                width={30}
                height={30}
                className="object-contain transition-all duration-300 group-hover:brightness-110"
                priority
              />
            </motion.a>
          ))}
        </motion.div>
      </main>
    </div>
  );
};

export default ServiceDetailsPage; 