import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Force HTTPS in production
  if (
    process.env.NODE_ENV === 'production' &&
    !request.url.includes('https://')
  ) {
    return NextResponse.redirect(
      request.url.replace('http://', 'https://')
    )
  }

  // Handle old query URLs with explicit domain
  if (request.nextUrl.pathname === '/query') {
    // Create new URL with production domain
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? 'https://expressshipping.mv'
      : request.url

    const newUrl = new URL('/services/inquiry', baseUrl)
    
    // Get essential parameters
    const service = request.nextUrl.searchParams.get('service')
    const title = request.nextUrl.searchParams.get('title')

    // Set only required parameters
    if (service) newUrl.searchParams.set('service', service)
    if (title) newUrl.searchParams.set('title', title)

    // Force 308 permanent redirect
    return NextResponse.redirect(newUrl.toString(), {
      status: 308, // Permanent redirect
      headers: {
        'Cache-Control': 'public, max-age=31536000',
        'Clear-Site-Data': '*'
      }
    })
  }

  // Handle www to non-www with explicit domain
  if (request.headers.get('host')?.startsWith('www.')) {
    const newUrl = new URL(request.url)
    newUrl.host = newUrl.host.replace(/^www\./, '')
    return NextResponse.redirect(newUrl.toString(), {
      status: 308 // Permanent redirect
    })
  }

  // Handle old service URLs if they exist
  if (request.nextUrl.pathname.startsWith('/services/') && request.nextUrl.pathname.endsWith('.html')) {
    const newPath = request.nextUrl.pathname.replace('.html', '')
    const newUrl = new URL(newPath, request.url)
    return NextResponse.redirect(newUrl)
  }

  return NextResponse.next()
}

// Update matcher to be more specific
export const config = {
  matcher: [
    '/query',
    '/services/:path*',
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ]
} 