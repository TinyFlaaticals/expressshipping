'use client';

import { motion } from "framer-motion";
import { ReactElement } from "react";
import Image from 'next/image';
import LogoFull from '../../public/logo_full.svg'
import ServiceCard from '../components/ServiceCard';
import { Globe } from '@/components/ui/globe'

export default function Home(): ReactElement {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <main className="min-h-screen bg-white flex flex-col items-center">
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

      {/* Hero Section */}
      <motion.div 
        className="relative w-full max-w-[1398px] h-[817px] bg-[#152C40] rounded-[55px] flex flex-col items-center mt-[40px] overflow-hidden"
        {...fadeInUp}
      >
        <Globe />
      </motion.div>

      {/* Hero Text Section */}
      <div className="w-full max-w-[1162px] text-center mt-[60px]">
        <h1 className="text-[45px] font-black text-[#152C40] mb-4" style={{ fontFamily: 'Inter' }}>
          THE MALDIVES' LOGISTICS EXPERTS
        </h1>
        <h2 className="text-[24px] text-[#152C40] mb-[40px]">
          Reliable Logistics, Beyond Boundaries
        </h2>
      </div>

      {/* About Section */}
      <div className="max-w-[1162px] text-center mt-[30px]">
        <p className="text-[20px] leading-relaxed text-black mb-6">
          Express Shipping and Logistics is a leading freight and logistics provider based in the Maldives, 
          specializing in seamless, reliable, and efficient transportation solutions. With over 15 years of 
          collective experience in shipping and logistics, our team brings extensive expertise and a deep 
          understanding of the region.
        </p>
        <p className="text-[20px] leading-relaxed text-black">
          We are committed to connecting businesses in the Maldives with global markets through innovative and 
          tailored services. Our strategic location in the Maldives enables us to optimize both international 
          and project-based shipping and logistics management, bridging local businesses with global markets.
        </p>
      </div>

      {/* Expertise Section */}
      <div className="w-full max-w-[1398px] mt-[90px]">
        <h2 className="text-[#F22929] text-[32px] font-bold text-center mb-16">
          OUR EXPERTISE IN ACTION
        </h2>
        <div className="grid grid-cols-3 gap-x-[22px] gap-y-[32px] justify-items-center">
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
      </div>

      {/* Mission & Vision Section */}
      <div className="w-full max-w-[1398px] space-x-40 flex justify-center mt-24">
        {/* Mission */}
        <div className="max-w-[485px]">
          <div className="flex items-center gap-4 mb-8">
            <Image 
              src="/icons/mission.svg" 
              alt="Mission" 
              width={37} 
              height={37} 
              className="object-contain"
            />
            <div className="w-1 h-[75px] bg-[#F22929] rounded-full" />
            <h3 style={{ 
              fontSize: 'var(--heading-size, 24px)',
              fontFamily: 'Inter',
              fontWeight: 600,
              color: '#152C40'
            }}>
              Mission
            </h3>
          </div>
          <p className="text-[20px] leading-[32px] text-[#152C40]">
            At Express Shipping and Logistics, we are committed to delivering agile, reliable, and efficient shipping solutions, inspired by the speed, endurance, and adaptability of the magnificent frigate-bird.
          </p>
        </div>

        {/* Vision */}
        <div className="max-w-[485px]">
          <div className="flex items-center gap-4 mb-8">
            <Image 
              src="/icons/vision.svg" 
              alt="Vision" 
              width={37} 
              height={37} 
              className="object-contain"
            />
            <div className="w-1 h-[75px] bg-[#F22929] rounded-full" />
            <h3 style={{ 
              fontSize: 'var(--heading-size, 24px)',
              fontFamily: 'Inter',
              fontWeight: 600,
              color: '#152C40'
            }}>
              Vision
            </h3>
          </div>
          <p className="text-[20px] leading-[32px] text-[#152C40]">
            Our vision is to become the leading logistics provider in the Maldives and the Indian Ocean region, recognized for our reliability and innovative solutions.
          </p>
        </div>
      </div>

        {/* Divider with animation */}
        <motion.div 
          className="w-full max-w-[1398px] h-[1px] bg-[#444444] rounded-full my-20 mt-24"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      />

      {/* Get In Touch Section */}
      <div className="w-full max-w-[1398px] flex justify-between items-start mb-20 mt-6">
        <div className="flex gap-20">
          <Image 
            src="/logo_full.svg" 
            alt="Express Shipping & Logistics" 
            width={239} 
            height={192} 
            className="object-contain"
          />
          <div className="flex flex-col">
            <h3 className="text-[32px] font-black text-[#152C40] mb-6">GET IN TOUCH</h3>
            <p className="max-w-[400px] text-[17px] text-[#152C40] line-clamp-6 leading-[32px] mb-8">
              Connect with us and discover how Express Shipping & Logistics can be your partner in success. Reach out to us today to discuss your specific needs and explore the possibilities of working together.
            </p>
          </div>
        </div>
        <div className="text-[17px] text-[#152C40] leading-[24px]">
          <p className="mb-2">Address : M. Bunberuge, 2 Floor, Shairu</p>
          <p className="mb-2">Varudhee, K. Malé, Maldives</p>
          <p className="mb-2">Mobile : +960 9381818</p>
          <p className="mb-2">Email : info@expressshipping.mv</p>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full max-w-[1398px] flex justify-end gap-4 mb-8">
        <div className="w-[30px] h-[30px] flex items-center justify-center">
          <motion.div
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <Image 
              src="/icons/social_fb.svg" 
              alt="Facebook" 
              width={30} 
              height={30} 
              className="object-contain hover:opacity-80 transition-opacity"
              priority
            />
          </motion.div>
        </div>
        <motion.div
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          <div className="w-[30px] h-[30px] flex items-center justify-center">
            <Image 
              src="/icons/social_insta.svg" 
            alt="Instagram" 
              width={30} 
              height={30} 
              className="object-contain"
              priority
            />
          </div>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          <div className="w-[30px] h-[30px] flex items-center justify-center">
            <Image 
            src="/icons/social_linkedin.svg" 
            alt="LinkedIn" 
            width={30} 
            height={30} 
            className="object-contain"
              priority
            />
          </div>
        </motion.div>
      </div>
    </main>
  );
}
