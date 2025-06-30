import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

// Matches: /club/{club_name}, /club/{club_name}/something, etc.
const CLUB_ROUTE_REGEX = /^\/clubs\/([^\/]+)(\/.*)?$/;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  console.log("Middleware is running");

  const match = pathname.match(CLUB_ROUTE_REGEX);

  // Not a /club/{name} route? Allow it.
  if (!match) return NextResponse.next();

  const clubName = match[1]; // e.g., "cse", "eee", etc.

  // Optional: log for debugging
  // console.log('🔐 Checking access for club:', clubName);

  // Call your Laravel backend to check membership
  const res = await axios(`http://localhost:8000/api/check-membership/${clubName}`,{withCredentials: true});

  if (! res.data.success) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/unauthorized';
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}


export const config = {
    matcher: ['/clubs/:path*'],
}