import Link from 'next/link'
import styles from '../page.module.css'
import BmiCalculator from './BmiCalculator'
import { buildBreadcrumbSchema, buildFaqSchema, siteUrl } from '../lib/structuredData'

const pageUrl = `${siteUrl}/bmi`

export const metadata = {
  title: 'BMI 계산기 - 체질량지수 계산 및 비만도 확인',
  description:
    '키와 체중을 입력하면 BMI 체질량지수와 비만도를 즉시 계산합니다. WHO 아시아 기준 저체중·정상·과체중·비만·고도비만 판정, 정상 체중 범위, 표준 체중을 한 번에 확인하세요.',
  keywords: ['BMI 계산기', '체질량지수 계산', '비만도 확인', '표준 체중', 'BMI 정상 범위'],
  alternates: { canonical: pageUrl },
  openGraph: {
    title: 'BMI 계산기 - 체질량지수 계산 및 비만도 확인',
    description: '키·체중 입력만으로 BMI와 비만도를 즉시 확인하세요.',
    url: pageUrl,
    type: 'website',
    locale: 'ko_KR',
  },
}

const bmiTable = [
  ['저체중', '18.5 미만', '영양 부족 또는 건강 이상 가능성'],
  ['정상', '18.5 ~ 22.9', '건강한 체중 범위'],
  ['과체중', '23 ~ 24.9', '주의 필요, 생활습관 점검 권장'],
  ['비만', '25 ~ 29.9', '건강 위험도 증가, 관리 필요'],
  ['고도비만', '30 이상', '의료적 관리 적극 권장'],
]

const bmiInfo = [
  {
    title: 'BMI란 무엇인가요?',
    text: 'BMI(Body Mass Index, 체질량지수)는 체중(kg)을 키(m)의 제곱으로 나눈 값입니다. 세계보건기구(WHO)가 비만도를 판정하는 국제 표준 지표로 사용하며, 계산이 간단해 가장 널리 쓰입니다. 한국을 포함한 아시아 지역은 서양보다 같은 BMI에서 대사 질환 위험이 높아 더 낮은 기준을 적용합니다.',
  },
  {
    title: '아시아 기준이 다른 이유',
    text: '아시아인은 같은 BMI 수치에서도 서양인보다 체지방 비율이 높고 복부비만 경향이 강해 당뇨, 고혈압, 심혈관 질환 위험이 더 높습니다. 이에 WHO 아시아·태평양 지침은 BMI 23부터 과체중, 25부터 비만으로 판정하는 별도 기준을 권고합니다. 한국 비만학회도 이 기준을 공식 채택하고 있습니다.',
  },
  {
    title: '표준 체중 계산 방법',
    text: '이 계산기는 브로카 변형 공식을 사용합니다. 남성은 (키-100)×0.9, 여성은 (키-100)×0.85로 계산합니다. 정상 체중 범위는 BMI 18.5~22.9에 해당하는 최솟값과 최댓값으로 표시되며, 이 범위 내에서도 근육량, 골격, 나이에 따라 건강 상태가 다를 수 있습니다.',
  },
]

const faqItems = [
  {
    q: 'BMI가 정상 범위인데 왜 건강하지 않을 수 있나요?',
    a: 'BMI는 총 체중을 기준으로 하기 때문에 근육이 많은 사람과 지방이 많은 사람을 구분하지 못합니다. 운동을 많이 하는 사람은 BMI가 높게 나와도 체지방이 낮을 수 있고, 반대로 BMI가 정상이어도 복부지방이 많으면 대사 질환 위험이 높을 수 있습니다. BMI는 1차 지표로 활용하고, 체지방률이나 허리둘레를 함께 확인하는 것이 좋습니다.',
  },
  {
    q: '한국 기준과 서양 기준 BMI가 다른가요?',
    a: '네. WHO 서양 기준은 BMI 25 미만이면 정상, 30 이상이면 비만으로 봅니다. 반면 아시아 기준은 BMI 23 이상을 과체중, 25 이상을 비만으로 보다 엄격하게 분류합니다. 한국 비만학회와 대한의학회는 아시아·태평양 기준을 사용하며, 이 계산기도 같은 기준을 적용합니다.',
  },
  {
    q: '아이나 청소년에게도 이 계산기를 쓸 수 있나요?',
    a: '성인 기준 BMI는 만 18세 이상에 적용됩니다. 청소년은 성장 단계에 따라 체중과 키 비율이 다르기 때문에 성별·나이별 BMI 백분위수를 기준으로 비만도를 판정합니다. 소아·청소년의 비만도는 소아과 전문의나 성장 차트를 통해 확인하는 것이 정확합니다.',
  },
  {
    q: '근육이 많으면 BMI가 높게 나오는 게 맞나요?',
    a: '맞습니다. BMI는 체지방과 근육을 구별하지 않고 단순히 몸무게를 키의 제곱으로 나누기 때문에 근육량이 많은 운동선수나 헬스 트레이너는 BMI가 과체중 혹은 비만으로 나올 수 있습니다. 이런 경우에는 체지방률 측정이나 인바디 검사가 더 정확한 정보를 제공합니다.',
  },
  {
    q: 'BMI를 낮추려면 어떻게 해야 하나요?',
    a: 'BMI를 낮추는 가장 기본적인 방법은 체중을 줄이는 것입니다. 칼로리 섭취량을 줄이고 유산소 운동과 근력 운동을 꾸준히 병행하는 것이 효과적입니다. 다만 급격한 체중 감소는 근육 손실이나 영양 불균형을 초래할 수 있어, 주 0.5~1kg 정도의 완만한 감량이 권장됩니다. 비만 정도가 심하다면 의사와 상담하는 것이 안전합니다.',
  },
  {
    q: '임신 중이거나 노인이면 기준이 다른가요?',
    a: '임신 중에는 체중이 자연스럽게 증가하므로 일반 BMI 기준이 적용되지 않습니다. 임신부의 체중 관리 기준은 임신 전 BMI를 기준으로 의사가 개별 권장 체중 증가량을 안내합니다. 65세 이상 노인은 BMI 18.5~25 범위를 유지하는 것이 사망률을 낮추는 데 유리하다는 연구 결과가 있으며, 노인 근감소증 예방을 위해 단백질 섭취와 근력 운동이 중요합니다.',
  },
]

const faqSchema = buildFaqSchema(faqItems)
const breadcrumbSchema = buildBreadcrumbSchema([
  { name: '홈', path: '/' },
  { name: 'BMI 계산기', path: '/bmi' },
])

export default function BmiPage() {
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
            <h1 className={styles.h1}>BMI 계산기</h1>
            <p className={styles.desc}>
              키와 체중을 입력하면 체질량지수(BMI)와 비만도를 즉시 계산합니다. WHO 아시아 기준으로 저체중·정상·과체중·비만·고도비만을 판정하고 정상 체중 범위와 표준 체중도 함께 안내합니다.
            </p>
          </header>

          {/* AdBanner 자리 */}
          {/* <AdBanner slot="XXXXXXXXXX" /> */}

          <section className={styles.calcBox}>
            <BmiCalculator />
          </section>

          <section className={styles.content}>
            <h2 className={styles.h2}>BMI 판정 기준 (아시아·한국 기준)</h2>
            <p>
              한국 비만학회와 WHO 아시아·태평양 지침은 서양 기준보다 낮은 비만 기준을 적용합니다. 아시아인은 같은 BMI에서 복부비만과 대사 질환 위험이 더 높기 때문입니다. 아래 표에서 각 구간별 의미를 확인하세요.
            </p>
            <div className={styles.table}>
              <div className={styles.tableRow}>
                <span className={styles.tableHead}>판정</span>
                <span className={styles.tableHead}>BMI 범위</span>
                <span className={styles.tableHead}>의미</span>
              </div>
              {bmiTable.map(([label, range, meaning]) => (
                <div key={label} className={styles.tableRow}>
                  <span>{label}</span>
                  <span>{range}</span>
                  <span>{meaning}</span>
                </div>
              ))}
            </div>

            <div className={styles.noteBox} style={{ marginTop: '12px' }}>
              <p className={styles.smallNote}>
                BMI는 대규모 인구 집단의 비만 경향을 파악하는 통계 지표입니다. 개인의 체지방률, 근육량, 골밀도 등은 BMI로 알 수 없으므로 건강 상태 판단 시 다른 지표와 함께 확인하세요.
              </p>
            </div>

            <h2 className={styles.h2}>BMI 계산 방법과 지표 이해</h2>
            <p>
              BMI 계산식은 단순하지만 배경을 이해하면 결과를 더 잘 활용할 수 있습니다. 아시아 기준이 왜 별도로 존재하는지, 표준 체중은 어떻게 계산하는지 알면 계산 결과의 맥락을 파악하기 훨씬 좋습니다.
            </p>
            <div className={styles.sectionStack}>
              {bmiInfo.map((item) => (
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
              BMI 계산 결과는 참고용 추정값입니다. 실제 건강 상태 판단은 의료 전문가와 상담하세요.
            </p>
          </footer>
        </div>
      </main>
    </>
  )
}
