import Link from 'next/link'
import styles from '../page.module.css'
import SalaryCalculator from './SalaryCalculator'
import { buildBreadcrumbSchema, buildFaqSchema, siteUrl } from '../lib/structuredData'

const pageUrl = `${siteUrl}/salary`

export const metadata = {
  title: '급여 실수령액 계산기 2026 - 월급 세후 실수령액 계산',
  description:
    '2026년 기준 국민연금, 건강보험, 장기요양보험, 고용보험과 소득세를 반영해 월급 실수령액을 계산하세요. 계산 방법과 비과세 항목 설명도 함께 확인할 수 있습니다.',
  keywords: ['실수령액 계산기', '급여 계산기', '월급 세후', '4대보험 계산', '2026 실수령액'],
  alternates: { canonical: pageUrl },
  openGraph: {
    title: '급여 실수령액 계산기 2026',
    description: '4대보험과 소득세를 반영한 월급 실수령액 계산기',
    url: pageUrl,
    type: 'website',
    locale: 'ko_KR',
  },
}

const rateRows = [
  ['국민연금', '근로자 4.75%', '2026년 총 보험료율 9.5%, 사용자와 절반씩 부담'],
  ['건강보험', '근로자 3.595%', '직장가입자 총 보험료율 7.19% 기준'],
  ['장기요양보험', '건강보험료의 13.14%', '소득 대비 약 0.9448% 수준'],
  ['고용보험', '근로자 0.9%', '실업급여 재원, 사용자 부담은 별도'],
  ['소득세', '간이세액표 기준', '부양가족 수와 과세표준에 따라 달라짐'],
  ['지방소득세', '소득세의 10%', '소득세와 함께 공제'],
]

const calculationSteps = [
  '세전 월급에서 식대 같은 비과세 금액을 먼저 제외해 과세 대상 급여를 계산합니다.',
  '국민연금, 건강보험, 장기요양보험, 고용보험을 각각 2026년 기준 요율로 계산합니다.',
  '근로소득공제, 인적공제, 연금보험료공제를 반영한 뒤 간이세액표 흐름에 맞춰 소득세를 추정합니다.',
  '마지막으로 지방소득세를 더한 총 공제액을 세전 월급에서 빼면 월 예상 실수령액이 나옵니다.',
]

const nonTaxableItems = [
  {
    title: '식대',
    text: '직장인 급여명세서에서 가장 흔한 비과세 항목입니다. 회사가 현물 식사를 제공하지 않고 별도로 식대를 지급하는 경우 일정 한도 내에서 과세 대상에서 제외될 수 있습니다. 이 계산기는 많은 직장인이 사용하는 월 식대 비과세 입력을 기준으로 빠르게 추정할 수 있도록 구성했습니다.',
  },
  {
    title: '자가운전보조금 등 실비 성격 수당',
    text: '차량 사용과 관련한 보조금, 출장 실비처럼 실제 비용 보전을 목적으로 한 항목은 지급 조건과 증빙 요건에 따라 비과세 여부가 달라집니다. 회사 규정과 세법상 요건을 함께 봐야 하므로 급여명세서와 취업규칙을 확인하는 것이 안전합니다.',
  },
  {
    title: '출산·보육 및 특정 직군 수당',
    text: '일부 수당은 정책 목적이나 직군 특성 때문에 비과세가 적용될 수 있습니다. 다만 적용 범위와 한도는 항목마다 다르므로, 일반적인 월급 비교용 계산과 실제 원천징수 결과가 완전히 같지 않을 수 있습니다.',
  },
]

const faqItems = [
  {
    q: '세전 월급과 실수령액이 가장 크게 차이 나는 이유는 무엇인가요?',
    a: '직장인이 월급명세서에서 가장 크게 체감하는 차이는 4대보험과 세금 공제입니다. 월급이 오를수록 국민연금, 건강보험, 장기요양보험, 고용보험과 소득세가 함께 늘어나기 때문에 세전 금액과 통장 입금액 차이가 커집니다.',
  },
  {
    q: '상여금이나 성과급도 이 계산기로 볼 수 있나요?',
    a: '가능은 하지만 월 고정급 중심의 추정 계산기로 이해하는 것이 좋습니다. 상여금과 성과급은 지급 방식, 비과세 포함 여부, 원천징수 시점에 따라 체감 실수령액이 달라질 수 있어 별도로 확인하는 편이 정확합니다.',
  },
  {
    q: '부양가족 수를 입력하면 왜 실수령액이 달라지나요?',
    a: '부양가족 수는 소득세 계산에 영향을 주기 때문입니다. 인적공제 대상이 많아지면 과세표준이 낮아질 수 있어 월 원천징수 세액이 줄어드는 경우가 있습니다.',
  },
  {
    q: '연말정산 환급이 있으면 매달 실수령액 계산이 의미 없지 않나요?',
    a: '연말정산은 1년치 세금을 다시 정산하는 절차이고, 월 실수령액 계산은 매달 현금흐름을 파악하는 데 의미가 있습니다. 집세, 적금, 생활비를 계획할 때는 월 단위 추정이 여전히 중요합니다.',
  },
  {
    q: '실제 급여명세서와 계산 결과가 조금 다른데 왜 그런가요?',
    a: '회사마다 비과세 항목 처리, 복지포인트, 노조비, 단체보험, 추가 공제 방식이 다릅니다. 또한 원 단위 절사 방식과 세액표 적용 기준도 다를 수 있어 계산기는 참고용 추정치로 보는 것이 맞습니다.',
  },
  {
    q: '국민연금은 월급이 높을수록 계속 비례해서 늘어나나요?',
    a: '일정 구간까지는 늘어나지만 기준소득월액 상한이 있어 무한정 비례하지는 않습니다. 그래서 고소득 구간에서는 세전 월급이 더 올라도 국민연금 공제액 증가 폭이 제한됩니다.',
  },
]

const faqSchema = buildFaqSchema(faqItems)
const breadcrumbSchema = buildBreadcrumbSchema([
  { name: '홈', path: '/' },
  { name: '급여 실수령액 계산기', path: '/salary' },
])

export default function SalaryPage() {
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
            <h1 className={styles.h1}>급여 실수령액 계산기</h1>
            <p className={styles.desc}>
              2026년 기준 4대보험과 소득세를 반영해 월급 세후 실수령액을 계산합니다. 숫자만 보는 대신 공제 구조와 비과세 항목까지 함께 이해할 수 있도록 설명을 덧붙였습니다.
            </p>
          </header>

          <section className={styles.calcBox}>
            <SalaryCalculator />
          </section>

          <section className={styles.content}>
            <h2 className={styles.h2}>2026년 4대보험 요율 변경사항 설명</h2>
            <p>
              2026년 급여 계산에서 가장 먼저 확인할 부분은 4대보험 요율입니다. 직장인 입장에서 특히 체감이 큰 부분은 국민연금으로, 2026년부터 총 보험료율이 9.5%가 되어 근로자 본인 부담은 4.75%가 됩니다. 건강보험은 직장가입자 기준 총 7.19%로 유지되어 근로자 부담은 3.595%이며, 장기요양보험은 건강보험료의 13.14%를 적용합니다. 고용보험의 근로자 부담은 0.9% 기준으로 보는 것이 일반적입니다.
            </p>
            <p>
              월급이 오르지 않았는데도 실수령액이 달라지는 경우는 이런 보험료율 변화나 기준소득월액 상한 조정 때문인 경우가 많습니다. 특히 국민연금과 장기요양보험은 전년 대비 체감 차이를 만들기 쉬워, 2026년 급여 계산을 할 때는 예전 값으로 추정하지 말고 최신 기준을 쓰는 것이 중요합니다.
            </p>

            <div className={styles.table}>
              <div className={styles.tableRow}>
                <span className={styles.tableHead}>항목</span>
                <span className={styles.tableHead}>근로자 부담 기준</span>
                <span className={styles.tableHead}>설명</span>
              </div>
              {rateRows.map(([name, rate, note]) => (
                <div key={name} className={styles.tableRow}>
                  <span>{name}</span>
                  <span>{rate}</span>
                  <span>{note}</span>
                </div>
              ))}
            </div>

            <div className={styles.noteBox} style={{ marginTop: '12px' }}>
              <p className={styles.smallNote}>
                이 페이지의 계산은 직장가입자 기준 월급 추정용입니다. 회사 부담분까지 합산한 총보험료와 근로자 본인 공제액은 다르므로, 실수령액을 볼 때는 반드시 근로자 부담 비율을 기준으로 확인해야 합니다.
              </p>
            </div>

            <h2 className={styles.h2}>실수령액 계산 방법</h2>
            <p>
              급여 실수령액 계산은 단순히 월급에서 세율 몇 퍼센트를 빼는 방식이 아닙니다. 비과세 항목, 사회보험, 근로소득공제, 부양가족 수가 함께 반영되기 때문에 같은 월급이라도 조건이 다르면 결과가 달라집니다. 아래 순서를 이해하면 급여명세서를 읽을 때도 훨씬 수월합니다.
            </p>
            <div className={styles.infoCard}>
              <ol className={styles.orderedList}>
                {calculationSteps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>

            <h2 className={styles.h2}>비과세 항목 설명</h2>
            <p>
              비과세 항목은 세전 월급에 포함되어 보이더라도 세금 계산 대상에서 빠지는 금액입니다. 직장인 급여 계산에서 비과세를 반영하느냐에 따라 소득세와 지방소득세가 달라질 수 있으므로, 월급이 비슷해도 실수령액 차이가 나는 대표적인 이유가 됩니다.
            </p>
            <div className={styles.sectionStack}>
              {nonTaxableItems.map((item) => (
                <div key={item.title} className={styles.infoCard}>
                  <p className={styles.infoCardTitle}>{item.title}</p>
                  <p className={styles.infoCardText}>{item.text}</p>
                </div>
              ))}
            </div>

            <h2 className={styles.h2}>직장인이 자주 묻는 질문</h2>
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
              2026년 기준 추정값이며 실제 공제액은 급여명세서, 원천징수 방식, 회사 내규에 따라 달라질 수 있습니다. 중요한 재무 판단 전에는 회사 급여 담당자나 세무 전문가와 함께 확인하세요.
            </p>
          </footer>
        </div>
      </main>
    </>
  )
}
