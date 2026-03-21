import Link from 'next/link'
import styles from '../page.module.css'
import AgeCalculator from '../components/AgeCalculator'
import { buildBreadcrumbSchema, siteUrl } from '../lib/structuredData'

const pageUrl = `${siteUrl}/mannai`

export const metadata = {
  title: '만 나이 계산기 - 생년월일로 만 나이와 세는나이 계산',
  description:
    '생년월일을 입력하면 만 나이, 세는나이, 연 나이와 다음 생일까지 남은 날짜를 한 번에 확인할 수 있습니다. 2023년 만 나이 통일법 설명과 FAQ도 함께 제공합니다.',
  keywords: ['만 나이 계산기', '만나이', '세는나이', '연 나이', '나이 계산'],
  alternates: { canonical: pageUrl },
  openGraph: {
    title: '만 나이 계산기',
    description: '생년월일로 만 나이와 세는나이를 빠르게 확인하세요.',
    url: pageUrl,
    type: 'website',
    locale: 'ko_KR',
  },
}

const comparisonRows = [
  ['만 나이', '생일이 지날 때마다 한 살 증가', '행정, 법률, 대부분의 공식 서류'],
  ['세는나이', '태어나자마자 1살, 매년 1월 1일 증가', '일상 표현이나 과거 관행'],
  ['연 나이', '현재 연도 - 출생 연도', '청소년 보호, 병역 등 일부 제도'],
]

const faqItems = [
  {
    q: '만 나이는 어떻게 계산하나요?',
    a: '현재 연도에서 출생 연도를 빼고, 올해 생일이 아직 지나지 않았다면 한 살을 더 빼는 방식으로 계산합니다. 예를 들어 2000년생이 2026년에 아직 생일 전이라면 만 나이는 25세입니다.',
  },
  {
    q: '2023년 만 나이 통일법으로 무엇이 바뀌었나요?',
    a: '2023년 6월 28일부터 행정과 민사 관계에서 나이 계산의 기본 기준이 만 나이로 정리됐습니다. 그래서 주민등록, 복지, 계약, 각종 신청 절차에서 만 나이를 쓰는 경우가 훨씬 명확해졌습니다.',
  },
  {
    q: '세는나이와 만 나이는 왜 최대 두 살까지 차이가 나나요?',
    a: '세는나이는 태어나는 순간 1살로 시작하고 새해마다 한 살이 더해지기 때문입니다. 반면 만 나이는 생일을 기준으로 늘어나므로 생일 전 구간에서는 두 방식의 차이가 가장 크게 벌어질 수 있습니다.',
  },
  {
    q: '연 나이는 어디에 사용되나요?',
    a: '연 나이는 현재 연도에서 출생 연도만 빼는 방식이며, 일부 제도에서는 여전히 연 나이 기준을 사용합니다. 대표적으로 병역, 청소년 보호 관련 일부 규정, 학교 학년 구분 등에서 참고되는 경우가 있습니다.',
  },
  {
    q: '생일이 오늘이면 만 나이는 언제 바뀌나요?',
    a: '생일 당일 0시를 기준으로 만 나이가 한 살 올라간 것으로 봅니다. 그래서 생일이 되면 그날부터 공식적인 만 나이가 변경됩니다.',
  },
  {
    q: '외국식 나이와 만 나이는 같은 개념인가요?',
    a: '네. 한국에서 말하는 만 나이는 국제적으로 널리 쓰이는 age 기준과 같은 개념입니다. 생일을 기준으로 한 살씩 증가하는 방식이므로 해외 서류와도 비교적 자연스럽게 맞습니다.',
  },
]

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: '홈', path: '/' },
  { name: '만 나이 계산기', path: '/mannai' },
])

export default function MannaiPage() {
  return (
    <>
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
            <h1 className={styles.h1}>만 나이 계산기</h1>
            <p className={styles.desc}>
              생년월일을 입력하면 만 나이, 세는나이, 연 나이와 다음 생일까지 남은 날짜를 바로 확인할 수 있습니다.
              2023년 만 나이 통일 이후 헷갈리기 쉬운 개념을 함께 정리해 두었습니다.
            </p>
          </header>

          <section className={styles.calcBox}>
            <AgeCalculator />
          </section>

          <section className={styles.content}>
            <h2 className={styles.h2}>만 나이 계산법 상세 설명</h2>
            <p>
              만 나이는 태어난 날을 기준으로 생일이 지날 때마다 한 살씩 늘어나는 방식입니다. 계산법 자체는 단순하지만, 세는나이와 연 나이가 오랫동안 함께 쓰였기 때문에 실제 생활에서는 혼동이 자주 생깁니다. 그래서 나이 계산기를 사용할 때는 단순히 숫자만 보는 것보다 어떤 기준으로 계산된 나이인지 함께 확인하는 것이 중요합니다.
            </p>
            <p>
              예를 들어 현재 연도에서 출생 연도를 먼저 빼고, 올해 생일이 아직 오지 않았다면 1을 빼면 만 나이가 됩니다. 이 페이지는 이런 과정을 자동으로 처리해 만 나이뿐 아니라 세는나이, 연 나이, 다음 생일까지 남은 날짜, 태어난 요일까지 함께 보여 주므로 행정 서류 확인이나 일상 대화에서 모두 활용하기 좋습니다.
            </p>

            <h2 className={styles.h2}>세는나이·연 나이·만 나이 비교</h2>
            <div className={styles.table}>
              <div className={styles.tableRow}>
                <span className={styles.tableHead}>구분</span>
                <span className={styles.tableHead}>계산 방식</span>
                <span className={styles.tableHead}>주요 사용 예시</span>
              </div>
              {comparisonRows.map(([name, method, usage]) => (
                <div key={name} className={styles.tableRow}>
                  <span>{name}</span>
                  <span>{method}</span>
                  <span>{usage}</span>
                </div>
              ))}
            </div>

            <h2 className={styles.h2}>2023년 만나이 통일법 설명</h2>
            <p>
              2023년 6월 28일부터 행정기본법과 민법 개정 취지에 따라 우리 사회의 공식적인 나이 기준은 만 나이로 정리됐습니다. 그전까지는 서류와 일상 표현에서 세는나이나 연 나이가 뒤섞여 사용되면서 같은 사람의 나이가 문맥에 따라 다르게 보이는 일이 많았습니다.
            </p>
            <p>
              통일 이후에는 계약, 행정 민원, 복지 서비스 같은 대부분의 영역에서 만 나이를 기준으로 보는 흐름이 더 분명해졌습니다. 다만 병역, 청소년 보호 제도, 학교 학제처럼 별도 법령이나 운영 기준이 있는 일부 분야는 여전히 연 나이 등 다른 기준을 사용할 수 있으므로, 실제 적용 제도는 개별 안내를 함께 확인해야 합니다.
            </p>

            <div className={styles.infoGrid}>
              <div className={styles.infoCard}>
                <span className={styles.label}>언제 유용할까</span>
                <p className={styles.infoCardText}>
                  지원 자격, 공공서비스 연령 기준, 계약서 작성, 해외 서류 작성처럼 정확한 공식 나이가 필요한 상황에서 특히 유용합니다.
                </p>
              </div>
              <div className={styles.infoCard}>
                <span className={styles.label}>왜 헷갈릴까</span>
                <p className={styles.infoCardText}>
                  세는나이 문화가 오래 유지되었고, 일부 제도는 연 나이를 계속 사용하기 때문입니다. 그래서 계산기를 통해 기준별 숫자를 같이 보는 것이 도움이 됩니다.
                </p>
              </div>
            </div>

            <h2 className={styles.h2}>만 나이 계산기 FAQ</h2>
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
              이 페이지는 현재 날짜 기준으로 만 나이와 관련 정보를 계산해 보여 줍니다. 제도별 실제 적용 기준은 해당 기관의 공지나 법령 안내를 함께 확인하세요.
            </p>
          </footer>
        </div>
      </main>
    </>
  )
}
