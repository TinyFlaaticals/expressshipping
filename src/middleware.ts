import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Valid service IDs from our service data
const VALID_SERVICES = new Set([
  'sea-to-air-freight-forwarding',
  'freight-forwarding',
  'customs-brokerage-services',
  'courier-services',
  'warehousing',
  'local-logistics-in-the-maldives'
]);

export function middleware(request: NextRequest) {
  // Force HTTPS in production
  const url = request.nextUrl.clone()
  
  // Handle /query redirects
  if (url.pathname === '/query') {
    // Get the service and title parameters
    const service = url.searchParams.get('service')
    const title = url.searchParams.get('title')
    
    // Create the new URL for services/inquiry
    url.pathname = '/services/inquiry'
    
    // Clear all existing parameters and only set the ones we want
    url.search = ''
    if (service) url.searchParams.set('service', service)
    if (title) url.searchParams.set('title', title)

    // Return permanent redirect
    return NextResponse.redirect(url, {
      status: 301,
      headers: {
        'Cache-Control': 'no-store',
        'Pragma': 'no-cache',
        'Expires': '0',
      }
    })
  }

  // Handle www to non-www redirect
  if (request.headers.get('host')?.startsWith('www.')) {
    const newUrl = new URL(request.url)
    newUrl.host = newUrl.host.replace(/^www\./, '')
    return NextResponse.redirect(newUrl.toString(), {
      status: 301
    })
  }

  return NextResponse.next()
}

// Simplified matcher
export const config = {
  matcher: [
    '/query',
    '/services/:path*',
  ]
} 