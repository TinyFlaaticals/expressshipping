import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Handle old query URLs
  if (request.nextUrl.pathname === '/query') {
    const searchParams = request.nextUrl.searchParams
    const service = searchParams.get('service')
    const title = searchParams.get('title')
    const description = searchParams.get('description') // Capture description for schema
    const icon = searchParams.get('icon') // Capture icon for reference

    // Create new URL with essential parameters
    const newUrl = new URL('/services/inquiry', request.url)
    if (service) newUrl.searchParams.set('service', service)
    if (title) newUrl.searchParams.set('title', title)
    
    // Store additional data in the schema
    const pageData = {
      service,
      title,
      description,
      icon
    }

    // Log the redirect for debugging
    console.log('Redirecting:', {
      from: request.url,
      to: newUrl.toString(),
      pageData
    })

    return NextResponse.redirect(newUrl)
  }

  // Handle www to non-www redirect
  if (request.headers.get('host')?.startsWith('www.')) {
    const newUrl = new URL(request.url)
    newUrl.host = newUrl.host.replace(/^www\./, '')
    return NextResponse.redirect(newUrl)
  }

  return NextResponse.next()
}

// Configure middleware to run on specific paths
export const config = {
  matcher: [
    '/query',
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
} 