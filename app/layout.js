import Script from 'next/script'
import './globals.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { buildSiteSchema, siteUrl } from './lib/structuredData'

const siteSchema = buildSiteSchema()

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: '계산기 모음 - 만나이, 급여, 전월세, 사주 계산기',
  description:
    '만나이, 급여, 전월세, 사주 무료 계산기를 한 곳에서 사용할 수 있는 계산기 모음 사이트입니다.',
  keywords: ['만나이 계산기', '급여 계산기', '전월세 계산기', '사주 계산기'],
  alternates: { canonical: siteUrl },
  openGraph: {
    title: '계산기 모음',
    description: '만나이, 급여, 전월세, 사주 무료 계산기',
    url: siteUrl,
    type: 'website',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary',
    title: '계산기 모음',
    description: '만나이, 급여, 전월세, 사주 무료 계산기',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta name="google-adsense-account" content="ca-pub-1059415497859090" />
        <meta name="google-site-verification" content="Uq__XjJJK6j-ipJKyUcbCDK6hy_aWPgaf3ep7bsbdlk" />
        <meta name="naver-site-verification" content="c109c20a80d33896e2455085d1df4ece9ffd7121" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }}
        />

        {/* Google Analytics */}
        {/* GA_MEASUREMENT_ID 를 본인 ID로 교체 */}
        {/*
        <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'GA_MEASUREMENT_ID');
        `}} />
        */}
      </head>
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Script
          async
          id="google-adsense"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1059415497859090"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        <Header />
        <div style={{ flex: 1 }}>{children}</div>
        <Footer />
      </body>
    </html>
  )
}
