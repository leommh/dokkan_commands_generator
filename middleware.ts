import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware (request: NextRequest) {
  const { geo } = request;

  let translate = 'pt';
  if (!!geo && geo.country) {
    const country = geo.country.toLocaleLowerCase();
    if (country != 'br' && country != 'brazil' && country != 'brasil') {
      translate = 'en';
    }
  }

  request.headers.set('translate', translate)
  return NextResponse.next()
}