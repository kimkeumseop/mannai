import AgeCalculator from '../components/AgeCalculator'
import styles from '../page.module.css'
import Link from 'next/link'

export const metadata = {
  title: '만 나이 계산기 - 생년월일로 만나이 세는나이 바로 계산',
  description:
    '생년월일을 입력하면 만 나이, 세는나이, 연 나이와 다음 생일까지 한 번에 확인할 수 있습니다. 2026년 기준.',
  keywords: ['만 나이 계산기', '만나이', '세는나이', '연 나이', '나이 계산'],
  alternates: { canonical: '/mannai' },
  openGraph: {
    title: '만 나이 계산기',
    description: '생년월일로 만 나이와 세는나이를 빠르게 확인하세요.',
    type: 'website',
    locale: 'ko_KR',
  },
}

const faqItems = [
  {
    q: '만 나이는 어떻게 계산하나요?',
    a: '현재 연도에서 출생 연도를 빼고, 올해 생일이 지나지 않았다면 1살을 더 빼면 됩니다. 이 계산기는 생년월일만 입력하면 자동으로 계산합니다.',
  },
  {
    q: '2023년 만 나이 통일법으로 무엇이 바뀌었나요?',
    a: '2023년 6월 28일부터 행정과 민사상 나이 계산은 특별한 규정이 없는 한 만 나이를 기준으로 통일됐습니다. 다만 병역, 청소년 보호, 학교 입학처럼 일부 영역은 기존 기준을 유지합니다.',
  },
  {
    q: '세는나이와 만 나이는 최대 몇 살 차이 나나요?',
    a: '최대 2살까지 차이 날 수 있습니다. 특히 1월 1일생이 아닌 경우에는 생일 전까지 세는나이가 만 나이보다 2살 많을 수 있습니다.',
  },
  {
    q: '연 나이는 어디에 사용되나요?',
    a: '병역법, 청소년보호법, 학교 입학 연령처럼 출생 연도 기준으로 판단하는 일부 제도에서 사용됩니다.',
  },
  {
    q: '만 나이로 바뀌면 실생활에서 뭐가 달라지나요?',
    a: '주민등록증, 운전면허, 각종 행정서류에서 나이를 표기할 때 만 나이가 기준이 됩니다. 다만 술·담배 구매, 병역 등 일부 영역은 기존 기준(연 나이 또는 세는나이)을 그대로 사용합니다.',
  },
]

export default function MannaiPage() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div style={{ marginBottom: '1rem' }}>
          <Link href="/" style={{ fontSize: '13px', color: 'var(--text-hint)' }}>← 계산기 목록</Link>
        </div>

        <header className={styles.header}>
          <h1 className={styles.h1}>만 나이 계산기</h1>
          <p className={styles.desc}>
            생년월일을 입력하면 만 나이, 세는나이, 연 나이를 바로 확인할 수 있습니다.
          </p>
        </header>

        <section className={styles.calcBox}>
          <AgeCalculator />
        </section>

        {/* AdBanner 자리 */}
        {/* <AdBanner slot="XXXXXXXXXX" /> */}

        <section className={styles.content}>
          <h2 className={styles.h2}>만 나이란?</h2>
          <p>
            만 나이는 출생일을 기준으로 생일이 지날 때마다 한 살씩 더하는 국제 표준 방식입니다.
            한국에서도 2023년 6월 28일부터 법적, 행정적 기준은 원칙적으로 만 나이로 통일됐습니다.
            이전까지 한국은 태어나자마자 1살로 계산하는 세는나이와 출생 연도 차이를 기준으로 하는 연 나이를
            혼용해 왔지만, 이제는 만 나이가 공식 기준입니다.
          </p>

          <h2 className={styles.h2}>세는나이·연 나이·만 나이 비교</h2>
          <div className={styles.table}>
            <div className={styles.tableRow}>
              <span className={styles.tableHead}>구분</span>
              <span className={styles.tableHead}>계산 방법</span>
              <span className={styles.tableHead}>주요 사용처</span>
            </div>
            <div className={styles.tableRow}>
              <span>만 나이</span>
              <span>생일 기준으로 1살씩 증가</span>
              <span>법률, 행정, 일반 공식 기준</span>
            </div>
            <div className={styles.tableRow}>
              <span>세는나이</span>
              <span>현재 연도 - 출생 연도 + 1</span>
              <span>일상 표현, 과거 관습</span>
            </div>
            <div className={styles.tableRow}>
              <span>연 나이</span>
              <span>현재 연도 - 출생 연도</span>
              <span>병역, 청소년 보호, 학교 제도</span>
            </div>
          </div>

          <h2 className={styles.h2}>자주 묻는 질문</h2>
          <div className={styles.faqList}>
            {faqItems.map((faq, i) => (
              <div key={i} className={styles.faqItem}>
                <p className={styles.faqQ}>{faq.q}</p>
                <p className={styles.faqA}>{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        <footer className={styles.footer}>
          <p>
            2026년 기준 계산 결과를 제공합니다. 중요한 법률 또는 행정 판단이 필요한 경우에는
            관련 기관 기준을 함께 확인하세요.
          </p>
        </footer>
      </div>
    </main>
  )
}
