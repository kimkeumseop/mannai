import Link from 'next/link'
import styles from '../page.module.css'
import RetirementCalculator from './RetirementCalculator'
import { buildBreadcrumbSchema, buildFaqSchema, siteUrl } from '../lib/structuredData'

const pageUrl = `${siteUrl}/retirement`

export const metadata = {
  title: '퇴직금 계산기 2026 - 퇴직금 및 퇴직소득세 계산',
  description:
    '2026년 기준 퇴직금을 계산하세요. 입사일·퇴사일·3개월 급여·상여금을 입력하면 평균임금, 퇴직금, 퇴직소득세, 세후 실수령액을 자동 계산합니다. 근속연수공제와 환산급여공제도 반영됩니다.',
  keywords: ['퇴직금 계산기', '퇴직소득세 계산', '퇴직금 계산 방법', '평균임금 계산', '2026 퇴직금'],
  alternates: { canonical: pageUrl },
  openGraph: {
    title: '퇴직금 계산기 2026 - 퇴직금 및 퇴직소득세 계산',
    description: '입사일·퇴사일·급여를 입력하면 퇴직금과 세후 실수령액을 즉시 계산합니다.',
    url: pageUrl,
    type: 'website',
    locale: 'ko_KR',
  },
}

const calcFormulaRows = [
  ['평균임금 (일)', '(3개월 급여 합계 + 상여금×3/12 + 연차수당×3/12) ÷ 91일'],
  ['퇴직금', '평균임금(일) × 30일 × (재직일수 ÷ 365)'],
  ['1년 미만 근무', '퇴직금 없음 (법적 요건 미충족)'],
]

const taxDeductionRows = [
  ['5년 이하', '근속연수 × 30만원'],
  ['6~10년', '150만원 + (근속연수-5) × 50만원'],
  ['11~20년', '400만원 + (근속연수-10) × 80만원'],
  ['20년 초과', '1,200만원 + (근속연수-20) × 120만원'],
]

const keyPoints = [
  {
    title: '퇴직금 지급 요건',
    text: '퇴직금은 근로기준법상 1년 이상 계속 근로한 근로자에게 지급 의무가 있습니다. 2010년 12월 이후 5인 이상 사업장에 대해 전면 적용되었으며, 2012년 이후에는 1인 이상 사업장으로 확대되었습니다. 기간제, 파견직 등 비정규직 근로자도 1년 이상 근무하면 퇴직금 청구권이 생깁니다.',
  },
  {
    title: '평균임금 계산 방법',
    text: '평균임금은 퇴직 전 3개월간 지급된 임금 총액을 해당 기간의 일수(91일)로 나눈 값입니다. 여기에 상여금은 연간 지급액의 3개월분(×3/12), 연차수당도 동일하게 반영합니다. 수당, 인센티브처럼 정기적으로 지급되는 항목은 포함되지만 실비 성격의 지급은 제외될 수 있습니다.',
  },
  {
    title: '퇴직소득세 절세 포인트',
    text: '퇴직소득세는 근속연수공제와 환산급여공제라는 두 단계 공제를 적용해 일반 소득세보다 유리하게 계산됩니다. 근속연수가 길수록 공제 금액이 커져 실효 세율이 낮아집니다. 퇴직연금(IRP) 계좌로 수령하면 세액을 이연하거나 추가 공제를 받을 수 있어 절세에 유리합니다.',
  },
]

const faqItems = [
  {
    q: '퇴직금은 반드시 1년을 채워야 받을 수 있나요?',
    a: '네. 근로기준법 제34조에 따라 계속 근로기간이 1년 이상인 근로자에게만 퇴직금 지급 의무가 있습니다. 11개월 29일을 근무했더라도 1년을 채우지 못하면 퇴직금이 발생하지 않습니다. 다만 회사 내규나 단체협약에 따라 1년 미만에도 지급하는 경우가 있으므로 회사 규정을 확인하는 것이 좋습니다.',
  },
  {
    q: '퇴직금은 언제 받을 수 있나요?',
    a: '근로기준법상 퇴직일로부터 14일 이내에 지급해야 합니다. 당사자 간 합의가 있으면 기간을 연장할 수 있지만, 그 이상 지연되면 지연이자(연 20%)가 발생합니다. 회사가 정당한 이유 없이 퇴직금을 지급하지 않으면 고용노동부에 진정·고소할 수 있습니다.',
  },
  {
    q: '퇴직연금(IRP)으로 받으면 세금이 달라지나요?',
    a: '퇴직금을 IRP(개인형 퇴직연금) 계좌로 수령하면 퇴직소득세를 바로 내지 않고 이연할 수 있습니다. 나중에 55세 이후 연금으로 수령하면 연금소득세(퇴직소득세의 70%)가 적용되어 세금 부담이 줄어듭니다. 단, IRP 계좌에서 중도 인출하면 기타소득세(16.5%)가 부과되어 불리할 수 있습니다.',
  },
  {
    q: '상여금과 연차수당이 퇴직금에 포함되나요?',
    a: '정기적으로 지급된 상여금과 퇴직 시 미사용 연차에 대한 연차수당은 평균임금에 포함됩니다. 연간 지급액을 기준으로 3개월분(×3/12)을 평균임금 산정에 반영합니다. 다만 일시적이거나 임시적인 지급은 제외될 수 있어 회사 급여 담당자나 노무사와 확인하는 것이 정확합니다.',
  },
  {
    q: '프리랜서나 개인사업자도 퇴직금을 받을 수 있나요?',
    a: '근로기준법상 퇴직금은 근로계약을 맺은 "근로자"에게 적용됩니다. 프리랜서나 개인사업자는 원칙적으로 적용 대상이 아닙니다. 다만 계약 형태와 무관하게 실제 근무 형태가 종속적인 근로자와 유사하다고 판단되면 근로자로 인정되는 경우도 있으므로, 분쟁 시에는 고용노동부나 노동위원회에 문의하세요.',
  },
  {
    q: '중간정산을 받은 경우 퇴직금은 어떻게 계산하나요?',
    a: '중간정산을 받았다면 중간정산일부터 퇴직일까지의 기간을 기준으로 퇴직금을 재계산합니다. 법적으로는 주택 구입, 6개월 이상 요양 필요 등 특정 사유가 있을 때만 중간정산이 가능합니다. 퇴직연금(DB형, DC형) 가입자는 중간정산 방식과 다른 기준이 적용되므로 가입 유형을 먼저 확인하세요.',
  },
]

const faqSchema = buildFaqSchema(faqItems)
const breadcrumbSchema = buildBreadcrumbSchema([
  { name: '홈', path: '/' },
  { name: '퇴직금 계산기', path: '/retirement' },
])

export default function RetirementPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className={styles.main}>
        <div className={styles.container}>
          <div style={{ marginBottom: '1rem' }}>
            <Link href="/" style={{ fontSize: '13px', color: 'var(--text-hint)' }}>
              ← 계산기 목록
            </Link>
          </div>

          <header className={styles.header}>
            <h1 className={styles.h1}>퇴직금 계산기</h1>
            <p className={styles.desc}>
              2026년 기준 퇴직금을 계산합니다. 입사일·퇴사일·최근 3개월 급여를 입력하면 평균임금, 퇴직금 예상액, 퇴직소득세, 세후 실수령액을 자동으로 계산합니다.
            </p>
          </header>

          {/* AdBanner 자리 */}
          {/* <AdBanner slot="XXXXXXXXXX" /> */}

          <section className={styles.calcBox}>
            <RetirementCalculator />
          </section>

          <section className={styles.content}>
            <h2 className={styles.h2}>퇴직금 계산 공식</h2>
            <p>
              퇴직금은 근로기준법 제34조에 따라 평균임금을 기준으로 계산합니다. 법정 계산식은 단순하지만, 평균임금에 상여금과 연차수당이 포함되는 방식을 이해해야 정확한 금액을 추정할 수 있습니다.
            </p>
            <div className={styles.table}>
              <div className={styles.tableRow}>
                <span className={styles.tableHead}>항목</span>
                <span className={styles.tableHead} style={{ gridColumn: 'span 2' }}>계산 방법</span>
              </div>
              {calcFormulaRows.map(([label, formula]) => (
                <div key={label} className={styles.tableRow}>
                  <span>{label}</span>
                  <span style={{ gridColumn: 'span 2' }}>{formula}</span>
                </div>
              ))}
            </div>

            <h2 className={styles.h2}>퇴직소득세 근속연수 공제</h2>
            <p>
              퇴직소득세는 일반 근로소득세와 달리 근속연수공제와 환산급여공제를 적용해 세 부담을 낮춥니다. 장기 근속자일수록 공제 금액이 커집니다.
            </p>
            <div className={styles.table}>
              <div className={styles.tableRow}>
                <span className={styles.tableHead}>근속연수</span>
                <span className={styles.tableHead} style={{ gridColumn: 'span 2' }}>근속연수 공제액</span>
              </div>
              {taxDeductionRows.map(([years, deduction]) => (
                <div key={years} className={styles.tableRow}>
                  <span>{years}</span>
                  <span style={{ gridColumn: 'span 2' }}>{deduction}</span>
                </div>
              ))}
            </div>

            <div className={styles.noteBox} style={{ marginTop: '12px' }}>
              <p className={styles.smallNote}>
                근속연수는 실제 재직일수를 365로 나눈 값을 올림하여 계산합니다. 예: 재직 400일 → 근속연수 2년.
              </p>
            </div>

            <h2 className={styles.h2}>퇴직금 수령 전 알아야 할 것들</h2>
            <p>
              퇴직금은 단순히 금액을 계산하는 것 외에도 지급 시기, 세금 처리, 퇴직연금 유형에 따른 차이를 이해해야 실제 수령액과 절세 방법을 제대로 파악할 수 있습니다.
            </p>
            <div className={styles.sectionStack}>
              {keyPoints.map((item) => (
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
              {faqItems.map((faq) => (
                <div key={faq.q} className={styles.faqItem}>
                  <p className={styles.faqQ}>{faq.q}</p>
                  <p className={styles.faqA}>{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          <footer className={styles.footer}>
            <p>
              2026년 기준 추정값이며 실제 퇴직금과 세금은 근무 형태, 회사 규정, 세금 감면에 따라 달라질 수 있습니다. 중요한 결정 전에는 노무사 또는 세무사와 상담하세요.
            </p>
          </footer>
        </div>
      </main>
    </>
  )
}
