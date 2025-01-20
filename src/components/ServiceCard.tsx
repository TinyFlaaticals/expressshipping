"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

interface ServiceCardProps {
  title: string;
  description?: string;
  icon: string;
  serviceId: string;
}

export default function ServiceCard({
  title,
  description,
  icon,
  serviceId,
}: ServiceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <>
      {/* Mobile Card - Hidden on Desktop */}
      <motion.div
        className="md:hidden w-[400px] bg-[#FAFAFA] border border-[#8F8F8F] 
                   rounded-[50px] cursor-pointer overflow-hidden"
        onClick={() => setIsExpanded(!isExpanded)}
        layout
        animate={{
          backgroundColor: isExpanded ? "rgb(21,44,64)" : "#FAFAFA",
          height: isExpanded ? "560px" : "180px",
          borderColor: isExpanded ? "transparent" : "#8F8F8F",
        }}
        transition={{
          layout: { duration: 0.3 },
          height: { duration: 0.3 },
          backgroundColor: { duration: 0.3 },
          borderColor: { duration: 0.3 },
        }}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center px-[48px] py-[48px]">
            <div className="flex items-center gap-8">
              <div className="relative w-[39px] h-[37px]">
                <Image
                  src={`/icons/${icon}${isExpanded ? "_w" : ""}.svg`}
                  alt={title}
                  fill
                  sizes="39px"
                  className="object-contain"
                />
              </div>
              <div className="w-[2px] h-[64px] bg-[#F22929] rounded-full" />
              <h3
                className={`text-[20px] font-semibold whitespace-pre-line transition-colors duration-300 ${
                  isExpanded ? "text-white" : "text-[#152C40]"
                }`}
              >
                {title}
              </h3>
            </div>
          </div>

          {isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="flex-1 flex flex-col px-6 sm:px-[59px] pb-6 sm:pb-0"
            >
              <Link
                href={`/services/details?service=${serviceId}`}
                className="inline-flex items-center justify-center w-fit px-6 sm:px-8 
                         py-3 sm:py-4 text-[14px] sm:text-[16px] font-medium 
                         text-white border-2 border-white rounded-full 
                         hover:bg-white hover:text-[rgb(21,44,64)] 
                         transition-colors duration-300"
                onClick={handleButtonClick}
              >
                Learn More
                <svg
                  className="ml-2 w-4 h-4 sm:w-5 sm:h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>

              <p
                className="text-white text-[16px] sm:text-[18px] leading-[1.75] 
                         max-w-full sm:max-w-[380px] mt-6 sm:mt-8"
              >
                {description}
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Desktop Card - Hidden on Mobile */}
      <motion.div
        className="hidden md:block w-[500px] scale-[0.85] transform-origin-left bg-[#FAFAFA] 
                   border border-[#8F8F8F] rounded-[50px] cursor-pointer overflow-hidden"
        onClick={() => setIsExpanded(!isExpanded)}
        layout
        animate={{
          backgroundColor: isExpanded ? "rgb(21,44,64)" : "#FAFAFA",
          height: isExpanded ? "560px" : "180px",
          borderColor: isExpanded ? "transparent" : "#8F8F8F",
        }}
        transition={{
          layout: { duration: 0.3 },
          height: { duration: 0.3 },
          backgroundColor: { duration: 0.3 },
          borderColor: { duration: 0.3 },
        }}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center px-[64px] py-[48px]">
            <div className="flex items-center gap-8">
              <div className="relative w-[39px] h-[37px]">
                <Image
                  src={`/icons/${icon}${isExpanded ? "_w" : ""}.svg`}
                  alt={title}
                  fill
                  sizes="39px"
                  className="object-contain"
                />
              </div>
              <div className="w-[2px] h-[64px] bg-[#F22929] rounded-full" />
              <h3
                className={`text-[20px] font-semibold whitespace-pre-line transition-colors duration-300 ${
                  isExpanded ? "text-white" : "text-[#152C40]"
                }`}
              >
                {title}
              </h3>
            </div>
          </div>

          {isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="flex-1 flex flex-col px-6 sm:px-[59px] pb-6 sm:pb-0"
            >
              <Link
                href={`/services/details?service=${serviceId}`}
                className="inline-flex items-center justify-center w-fit px-6 sm:px-8 
                         py-3 sm:py-4 text-[14px] sm:text-[16px] font-medium 
                         text-white border-2 border-white rounded-full 
                         hover:bg-white hover:text-[rgb(21,44,64)] 
                         transition-colors duration-300"
                onClick={handleButtonClick}
              >
                Get Started
                <svg
                  className="ml-2 w-4 h-4 sm:w-5 sm:h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>

              <p
                className="text-white text-[16px] sm:text-[18px] leading-[1.75] 
                         max-w-full sm:max-w-[380px] mt-6 sm:mt-8"
              >
                {description}
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </>
  );
}
