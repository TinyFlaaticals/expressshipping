'use client';

import { motion } from "framer-motion";
import Image from 'next/image';

const Footer = () => {
  return (
    <div className="w-screen max-w-[1398px] mx-auto px-4 sm:px-0">
      {/* Divider with animation - Exactly matching page divider */}
      <motion.div 
        className="w-full h-[1px] bg-[#444444] rounded-full my-20 md:my-20"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      />

      {/* Get In Touch Section */}
      <motion.div 
        className="w-full flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-20 mb-12 md:mb-20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Left Section */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Image 
              src="/logo_full.svg" 
              alt="Express Shipping & Logistics" 
              width={239} 
              height={192} 
              className="w-[180px] md:w-[239px] h-auto hover:brightness-110 transition-all"
            />
          </motion.div>

          {/* Get In Touch Content */}
          <div className="flex flex-col">
            <motion.h3 
              className="text-2xl md:text-[32px] font-black text-[#152C40] mb-4 md:mb-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              GET IN TOUCH
            </motion.h3>
            <motion.p 
              className="max-w-[400px] text-base md:text-[17px] text-[#152C40] 
                        leading-relaxed md:leading-[32px] mb-6 md:mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Connect with us and discover how Express Shipping & Logistics can be your partner in success. 
              Reach out to us today to discuss your specific needs and explore the possibilities of working together.
            </motion.p>
          </div>
        </div>

        {/* Contact Information */}
        <motion.div 
          className="text-base md:text-[17px] text-[#152C40] leading-relaxed"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="mb-2 hover:text-[#2B84EA] transition-colors duration-300 cursor-pointer"
            whileHover={{ x: 5 }}
          >
            <p>Address : M. Bunberuge, 2 Floor, Shairu</p>
            <p>Varudhee, K. Malé, Maldives</p>
          </motion.div>
          <motion.p 
            className="mb-2 hover:text-[#2B84EA] transition-colors duration-300 cursor-pointer"
            whileHover={{ x: 5 }}
          >
            Mobile : +960 9381818
          </motion.p>
          <motion.p 
            className="mb-2 hover:text-[#2B84EA] transition-colors duration-300 cursor-pointer"
            whileHover={{ x: 5 }}
          >
            Email : info@expressshipping.mv
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Social Icons */}
      <motion.div 
        className="w-full flex justify-end gap-4 md:gap-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {[
          { id: 'fb', url: 'https://www.facebook.com/expressshipmv' },
          { id: 'insta', url: 'https://www.instagram.com/expressshipmv/' },
          { id: 'linkedin', url: 'https://www.linkedin.com/company/express-shipping-logistics' }
        ].map((social) => (
          <motion.a
            key={social.id}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-[30px] h-[30px] flex items-center justify-center relative group"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              className="absolute inset-0 bg-[#152C40] rounded-full opacity-0 
                        group-hover:opacity-10 transition-opacity duration-300"
              initial={false}
            />
            <Image 
              src={`/icons/social_${social.id}.svg`}
              alt={social.id.charAt(0).toUpperCase() + social.id.slice(1)}
              width={30}
              height={30}
              className="object-contain transition-all duration-300 
                        group-hover:brightness-110"
              priority
            />
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
}

export default Footer; 