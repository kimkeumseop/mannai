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
      <body>{children}</body>
    </html>
  )
}
