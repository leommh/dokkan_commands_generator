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

  const response = NextResponse.next()
  response.headers.set('locale', locale);

  return response;
}