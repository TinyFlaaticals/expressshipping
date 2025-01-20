'use client';

import QueryForm from '@/components/QueryForm';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      {/* <motion.div 
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-[#152C40] mb-4">404</h1>
        <p className="text-gray-600 mb-6">Page not found</p>
        <a 
          href="/"
          className="text-[#2B84EA] hover:underline"
        >
          Return to Home
        </a>
      </motion.div> */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <QueryForm />
      </motion.div>
    </div>
  );
} 