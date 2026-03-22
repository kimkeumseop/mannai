import Link from 'next/link'
import styles from '../page.module.css'
import DdayCalculator from './DdayCalculator'
import { buildBreadcrumbSchema, buildFaqSchema, siteUrl } from '../lib/structuredData'

const pageUrl = `${siteUrl}/dday`

export const metadata = {
  title: '디데이 계산기 - D-day 날짜 카운트다운',
  description:
    '목표 날짜를 선택하면 D-day를 즉시 계산하고 일·시간·분·초 실시간 카운트다운을 제공합니다. 수능, 크리스마스, 새해 등 자주 쓰는 날짜 빠른 선택과 여러 디데이 저장 기능을 지원합니다.',
  keywords: ['디데이 계산기', 'D-day 계산기', '날짜 카운트다운', '날짜 계산', '수능 디데이'],
  alternates: { canonical: pageUrl },
  openGraph: {
    title: '디데이 계산기 - D-day 날짜 카운트다운',
    description: '목표 날짜까지 D-day와 실시간 카운트다운을 확인하세요.',
    url: pageUrl,
    type: 'website',
    locale: 'ko_KR',
  },
}

const ddayUseCases = [
  {
    title: '시험·수능·자격증',
    text: '수능, 공무원 시험, 자격증 시험 등 중요한 시험 날까지의 남은 날수를 확인하면 학습 계획을 세우는 데 도움이 됩니다. 100일, 50일, 30일 등 주요 시점에 맞춰 공부 강도를 조절하거나 목표를 재점검할 수 있습니다.',
  },
  {
    title: '여행·이벤트 준비',
    text: '해외여행이나 콘서트, 결혼식처럼 미리 준비가 필요한 이벤트는 D-day 카운트다운이 있으면 준비 일정을 잡기 훨씬 편합니다. D-30, D-7처럼 중간 기준점에서 할 일을 체크리스트로 정리하는 데 활용할 수 있습니다.',
  },
  {
    title: '기념일·프로젝트 마감',
    text: '생일, 결혼기념일, 취업 기념일 같은 소중한 날이나 업무 마감일을 디데이로 등록해두면 실수 없이 챙길 수 있습니다. 여러 개의 디데이를 저장하면 중요한 일정을 한눈에 관리할 수 있습니다.',
  },
]

const howItWorks = [
  '오늘 날짜 기준으로 목표 날짜까지의 차이를 밀리초 단위로 계산합니다.',
  '남은 일수는 자정 기준으로 계산하며, 오늘 포함 시 D-0으로 표시됩니다.',
  '실시간 카운트다운은 매 초마다 남은 시간/분/초를 업데이트합니다.',
  '지난 날짜인 경우 경과 일수(+숫자)로 표시합니다.',
  '저장된 디데이는 브라우저 로컬 스토리지에 보관되어 브라우저를 닫아도 유지됩니다.',
]

const faqItems = [
  {
    q: 'D-day는 어떻게 계산하나요?',
    a: '오늘 날짜를 기준으로 목표 날짜까지 남은 날수를 계산합니다. 오늘이 바로 그 날이면 D-Day, 내일이면 D-1, 지난 날짜면 경과 일수(+숫자)로 표시됩니다. 시간/분/초 카운트다운은 현재 시각 기준으로 매 초 업데이트됩니다.',
  },
  {
    q: '저장한 디데이가 사라졌어요. 왜 그런가요?',
    a: '디데이 저장 기능은 브라우저 로컬 스토리지를 사용합니다. 브라우저 데이터(캐시, 쿠키, 사이트 데이터)를 삭제하면 저장된 디데이도 함께 지워집니다. 시크릿 모드에서는 브라우저를 닫으면 자동으로 삭제됩니다.',
  },
  {
    q: '수능 디데이는 어떻게 자동으로 계산되나요?',
    a: '수능은 매년 11월 셋째 목요일에 시행됩니다. 빠른 선택에서 수능을 선택하면 이 규칙에 따라 다음 수능 날짜를 자동으로 계산해 입력합니다. 다만 교육부 공식 발표와 다를 수 있으므로 반드시 교육부나 수능 관련 공식 사이트에서 확인하세요.',
  },
  {
    q: '자정 기준인가요, 현재 시각 기준인가요?',
    a: 'D-day 숫자(예: D-30)는 목표 날짜의 자정을 기준으로 계산합니다. 하지만 시간·분·초 카운트다운은 현재 시각 기준으로 실시간 업데이트됩니다. 따라서 D-1로 표시될 때 시간 카운트다운은 자정까지 남은 정확한 시간을 보여줍니다.',
  },
  {
    q: '최대 몇 개까지 디데이를 저장할 수 있나요?',
    a: '최대 10개까지 저장할 수 있습니다. 10개가 넘으면 가장 오래된 항목이 자동으로 삭제됩니다. 더 많은 디데이를 관리하려면 불필요한 항목을 삭제하고 새로 추가하세요.',
  },
  {
    q: '특정 날짜로부터 며칠이 지났는지도 계산할 수 있나요?',
    a: '가능합니다. 과거 날짜를 입력하면 D-day 숫자 대신 경과 일수(+숫자)로 표시됩니다. 예를 들어 취업일, 입학일, 결혼기념일 같은 과거 날짜를 입력하면 그 날로부터 몇 일이 지났는지 바로 확인할 수 있습니다.',
  },
]

const faqSchema = buildFaqSchema(faqItems)
const breadcrumbSchema = buildBreadcrumbSchema([
  { name: '홈', path: '/' },
  { name: '디데이 계산기', path: '/dday' },
])

export default function DdayPage() {
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
            <h1 className={styles.h1}>디데이 계산기</h1>
            <p className={styles.desc}>
              목표 날짜를 선택하면 D-day를 즉시 계산하고 일·시간·분·초 실시간 카운트다운을 제공합니다. 수능, 크리스마스, 새해 등 자주 쓰는 날짜를 빠르게 선택하고 여러 디데이를 저장해 관리하세요.
            </p>
          </header>

          {/* AdBanner 자리 */}
          {/* <AdBanner slot="XXXXXXXXXX" /> */}

          <section className={styles.calcBox}>
            <DdayCalculator />
          </section>

          <section className={styles.content}>
            <h2 className={styles.h2}>디데이 계산기 활용법</h2>
            <p>
              디데이 계산기는 단순히 날짜 차이를 계산하는 것을 넘어 목표까지 남은 시간을 실감하게 해주는 도구입니다. 중요한 이벤트를 앞두고 카운트다운을 확인하면 동기 부여와 계획 수립에 도움이 됩니다.
            </p>
            <div className={styles.sectionStack}>
              {ddayUseCases.map((item) => (
                <div key={item.title} className={styles.infoCard}>
                  <p className={styles.infoCardTitle}>{item.title}</p>
                  <p className={styles.infoCardText}>{item.text}</p>
                </div>
              ))}
            </div>

            <h2 className={styles.h2}>계산 방식 안내</h2>
            <p>
              D-day 계산 방식을 알아두면 결과를 더 정확하게 해석할 수 있습니다.
            </p>
            <div className={styles.infoCard}>
              <ol className={styles.orderedList}>
                {howItWorks.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
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
              D-day 계산 결과는 참고용입니다. 수능 등 시험 날짜는 반드시 공식 기관의 발표를 확인하세요.
            </p>
          </footer>
        </div>
      </main>
    </>
  )
}
