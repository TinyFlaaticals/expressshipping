'use client';

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import QueryForm from "@/components/QueryForm";

export default function ServiceDetails({ params }: { params: { id: string } }) {
  const router = useRouter();
  const currentService = params.id;

  return (
    <div className="w-full min-h-screen bg-white">
      <div className="max-w-[1398px] mx-auto px-4 sm:px-6 lg:px-[57px] py-12">
        <div className="flex flex-col lg:flex-row gap-10 items-center justify-center">
          {/* Service Details Card */}
          <motion.div 
            className="w-full lg:w-[398px] bg-[#152C40] rounded-[50px] overflow-hidden
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
                    src={`/icons/${currentService}_w.svg`}
                    alt={currentService}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="w-[4px] h-[75px] bg-[#F22929] rounded-full" />
                <h1 className="text-2xl font-bold text-white capitalize">
                  {currentService.replace('-', ' ')}
                </h1>
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