import Link from 'next/link'
import styles from '../page.module.css'
import SavingsCalculator from './SavingsCalculator'
import { buildBreadcrumbSchema, buildFaqSchema, siteUrl } from '../lib/structuredData'

const pageUrl = `${siteUrl}/savings`

export const metadata = {
  title: '적금 이자 계산기 - 만기 수령액 계산',
  description:
    '월 납입금, 연 이자율, 적금 기간을 입력하면 만기 수령액, 세전·세후 이자, 실수령액을 즉시 계산합니다. 일반과세(15.4%)와 비과세 모두 지원합니다.',
  keywords: ['적금 이자 계산기', '만기 수령액 계산', '적금 계산기', '세후 이자 계산', '비과세 적금'],
  alternates: { canonical: pageUrl },
  openGraph: {
    title: '적금 이자 계산기 - 만기 수령액 계산',
    description: '월납입금과 이자율로 적금 만기 수령액을 즉시 계산합니다.',
    url: pageUrl,
    type: 'website',
    locale: 'ko_KR',
  },
}

const taxRows = [
  ['일반과세', '15.4%', '이자소득세 14% + 지방소득세 1.4%'],
  ['세금우대', '9.9%', '조합원 예탁금 등 일부 조건 충족 시'],
  ['비과세', '0%', 'ISA 계좌, 비과세 한도 상품 등'],
]

const savingsTips = [
  {
    title: '단리 vs 복리',
    text: '대부분의 은행 적금은 단리(만기 일시 지급) 방식으로 이자를 계산합니다. 이 계산기도 단리 기준입니다. 복리 상품은 이자가 원금에 더해져 다시 이자를 만들기 때문에 기간이 길수록 단리보다 유리하지만, 일반 적금에서는 드문 구조입니다. 가입 전 상품 설명서를 확인해 이자 지급 방식을 먼저 파악하는 것이 좋습니다.',
  },
  {
    title: '이자 과세 종류',
    text: '일반 예·적금 이자에는 이자소득세 14%와 지방소득세 1.4%를 합산한 15.4%가 원천징수됩니다. ISA(개인종합자산관리계좌) 계좌를 활용하면 비과세 또는 분리과세 혜택을 받을 수 있습니다. 농협·수협·신협 등 상호금융기관의 조합원 예탁금은 세금우대(9.9%) 혜택이 적용될 수 있습니다.',
  },
  {
    title: '금리 비교 시 주의사항',
    text: '은행별 적금 금리를 비교할 때는 기본금리와 우대금리를 구분해야 합니다. 우대금리는 급여이체, 카드 실적, 첫 거래 등 특정 조건을 충족해야 적용됩니다. 광고에서 강조하는 금리가 최고 우대금리인 경우가 많으므로, 본인이 실제로 받을 수 있는 금리를 기준으로 비교하는 것이 정확합니다.',
  },
]

const faqItems = [
  {
    q: '적금 이자는 어떻게 계산되나요?',
    a: '적금은 매월 일정 금액을 납입하는 구조라, 첫 달 납입금은 전체 기간 동안, 마지막 달 납입금은 1개월만 이자를 받습니다. 단리 방식에서 세전 이자 = 월납입금 × 연이자율/12 × 남은 기간(개월수)의 합산으로 계산됩니다. 예를 들어 12개월 적금은 1~12개월치 이자를 모두 더한 것이 총 세전 이자입니다.',
  },
  {
    q: '비과세 적금은 어떻게 가입할 수 있나요?',
    a: 'ISA(개인종합자산관리계좌)를 통해 적금에 가입하면 200만원(서민·농어민형 400만원) 한도 내에서 이자가 비과세됩니다. 또한 일부 은행에서 출시하는 청년 우대형 청약통장이나 상호금융 조합원 자격을 통해서도 세금 혜택을 받을 수 있습니다. 각 상품의 조건을 꼼꼼히 확인하세요.',
  },
  {
    q: '만기 전에 적금을 해지하면 이자를 다 받을 수 없나요?',
    a: '네. 적금을 중도 해지하면 약정 이자율이 아닌 중도해지 이율(일반적으로 크게 낮은 이율)이 적용되어 이자가 대폭 줄어듭니다. 특히 단기간 납입 후 해지하면 사실상 이자를 거의 받지 못할 수 있습니다. 긴급 자금이 필요할 경우를 대비해 적금과 함께 예비 비상금을 따로 운영하는 것이 좋습니다.',
  },
  {
    q: '적금과 예금 중 어느 것이 더 유리한가요?',
    a: '동일한 금리라면 목돈을 한 번에 넣는 예금의 실제 이자가 적금보다 큽니다. 적금은 첫 달 납입금만 전체 기간의 이자를 받지만, 이후 납입금은 남은 기간에만 이자가 붙기 때문입니다. 다만 매월 일정액을 저축하는 습관을 만들거나 목돈이 없는 상황에서는 적금이 더 현실적인 선택입니다.',
  },
  {
    q: '이자소득세 15.4%는 자동으로 공제되나요?',
    a: '네. 적금 만기 시 은행이 이자소득세를 원천징수한 후 나머지 금액(세후 이자 + 원금)을 지급합니다. 별도로 납부할 필요가 없습니다. 다만 연간 금융소득(이자+배당)이 2,000만원을 초과하면 금융소득 종합과세 대상이 되어 다음 해 5월에 종합소득세 신고를 해야 합니다.',
  },
]

const faqSchema = buildFaqSchema(faqItems)
const breadcrumbSchema = buildBreadcrumbSchema([
  { name: '홈', path: '/' },
  { name: '적금 이자 계산기', path: '/savings' },
])

export default function SavingsPage() {
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
            <h1 className={styles.h1}>적금 이자 계산기</h1>
            <p className={styles.desc}>
              월 납입금, 연 이자율, 적금 기간을 입력하면 만기 수령액과 세전·세후 이자를 즉시 계산합니다. 일반과세(15.4%)와 비과세 모두 지원하며 월별 이자 표도 확인할 수 있습니다.
            </p>
          </header>

          {/* AdBanner 자리 */}
          {/* <AdBanner slot="XXXXXXXXXX" /> */}

          <section className={styles.calcBox}>
            <SavingsCalculator />
          </section>

          <section className={styles.content}>
            <h2 className={styles.h2}>이자 과세 종류</h2>
            <p>
              적금 이자에 적용되는 세금은 가입 상품과 계좌 종류에 따라 달라집니다. 세금 차이가 실수령액에 미치는 영향을 미리 파악해두면 상품 선택에 도움이 됩니다.
            </p>
            <div className={styles.table}>
              <div className={styles.tableRow}>
                <span className={styles.tableHead}>과세 유형</span>
                <span className={styles.tableHead}>세율</span>
                <span className={styles.tableHead}>적용 조건</span>
              </div>
              {taxRows.map(([type, rate, note]) => (
                <div key={type} className={styles.tableRow}>
                  <span>{type}</span>
                  <span>{rate}</span>
                  <span>{note}</span>
                </div>
              ))}
            </div>

            <h2 className={styles.h2}>적금 가입 전 알아두면 좋은 것들</h2>
            <p>
              적금 이자 계산기로 만기 수령액을 확인했다면, 아래 내용을 함께 참고해 더 유리한 조건을 선택하세요.
            </p>
            <div className={styles.sectionStack}>
              {savingsTips.map(item => (
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
              단리 방식 기준 추정값입니다. 실제 이자는 금융기관 상품 조건에 따라 다를 수 있습니다. 중요한 금융 결정 전에는 해당 금융기관에 직접 확인하세요.
            </p>
          </footer>
        </div>
      </main>
    </>
  )
}
