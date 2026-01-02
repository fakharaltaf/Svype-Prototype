import { NextRequest, NextResponse } from 'next/server'

// Simplified middleware for prototype - no backend authentication
export async function middleware(request: NextRequest) {
  // Just pass through all requests - no auth checks for prototype
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
