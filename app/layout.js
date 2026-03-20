import Script from 'next/script'
import './globals.css'
import Header from './components/Header'
import Footer from './components/Footer'

const siteUrl = 'https://mannai-two.vercel.app'

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: '계산기 모음 - 만나이, 급여, 전월세, 사주 계산기',
  description:
    '만나이 계산기, 급여 실수령액 계산기, 전월세 계산기, 사주 계산기를 한 곳에서 무료로 사용하세요.',
  keywords: ['만나이 계산기', '급여 계산기', '전월세 계산기', '사주 계산기'],
  alternates: { canonical: '/' },
  openGraph: {
    title: '계산기 모음',
    description: '자주 쓰는 계산기를 무료로 제공합니다.',
    url: siteUrl,
    type: 'website',
    locale: 'ko_KR',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <meta name="google-adsense-account" content="ca-pub-1059415497859090" />
        <meta name="google-site-verification" content="Uq__XjJJK6j-ipJKyUcbCDK6hy_aWPgaf3ep7bsbdlk" />

        {/* Google Analytics 자리
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XXXXXXXXXX');
        `}} />
        */}
      </head>
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Google AdSense 스크립트 */}
        <Script
          async
          id="google-adsense"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1059415497859090"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        <Header />
        <div style={{ flex: 1 }}>
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}
