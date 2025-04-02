// ✅ FICHIER : middleware.ts

import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session }
  } = await supabase.auth.getSession()

  // Si pas de session, redirection vers la page de login
  if (!session) {
    return NextResponse.redirect(new URL('/auth', req.url))
  }

  return res
}

// Appliquer le middleware uniquement sur les pages à sécuriser
export const config = {
  matcher: ['/dashboard/:path*'],
}
