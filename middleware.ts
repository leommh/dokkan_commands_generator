import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware (request: NextRequest) {
  const { geo } = request;

  let locale = 'pt';
  if (!!geo && geo.country) {
    const country = geo.country.toLocaleLowerCase();
    if (country != 'br' && country != 'brazil' && country != 'brasil') {
      locale = 'en';
    }
  }

  request.headers.set('locale', locale)
  return NextResponse.next()
}