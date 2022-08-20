import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

function getLocale(country: string) {
  return (country != 'br' && country != 'brazil' && country != 'brasil') ? 'en' : 'pt';
}

export async function middleware (request: NextRequest) {
  const { geo } = request;

  let locale = 'en';

  if (!!geo && geo.country) {
    const country = geo.country.toLocaleLowerCase();
    locale = getLocale(country);
  }

  request.headers.set('locale', locale);

  return NextResponse.next();
}