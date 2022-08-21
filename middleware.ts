import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

function getLocale(country: string) {
  return (country != 'br' && country != 'brazil' && country != 'brasil') ? 'en' : 'pt';
}
const PUBLIC_FILE = /\.(.*)$/

export async function middleware (req: NextRequest) {
  if (
    req.nextUrl.pathname.startsWith('/_next') ||
    req.nextUrl.pathname.includes('/api/') ||
    req.nextUrl.pathname.includes('favicon') ||
    PUBLIC_FILE.test(req.nextUrl.pathname)
  ) {
    return
  }

  const { geo } = req;

  let locale = 'en';
  let country = '';

  if (!!geo && geo.country) {
    country = geo.country.toLowerCase();
  }

  locale = getLocale(country);

  if (req.nextUrl.locale === 'default') {
    return NextResponse.redirect(new URL(`/${locale}${req.nextUrl.pathname}`, req.url))
  }

  return NextResponse.next();
}