import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware (request: NextRequest) {
  const { geo } = request;

  let locale = 'pt';
  const headers:any = request.headers;
  

  if (!!geo && geo.country) {
    const country = geo.country.toLocaleLowerCase();
    locale = getLocale(country);
  } else if (!!headers && headers['x-vercel-ip-country']) {
    const country = headers['x-vercel-ip-country'].toLocaleLowerCase();
    locale = getLocale(country);
  }

  console.log('geo => ', geo);
  console.log('headers => ', headers);

  request.headers.set('locale', locale)
  return NextResponse.next()
}

function getLocale(country: string) {
  return (country != 'br' && country != 'brazil' && country != 'brasil') ? 'en' : 'pt';
}
