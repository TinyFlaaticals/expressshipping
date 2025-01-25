import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl

  // Handle old query URLs and remove unnecessary parameters
  if (url.pathname === '/query') {
    const newUrl = new URL('/services/inquiry', request.url)
    
    // Only forward essential parameters
    const service = url.searchParams.get('service')
    const title = url.searchParams.get('title')

    if (service) newUrl.searchParams.set('service', service)
    if (title) newUrl.searchParams.set('title', title)

    // Remove all other parameters (description, icon, etc.)
    return NextResponse.redirect(newUrl)
  }

  // Handle www to non-www redirect
  if (request.headers.get('host')?.startsWith('www.')) {
    const newUrl = new URL(request.url)
    newUrl.host = newUrl.host.replace(/^www\./, '')
    return NextResponse.redirect(newUrl)
  }

  // Handle old service URLs if they exist
  if (url.pathname.startsWith('/services/') && url.pathname.endsWith('.html')) {
    const newPath = url.pathname.replace('.html', '')
    const newUrl = new URL(newPath, request.url)
    return NextResponse.redirect(newUrl)
  }

  return NextResponse.next()
}

// Configure middleware to run on specific paths
export const config = {
  matcher: [
    '/query',
    '/services/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
} 