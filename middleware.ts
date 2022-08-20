import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

function getLocale(country: string) {
  return (country != 'br' && country != 'brazil' && country != 'brasil') ? 'en' : 'pt';
}

export async function middleware (request: NextRequest) {
  const { geo } = request;

  let locale = 'en';
  let country = '';

  if (!!geo && geo.country) {
    country = geo.country.toLowerCase();
  }

  locale = getLocale(country);

  console.log('locale -> ', locale, country);

  request.headers.set('locale', locale);

  return NextResponse.next();
}