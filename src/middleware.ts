import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Protect the /user-profile route
  if (pathname.startsWith('/user-profile')) {
    const tempEmail = request.cookies.get('temp_email');

    if (!tempEmail) {
      return NextResponse.redirect(new URL('/register', request.url));
    }
  }

  return NextResponse.next();
}

// Apply middleware only to /user-profile
export const config = {
  matcher: ['/user-profile'],
};
