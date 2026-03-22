import Link from 'next/link'
import styles from '../page.module.css'
import LoanCalculator from './LoanCalculator'
import { buildBreadcrumbSchema, buildFaqSchema, siteUrl } from '../lib/structuredData'

const pageUrl = `${siteUrl}/loan`

export const metadata = {
  title: '대출 이자 계산기 - 월 납입금 및 총 이자 계산',
  description:
    '대출금액, 연 이자율, 대출 기간을 입력하면 월 납입금, 총 이자, 총 상환금액을 계산합니다. 원리금균등·원금균등·만기일시상환 방식과 상환 스케줄표를 지원합니다.',
  keywords: ['대출 이자 계산기', '월 납입금 계산', '원리금균등상환', '원금균등상환', '대출 이자 계산'],
  alternates: { canonical: pageUrl },
  openGraph: {
    title: '대출 이자 계산기 - 월 납입금 및 총 이자 계산',
    description: '대출금액과 이자율로 월 납입금과 총 이자를 즉시 계산합니다.',
    url: pageUrl,
    type: 'website',
    locale: 'ko_KR',
  },
}

const methodRows = [
  ['원리금균등상환', '매월 동일한 금액 납부', '초기 이자 비중이 높고 후반으로 갈수록 원금 비중 증가'],
  ['원금균등상환', '매월 동일한 원금 + 감소하는 이자', '초기 납입금이 가장 높고 이후 줄어듦, 총 이자 가장 적음'],
  ['만기일시상환', '매월 이자만 납부, 마지막에 원금 일시 상환', '매월 부담 낮지만 총 이자 가장 많음'],
]

const loanGuides = [
  {
    title: '상환 방식 선택 기준',
    text: '원리금균등상환은 매월 동일한 금액을 내서 가계 예산 계획을 세우기 편합니다. 원금균등상환은 초기 부담이 크지만 전체 이자를 가장 아낄 수 있어 여유 자금이 있다면 유리합니다. 만기일시상환은 전세자금대출처럼 만기에 목돈이 들어오는 경우에 적합합니다.',
  },
  {
    title: '중도상환 수수료 확인',
    text: '대출을 예정보다 빨리 갚으면 중도상환 수수료가 발생할 수 있습니다. 보통 대출 실행 후 3년 이내 상환 시 잔여 원금의 일정 비율(0.5~2%)을 수수료로 냅니다. 여유 자금으로 조기 상환을 계획한다면 중도상환 수수료를 미리 확인하고 실익을 따져보는 것이 중요합니다.',
  },
  {
    title: '변동금리 vs 고정금리',
    text: '고정금리는 대출 기간 내내 금리가 변하지 않아 이자 계획을 세우기 쉽습니다. 변동금리는 시장 금리에 따라 바뀌어 금리가 내려가면 유리하지만 오르면 납입금이 늘어납니다. 금리 인상기에는 고정금리, 금리 인하기에는 변동금리가 유리한 경향이 있습니다. 이 계산기는 고정금리 기준으로 계산합니다.',
  },
]

const faqItems = [
  {
    q: '원리금균등상환과 원금균등상환 중 어느 것이 유리한가요?',
    a: '총 이자 측면에서는 원금균등상환이 더 유리합니다. 원금균등상환은 매월 원금을 일정하게 줄여가기 때문에 남은 원금에 이자가 붙는 구조상 총 이자가 적습니다. 반면 원리금균등상환은 초기 납입이 상대적으로 적어 월 현금흐름 관리가 편합니다. 초기 부담을 줄이고 싶으면 원리금균등, 이자를 아끼고 싶으면 원금균등을 선택하세요.',
  },
  {
    q: '대출 이자율이 같아도 기간이 길면 왜 총 이자가 늘어나나요?',
    a: '대출 기간이 길면 원금을 오래 사용하는 만큼 이자가 쌓이기 때문입니다. 예를 들어 1억원을 연 5%로 빌릴 때 10년 상환과 20년 상환을 비교하면, 20년 상환의 월 납입금은 적지만 총 이자는 훨씬 많습니다. 여력이 된다면 기간을 줄이거나 중도상환을 활용해 이자 부담을 낮추는 것이 좋습니다.',
  },
  {
    q: '실제 대출 납입금과 계산기 결과가 다를 수 있나요?',
    a: '네. 이 계산기는 고정금리·단순 산식 기준의 추정값입니다. 실제 대출은 취급 수수료, 보증료, 변동금리 적용 방식, 원 단위 절사 방법 등에 따라 차이가 날 수 있습니다. 정확한 납입 스케줄은 해당 금융기관의 대출 시뮬레이터나 담당자를 통해 확인하세요.',
  },
  {
    q: '대출 갈아타기를 고려 중인데 유리한지 어떻게 판단하나요?',
    a: '대출 갈아타기는 현재 대출 금리와 새 대출 금리의 차이, 중도상환 수수료, 새 대출의 부대 비용을 종합적으로 비교해야 합니다. 이 계산기로 현재 대출과 새 조건의 총 이자를 각각 계산한 뒤 차이가 중도상환 수수료와 제반 비용을 커버하는지 확인하는 것이 기본 방법입니다.',
  },
  {
    q: '전세자금대출은 어떤 상환 방식이 맞나요?',
    a: '전세자금대출은 계약 기간 동안 이자만 내고 계약 종료 시 원금을 한 번에 갚는 만기일시상환이 일반적입니다. 전세 만료 시 보증금을 반환받아 대출을 상환하는 구조이기 때문입니다. 이 계산기의 만기일시상환 방식을 선택하면 전세 기간 동안 매월 납입할 이자를 확인할 수 있습니다.',
  },
]

const faqSchema = buildFaqSchema(faqItems)
const breadcrumbSchema = buildBreadcrumbSchema([
  { name: '홈', path: '/' },
  { name: '대출 이자 계산기', path: '/loan' },
])

export default function LoanPage() {
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
            <h1 className={styles.h1}>대출 이자 계산기</h1>
            <p className={styles.desc}>
              대출금액, 연 이자율, 기간을 입력하면 월 납입금, 총 이자, 총 상환금액을 계산합니다. 원리금균등·원금균등·만기일시상환 방식을 선택하고 상환 스케줄도 확인하세요.
            </p>
          </header>

          {/* AdBanner 자리 */}
          {/* <AdBanner slot="XXXXXXXXXX" /> */}

          <section className={styles.calcBox}>
            <LoanCalculator />
          </section>

          <section className={styles.content}>
            <h2 className={styles.h2}>상환 방식 비교</h2>
            <p>
              상환 방식에 따라 월 납입금 구조와 총 이자 부담이 달라집니다. 아래 표를 참고해 본인의 상황에 맞는 방식을 선택하세요.
            </p>
            <div className={styles.table}>
              <div className={styles.tableRow}>
                <span className={styles.tableHead}>방식</span>
                <span className={styles.tableHead}>납입 구조</span>
                <span className={styles.tableHead}>특징</span>
              </div>
              {methodRows.map(([method, structure, note]) => (
                <div key={method} className={styles.tableRow}>
                  <span>{method}</span>
                  <span>{structure}</span>
                  <span>{note}</span>
                </div>
              ))}
            </div>

            <h2 className={styles.h2}>대출 이용 가이드</h2>
            <p>
              이자 계산 결과 외에도 대출을 실제로 활용할 때 알아두어야 할 내용을 정리했습니다.
            </p>
            <div className={styles.sectionStack}>
              {loanGuides.map(item => (
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
              고정금리 기준 추정값입니다. 실제 납입금은 금융기관, 금리 변동, 수수료에 따라 다를 수 있습니다. 대출 계약 전 금융기관에 직접 확인하세요.
            </p>
          </footer>
        </div>
      </main>
    </>
  )
}
