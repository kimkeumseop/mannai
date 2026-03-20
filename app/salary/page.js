import SalaryCalculator from './SalaryCalculator'
import styles from '../page.module.css'
import Link from 'next/link'

export const metadata = {
  title: '급여 실수령액 계산기 2026 - 월급 세후 실수령액 계산',
  description:
    '2026년 기준 4대보험(국민연금 4.75%, 건강보험 3.595%, 장기요양, 고용보험)과 소득세를 반영한 정확한 월급 실수령액을 계산하세요.',
  keywords: ['실수령액 계산기', '급여 계산기', '월급 세후', '4대보험 계산', '2026 실수령액'],
  alternates: { canonical: '/salary' },
  openGraph: {
    title: '급여 실수령액 계산기 2026',
    description: '4대보험과 소득세를 반영한 월급 실수령액 계산기',
    type: 'website',
    locale: 'ko_KR',
  },
}

const faqItems = [
  {
    q: '실수령액이란 무엇인가요?',
    a: '세전 월급에서 국민연금, 건강보험, 장기요양보험, 고용보험(4대보험)과 소득세, 지방소득세를 공제한 후 실제로 통장에 입금되는 금액입니다.',
  },
  {
    q: '4대보험이란 무엇인가요?',
    a: '국민연금(노후 소득 보장), 건강보험(의료비 지원), 장기요양보험(노인 돌봄 지원), 고용보험(실업급여 등)의 4가지 사회보험을 말합니다. 근로자와 사업주가 각각 절반씩 부담합니다.',
  },
  {
    q: '2026년에 달라진 점은 무엇인가요?',
    a: '2026년부터 국민연금 보험료율이 기존 4.5%에서 4.75%로 인상됩니다. 기준소득월액 상한도 637만원으로 조정됩니다. 이에 따라 월급이 높을수록 공제액이 소폭 증가합니다.',
  },
  {
    q: '소득세는 어떻게 계산되나요?',
    a: '국세청 근로소득 간이세액표를 기준으로 계산됩니다. 세전 급여에서 비과세액을 제외한 과세소득에 근로소득공제, 인적공제, 연금보험료공제를 적용한 후 세율을 적용합니다. 20세 이하 자녀가 있으면 자녀세액공제가 추가로 적용됩니다.',
  },
  {
    q: '식대 비과세는 얼마인가요?',
    a: '2023년부터 식대 비과세 한도가 월 20만원으로 확대됐습니다. 회사에서 식사를 직접 제공하지 않고 식대를 별도 지급하는 경우, 월 20만원까지 소득세 과세 대상에서 제외됩니다.',
  },
]

export default function SalaryPage() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div style={{ marginBottom: '1rem' }}>
          <Link href="/" style={{ fontSize: '13px', color: 'var(--text-hint)' }}>← 계산기 목록</Link>
        </div>

        <header className={styles.header}>
          <h1 className={styles.h1}>급여 실수령액 계산기</h1>
          <p className={styles.desc}>2026년 기준 4대보험 + 소득세를 반영한 실수령액을 계산합니다.</p>
        </header>

        <section className={styles.calcBox}>
          <SalaryCalculator />
        </section>

        {/* AdBanner 자리 */}
        {/* <AdBanner slot="XXXXXXXXXX" /> */}

        <section className={styles.content}>
          <h2 className={styles.h2}>2026년 기준 공제 요율</h2>
          <div className={styles.table}>
            <div className={styles.tableRow}>
              <span className={styles.tableHead}>항목</span>
              <span className={styles.tableHead}>요율 (근로자 부담)</span>
              <span className={styles.tableHead}>비고</span>
            </div>
            <div className={styles.tableRow}>
              <span>국민연금</span>
              <span>4.75%</span>
              <span>2026년 인상, 상한 637만원</span>
            </div>
            <div className={styles.tableRow}>
              <span>건강보험</span>
              <span>3.595%</span>
              <span>사업주 동일 부담</span>
            </div>
            <div className={styles.tableRow}>
              <span>장기요양</span>
              <span>건보료 × 13.14%</span>
              <span>약 0.9448%</span>
            </div>
            <div className={styles.tableRow}>
              <span>고용보험</span>
              <span>0.9%</span>
              <span>실업급여 기여</span>
            </div>
            <div className={styles.tableRow}>
              <span>소득세</span>
              <span>간이세액표 기준</span>
              <span>부양가족 수에 따라 다름</span>
            </div>
            <div className={styles.tableRow}>
              <span>지방소득세</span>
              <span>소득세 × 10%</span>
              <span>별도 납부</span>
            </div>
          </div>

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
          <p>2026년 기준 추정값입니다. 정확한 공제액은 원천징수영수증 또는 급여명세서를 확인하세요.</p>
        </footer>
      </div>
    </main>
  )
}
