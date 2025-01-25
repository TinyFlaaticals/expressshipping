'use client';

import { useParams } from 'next/navigation';
import { notFound } from 'next/navigation';

// Map of valid service IDs
const VALID_SERVICES = new Set([
  'sea-to-air-freight-forwarding',
  'freight-forwarding',
  'customs-brokerage-services',
  'courier-services',
  'warehousing',
  'local-logistics-in-the-maldives'
]);

export default function ServicePage() {
  const { serviceId } = useParams();
  
  // Type guard and validation
  if (typeof serviceId !== 'string' || !VALID_SERVICES.has(serviceId)) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Your service page content will go here */}
      <h1>{serviceId}</h1>
    </div>
  );
} 