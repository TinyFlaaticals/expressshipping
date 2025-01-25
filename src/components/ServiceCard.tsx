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

  const handleCardClick = () => {
    router.push(`/services/inquiry?service=${serviceId}&title=${encodeURIComponent(title)}`);
  };

  return (
    <>
      {/* Mobile Accordion Style */}
      <motion.div
        className="md:hidden w-full bg-[#f0f0f0] rounded-[20px]
                   shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
        onClick={handleCardClick}
        layout
        animate={{
          backgroundColor: "#f0f0f0",
          height: "90px",
          borderRadius: "20px",
          margin: "8px 0",
          scale: 1,
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
          <div className="flex items-center px-5 py-4">
            <div className="flex items-center gap-4">
              <div className="relative w-[28px] h-[28px] flex items-center justify-center shrink-0">
                <Image
                  src={`/icons/${icon}.svg`}
                  alt={title}
                  fill
                  sizes="28px"
                  className="object-contain p-1"
                />
              </div>
              <div className="w-[3px] h-[35px] bg-[#F22929] rounded-full shrink-0" />
              <h3 className="text-[16px] font-semibold tracking-tight text-[#152C40]">
                {title}
              </h3>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Desktop Card - Hidden on Mobile */}
      <motion.div
        className="hidden md:block w-[480px] scale-[0.85] transform-origin-left bg-[#FAFAFA] 
                   rounded-[40px] cursor-pointer overflow-hidden
                   shadow-sm hover:shadow-lg transition-shadow duration-300"
        onClick={handleCardClick}
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
