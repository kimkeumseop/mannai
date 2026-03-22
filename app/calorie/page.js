import Link from 'next/link'
import styles from '../page.module.css'
import CalorieCalculator from './CalorieCalculator'
import { buildBreadcrumbSchema, buildFaqSchema, siteUrl } from '../lib/structuredData'

const pageUrl = `${siteUrl}/calorie`

export const metadata = {
  title: '칼로리 계산기 - 기초대사량 및 일일 권장 칼로리 계산',
  description:
    '성별, 나이, 키, 체중, 활동량을 입력하면 기초대사량(BMR)과 일일 권장 칼로리(TDEE)를 계산합니다. 체중 감량·유지·증가를 위한 목적별 권장 칼로리도 함께 안내합니다.',
  keywords: ['칼로리 계산기', '기초대사량 계산', 'BMR 계산기', 'TDEE 계산', '일일 권장 칼로리'],
  alternates: { canonical: pageUrl },
  openGraph: {
    title: '칼로리 계산기 - 기초대사량 및 일일 권장 칼로리 계산',
    description: '기초대사량(BMR)과 일일 권장 칼로리(TDEE)를 즉시 계산합니다.',
    url: pageUrl,
    type: 'website',
    locale: 'ko_KR',
  },
}

const activityRows = [
  ['비활동적 (×1.2)', '거의 운동하지 않음', '사무직, 이동이 거의 없는 생활'],
  ['가벼운 활동 (×1.375)', '주 1~3회 운동', '가벼운 유산소, 산책 등'],
  ['보통 활동 (×1.55)', '주 3~5회 운동', '헬스, 수영 등 중간 강도'],
  ['활발한 활동 (×1.725)', '주 6~7회 운동', '매일 고강도 운동'],
  ['매우 활발 (×1.9)', '하루 2회 이상 운동', '운동선수, 육체노동 직군'],
]

const calorieGuides = [
  {
    title: 'BMR(기초대사량)이란?',
    text: 'BMR(Basal Metabolic Rate, 기초대사량)은 아무것도 하지 않고 안정 상태로 있을 때 신체 기능 유지(심장 박동, 호흡, 체온 유지 등)에 필요한 최소 칼로리입니다. 이 계산기는 가장 정확도가 높다고 알려진 Mifflin-St Jeor 공식을 사용합니다. 남성 BMR = 10×체중 + 6.25×키 - 5×나이 + 5, 여성 BMR = 10×체중 + 6.25×키 - 5×나이 - 161.',
  },
  {
    title: 'TDEE(일일 총 소비 칼로리)란?',
    text: 'TDEE(Total Daily Energy Expenditure)는 하루 동안 실제로 소비하는 총 칼로리입니다. BMR에 활동계수를 곱해 계산하며, 체중 변화는 섭취 칼로리와 TDEE의 차이에 따라 결정됩니다. TDEE만큼 먹으면 체중이 유지되고, 그보다 적게 먹으면 감량, 많이 먹으면 증가합니다.',
  },
  {
    title: '건강한 다이어트 칼로리 설정',
    text: '일반적으로 TDEE에서 500kcal를 줄이면 주당 약 0.5kg 감량 속도로 알려져 있습니다. 너무 급격한 칼로리 제한(극단적 저칼로리 다이어트)은 기초대사량 감소, 근육 손실, 영양 불균형을 초래할 수 있습니다. 건강한 감량은 주 0.5~1kg 이내로 천천히 진행하는 것이 권장됩니다.',
  },
]

const faqItems = [
  {
    q: '기초대사량(BMR) 계산 공식은 무엇인가요?',
    a: '이 계산기는 Mifflin-St Jeor 공식을 사용합니다. 남성 BMR = (10×체중kg) + (6.25×키cm) - (5×나이) + 5, 여성 BMR = (10×체중kg) + (6.25×키cm) - (5×나이) - 161입니다. 이 공식은 Harris-Benedict 공식보다 정확도가 높아 현재 가장 널리 사용됩니다. 다만 개인의 체지방률, 근육량, 건강 상태에 따라 실제 기초대사량은 다를 수 있습니다.',
  },
  {
    q: '활동량을 어떻게 정확히 선택해야 하나요?',
    a: '자신의 실제 활동량을 솔직하게 평가하는 것이 중요합니다. 많은 사람이 자신의 활동량을 과대평가하는 경향이 있습니다. 헬스장에 주 3회 가더라도 나머지 시간에 주로 앉아서 생활한다면 "가벼운 활동"이 더 적합할 수 있습니다. 처음에는 보수적으로 선택하고 실제 체중 변화를 2~4주 관찰하며 조정하는 방법을 권장합니다.',
  },
  {
    q: '같은 칼로리를 먹어도 체중이 다르게 변하는 이유는 무엇인가요?',
    a: '칼로리 외에도 탄수화물·단백질·지방의 구성비, 수분 섭취량, 장 건강, 수면의 질, 스트레스 호르몬(코르티솔) 등 다양한 요인이 체중에 영향을 줍니다. 또한 체중계 수치는 체지방뿐 아니라 수분과 음식물의 양에 따라 하루에도 1~2kg씩 변할 수 있어, 장기적인 추세로 판단하는 것이 중요합니다.',
  },
  {
    q: '다이어트를 오래 하면 기초대사량이 내려가나요?',
    a: '네. 장기간 칼로리 제한을 하면 신체가 적응하여 기초대사량이 감소하는 "대사 적응" 현상이 발생합니다. 이를 막기 위해서는 지나친 칼로리 제한을 피하고, 근력 운동으로 근육량을 유지하는 것이 중요합니다. 주기적인 "리피드 데이"(칼로리를 유지 수준으로 늘리는 날)를 넣는 방법도 대사 적응을 완화하는 데 도움이 됩니다.',
  },
  {
    q: '단백질 섭취량은 얼마가 적당한가요?',
    a: '일반적으로 체중 1kg당 1.2~2g의 단백질 섭취가 권장됩니다. 근력 운동을 하거나 다이어트 중이라면 근육 손실을 막기 위해 체중 1kg당 1.6~2.2g까지 섭취를 늘리는 것이 도움이 됩니다. 총 칼로리 중 단백질 비율이 높아지면 포만감이 오래가고 근육 유지에도 유리합니다.',
  },
]

const faqSchema = buildFaqSchema(faqItems)
const breadcrumbSchema = buildBreadcrumbSchema([
  { name: '홈', path: '/' },
  { name: '칼로리 계산기', path: '/calorie' },
])

export default function CaloriePage() {
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
            <h1 className={styles.h1}>칼로리 계산기</h1>
            <p className={styles.desc}>
              성별, 나이, 키, 체중, 활동량을 입력하면 기초대사량(BMR)과 일일 권장 칼로리(TDEE)를 계산합니다. 체중 감량·유지·증가 목적별 권장 칼로리도 한 번에 확인하세요.
            </p>
          </header>

          {/* AdBanner 자리 */}
          {/* <AdBanner slot="XXXXXXXXXX" /> */}

          <section className={styles.calcBox}>
            <CalorieCalculator />
          </section>

          <section className={styles.content}>
            <h2 className={styles.h2}>활동계수 기준표</h2>
            <p>
              TDEE는 기초대사량에 활동계수를 곱해 계산합니다. 활동계수 선택이 결과에 큰 영향을 미치므로 아래 표를 참고해 적절한 값을 선택하세요.
            </p>
            <div className={styles.table}>
              <div className={styles.tableRow}>
                <span className={styles.tableHead}>활동 수준</span>
                <span className={styles.tableHead}>운동 빈도</span>
                <span className={styles.tableHead}>해당 생활 유형</span>
              </div>
              {activityRows.map(([level, freq, type]) => (
                <div key={level} className={styles.tableRow}>
                  <span>{level}</span>
                  <span>{freq}</span>
                  <span>{type}</span>
                </div>
              ))}
            </div>

            <h2 className={styles.h2}>칼로리 계산 이해하기</h2>
            <p>
              BMR과 TDEE의 개념을 이해하면 식단 관리와 체중 조절에 훨씬 도움이 됩니다.
            </p>
            <div className={styles.sectionStack}>
              {calorieGuides.map(item => (
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
              칼로리 계산 결과는 Mifflin-St Jeor 공식 기반 추정값입니다. 개인 건강 상태와 목적에 따라 전문가 상담을 권장합니다.
            </p>
          </footer>
        </div>
      </main>
    </>
  )
}
