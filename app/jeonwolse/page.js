import JeonwolseCalculator from './JeonwolseCalculator'
import styles from '../page.module.css'
import Link from 'next/link'

export const metadata = {
  title: '전월세 계산기 - 전세 월세 변환 및 대출이자 계산',
  description:
    '전세를 월세로, 월세를 전세로 쉽게 변환하고 전세대출 이자를 계산하세요. 전월세 전환율 기준 계산기.',
  keywords: ['전월세 계산기', '전세 월세 변환', '전월세 전환율', '전세대출 이자', '월세 계산'],
  alternates: { canonical: '/jeonwolse' },
  openGraph: {
    title: '전월세 계산기',
    description: '전세↔월세 변환 및 전세대출 이자 계산기',
    type: 'website',
    locale: 'ko_KR',
  },
}

const faqItems = [
  {
    q: '전월세 전환율이란 무엇인가요?',
    a: '전세금을 월세로 전환할 때 적용하는 연간 이율입니다. 예를 들어 전환율이 4%라면, 전세금 1억원은 월세 약 33만원(1억 × 4% ÷ 12)에 해당합니다.',
  },
  {
    q: '법정 전월세 전환율은 얼마인가요?',
    a: '주택임대차보호법에 따라 법정 상한 전환율은 한국은행 기준금리에 일정 가산율을 더한 값입니다. 2024년 기준 약 5~6% 수준이며, 실제 시장에서는 3~5% 사이에서 협의됩니다.',
  },
  {
    q: '전세대출 이자 계산은 어떻게 하나요?',
    a: '전세금의 일정 비율(보통 70~80%)을 대출받고, 연 금리에 따른 이자만 내는 방식입니다. 월 이자 = 대출금액 × 연금리 ÷ 12로 계산합니다.',
  },
  {
    q: '전세가 유리한가요, 월세가 유리한가요?',
    a: '전세금을 다른 곳에 투자했을 때의 기대수익과 월세 부담을 비교해야 합니다. 전월세 전환율이 시중 금리보다 낮으면 전세가 유리하고, 높으면 월세가 유리한 경우가 많습니다.',
  },
]

export default function JeonwolsePage() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div style={{ marginBottom: '1rem' }}>
          <Link href="/" style={{ fontSize: '13px', color: 'var(--text-hint)' }}>← 계산기 목록</Link>
        </div>

        <header className={styles.header}>
          <h1 className={styles.h1}>전월세 계산기</h1>
          <p className={styles.desc}>전세↔월세 변환, 전세대출 이자를 한 번에 계산하세요.</p>
        </header>

        <section className={styles.calcBox}>
          <JeonwolseCalculator />
        </section>

        {/* AdBanner 자리 */}
        {/* <AdBanner slot="XXXXXXXXXX" /> */}

        <section className={styles.content}>
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

        <footer className={styles.footer}>
          <p>계산 결과는 참고용입니다. 실제 계약 시 공인중개사 또는 금융기관에 확인하세요.</p>
        </footer>
      </div>
    </main>
  )
}
