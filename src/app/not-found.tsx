'use client';

import { useSearchParams } from 'next/navigation';
import QueryForm from '@/components/QueryForm';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Suspense } from 'react';
import { useRouter } from 'next/navigation';

// Separate component that uses useSearchParams
const QueryFormWrapper = () => {
  const searchParams = useSearchParams();
  const serviceId = searchParams.get('service') || '';
  const serviceTitle = searchParams.get('title') || '';
  const serviceIcon = searchParams.get('icon') || '';

  return (
    <div className="w-full md:flex-1 mt-12">
      {serviceIcon && (
        <div className="flex items-center gap-4 mb-6">
          <div className="relative w-[28px] h-[28px]">
            <Image
              src={`/icons/${serviceIcon}.svg`}
              alt={serviceTitle}
              fill
              sizes="28px"
              className="object-contain"
            />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">{serviceTitle}</h2>
        </div>
      )}
      <QueryForm serviceId={serviceId} serviceTitle={serviceTitle} />
    </div>
  );
};

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-white py-8 px-8 sm:px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col md:flex-row gap-4 md:gap-8 items-start max-w-5xl w-full"
      >
        <Suspense 
          fallback={
            <div className="w-full md:flex-1 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          }
        >
          <QueryFormWrapper />
        </Suspense>

        <div className="w-full md:flex-1 space-y-3 mt-6 md:mt-12">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Send Us Your Query
          </h1>
          <p className="text-sm md:text-base text-gray-600 text-justify">
            Please use the form below to submit your query. We value your input and will ensure your request is handled with care. Note that all queries are reviewed by our team before being processed.
          </p>
          
          {/* Back Button */}
          <div className="mt-20 md:text-left text-center">
            <motion.button
              onClick={() => router.push('/')}
              className="flex items-center gap-3 px-6 py-3 rounded-full
                       border border-transparent hover:border-[#2B84EA]/20 
                       hover:bg-[#2B84EA]/5 transition-all duration-300
                       mx-auto md:mx-0"
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="flex items-center justify-center w-10 h-10 rounded-full 
                         bg-[#152C40] text-white"
                whileHover={{ rotate: -360 }}
                transition={{ duration: 0.5 }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </motion.div>
              <span className="text-[#152C40] font-medium text-lg">Back to Home</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}