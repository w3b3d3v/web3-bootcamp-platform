// pages/_middleware.js
import { NextResponse } from 'next/server'
import i18n from '../lib/i18n'

export function middleware(request) {
  const url = request.nextUrl.clone() // Clone the URL to modify it
  const lang = url.searchParams.get('lang')

  if (lang) {
    i18n.changeLanguage(lang) // Synchronously change language, if possible
  }

  return NextResponse.next() // Continue to the page
}
