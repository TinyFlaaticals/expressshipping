'use client';

import { motion } from "framer-motion";
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function GlobalPartners() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-white">
      {/* Partners Grid */}
      <div className="max-w-[1300px] mx-auto px-4 lg:px-8 py-12 lg:py-20">
        {/* First Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-16">
          {/* OLO Card */}
          <motion.div 
            className="bg-[#f2f2f2] rounded-2xl p-6 lg:p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-6 mb-6">
              <div className="w-1 h-[60px] bg-[#F22929] rounded-full" />
              <Image 
                src="/globalpartners/olologo.svg" 
                alt="OLO Logo" 
                width={105} 
                height={60} 
                className="object-contain"
              />
            </div>
            <p className="text-[15px] lg:text-[17px] leading-relaxed text-gray-700">
              OLO (Orange logistics organization) is an e-commerce platform providing integrated services for global logistics enterprises, relying on vast global logistics enterprise cooperation alliance, building intelligent and efficient online marketing promotion and acquiring customers platform, establishing safe and convenient global payment and settlement system, through the industry big data analysis and accurate portraits to build global logistics enterprise credit system. OLO aims to provide full services for global logistics enterprise, by means of marketing promotion, online acquiring customers, agents developing, cooperation guarantee, payment settlement, global conference etc. With continuous innovation and "sincerity" services to promote the industrial development and help the growth of enterprises. Currently with over 800 members spread across 80+ countries, Express Shipping and Logistics stands out as the sole Maldivian member of the network.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="px-3 py-1 bg-white rounded-full text-sm text-gray-600">800+ Members</span>
              <span className="px-3 py-1 bg-white rounded-full text-sm text-gray-600">80+ Countries</span>
            </div>
          </motion.div>

          {/* FFN Card */}
          <motion.div 
            className="bg-[#f2f2f2] rounded-2xl p-6 lg:p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center gap-6 mb-6">
              <div className="w-1 h-[60px] bg-[#F22929] rounded-full" />
              <Image 
                src="/globalpartners/globp3.svg" 
                alt="FFN Logo" 
                width={105} 
                height={60} 
                className="object-contain"
              />
            </div>
            <p className="text-[15px] lg:text-[17px] leading-relaxed text-gray-700">
              Based in Dubai, the international heart of the United Arab Emirates; FRONTLINE FREIGHT NETWORKS is a Global Family of Freight Forwarders, NVOCC, Consolidators, Multimodal Operators, Custom Brokers, Vessel Agencies & All Shipping Related Activities, Viz Vessel Chartering, Project Cargo, Break Bulk Managers etc. Founded in 2009 by Managing Director Mr. Najam Ul Hoda, with a vision of simplifying and modernizing the freight forwarding process. With his 20+ years of experience in various sectors of the industry, the network has grown significantly under his stewardship. Today the network proudly constitutes of 103+ Members in 105+ countries, of which we (Express Shipping and Logistics) are the sole Maldivian Member. Express Shipping and Logistics has been a member of FFN since 2019, and after our Managing Director Mr. Ashraf attended several prior AGMS in Dubai, Istanbul, Malaysia etc. Our team was chosen as the host member for the 14th AGM, held at the CROSSROADS Maldives. The first and to this date, the only kind of event held in our nation.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="px-3 py-1 bg-white rounded-full text-sm text-gray-600">103+ Members</span>
              <span className="px-3 py-1 bg-white rounded-full text-sm text-gray-600">105+ Countries</span>
            </div>
          </motion.div>
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Eagle Logistics Card */}
          <motion.div 
            className="bg-[#f2f2f2] rounded-2xl p-6 lg:p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-center gap-6 mb-6">
              <div className="w-1 h-[60px] bg-[#F22929] rounded-full" />
              <Image 
                src="/globalpartners/globp2.svg" 
                alt="Eagle Logistics Logo" 
                width={105} 
                height={60} 
                className="object-contain"
              />
            </div>
            <p className="text-[15px] lg:text-[17px] leading-relaxed text-gray-700">
              Eagle Logistics Colombo was founded in 2005. The company was formed in Partnership between its founder and CEO Asanga Weerackody and CL Synergy Pvt. Limited. With just a 5-member team, Eagle Logistics focused its attention solely on the freight forwarding industry and established itself as one of the best service businesses in the country. Close to 2 decades later, the Eagle Group has diversified into Leisure and IT and operates with a team of over 150 members across its portfolio of companies. While Logistics remains a part of its core operations, the company has also focused on providing end-to-end innovative Supply Chain solutions which help solve complex problems across the industry.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="px-3 py-1 bg-white rounded-full text-sm text-gray-600">150+ Team Members</span>
              <span className="px-3 py-1 bg-white rounded-full text-sm text-gray-600">Since 2005</span>
            </div>
          </motion.div>

          {/* IGFS Card */}
          <motion.div 
            className="bg-[#f2f2f2] rounded-2xl p-6 lg:p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex items-center gap-6 mb-6">
              <div className="w-1 h-[60px] bg-[#F22929] rounded-full" />
              <Image 
                src="/globalpartners/globp1.svg" 
                alt="IGFS Logo" 
                width={105} 
                height={60} 
                className="object-contain"
              />
            </div>
            <p className="text-[15px] lg:text-[17px] leading-relaxed text-gray-700">
              InterGlobe Freight Solutions (IGFS) was founded in 2019 as a partnership between Eagle Logistics and Kanchana Ekanayake who currently leads the company as its Managing Director. The Business Model of IGFS focuses on unique Logistics Solutions while specializing in Project Cargo in both Sri Lanka and the Asia-Pacific region. IGFS prides itself on delivering customer value in terms of Supply Chain and Logistics Solutions. The company is driven by trained and experienced professionals in the industry who strive towards achieving high levels of customer satisfaction. This team is committed towards ensuring that shipments are smoothly transitioned from origin to destination through various forms of devised strategic innovation!
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="px-3 py-1 bg-white rounded-full text-sm text-gray-600">Project Cargo Specialists</span>
              <span className="px-3 py-1 bg-white rounded-full text-sm text-gray-600">Asia-Pacific Region</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Back Button */}
      <div className="max-w-[1300px] mx-auto px-4 lg:px-8 pb-12 lg:pb-20">
        <motion.button
          onClick={() => router.push('/')}
          className="mx-auto flex items-center gap-3 px-6 py-3 rounded-full
                   border border-transparent hover:border-[#2B84EA]/20 
                   hover:bg-[#2B84EA]/5 transition-all duration-300"
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
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.div>
          <span className="text-[#152C40] font-medium text-lg">Back to Home</span>
        </motion.button>
      </div>
    </main>
  );
}