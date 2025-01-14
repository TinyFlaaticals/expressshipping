import type { NextApiRequest, NextApiResponse } from 'next';

interface ServiceDetail {
  id: string;
  title: string;
  fullDescription: string;
  features: string[];
}

interface ApiResponse {
  message?: string;
  data?: ServiceDetail;
}

const serviceDetails: Record<string, ServiceDetail> = {
  'sea-to-air': {
    id: 'sea-to-air',
    title: 'Sea-to-Air Freight Forwarding',
    fullDescription: 'Our sea-to-air freight forwarding service combines the cost-effectiveness of sea freight with the speed of air transport, providing an optimal solution for your logistics needs. We ensure seamless coordination between different transport modes, offering real-time tracking and expert handling of your cargo throughout the journey.',
    features: [
      'Cost-effective transportation',
      'Global network coverage',
      'Real-time tracking',
      'Custom clearance assistance',
      'Door-to-door delivery options',
      'Professional handling of cargo'
    ]
  },
  'courier': {
    id: 'courier',
    title: 'Courier Services',
    fullDescription: 'Our courier services focus on speed and reliability, delivering packages of all sizes swiftly and ensuring seamless delivery across various destinations. We provide end-to-end tracking and specialized handling for time-sensitive shipments.',
    features: [
      'Express delivery options',
      'Real-time tracking',
      'Door-to-door service',
      'Secure handling',
      'International coverage',
      'Time-definite delivery'
    ]
  },
  'warehousing': {
    id: 'warehousing',
    title: 'Warehousing',
    fullDescription: 'Our top-notch warehousing facilities are strategically located around the globe, offering scalable and secure storage solutions for your cargo. We provide modern inventory management systems and value-added services to optimize your supply chain.',
    features: [
      'Strategic locations',
      'Modern facilities',
      'Inventory management',
      'Security systems',
      'Climate control options',
      'Value-added services'
    ]
  },
  'local-logistics': {
    id: 'local-logistics',
    title: 'Local Logistics in the Maldives',
    fullDescription: 'We provide comprehensive logistics solutions across the Maldives, handling everything from island-to-island LCL shipments to large-scale project cargo. Our local expertise ensures efficient and reliable service throughout the archipelago.',
    features: [
      'Island-to-island delivery',
      'LCL shipments',
      'Project cargo handling',
      'Local expertise',
      'Resort supply logistics',
      'Emergency logistics support'
    ]
  }
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  const { id } = req.query;
  
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const service = serviceDetails[id as string];
  
  if (!service) {
    return res.status(404).json({ message: 'Service not found' });
  }

  res.status(200).json({ data: service });
} 