import Link from 'next/link'
import styles from '../page.module.css'
import WolgupDodukCalculator from './WolgupDodukCalculator'
import { buildBreadcrumbSchema, buildFaqSchema, siteUrl } from '../lib/structuredData'

const pageUrl = `${siteUrl}/wolgup-doduk`

export const metadata = {
  title: '월급 도둑 계산기 2026 - 내 월급에서 얼마나 빠져나가나',
  description: '연봉 입력하면 세금, 4대보험 항목별로 얼마나 뺏기는지 계산해드립니다. 국민연금, 건강보험, 고용보험, 소득세까지 2026년 최신 기준 적용.',
  keywords: ['월급 도둑 계산기', '세금 계산기', '4대보험 계산기', '실수령액 계산기', '공제율 계산기', '연봉 세금 계산'],
  alternates: { canonical: pageUrl },
  openGraph: {
    title: '월급 도둑 계산기 2026',
    description: '연봉 입력하면 세금·4대보험 항목별로 얼마나 뺏기는지 바로 계산해드립니다.',
    url: pageUrl,
    type: 'website',
    locale: 'ko_KR',
  },
}

const faqItems = [
  {
    q: '국민연금 요율은 몇 퍼센트인가요?',
    a: '2026년 기준 국민연금은 월급의 4.5%를 근로자가 부담합니다. 상한액은 월 265,500원으로, 월급이 일정 금액(약 590만원)을 넘으면 더 이상 늘지 않습니다. 나머지 4.5%는 사용자(회사)가 납부합니다.',
  },
  {
    q: '건강보험료는 어떻게 계산하나요?',
    a: '2026년 건강보험료율은 7.09%로, 근로자와 사용자가 절반씩 부담합니다. 근로자 부담분은 월급의 3.545%입니다. 여기에 장기요양보험료(건강보험료의 12.95%)가 추가로 부과됩니다.',
  },
  {
    q: '고용보험은 왜 내야 하나요?',
    a: '고용보험은 실직 시 받을 수 있는 실업급여의 재원입니다. 근로자는 월급의 0.9%를 납부합니다. 퇴사 후 구직급여(실업급여)를 받을 수 있는 가장 중요한 사회보험 중 하나입니다.',
  },
  {
    q: '근로소득세는 어떻게 결정되나요?',
    a: '근로소득세는 연봉과 부양가족 수에 따라 달라집니다. 간이세액표를 기준으로 월 단위로 원천징수하며, 연말정산을 통해 정확한 세액을 확정합니다. 부양가족이 많을수록 공제금액이 커져 세금이 줄어듭니다.',
  },
  {
    q: '실수령액을 더 늘릴 수 있는 방법이 있나요?',
    a: '연말정산에서 의료비, 교육비, 기부금, 주택청약, 신용카드 사용액 등 다양한 공제 항목을 활용하면 환급을 받을 수 있습니다. 또한 비과세 식대(월 20만원)나 자가운전보조금 등 회사에서 제공하는 비과세 항목을 최대한 활용하는 것도 방법입니다.',
  },
  {
    q: '이 계산기의 결과는 얼마나 정확한가요?',
    a: '2026년 기준 4대보험 요율과 근로소득 간이세액표를 적용한 추정값입니다. 실제 공제액은 비과세 항목, 추가 수당, 회사별 공제 방식, 연말정산 결과에 따라 달라질 수 있습니다. 정확한 금액은 회사 급여담당자 또는 국세청 홈택스를 통해 확인하세요.',
  },
]

const faqSchema = buildFaqSchema(faqItems)
const breadcrumbSchema = buildBreadcrumbSchema([
  { name: '홈', path: '/' },
  { name: '월급 도둑 계산기', path: '/wolgup-doduk' },
])

export default function WolgupDodukPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <main className={styles.main}>
        <div className={styles.container}>
          <div style={{ marginBottom: '1rem' }}>
            <Link href="/" style={{ fontSize: '13px', color: 'var(--text-hint)' }}>
              ← 계산기 목록
            </Link>
          </div>

          <header className={styles.header}>
            <h1 className={styles.h1}>💸 월급 도둑 계산기</h1>
            <p className={styles.desc}>
              연봉을 입력하면 국민연금, 건강보험, 고용보험, 소득세까지 항목별로 얼마나 빠져나가는지 계산합니다. 2026년 최신 요율 기준입니다.
            </p>
          </header>

          <section className={styles.calcBox}>
            <WolgupDodukCalculator />
          </section>

          <section className={styles.content}>
            <h2 className={styles.h2}>2026년 4대보험 & 세금 기준</h2>
            <div className={styles.table}>
              <div className={styles.tableRow}>
                <span className={styles.tableHead}>항목</span>
                <span className={styles.tableHead}>요율 (근로자)</span>
                <span className={styles.tableHead}>비고</span>
              </div>
              {[
                ['국민연금', '4.5%', '상한 265,500원'],
                ['건강보험료', '3.545%', '7.09%의 절반'],
                ['장기요양보험', '건보료×12.95%', '건강보험료에 연동'],
                ['고용보험', '0.9%', '실업급여 재원'],
                ['근로소득세', '간이세액표', '부양가족 수 반영'],
                ['지방소득세', '소득세×10%', '자동 연동'],
              ].map(([a, b, c]) => (
                <div key={a} className={styles.tableRow}>
                  <span>{a}</span>
                  <span>{b}</span>
                  <span>{c}</span>
                </div>
              ))}
            </div>

            <h2 className={styles.h2}>월급에서 돈이 빠져나가는 구조</h2>
            <div className={styles.sectionStack}>
              {[
                {
                  title: '4대보험 — 내가 내는 사회보험',
                  text: '국민연금, 건강보험, 장기요양보험, 고용보험을 합쳐 "4대보험"이라 부릅니다. 회사와 근로자가 절반씩 부담하며, 노후·의료·실업 등에 대비하는 사회 안전망입니다. 근로자 부담분만 월급에서 공제됩니다.',
                },
                {
                  title: '근로소득세 — 연봉이 올라갈수록 급증',
                  text: '근로소득세는 누진세 구조로, 연봉이 높을수록 세율이 올라갑니다. 부양가족 수가 많을수록 공제금액이 커져 세금이 줄어듭니다. 매달 간이세액표 기준으로 원천징수하고, 연말정산으로 최종 정산합니다.',
                },
                {
                  title: '지방소득세 — 소득세에 10% 추가',
                  text: '지방소득세는 근로소득세의 10%를 자동으로 추가 납부하는 세금입니다. 별도 계산 없이 소득세에 연동되어 부과됩니다.',
                },
              ].map(item => (
                <div key={item.title} className={styles.infoCard}>
                  <p className={styles.infoCardTitle}>{item.title}</p>
                  <p className={styles.infoCardText}>{item.text}</p>
                </div>
              ))}
            </div>

            <h2 className={styles.h2}>자주 묻는 질문</h2>
            <div className={styles.faqList}>
              {faqItems.map(faq => (
                <div key={faq.q} className={styles.faqItem}>
                  <p className={styles.faqQ}>{faq.q}</p>
                  <p className={styles.faqA}>{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          <footer className={styles.footer}>
            <p>계산 결과는 2026년 기준 추정값입니다. 실제 공제액은 근무 형태, 추가 공제 항목에 따라 다를 수 있습니다.</p>
          </footer>
        </div>
      </main>
    </>
  )
}
