'use client';

import { motion } from "framer-motion";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Mail, Phone } from 'lucide-react';

const Header = () => {
  const router = useRouter();

  return (
    <div className="flex justify-center w-full">
      <motion.div 
        className="w-full max-w-[1398px] flex items-center justify-between
                   px-4 sm:px-6 lg:px-[57px] pt-6 md:pt-[64px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Logo Icon - Clickable */}
        <Image 
          src="/logo_full.svg" 
          alt="Express Shipping Logo" 
          width={293} 
          height={192}
          style={{ 
            width: '200px',
            height: '100px',
            cursor: 'pointer'
          }}
          className="w-[200px] md:w-[293px] hover:scale-105 transition-transform duration-300"
          onClick={() => router.push('/')}
          priority
        />

        {/* Contact Information */}
        <div className="hidden md:flex flex-col items-end gap-2">
          <a 
            href="mailto:info@expressshipping.com" 
            className="flex items-center gap-2 hover:text-blue-600 transition-colors duration-300"
          >
            <Mail size={20} />
            <span className="text-sm">info@expressshipping.mv</span>
          </a>
          <a 
            href="tel:+960938181" 
            className="flex items-center gap-2 hover:text-blue-600 transition-colors duration-300"
          >
            <Phone size={20} />
            <span className="text-sm">+960 938 1818</span>
          </a>
        </div>

        {/* Mobile Contact Icons */}
        <div className="flex md:hidden items-center gap-4">
          <a 
            href="mailto:info@expressshipping.com" 
            className="p-2 hover:text-blue-600 transition-colors duration-300"
          >
            <Mail size={20} />
          </a>
          <a 
            href="tel:+960938181" 
            className="p-2 hover:text-blue-600 transition-colors duration-300"
          >
            <Phone size={20} />
          </a>
        </div>
      </motion.div>
    </div>
  );
}

export default Header;