export function generateServiceStructuredData(serviceId: string, serviceTitle: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `https://expressshipping.mv/services/${serviceId}`,
    "name": serviceTitle || "Express Shipping Service",
    "provider": {
      "@type": "Organization",
      "name": "Express Shipping Maldives",
      "url": "https://expressshipping.mv",
      "logo": "https://expressshipping.mv/logo.png",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "Maldives"
      }
    },
    "serviceType": "Logistics and Shipping Service",
    "description": `Professional ${serviceTitle || 'shipping'} services by Express Shipping Maldives`,
    "areaServed": {
      "@type": "Country",
      "name": "Maldives"
    },
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock"
    },
    "potentialAction": {
      "@type": "OrderAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `https://expressshipping.mv/services/inquiry?service=${serviceId}&title=${encodeURIComponent(serviceTitle)}`,
        "inLanguage": "en",
        "actionPlatform": [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform"
        ]
      }
    }
  };
}

function getServiceType(serviceId: string): string {
  const types = {
    'sea-to-air-freight-forwarding': 'Freight Forwarding Service',
    'freight-forwarding': 'Freight Transport Service',
    'customs-brokerage-services': 'Customs Brokerage Service',
    'courier-services': 'Courier Service',
    'warehousing': 'Storage Service',
    'local-logistics-in-the-maldives': 'Local Logistics Service'
  }
  return types[serviceId as keyof typeof types] || 'Logistics Service'
}

function getServiceDescription(serviceId: string): string {
  const descriptions = {
    'sea-to-air-freight-forwarding': 'Cost-effective solution combining sea freight affordability with air transport speed for optimal logistics efficiency.',
    'freight-forwarding': 'Global freight forwarding services with comprehensive sea and air freight solutions.',
    'customs-brokerage-services': 'Professional customs clearance and documentation services ensuring smooth import/export processes.',
    'courier-services': 'Express courier services for packages of all sizes with reliable delivery across destinations.',
    'warehousing': 'Secure and strategic warehousing solutions with modern facilities and inventory management.',
    'local-logistics-in-the-maldives': 'Specialized logistics services across the Maldives islands, including LCL shipments and project cargo.'
  }
  return descriptions[serviceId as keyof typeof descriptions] || ''
}

function getServiceFeatures(serviceId: string): Array<{
  '@type': string;
  name: string;
}> {
  const features = {
    'sea-to-air-freight-forwarding': [
      'Cost-effective shipping',
      'Combined transport modes',
      'Global coverage',
      'Time-sensitive solutions'
    ],
    'freight-forwarding': [
      'International shipping',
      'Cargo tracking',
      'Documentation handling',
      'Custom solutions'
    ],
    'customs-brokerage-services': [
      'Customs clearance',
      'Documentation assistance',
      'Regulatory compliance',
      'Import/Export facilitation'
    ],
    'courier-services': [
      'Express delivery',
      'Package tracking',
      'Door-to-door service',
      'International shipping'
    ],
    'warehousing': [
      'Secure storage',
      'Inventory management',
      'Distribution services',
      'Climate-controlled facilities'
    ],
    'local-logistics-in-the-maldives': [
      'Island-to-island delivery',
      'LCL shipments',
      'Project cargo handling',
      'Local distribution'
    ]
  }

  const serviceFeatures = features[serviceId as keyof typeof features] || []
  
  return serviceFeatures.map(feature => ({
    '@type': 'Offer',
    name: feature
  }))
} 