import { type NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/middleware-client'

export async function middleware(request: NextRequest) {
  // 1. Create the Supabase client and initial response
  // This handles cookie reading/writing for session management
  const { supabase, response } = createClient(request)

  // 2. Get the user (this refreshes the session if needed)
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const pathname = request.nextUrl.pathname

  // 3. Define protection rules

  // Rule A: If authenticated user tries to access public auth routes (like /login),
  // redirect them to the dashboard
  if (user && pathname === '/login') {
    const url = request.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.redirect(url)
  }

  // Rule B: If unauthenticated user tries to access protected routes (everything except login),
  // redirect them to /login
  if (!user && pathname !== '/login') {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // 4. Return the response object created by the Supabase client
  // This is crucial! It contains the Set-Cookie header if the session was refreshed.
  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public assets (images, svg, etc)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
