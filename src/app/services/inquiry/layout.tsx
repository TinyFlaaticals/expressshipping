import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Service Inquiry - Express Shipping Maldives',
  description: 'Submit your inquiry for our professional shipping and logistics services in the Maldives',
  openGraph: {
    title: 'Service Inquiry - Express Shipping Maldives',
    description: 'Submit your inquiry for our professional shipping and logistics services in the Maldives',
    url: 'https://expressshipping.mv/services/inquiry',
    siteName: 'Express Shipping Maldives',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Service Inquiry - Express Shipping Maldives',
    description: 'Submit your inquiry for our professional shipping and logistics services in the Maldives',
  },
  verification: {
    google: 'PENDING_VERIFICATION_CODE',
  }
}

export default function InquiryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
} 