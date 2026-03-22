import Link from 'next/link'
import styles from '../page.module.css'
import HourlyCalculator from './HourlyCalculator'
import { buildBreadcrumbSchema, buildFaqSchema, siteUrl } from '../lib/structuredData'

const pageUrl = `${siteUrl}/hourly`

export const metadata = {
  title: '시급 계산기 2026 - 일급 주급 월급 연봉 계산',
  description:
    '2026년 최저시급 10,320원 기준으로 시급에서 일급, 주급, 월급, 연봉을 계산합니다. 주휴수당 포함 여부를 선택하고 최저시급과 비교해 볼 수 있습니다.',
  keywords: ['시급 계산기', '월급 계산기', '연봉 계산기', '2026 최저시급', '시급 월급 환산'],
  alternates: { canonical: pageUrl },
  openGraph: {
    title: '시급 계산기 2026 - 일급 주급 월급 연봉 계산',
    description: '2026년 기준 시급으로 일급·주급·월급·연봉을 즉시 계산합니다.',
    url: pageUrl,
    type: 'website',
    locale: 'ko_KR',
  },
}

const minWageRows = [
  ['2022년', '9,160원', '월 1,914,440원 (209h 기준)'],
  ['2023년', '9,620원', '월 2,010,580원'],
  ['2024년', '9,860원', '월 2,060,740원'],
  ['2025년', '10,030원', '월 2,096,270원'],
  ['2026년', '10,320원', '월 2,156,880원'],
]

const hourlyGuides = [
  {
    title: '시급에서 월급 환산 방법',
    text: '시급을 월급으로 환산하는 공식은 시급 × 209시간입니다. 209시간은 주 40시간 근무 기준으로 1개월 평균 근로시간(주 소정근로 40시간 + 주휴 8시간을 포함한 월 기준 시간)을 의미합니다. 주 5일, 하루 8시간 기준으로 최저시급을 적용하면 2026년 기준 월 2,156,880원이 최저 월급입니다.',
  },
  {
    title: '최저시급 위반 시 어떻게 되나요?',
    text: '사용자가 최저시급보다 낮은 임금을 지급하면 최저임금법 위반으로 3년 이하의 징역 또는 2,000만원 이하의 벌금에 처해질 수 있습니다. 근로자는 고용노동부(1350)에 진정을 제기하거나, 체불된 임금을 청구할 수 있습니다. 수습 기간 중이더라도 수습 기간이 3개월을 초과하는 경우나 단순 노무직은 최저시급의 100%를 받아야 합니다.',
  },
  {
    title: '시급제와 월급제의 차이',
    text: '시급제는 실제 근무한 시간에 따라 임금이 결정되므로, 결근하거나 조퇴하면 그만큼 임금이 줄어듭니다. 월급제는 계약서에 명시된 월 급여를 고정으로 받는 방식으로, 소정 근로일을 지키면 개별 날의 근로시간과 무관하게 동일한 월급을 받습니다. 단, 무단결근이나 지각은 월급에서 공제될 수 있습니다.',
  },
]

const faqItems = [
  {
    q: '시급으로 월급을 계산할 때 왜 209시간을 곱하나요?',
    a: '209시간은 주 40시간 근무(1일 8시간, 주 5일) 기준으로 1개월 평균 근로시간입니다. 1년 52주를 12개월로 나누면 월 평균 주수는 4.345주이고, 여기에 주 48시간(40시간 + 주휴 8시간)을 곱하면 약 209시간이 나옵니다. 최저임금법은 이 기준에 따라 월 환산액을 산정합니다.',
  },
  {
    q: '수습 기간에도 최저시급을 받아야 하나요?',
    a: '1년 이상 계약을 체결하고 수습 기간이 3개월 이내인 경우 최저시급의 90%까지 지급이 가능합니다. 그러나 단순 노무 직종(단순 반복 작업 등)은 수습 기간이라도 최저시급 100%를 지급해야 합니다. 계약 기간이 1년 미만이거나 수습이 3개월을 초과하는 경우에도 최저시급 이상을 지급해야 합니다.',
  },
  {
    q: '주휴수당을 포함하면 실제 시급이 더 높아지나요?',
    a: '주휴수당을 포함한 실질 시급은 명시된 시급보다 높습니다. 예를 들어 시급 10,320원으로 주 40시간 일하면 주휴수당까지 포함한 실질 주급은 82,560원(8시간×10,320원)이 추가됩니다. 이를 시간당으로 환산하면 약 12,384원(492,960원÷40시간)에 해당합니다. 구인 공고의 시급이 주휴수당 포함인지 별도인지 확인하는 것이 중요합니다.',
  },
  {
    q: '2026년 최저시급은 월급으로 얼마인가요?',
    a: '2026년 최저시급 10,320원을 주 40시간(월 209시간) 기준으로 환산하면 월 2,156,880원입니다. 이는 주휴수당이 포함된 금액이며, 4대보험과 세금이 공제되기 전 세전 금액입니다. 실수령액은 4대보험과 소득세를 공제한 후 달라지며, 급여 실수령액 계산기에서 확인할 수 있습니다.',
  },
  {
    q: '시급이 최저시급보다 낮은 것 같은데 신고하려면 어떻게 하나요?',
    a: '고용노동부 고객상담센터(국번 없이 1350)에 전화하거나 고용노동부 홈페이지에서 온라인 진정을 제기할 수 있습니다. 임금 명세서, 근로계약서, 출퇴근 기록 등을 준비해두면 도움이 됩니다. 노동청 담당자가 사실 조사를 거쳐 미지급 임금 지급 명령을 내릴 수 있으며, 근로자는 최대 3년 이내의 미지급 임금을 청구할 수 있습니다.',
  },
]

const faqSchema = buildFaqSchema(faqItems)
const breadcrumbSchema = buildBreadcrumbSchema([
  { name: '홈', path: '/' },
  { name: '시급 계산기', path: '/hourly' },
])

export default function HourlyPage() {
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
            <h1 className={styles.h1}>시급 계산기</h1>
            <p className={styles.desc}>
              2026년 최저시급 10,320원 기준으로 시급에서 일급, 주급, 월급, 연봉을 계산합니다. 주휴수당 포함 여부를 선택하고 최저시급 기준과 비교할 수 있습니다.
            </p>
          </header>

          {/* AdBanner 자리 */}
          {/* <AdBanner slot="XXXXXXXXXX" /> */}

          <section className={styles.calcBox}>
            <HourlyCalculator />
          </section>

          <section className={styles.content}>
            <h2 className={styles.h2}>연도별 최저시급 변화</h2>
            <p>
              최저시급은 매년 최저임금위원회 심의를 거쳐 결정됩니다. 아래 표에서 최근 5년간 최저시급 변화를 확인하세요.
            </p>
            <div className={styles.table}>
              <div className={styles.tableRow}>
                <span className={styles.tableHead}>연도</span>
                <span className={styles.tableHead}>최저시급</span>
                <span className={styles.tableHead}>월 환산 (209h)</span>
              </div>
              {minWageRows.map(([year, hourly, monthly]) => (
                <div key={year} className={styles.tableRow} style={{ fontWeight: year === '2026년' ? '600' : 'inherit' }}>
                  <span>{year}</span>
                  <span>{hourly}</span>
                  <span>{monthly}</span>
                </div>
              ))}
            </div>

            <h2 className={styles.h2}>시급 관련 알아두면 좋은 것들</h2>
            <p>
              시급 계산기 결과를 더 잘 활용하려면 월급 환산 방법과 최저시급 관련 규정을 함께 알아두는 것이 좋습니다.
            </p>
            <div className={styles.sectionStack}>
              {hourlyGuides.map(item => (
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
              2026년 기준 추정값입니다. 실제 급여는 계약 조건, 근무 형태, 4대보험 공제에 따라 다를 수 있습니다.
            </p>
          </footer>
        </div>
      </main>
    </>
  )
}
