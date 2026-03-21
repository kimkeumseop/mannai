import Link from 'next/link'
import styles from '../page.module.css'
import JeonwolseCalculator from './JeonwolseCalculator'
import { buildBreadcrumbSchema, buildFaqSchema, siteUrl } from '../lib/structuredData'

const pageUrl = `${siteUrl}/jeonwolse`

export const metadata = {
  title: '전월세 계산기 - 전세 월세 변환과 전세대출 이자 계산',
  description:
    '전세를 월세로, 월세를 전세로 환산하고 전세대출 이자까지 계산해 보세요. 전월세 전환율 설명, 전세 vs 월세 비교, 2026년 부동산 참고사항을 함께 정리했습니다.',
  keywords: ['전월세 계산기', '전세 월세 변환', '전월세 전환율', '전세대출 이자', '월세 계산'],
  alternates: { canonical: pageUrl },
  openGraph: {
    title: '전월세 계산기',
    description: '전세·월세 변환과 전세대출 이자 계산기',
    url: pageUrl,
    type: 'website',
    locale: 'ko_KR',
  },
}

const compareItems = [
  {
    title: '전세의 장점',
    points: [
      '월세 부담이 없어 매달 현금 유출이 적습니다.',
      '장기 거주 계획이 있으면 주거비 예측이 비교적 쉽습니다.',
      '전환율이 높은 시기에는 월세보다 총주거비가 낮아질 수 있습니다.',
    ],
  },
  {
    title: '전세의 주의점',
    points: [
      '초기 보증금이 크고 대출 의존도가 높아질 수 있습니다.',
      '보증금 반환 리스크를 줄이려면 전세보증보험과 권리관계 확인이 중요합니다.',
      '금리 상승기에는 전세대출 이자 부담이 커질 수 있습니다.',
    ],
  },
  {
    title: '월세의 장점',
    points: [
      '초기 자금 부담이 전세보다 낮아 이사 진입 장벽이 작습니다.',
      '자금 유동성을 확보하기 쉬워 목돈을 다른 용도로 운용할 수 있습니다.',
      '짧은 거주 계획이라면 전세보다 선택이 유연할 수 있습니다.',
    ],
  },
  {
    title: '월세의 주의점',
    points: [
      '매달 고정 지출이 발생해 장기 거주 시 총비용이 커질 수 있습니다.',
      '갱신 시 월세 인상 가능성을 고려해야 합니다.',
      '관리비, 주차비 등 부대비용까지 합쳐 체감 부담을 봐야 합니다.',
    ],
  },
]

const faqItems = [
  {
    q: '전세대출은 보증금의 몇 퍼센트까지 가능한가요?',
    a: '상품마다 다르지만 보증기관 종류, 소득, 주택 조건에 따라 보증금의 일정 비율까지만 가능합니다. 광고 문구의 최대 한도만 보지 말고 실제 승인 비율과 본인 부담금을 함께 계산하는 것이 중요합니다.',
  },
  {
    q: '전세대출 이자는 어떻게 계산하나요?',
    a: '기본적으로 대출원금 × 금리 ÷ 12로 월 이자를 계산합니다. 이 페이지 계산기는 거치식 기준의 단순 이자 흐름을 빠르게 확인하기 위한 용도이며, 원리금상환 방식 상품은 실제 월 납입액이 달라질 수 있습니다.',
  },
  {
    q: '전세가 나을지 월세가 나을지 어떻게 판단하나요?',
    a: '보증금 조달 비용, 전세대출 이자, 월세 수준, 거주 기간을 함께 비교해야 합니다. 같은 집이라도 전환율과 대출금리에 따라 어느 쪽이 유리한지가 달라지므로 숫자로 직접 비교해 보는 것이 가장 확실합니다.',
  },
  {
    q: '전월세 전환율은 어느 정도로 넣어야 하나요?',
    a: '실무에서는 지역과 매물에 따라 3%대부터 6%대까지 다양하게 사용합니다. 갱신계약처럼 법정 기준이 중요한 경우에는 계약 시점의 법정 상한과 특약을 반드시 확인해야 하며, 계산기는 여러 가정값을 비교하는 도구로 활용하는 것이 좋습니다.',
  },
  {
    q: '전세대출을 받으면 실거주 여부도 중요하나요?',
    a: '중요합니다. 보증기관과 금융기관은 대출 취급 시 실거주, 소득, 무주택 여부, 주택 가격, 임대차 계약 상태 등을 함께 심사합니다. 계산 결과가 나온다고 해서 곧바로 대출 승인이 보장되는 것은 아닙니다.',
  },
  {
    q: '보증보험과 전세대출은 같은 개념인가요?',
    a: '아닙니다. 전세대출은 보증금을 마련하기 위한 대출이고, 전세보증보험은 계약 종료 시 보증금 반환 위험을 줄이기 위한 안전장치입니다. 실제 계약에서는 두 제도를 함께 검토하는 경우가 많습니다.',
  },
]

const references2026 = [
  {
    title: '계약갱신과 증액 제한',
    text: '2026년에도 주택임대차보호법상 계약갱신요구권과 증액 제한 규정을 기본으로 확인해야 합니다. 일반적으로 임차인은 1회 계약갱신을 요구할 수 있고, 갱신 구간의 차임·보증금 증액은 통상 5% 상한 규정을 먼저 확인하게 됩니다. 숫자 비교 이전에 법적 권리부터 확인하는 것이 안전합니다.',
  },
  {
    title: '소액임차인 보호 범위',
    text: '2026년 1월 2일 시행 기준 주택임대차보호법 시행령에는 지역별 소액임차인 범위와 우선변제금액이 정리되어 있습니다. 서울은 보증금 1억6500만원 이하, 우선변제금액 5500만원 기준을 확인할 수 있어 전세보증금 규모가 작은 계약일수록 반드시 같이 살펴봐야 합니다.',
  },
  {
    title: '전세대출 보증 제도 공지 확인',
    text: '한국주택금융공사와 다른 보증기관은 2026년에도 전세자금보증 관련 공지를 수시로 내고 있습니다. 자녀가구 우대, 보증 한도, 심사 기준 같은 항목은 바뀔 수 있어 계산기 결과와 별개로 기관 공지를 다시 확인해야 합니다.',
  },
  {
    title: '계산기는 비교용, 계약은 서류 검토용',
    text: '전월세 계산기는 보증금과 월세, 대출이자를 빠르게 비교하는 데 강점이 있지만, 실제 계약은 등기부등본, 확정일자, 전입신고 가능 여부, 보증보험 가입 가능성까지 포함해 검토해야 합니다. 숫자가 좋아 보여도 권리관계가 불안하면 피하는 편이 좋습니다.',
  },
]

const faqSchema = buildFaqSchema(faqItems)
const breadcrumbSchema = buildBreadcrumbSchema([
  { name: '홈', path: '/' },
  { name: '전월세 계산기', path: '/jeonwolse' },
])

export default function JeonwolsePage() {
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
            <h1 className={styles.h1}>전월세 계산기</h1>
            <p className={styles.desc}>
              전세를 월세로 바꾸거나 월세를 전세로 환산하고, 전세대출 이자까지 함께 계산할 수 있습니다.
              전월세 전환율을 이해하면 같은 집이라도 어떤 조건이 더 부담이 적은지 훨씬 명확하게 비교할 수 있습니다.
            </p>
          </header>

          <section className={styles.calcBox}>
            <JeonwolseCalculator />
          </section>

          <section className={styles.content}>
            <h2 className={styles.h2}>전월세 전환율 설명</h2>
            <p>
              전월세 전환율은 전세 보증금을 월세로 바꿀 때 적용하는 연 기준 비율입니다. 예를 들어 전세금 일부를 줄이는 대신 월세를 내기로 했다면, 줄어든 보증금에 전환율을 곱해 월세를 계산하게 됩니다. 그래서 같은 보증금 차이여도 전환율이 높으면 월세 부담이 커지고, 전환율이 낮으면 전세 쪽이 덜 유리해질 수 있습니다.
            </p>
            <p>
              실제 계약에서는 시장 관행과 법정 기준을 함께 봐야 합니다. 비교용 시뮬레이션을 할 때는 3%대, 4%대, 5%대처럼 여러 숫자를 넣어 월 고정비가 얼마나 달라지는지 확인하면 판단에 도움이 됩니다. 특히 전세대출 이자까지 더하면 체감 부담이 크게 달라질 수 있으므로, 전세냐 월세냐를 고를 때는 보증금 규모만 보지 말고 월 지출 총액을 함께 따져야 합니다.
            </p>

            <div className={styles.infoCard}>
              <span className={styles.label}>빠른 해석 팁</span>
              <ul className={styles.bulletList}>
                <li>전세에서 월세로 바꿀 때는 줄어든 보증금이 클수록 월세가 빠르게 커집니다.</li>
                <li>월세에서 전세로 환산할 때는 월세가 높을수록 필요한 전세 환산액도 커집니다.</li>
                <li>전세대출을 쓴다면 월세 대신 월 이자를 내는 구조로 바뀌는 셈이므로 두 금액을 직접 비교해 보세요.</li>
              </ul>
            </div>

            <h2 className={styles.h2}>전세 vs 월세 장단점 비교</h2>
            <div className={styles.compareGrid}>
              {compareItems.map((item) => (
                <div key={item.title} className={styles.infoCard}>
                  <p className={styles.infoCardTitle}>{item.title}</p>
                  <ul className={styles.bulletList}>
                    {item.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <h2 className={styles.h2}>전세대출 관련 FAQ</h2>
            <div className={styles.faqList}>
              {faqItems.map((faq) => (
                <div key={faq.q} className={styles.faqItem}>
                  <p className={styles.faqQ}>{faq.q}</p>
                  <p className={styles.faqA}>{faq.a}</p>
                </div>
              ))}
            </div>

            <h2 className={styles.h2}>2026년 부동산 관련 참고사항</h2>
            <p>
              2026년에 전월세 계약을 검토할 때는 단순한 월세 비교만으로 결정하기보다 임차인 보호 제도와 대출·보증기관 공지를 함께 살펴보는 것이 중요합니다. 특히 법정 기준은 계약서 작성 직전 한 번 더 확인해야 하며, 보증금 규모가 큰 경우에는 전세보증보험 가능 여부도 함께 검토하는 편이 안전합니다.
            </p>
            <div className={styles.sectionStack}>
              {references2026.map((item) => (
                <div key={item.title} className={styles.infoCard}>
                  <p className={styles.infoCardTitle}>{item.title}</p>
                  <p className={styles.infoCardText}>{item.text}</p>
                </div>
              ))}
            </div>
          </section>

          <footer className={styles.footer}>
            <p>
              계산 결과는 비교를 돕기 위한 참고값입니다. 실제 계약 전에는 임대차계약서, 등기부등본, 보증기관 안내, 금융기관 심사 조건을 함께 확인하세요.
            </p>
          </footer>
        </div>
      </main>
    </>
  )
}
