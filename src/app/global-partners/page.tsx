'use client';

import { motion } from "framer-motion";
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function GlobalPartners() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-white flex flex-col items-center">
      {/* Global Partners Content */}
      <div className="w-full max-w-[1398px] mt-12">
        {/* Content Container */}
        <div className="flex justify-stretch gap-8">
          {/* OLO Section */}
          <div className="flex-1">
            <div className="flex gap-10">
              {/* Red Vertical Line */}
              <div className="w-1 h-[75px] bg-[#F22929] rounded-full" />
              
              {/* OLO Logo */}
              <Image 
                src="/globalpartners/olologo.svg" 
                alt="OLO Logo" 
                width={105} 
                height={60} 
                className="object-contain"
              />
            </div>

            {/* OLO Description */}
            <p className="text-black text-[17px] leading-[32px] mt-8 max-w-[587px]">
              OLO (Orange logistics organization) is an e-commerce platform providing integrated services for global logistics enterprises, relying on vast global logistics enterprise cooperation alliance, building intelligent and efficient online marketing promotion and acquiring customers platform, establishing safe and convenient global payment and settlement system, through the industry big data analysis and accurate portraits to build global logistics enterprise credit system. OLO aims to provide full services for global logistics enterprise, by means of marketing promotion, online acquiring customers, agents developing, cooperation guarantee, payment settlement, global conference etc. With continuous innovation and "sincerity" services to promote the industrial development and help the growth of enterprises. Currently with over 800 members spread across 80+ countries, Express Shipping and Logistics stands out as the sole Maldivian member of the network.
            </p>
          </div>

          {/* Vertical Divider */}
          <div className="w-[1px] bg-[#8F8F8F] mx-4 self-stretch" />

          {/* FFN Section */}
          <div className="flex-1">
            <div className="flex gap-3">
              {/* Red Vertical Line */}
              <div className="w-1 h-[75px] bg-[#F22929] rounded-full" />
              
              {/* FFN Logo */}
              <Image 
                src="/globalpartners/FFN-Logo-wide.jpg" 
                alt="FFN Logo" 
                width={333} 
                height={69} 
                className="object-contain"
              />
            </div>

            {/* FFN Description */}
            <p className="text-black text-[17px] leading-[32px] mt-8 max-w-[587px]">
              Based in Dubai, the international heart of the United Arab Emirates; FRONTLINE FREIGHT NETWORKS is a Global Family of Freight Forwarders, NVOCC, Consolidators, Multimodal Operators, Custom Brokers, Vessel Agencies & All Shipping Related Activities, Viz Vessel Chartering, Project Cargo, Break Bulk Managers etc. Founded in 2009 by Managing Director Mr. Najam Ul Hoda, with a vision of simplifying and modernizing the freight forwarding process. With his 20+ years of experience in various sectors of the industry, the network has grown significantly under his stewardship. Today the network proudly constitutes of 103+ Members in 105+ countries, of which we (Express Shipping and Logistics) are the sole Maldivian Member. Express Shipping and Logistics has been a member of FFN since 2019, and after our Managing Director Mr. Ashraf attended several prior AGMS in Dubai, Istanbul, Malaysia etc. Our team was chosen as the host member for the 14th AGM, held at the CROSSROADS Maldives. The first and to this date, the only kind of event held in our nation.
            </p>
          </div>
        </div>
      </div>

      {/* Back Button */}
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
        <span className="text-[#152C40] font-medium text-lg">Back to Home</span>
      </motion.button>
    </main>
  );
}