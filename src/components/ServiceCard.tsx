"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/navigation';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  serviceId: string;
}

export default function ServiceCard({ title, description, icon, serviceId }: ServiceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleClick = () => {
    const params = new URLSearchParams({
      service: serviceId,
      title: title,
      description: description,
      icon: icon
    });
    
    // Using the new URL structure
    router.push(`/services/inquiry?${params.toString()}`);
  };

  return (
    <>
      {/* Mobile Accordion Style */}
      <motion.div
        className="md:hidden w-full bg-[#f0f0f0] rounded-[20px]
                   shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
        onClick={() => setIsExpanded(!isExpanded)}
        layout
        animate={{
          backgroundColor: isExpanded ? "rgb(21,44,64)" : "#f0f0f0",
          height: isExpanded ? "auto" : "90px",
          borderRadius: isExpanded ? "24px" : "20px",
          margin: isExpanded ? "12px 0" : "8px 0",
          scale: isExpanded ? 1.02 : 1,
        }}
        transition={{
          layout: { duration: 0.3 },
          height: { duration: 0.3 },
          scale: { duration: 0.2 },
        }}
      >
        <motion.div 
          className="flex flex-col h-full"
          layout
        >
          <div className="flex items-center justify-between px-5 py-4">
            <div className="flex items-center gap-4">
              <div className="relative w-[28px] h-[28px] flex items-center justify-center shrink-0">
                <Image
                  src={`/icons/${icon}${isExpanded ? "_w" : ""}.svg`}
                  alt={title}
                  fill
                  sizes="28px"
                  className="object-contain p-1"
                />
              </div>
              <div className="w-[3px] h-[35px] bg-[#F22929] rounded-full shrink-0" />
              <h3
                className={`text-[16px] font-semibold tracking-tight transition-colors duration-300 ${
                  isExpanded ? "text-white" : "text-[#152C40]"
                }`}
              >
                {title}
              </h3>
            </div>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="mr-2"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke={isExpanded ? "#ffffff" : "#152C40"}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </motion.div>
          </div>

          <motion.div
            layout
            initial={false}
            animate={{ 
              height: isExpanded ? "auto" : 0,
              opacity: isExpanded ? 1 : 0
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5">
              <p className="text-white/90 text-[15px] leading-[1.7] mb-5">
                {description}
              </p>
              <Link
                href={`/query?service=${serviceId}&title=${encodeURIComponent(title)}&description=${encodeURIComponent(description || '')}&icon=${encodeURIComponent(icon)}`}
                className="inline-flex items-center text-[14px] font-semibold 
                         text-white border-2 border-white/80 rounded-full px-8 py-2.5
                         hover:bg-white hover:text-[rgb(21,44,64)] 
                         transition-all duration-300 hover:scale-[1.02]"
                onClick={handleButtonClick}
              >
                Get Started
                <svg
                  className="ml-2 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Desktop Card - Hidden on Mobile */}
      <motion.div
        className="hidden md:block w-[480px] scale-[0.85] transform-origin-left bg-[#FAFAFA] 
                   rounded-[40px] cursor-pointer overflow-hidden
                   shadow-sm hover:shadow-lg transition-shadow duration-300"
        onClick={() => setIsExpanded(!isExpanded)}
        layout
        animate={{
          backgroundColor: isExpanded ? "rgb(21,44,64)" : "#f0f0f0",
          height: isExpanded ? "auto" : "160px",
          scale: isExpanded ? 0.87 : 0.85,
        }}
        transition={{
          layout: { duration: 0.3 },
          scale: { duration: 0.3 },
        }}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center px-[50px] py-[40px]">
            <div className="flex items-center gap-8">
              <div className="relative w-[45px] h-[45px] flex items-center justify-center shrink-0">
                <Image
                  src={`/icons/${icon}${isExpanded ? "_w" : ""}.svg`}
                  alt={title}
                  fill
                  sizes="45px"
                  className="object-contain p-1.5"
                />
              </div>
              <div className="w-[4px] h-[60px] bg-[#F22929] rounded-full shrink-0" />
              <h3
                className={`text-[22px] font-semibold tracking-tight transition-colors duration-300 ${
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
              className="px-[50px] pb-[40px]"
            >
              <p className="text-white/90 text-[17px] leading-[1.8] mb-8 max-w-[380px]">
                {description}
              </p>
              <Link
                href={`/query?service=${serviceId}&title=${encodeURIComponent(title)}&description=${encodeURIComponent(description || '')}&icon=${encodeURIComponent(icon)}`}
                className="inline-flex items-center justify-center text-[16px] font-semibold 
                         text-white border-2 border-white/80 rounded-full px-12 py-3.5
                         hover:bg-white hover:text-[rgb(21,44,64)] 
                         transition-all duration-300 hover:scale-[1.02]"
                onClick={handleButtonClick}
              >
                Get Started
                <svg
                  className="ml-2 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </motion.div>
          )}
        </div>
      </motion.div>
    </>
  );
}
