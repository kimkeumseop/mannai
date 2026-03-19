import Script from 'next/script'
import './globals.css'

export const metadata = {
  title: '만 나이 계산기 | 생년월일로 바로 계산',
  description:
    '생년월일을 입력하면 만 나이, 세는나이, 연 나이와 다음 생일까지 한 번에 확인할 수 있습니다.',
  keywords: ['만 나이 계산기', '만나이', '세는나이', '연 나이', '나이 계산'],
  openGraph: {
    title: '만 나이 계산기',
    description: '생년월일로 만 나이와 세는나이를 빠르게 확인하세요.',
    type: 'website',
    locale: 'ko_KR',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <meta name="google-adsense-account" content="ca-pub-1059415497859090" />
      </head>
      <body>
        <Script
          async
          id="google-adsense"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1059415497859090"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        {children}
      </body>
    </html>
  )
}
