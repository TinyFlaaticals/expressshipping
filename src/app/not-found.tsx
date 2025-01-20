'use client';

import QueryForm from '@/components/QueryForm';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-white py-8 px-2 sm:px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col md:flex-row gap-4 md:gap-8 items-start max-w-5xl w-full"
      >
        <div className="w-full md:flex-1">
          <QueryForm />
        </div>
        <div className="w-full md:flex-1 space-y-3 mt-6 md:mt-0">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Send Us Your Query
          </h1>
          <p className="text-sm md:text-base text-gray-600 text-justify">
            Please use the form below to submit your query. We value your input and will ensure your request is handled with care. Note that all queries are reviewed by our team before being processed.
          </p>
        </div>
      </motion.div>
    </div>
  );
} 