import styles from './page.module.css'
import Link from 'next/link'

export const metadata = {
  title: '계산기 모음 - 만나이, 급여, 전월세, 사주 계산기',
  description:
    '만나이 계산기, 급여 실수령액 계산기, 전월세 계산기, 사주 계산기를 한 곳에서 무료로 사용하세요. 2026년 최신 기준 반영.',
  keywords: ['만나이 계산기', '급여 계산기', '전월세 계산기', '사주 계산기', '실수령액'],
  alternates: { canonical: '/' },
  openGraph: {
    title: '계산기 모음',
    description: '만나이·급여·전월세·사주 계산기를 무료로 제공합니다.',
    url: 'https://mannai-two.vercel.app',
    type: 'website',
    locale: 'ko_KR',
  },
}

const CALCS = [
  {
    href: '/mannai',
    title: '만 나이 계산기',
    desc: '만 나이, 세는나이, 연 나이, 다음 생일 D-day',
    emoji: '🎂',
  },
  {
    href: '/salary',
    title: '급여 실수령액 계산기',
    desc: '2026년 기준 4대보험 + 소득세 공제 후 실수령액',
    emoji: '💰',
  },
  {
    href: '/jeonwolse',
    title: '전월세 계산기',
    desc: '전세↔월세 변환, 전세대출 이자 계산',
    emoji: '🏠',
  },
  {
    href: '/saju',
    title: '사주 계산기',
    desc: '생년월일로 사주팔자 8글자 + 오행 비율 계산',
    emoji: '☯️',
  },
]

const CALC_DETAILS = [
  {
    href: '/mannai',
    title: '만 나이 계산기',
    emoji: '🎂',
    points: [
      '2023년 만 나이 통일법 기준으로 계산',
      '만 나이 · 세는나이 · 연 나이 동시 확인',
      '다음 생일 D-day, 살아온 날수, 띠 제공',
    ],
  },
  {
    href: '/salary',
    title: '급여 실수령액 계산기',
    emoji: '💰',
    points: [
      '2026년 최신 4대보험 요율 반영',
      '국민연금 4.75%, 건강보험 3.595% 등 공식 기준',
      '부양가족 수, 자녀, 비과세 항목까지 반영한 계산',
    ],
  },
  {
    href: '/jeonwolse',
    title: '전월세 계산기',
    emoji: '🏠',
    points: [
      '전세 → 월세, 월세 → 전세 변환',
      '전세대출 월 이자 계산 (거치식)',
      '전월세 전환율을 직접 입력해 시나리오 비교',
    ],
  },
  {
    href: '/saju',
    title: '사주 계산기',
    emoji: '☯️',
    points: [
      '생년월일시로 사주팔자 8글자 자동 계산',
      '오행(목·화·토·금·수) 비율 바 차트로 시각화',
      '양력·음력 모두 지원, 자동 변환',
    ],
  },
]

const faqItems = [
  {
    q: '계산 결과가 실제와 다를 수 있나요?',
    a: '본 계산기는 일반적인 참고 목적으로 제공됩니다. 급여 실수령액은 회사 내규나 추가 공제 항목에 따라 달라질 수 있고, 전월세 계산은 실제 계약 조건에 따라 차이가 날 수 있습니다. 중요한 결정을 내리기 전에는 세무사, 공인중개사 등 전문가에게 확인하시길 권장합니다.',
  },
  {
    q: '만 나이와 세는나이(한국나이)의 차이가 뭔가요?',
    a: '만 나이는 생일을 기준으로 한 살씩 늘어나는 국제 표준 방식입니다. 세는나이(한국나이)는 태어나자마자 1살로 시작하고 매년 1월 1일에 한 살씩 늘어납니다. 두 방식은 최대 2살까지 차이가 날 수 있으며, 2023년부터 법적·행정적 기준은 만 나이로 통일됐습니다.',
  },
  {
    q: '급여 계산기는 매년 업데이트 되나요?',
    a: '네, 국민연금·건강보험·고용보험 등 4대보험 요율은 매년 변경될 수 있습니다. 본 계산기는 2026년 기준 요율을 반영하고 있으며, 새해 요율이 발표되면 최신 내용으로 업데이트할 예정입니다.',
  },
  {
    q: '전월세 계산기에서 전환율은 어떻게 정하나요?',
    a: '전월세 전환율은 전세금을 월세로 바꿀 때 적용하는 연 이율로, 일반적으로 연 4~6% 수준이 많이 사용됩니다. 주택임대차보호법상 법정 상한이 있으며, 지역과 시기에 따라 달라질 수 있습니다. 계산기에서 전환율을 직접 입력해 다양한 시나리오를 비교해 보세요.',
  },
  {
    q: '사주 계산기는 음력 생년월일도 지원하나요?',
    a: '네, 양력과 음력 모두 지원합니다. 음력을 선택하면 입력한 음력 날짜를 양력으로 자동 변환한 후 사주를 계산합니다. 다만 윤달 태생의 경우 변환 결과를 꼭 확인해 주세요.',
  },
]

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>

        {/* 헤더 */}
        <header className={styles.header}>
          <h1 className={styles.h1}>계산기 모음</h1>
          <p className={styles.desc}>자주 쓰는 계산기를 무료로 제공합니다.</p>
        </header>

        {/* 카드 목록 */}
        <section style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            {CALCS.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                style={{
                  display: 'block',
                  padding: '16px',
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  textDecoration: 'none',
                }}
              >
                <p style={{ fontSize: '22px', marginBottom: '8px' }}>{c.emoji}</p>
                <p style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text)', marginBottom: '5px', lineHeight: 1.3 }}>{c.title}</p>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.5 }}>{c.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* AdBanner 자리 */}
        {/* <AdBanner slot="XXXXXXXXXX" /> */}

        <section className={styles.content}>

          {/* 섹션 1: 서비스 소개 */}
          <h2 className={styles.h2}>자주 쓰는 계산기를 한곳에</h2>
          <p>
            만나이 계산기, 급여 실수령액 계산기, 전월세 계산기, 사주 계산기를 한 곳에서
            무료로 제공합니다. 회원가입이나 앱 설치 없이 누구나 즉시 사용할 수 있습니다.
          </p>
          <p style={{ marginTop: '10px' }}>
            급여 계산기는 2026년 최신 4대보험 요율(국민연금 4.75% 인상 반영)을 적용하며,
            모든 계산기는 매년 관련 기준 변경에 맞춰 업데이트됩니다.
            입력한 데이터는 서버에 전송되지 않고 브라우저 내에서만 처리되어 개인정보 걱정 없이
            빠르게 결과를 확인할 수 있습니다.
          </p>

          {/* 섹션 2: 각 계산기 소개 */}
          <h2 className={styles.h2}>제공 계산기 안내</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {CALC_DETAILS.map((item) => (
              <div key={item.href} style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '10px',
                padding: '16px 18px',
              }}>
                <Link href={item.href} style={{ textDecoration: 'none' }}>
                  <p style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text)', marginBottom: '10px' }}>
                    {item.emoji} {item.title}
                  </p>
                </Link>
                <ul style={{ paddingLeft: '18px', margin: 0 }}>
                  {item.points.map((pt, i) => (
                    <li key={i} style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.8' }}>{pt}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* 섹션 3: FAQ */}
          <h2 className={styles.h2}>자주 묻는 질문</h2>
          <div className={styles.faqList}>
            {faqItems.map((faq, i) => (
              <div key={i} className={styles.faqItem}>
                <p className={styles.faqQ}>{faq.q}</p>
                <p className={styles.faqA}>{faq.a}</p>
              </div>
            ))}
          </div>

        </section>

        {/* 섹션 4: 하단 안내 */}
        <footer className={styles.footer}>
          <p>
            본 사이트의 모든 계산 결과는 참고용입니다.
            중요한 법적·재정적 결정은 전문가에게 문의하세요.
          </p>
        </footer>

      </div>
    </main>
  )
}
