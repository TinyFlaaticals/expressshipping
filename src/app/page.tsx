'use client';

import { motion } from "framer-motion";
import { ReactElement } from "react";
import Image from 'next/image';
import ServiceCard from '../components/ServiceCard';
import { Globe } from '@/components/ui/globe'
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Home(): ReactElement {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const router = useRouter();

  return (
    <main className="min-h-screen bg-white flex flex-col items-center px-2 lg:px-0">
      {/* Hero Section */}
      <motion.div 
        className="relative w-[calc(100%-16px)] lg:w-full max-w-[1398px] h-[400px] lg:h-[817px] 
                   bg-[#152C40] rounded-[30px] lg:rounded-[55px] 
                   flex flex-col items-center mt-[20px] lg:mt-[40px] 
                   overflow-hidden mx-2 lg:mx-10"
        {...fadeInUp}
      >
        <Globe />
      </motion.div>

      {/* Hero Text Section */}
      <div className="w-full max-w-[1162px] text-center mt-[30px] lg:mt-[60px] px-10 lg:px-10">
        <h1 className="text-[28px] lg:text-[45px] font-black text-[#152C40] mb-3 lg:mb-4 leading-tight" 
            style={{ fontFamily: 'Inter' }}>
          THE MALDIVES' LOGISTICS EXPERTS
        </h1>
        <h2 className="text-[18px] lg:text-[24px] text-[#152C40] mb-[30px] lg:mb-[40px]">
          Reliable Logistics, Beyond Boundaries
        </h2>
      </div>

      {/* About Section */}
      <div className="w-full max-w-[1162px] text-center mt-[30px] px-10 lg:px-10">
        <p className="text-[15px] lg:text-[17px] text-justify leading-relaxed text-black mb-6">
          Express Shipping and Logistics is a leading freight and logistics provider based in the Maldives, 
          specializing in seamless, reliable, and efficient transportation solutions. With over 15 years of 
          collective experience in shipping and logistics, our team brings extensive expertise and a deep 
          understanding of the region.
        </p>
        <p className="text-[15px] lg:text-[17px] text-justify leading-relaxed text-black mb-6">
          We are committed to connecting businesses in the Maldives with global markets through innovative and 
          tailored services. Our strategic location in the Maldives enables us to optimize both international 
          and project-based shipping and logistics management, bridging local businesses with global markets.
        </p>
      </div>

      {/* Mission & Vision Section */}
      <div className="w-full max-w-[1398px] flex flex-col lg:flex-row lg:space-x-40 space-y-10 lg:space-y-0 
                    justify-center mt-10 lg:mt-20 px-10 lg:px-10">
        {/* Mission */}
        <div className="max-w-[485px]">
          <div className="flex items-center gap-4 mb-6 lg:mb-8">
            <Image 
              src="/icons/mission.svg" 
              alt="Mission" 
              width={32} 
              height={32} 
              className="object-contain w-[32px] h-[32px] lg:w-[37px] lg:h-[37px]"
            />
            <div className="w-1 h-[60px] lg:h-[75px] bg-[#F22929] rounded-full" />
            <h3 style={{ 
              fontSize: 'clamp(20px, 5vw, 24px)',
              fontFamily: 'Inter',
              fontWeight: 600,
              color: '#152C40'
            }}>
              Mission
            </h3>
          </div>
          <p className="text-[15px] lg:text-[17px] leading-[28px] text-justify lg:leading-[32px] text-[#152C40]">
            At Express Shipping and Logistics, we are committed to delivering agile, reliable, and efficient shipping solutions, inspired by the speed, endurance, and adaptability of the magnificent frigate-bird.
          </p>
        </div>

        {/* Vision */}
        <div className="max-w-[485px]">
          <div className="flex items-center gap-4 mb-6 lg:mb-8">
            <Image 
              src="/icons/vision.svg" 
              alt="Vision" 
              width={32} 
              height={32} 
              className="object-contain w-[32px] h-[32px] lg:w-[37px] lg:h-[37px]"
            />
            <div className="w-1 h-[60px] lg:h-[75px] bg-[#F22929] rounded-full" />
            <h3 style={{ 
              fontSize: 'clamp(20px, 5vw, 24px)',
              fontFamily: 'Inter',
              fontWeight: 600,
              color: '#152C40'
            }}>
              Vision
            </h3>
          </div>
          <p className="text-[15px] lg:text-[17px] leading-[28px] text-justify lg:leading-[32px] text-[#152C40]">
            Our vision is to become the leading logistics provider in the Maldives and the Indian Ocean region, recognized for our reliability and innovative solutions.
          </p>
        </div>
      </div>

      {/* Expertise Section */}
      <div className="w-full max-w-[1398px] mt-24 px-4 md:px-0">
        <h2 className="text-[#F22929] text-2xl md:text-[32px] font-bold text-center mb-8 md:mb-16">
          OUR EXPERTISE IN ACTION
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 
                      gap-4 md:gap-x-[22px] md:gap-y-[32px] 
                      justify-items-center">
          <ServiceCard
            title="Sea-to-Air Freight Forwarding"
            description="A cost-effective solution combining the affordability of sea freight with the speed of air transport to seamlessly meet your logistics needs."
            icon="plane"
            serviceId="sea-to-air"
          />
          <ServiceCard
            title="Freight Forwarding"
            description="Leveraging our global network, we provide reliable sea and air freight services, ensuring that your cargo reaches its destination securely and on time."
            icon="truck"
            serviceId="freight"
          />
          <ServiceCard
            title="CustomsBrokerage Services"
            description="Ensuring smooth and hassle-free clearance for your shipments, managing key main regulatory requirements and optimizing your supply chain efficiency."
            icon="customs"
            serviceId="customs"
          />
          <ServiceCard
            title="Courier Services"
            description="With a focus on speed and reliability, we deliver packages of all sizes swiftly, ensuring seamless delivery across various destinations."
            icon="courier"
            serviceId="courier"
          />
          <ServiceCard
            title="Warehousing"
            description="Top-notch facilities, strategically located around the globe, offer scalable and secure storage solutions for your cargo."
            icon="warehouse"
            serviceId="warehousing"
          />
          <ServiceCard
            title="Local Logistics in\nthe Maldives"
            description="From island-to-island logistics for less-than-container-load (LCL) shipments to large-scale project cargo, we provide comprehensive solutions across the Maldives."
            icon="location"
            serviceId="local-logistics"
          />
        </div>
        
        <div className="flex justify-center w-full mt-20">
          <motion.button
            onClick={() => router.push('/global-partners')}
            className="mx-auto flex items-center gap-3 
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
                className="transform rotate-180"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </motion.div>
            <span className="text-[#152C40] font-medium text-lg">Global Partners</span>
          </motion.button>
        </div>
      </div>

    </main>
  );
}
