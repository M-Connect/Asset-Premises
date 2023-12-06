import {
  DEFAULT_LOCALE,
  getLocaleFromPathname,
  LOCALES,
} from '@/utils/i18n/common';
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import appConfig from '@/config';
import { Locale } from '@microrealestate/types';

const DOMAIN_URL = new URL(appConfig.GATEWAY_URL || 'http://localhost');
const GATEWAY_URL = appConfig.DOCKER_GATEWAY_URL || appConfig.GATEWAY_URL;

export async function middleware(request: NextRequest) {
  let nextResponse = await injectSessionToken(request);
  if (nextResponse) {
    return nextResponse;
  }

  nextResponse = injectLocale(request);
  if (nextResponse) {
    return nextResponse;
  }

  nextResponse = await redirectSignIn(request);
  if (nextResponse) {
    return nextResponse;
  }

  nextResponse = redirectDashboard(request);
  if (nextResponse) {
    return nextResponse;
  }

  return injectXPathHeader(request);
}

export const config = {
  matcher: [
    // Skip all paths which do not need to be localized
    '/((?!api|_next/static|_next/image|favicon.svg|undraw_qa_engineers_dg-5-p.svg).*)',
    '/',
  ],
};

function getRequestLocale(request: NextRequest) {
  const requestHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => {
    requestHeaders[key] = value;
  });
  const languages = new Negotiator({ headers: requestHeaders }).languages();
  return match(languages, LOCALES, DEFAULT_LOCALE) as Locale;
}

async function injectSessionToken(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === '/signedin') {
    try {
      const token = request.nextUrl.searchParams.get('token');
      const response = await fetch(
        `${GATEWAY_URL}/api/v2/authenticator/tenant/signedin?token=${token}`
      );
      const data = await response.json();
      const sessionToken = data.sessionToken;
      request.nextUrl.pathname = '/dashboard';
      request.nextUrl.searchParams.delete('token');
      const nextResponse = NextResponse.redirect(request.nextUrl);
      nextResponse.cookies.set('sessionToken', sessionToken, {
        httpOnly: true,
        sameSite: 'lax',
        secure: DOMAIN_URL.protocol === 'https:',
        domain: DOMAIN_URL.hostname,
      });
      return nextResponse;
    } catch (error) {
      console.error(error);
      request.nextUrl.pathname = '/signin';
      request.nextUrl.searchParams.delete('token');
      return NextResponse.redirect(request.nextUrl);
    }
  }
}

function injectLocale(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const requestLocale = getRequestLocale(request);
  const pathnameLocale = getLocaleFromPathname(pathname);
  const locale = pathnameLocale || requestLocale;

  if (!pathnameLocale && pathname !== '/underconstruction') {
    request.nextUrl.pathname = `/${locale}${pathname}`;
    console.debug('====>', pathname, 'redirected to', request.nextUrl.pathname);
    return NextResponse.redirect(request.nextUrl);
  }
}

async function redirectSignIn(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const locale = getLocaleFromPathname(pathname);

  if (['/underconstruction', `/${locale}/signin`].includes(pathname)) {
    return;
  }

  let session = null;
  try {
    const response = await fetch(
      `${GATEWAY_URL}/api/v2/authenticator/tenant/session`,
      {
        headers: {
          cookie: `sessionToken=${
            request.cookies.get('sessionToken')?.value || ''
          }`,
        },
      }
    );
    session = await response.json();
  } catch (error) {
    console.error(error);
  }

  if (!session) {
    request.nextUrl.pathname = '/signin';
    return NextResponse.redirect(request.nextUrl);
  }
}

function redirectDashboard(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const locale = getLocaleFromPathname(pathname);

  if (pathname === '/' || pathname === `/${locale}`) {
    request.nextUrl.pathname = `/${locale}/dashboard`;
    console.debug('====>', pathname, 'redirected to', request.nextUrl.pathname);
    return NextResponse.redirect(request.nextUrl);
  }
}

function injectXPathHeader(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-path', pathname);
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}