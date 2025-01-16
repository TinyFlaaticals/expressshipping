'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

interface ServiceCardProps {
  title: string;
  description?: string;
  icon: string;
  serviceId: string;
}

export default function DesktopServiceCard({ title, description, icon, serviceId }: ServiceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <motion.div
      className="w-[453px] scale-[0.85] transform-origin-left bg-[#FAFAFA] border border-[#8F8F8F] 
                 rounded-[50px] cursor-pointer overflow-hidden"
      onClick={() => setIsExpanded(!isExpanded)}
      layout
      animate={{
        backgroundColor: isExpanded ? "rgb(21,44,64)" : "#FAFAFA",
        height: isExpanded ? "560px" : "232px",
        borderColor: isExpanded ? "transparent" : "#8F8F8F"
      }}
      transition={{
        layout: { duration: 0.3 },
        height: { duration: 0.3 },
        backgroundColor: { duration: 0.3 },
        borderColor: { duration: 0.3 }
      }}
    >
      {/* Same internal structure as before */}
    </motion.div>
  );
} 