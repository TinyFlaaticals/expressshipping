'use client';

import { motion } from "framer-motion";
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Header = () => {
  const router = useRouter();

  return (
    <motion.div 
      className="w-full flex flex-col items-center md:flex-row md:justify-between 
                 px-4 sm:px-6 lg:px-[57px] pt-6 md:pt-[64px] gap-6 md:gap-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Logo Icon - Clickable */}
      <Image 
        src="/logo-icon.svg" 
        alt="Express Shipping Logo" 
        width={128} 
        height={129}
        style={{ 
          width: 'clamp(80px, 15vw, 128px)',
          height: 'auto',
          cursor: 'pointer'
        }}
        className="hover:scale-105 transition-transform duration-300"
        onClick={() => router.push('/')}
        priority
      />

      {/* Logo Text */}
      <Image 
        src="/logo_text.svg" 
        alt="Express Shipping & Logistics" 
        width={411} 
        height={108}
        style={{ 
          width: 'clamp(250px, 40vw, 411px)',
          height: 'auto'
        }}
        priority
      />
    </motion.div>
  );
}

export default Header;