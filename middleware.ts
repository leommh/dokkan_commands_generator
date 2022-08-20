import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware (request: NextRequest) {
  const { geo, headers:any } = request;

  let locale = 'pt';

  if (!!geo && geo.country) {
    const country = geo.country.toLocaleLowerCase();
    locale = getLocale(country);
  }

  console.log('geo => ', geo);

  request.headers.set('translate', locale)
  return NextResponse.next()
}

function getLocale(country: string) {
  return (country != 'br' && country != 'brazil' && country != 'brasil') ? 'en' : 'pt';
}
