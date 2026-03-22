import Link from 'next/link'
import styles from '../page.module.css'
import JuhuCalculator from './JuhuCalculator'
import { buildBreadcrumbSchema, buildFaqSchema, siteUrl } from '../lib/structuredData'

const pageUrl = `${siteUrl}/juhu`

export const metadata = {
  title: '주휴수당 계산기 2026 - 알바 주휴수당 계산',
  description:
    '2026년 최저시급 10,320원 기준 주휴수당을 계산합니다. 시급, 1일 근무시간, 주 근무일수를 입력하면 주휴수당, 주급, 월급 환산금액을 자동 계산합니다.',
  keywords: ['주휴수당 계산기', '알바 주휴수당', '주휴수당 계산 방법', '2026 최저시급', '주휴수당 조건'],
  alternates: { canonical: pageUrl },
  openGraph: {
    title: '주휴수당 계산기 2026 - 알바 주휴수당 계산',
    description: '2026년 기준 주휴수당과 주급·월급을 즉시 계산합니다.',
    url: pageUrl,
    type: 'website',
    locale: 'ko_KR',
  },
}

const conditionRows = [
  ['발생 조건', '주 소정근로시간 15시간 이상'],
  ['계산 공식', '(주 소정근로시간 ÷ 40) × 8 × 시급'],
  ['2026년 최저시급', '10,320원'],
  ['최저 주휴수당', '주 40시간 근무 시 82,560원 (8시간 × 10,320원)'],
]

const infoCards = [
  {
    title: '주휴수당이란?',
    text: '주휴수당은 1주 동안 소정근로일수를 개근한 근로자에게 유급 주휴일 하루치 임금을 추가로 지급하는 제도입니다. 근로기준법 제55조에 근거하며, 정규직뿐 아니라 아르바이트, 파트타임 근로자도 조건을 충족하면 받을 수 있습니다.',
  },
  {
    title: '주 15시간 미만이면 주휴수당이 없는 이유',
    text: '근로기준법 시행령 제30조에 따라 4주 평균 1주 소정근로시간이 15시간 미만인 단시간 근로자는 주휴수당과 연차유급휴가가 적용되지 않습니다. 이 때문에 일부 사업주가 의도적으로 주 15시간 미만으로 계약을 나누는 경우가 있어 주의가 필요합니다.',
  },
  {
    title: '실제 주급 계산 시 주의사항',
    text: '주휴수당 계산에서 "소정근로시간"은 계약서에 명시된 근무시간을 기준으로 합니다. 초과근무(연장근로) 시간은 원칙적으로 포함되지 않습니다. 또한 결근이 있으면 해당 주의 주휴수당이 발생하지 않을 수 있으므로, 개근 여부를 확인하는 것이 중요합니다.',
  },
]

const faqItems = [
  {
    q: '알바도 주휴수당을 받을 수 있나요?',
    a: '네. 고용 형태와 무관하게 1주 소정근로시간이 15시간 이상이고 해당 주 근무일을 개근하면 주휴수당이 발생합니다. 편의점, 카페, 음식점 등 어떤 업종이든 동일하게 적용됩니다. 사업주가 주휴수당을 지급하지 않으면 임금 체불에 해당해 고용노동부에 신고할 수 있습니다.',
  },
  {
    q: '주휴수당이 시급에 포함되었다는 말이 무슨 뜻인가요?',
    a: '일부 구인 공고에서 "주휴수당 포함 시급 XX원"이라고 표기하는 경우가 있습니다. 이는 주휴수당을 매 시간당 임금에 녹여서 지급한다는 의미입니다. 하지만 이 경우에도 주휴수당을 포함한 금액이 최저시급 기준을 충족해야 하며, 계약서에 명확히 기재되어야 합니다.',
  },
  {
    q: '지각이나 조퇴를 하면 주휴수당이 안 나오나요?',
    a: '지각이나 조퇴는 결근이 아니므로 원칙적으로 주휴수당에 영향을 주지 않습니다. 주휴수당 발생 요건인 "개근"은 소정근로일에 출근을 했느냐가 기준입니다. 다만 지각·조퇴 시간만큼 임금이 공제될 수 있으며, 회사 규정에 따라 다를 수 있습니다.',
  },
  {
    q: '주 40시간 초과해도 주휴수당은 8시간 기준인가요?',
    a: '주휴수당은 "(주 소정근로시간 ÷ 40) × 8 × 시급" 공식으로 계산됩니다. 주 40시간을 초과해도 주휴수당 산정 기준은 최대 8시간으로 고정됩니다. 초과근무 시간은 별도로 연장근로수당이 적용됩니다.',
  },
  {
    q: '월급제 직원에게도 주휴수당이 있나요?',
    a: '월급제 근로자의 경우 통상적으로 월급 안에 주휴수당이 이미 포함되어 있습니다. 주 5일, 8시간 근무 기준으로 209시간(월 기준 근로시간)을 적용한 월급은 주휴수당을 포함한 금액입니다. 따라서 월급 근로자는 별도로 주휴수당을 청구할 필요가 없습니다.',
  },
  {
    q: '2026년 최저시급은 얼마인가요?',
    a: '2026년 최저시급은 10,320원입니다. 주 40시간 근무(주 5일 8시간)를 기준으로 최저시급 기준 월급은 약 2,156,880원(209시간 × 10,320원)이 됩니다. 사용자가 최저시급 미만을 지급하면 최저임금법 위반으로 3년 이하의 징역 또는 2,000만원 이하의 벌금이 부과될 수 있습니다.',
  },
]

const faqSchema = buildFaqSchema(faqItems)
const breadcrumbSchema = buildBreadcrumbSchema([
  { name: '홈', path: '/' },
  { name: '주휴수당 계산기', path: '/juhu' },
])

export default function JuhuPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <main className={styles.main}>
        <div className={styles.container}>
          <div style={{ marginBottom: '1rem' }}>
            <Link href="/" style={{ fontSize: '13px', color: 'var(--text-hint)' }}>← 계산기 목록</Link>
          </div>

          <header className={styles.header}>
            <h1 className={styles.h1}>주휴수당 계산기</h1>
            <p className={styles.desc}>
              2026년 최저시급 10,320원 기준으로 주휴수당을 계산합니다. 시급과 근무 조건을 입력하면 주휴수당, 주급, 월급 환산 금액을 즉시 확인할 수 있습니다.
            </p>
          </header>

          {/* AdBanner 자리 */}
          {/* <AdBanner slot="XXXXXXXXXX" /> */}

          <section className={styles.calcBox}>
            <JuhuCalculator />
          </section>

          <section className={styles.content}>
            <h2 className={styles.h2}>주휴수당 발생 조건과 계산 공식</h2>
            <p>
              주휴수당은 주 15시간 이상 근무하는 근로자가 해당 주 소정근로일을 개근했을 때 발생합니다. 2026년 기준 최저시급과 계산 공식을 아래 표에서 확인하세요.
            </p>
            <div className={styles.table}>
              <div className={styles.tableRow}>
                <span className={styles.tableHead}>항목</span>
                <span className={styles.tableHead} style={{ gridColumn: 'span 2' }}>기준</span>
              </div>
              {conditionRows.map(([label, value]) => (
                <div key={label} className={styles.tableRow}>
                  <span>{label}</span>
                  <span style={{ gridColumn: 'span 2' }}>{value}</span>
                </div>
              ))}
            </div>

            <h2 className={styles.h2}>주휴수당 이해하기</h2>
            <p>
              주휴수당은 알바생이 자주 놓치는 권리 중 하나입니다. 조건과 계산 방법을 정확히 알아두면 임금 문제가 생겼을 때 적절히 대응할 수 있습니다.
            </p>
            <div className={styles.sectionStack}>
              {infoCards.map(item => (
                <div key={item.title} className={styles.infoCard}>
                  <p className={styles.infoCardTitle}>{item.title}</p>
                  <p className={styles.infoCardText}>{item.text}</p>
                </div>
              ))}
            </div>

            {/* AdBanner 자리 */}
            {/* <AdBanner slot="XXXXXXXXXX" /> */}

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
            <p>
              2026년 기준 추정값입니다. 실제 주휴수당은 계약 조건과 근무 형태에 따라 다를 수 있으며, 분쟁 발생 시 고용노동부(국번 없이 1350)에 문의하세요.
            </p>
          </footer>
        </div>
      </main>
    </>
  )
}
