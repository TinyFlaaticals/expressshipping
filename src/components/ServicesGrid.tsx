'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export function ServicesGrid() {
  return (
    <div className="w-full max-w-[1398px] mx-auto px-4 lg:px-0">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {/* Service Card */}
        <motion.div 
          className="relative overflow-hidden rounded-[20px] border border-[#E6E6E6]
                     p-6 sm:p-8 lg:p-12
                     flex flex-col sm:flex-row lg:flex-col
                     gap-4 sm:gap-6 lg:gap-8"
          whileHover={{ y: -5 }}
          transition={{ duration: 0.3 }}
        >
          {/* Icon Container */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-[100px] lg:h-[100px] 
                        flex-shrink-0">
            <Image 
              src="/icons/service1.svg"
              alt="Service Icon"
              width={100}
              height={100}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Content */}
          <div className="flex flex-col gap-2 sm:gap-3">
            <h3 className="text-xl sm:text-2xl lg:text-[32px] font-bold text-[#152C40]">
              Service Title
            </h3>
            <p className="text-base sm:text-lg lg:text-[17px] text-[#152C40] leading-relaxed">
              Service description goes here...
            </p>
          </div>
        </motion.div>
        {/* Repeat for other services */}
      </div>
    </div>
  );
} 