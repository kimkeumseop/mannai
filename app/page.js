import Link from 'next/link'
import styles from './page.module.css'
import { buildFaqSchema, siteUrl } from './lib/structuredData'

const pageUrl = siteUrl

export const metadata = {
  title: '계산기 모음 - 만나이, 급여, 전월세, 사주 계산기',
  description:
    '만나이 계산기, 급여 실수령액 계산기, 전월세 계산기, 사주 계산기를 한 곳에서 무료로 사용하세요. 2026년 기준 안내와 실용적인 설명을 함께 제공합니다.',
  keywords: ['만나이 계산기', '급여 계산기', '전월세 계산기', '사주 계산기', '실수령액 계산기'],
  alternates: { canonical: pageUrl },
  openGraph: {
    title: '계산기 모음',
    description: '만나이·급여·전월세·사주 계산기를 무료로 제공합니다.',
    url: pageUrl,
    type: 'website',
    locale: 'ko_KR',
  },
}

const CALCS = [
  {
    href: '/mannai',
    title: '만 나이 계산기',
    desc: '만 나이, 세는나이, 연 나이, 다음 생일 D-day 확인',
    emoji: '🎂',
  },
  {
    href: '/salary',
    title: '급여 실수령액 계산기',
    desc: '2026년 4대보험과 세금을 반영한 월급 계산',
    emoji: '💰',
  },
  {
    href: '/jeonwolse',
    title: '전월세 계산기',
    desc: '전세와 월세 변환, 전세대출 이자 계산',
    emoji: '🏠',
  },
  {
    href: '/saju',
    title: '사주 계산기',
    desc: '생년월일로 사주팔자와 오행 비율 확인',
    emoji: '☯️',
  },
]

const CALC_DETAILS = [
  {
    href: '/mannai',
    title: '만 나이 계산기',
    summary:
      '만 나이 계산기는 생년월일만 입력하면 현재 법적 기준인 만 나이와 세는나이, 연 나이를 함께 보여줍니다. 다음 생일까지 남은 날짜와 태어난 요일, 띠까지 한 번에 확인할 수 있어 학교, 행정서류, 일상 대화에서 모두 유용합니다.',
    points: [
      '2023년 만 나이 통일 기준에 맞춘 계산',
      '만 나이와 세는나이 차이를 한 번에 비교',
      '다음 생일 D-day와 살아온 일수까지 확인',
    ],
  },
  {
    href: '/salary',
    title: '급여 실수령액 계산기',
    summary:
      '급여 계산기는 세전 월급을 기준으로 국민연금, 건강보험, 장기요양보험, 고용보험과 소득세를 반영해 실제 통장에 들어오는 실수령액을 계산합니다. 비과세 식대와 부양가족 수, 자녀 수를 입력할 수 있어 직장인 월급 계산에 바로 활용하기 좋습니다.',
    points: [
      '2026년 4대보험 요율 설명과 함께 제공',
      '비과세 항목과 부양가족 수를 반영한 계산',
      '세후 월급과 총 공제액을 한눈에 확인',
    ],
  },
  {
    href: '/jeonwolse',
    title: '전월세 계산기',
    summary:
      '전월세 계산기는 전세를 월세로 바꾸거나 월세를 전세로 환산할 때 필요한 전환율 계산을 도와줍니다. 전세대출 이자도 함께 계산할 수 있어 보증금 규모와 월 고정지출을 비교해 계약 조건을 검토할 때 편리합니다.',
    points: [
      '전세→월세, 월세→전세 두 방향 모두 계산',
      '전월세 전환율을 직접 넣어 여러 시나리오 비교',
      '전세대출 월 이자와 연 이자 빠른 확인',
    ],
  },
  {
    href: '/saju',
    title: '사주 계산기',
    summary:
      '사주 계산기는 양력과 음력을 모두 지원하며, 생년월일시를 기준으로 사주팔자 8글자와 오행 비율을 자동 계산합니다. 복잡한 천간과 지지를 직접 맞춰보지 않아도 기본 구조를 이해할 수 있어 입문용으로 쓰기 좋습니다.',
    points: [
      '양력과 음력 모두 입력 가능',
      '사주팔자 8글자와 오행 비율 자동 계산',
      '일간 중심 설명으로 결과 해석에 도움',
    ],
  },
]

const HOW_TO_USE = [
  {
    title: '1. 필요한 계산기를 선택하세요',
    text: '메인 화면에서 만나이, 급여, 전월세, 사주 중 원하는 계산기를 누르면 바로 이동합니다. 회원가입이나 앱 설치는 필요하지 않습니다.',
  },
  {
    title: '2. 기준값을 입력하세요',
    text: '생년월일, 월급, 보증금, 전환율처럼 계산에 필요한 핵심 값만 넣으면 됩니다. 각 계산기는 복잡한 항목을 최소화해 모바일에서도 빠르게 입력할 수 있습니다.',
  },
  {
    title: '3. 결과와 설명을 함께 확인하세요',
    text: '단순 숫자만 보여주지 않고, 계산 방법과 해석에 도움이 되는 설명 섹션을 함께 제공합니다. 처음 써보는 분도 맥락을 이해하기 쉽습니다.',
  },
  {
    title: '4. 중요한 결정 전에는 기준을 다시 확인하세요',
    text: '급여, 세금, 임대차처럼 실제 금전이 오가는 내용은 회사 규정이나 계약 조건에 따라 달라질 수 있습니다. 계산 결과는 1차 판단용으로 활용하고 최종 결정 전에는 공식 자료를 확인하는 것이 좋습니다.',
  },
]

const faqItems = [
  {
    q: '이 사이트의 계산기는 무료인가요?',
    a: '네. 모든 계산기는 별도 가입 없이 무료로 사용할 수 있습니다. 자주 쓰는 생활 계산기를 빠르게 확인할 수 있도록 단순하고 가벼운 구조로 만들었습니다.',
  },
  {
    q: '입력한 개인정보가 저장되나요?',
    a: '계산에 사용한 값은 브라우저 안에서 처리되며, 회원정보처럼 수집해 보관하는 구조로 운영하지 않습니다. 다만 공유 기기에서는 입력 후 브라우저 자동완성 기록이 남지 않도록 확인하는 것이 좋습니다.',
  },
  {
    q: '계산 결과가 실제와 조금 다를 수 있는 이유는 무엇인가요?',
    a: '급여 계산은 회사별 공제 방식, 복리후생, 추가 수당에 따라 달라질 수 있고 전월세 계산은 계약서 특약과 실제 전환율에 따라 차이가 납니다. 사주와 만나이도 입력 기준이 다르면 결과가 달라질 수 있으므로 최종 확인은 개별 상황에 맞춰 진행해야 합니다.',
  },
  {
    q: '모바일에서도 사용하기 편한가요?',
    a: '모든 페이지는 모바일 화면을 기준으로도 읽기 쉽도록 한 칸 입력, 짧은 버튼, 카드형 설명 섹션으로 구성했습니다. 휴대폰에서 바로 계산하고 결과를 확인하기 좋습니다.',
  },
  {
    q: '검색으로 들어왔는데 어떤 계산기부터 써야 할지 모르겠어요.',
    a: '나이나 법적 기준을 확인하려면 만나이 계산기, 월급 세후 금액을 알고 싶다면 급여 계산기, 전세와 월세 비교가 필요하다면 전월세 계산기, 생년월일 기반 운세 구조가 궁금하다면 사주 계산기를 선택하면 됩니다.',
  },
  {
    q: '계산기 내용은 언제 업데이트되나요?',
    a: '보험 요율이나 제도 기준처럼 해마다 달라질 수 있는 항목은 새 기준이 공개되면 순차적으로 업데이트합니다. 특히 급여 계산기와 전월세 안내는 변경 가능성이 있는 자료를 중심으로 주기적으로 점검합니다.',
  },
]

const faqSchema = buildFaqSchema(faqItems)

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className={styles.main}>
        <div className={styles.container}>
          <header className={styles.header}>
            <h1 className={styles.h1}>계산기 모음</h1>
            <p className={styles.desc}>
              만나이, 급여 실수령액, 전월세, 사주 계산기를 한 곳에서 무료로 사용할 수 있는 생활형 계산기 모음입니다.
              필요한 값을 빠르게 확인하고, 아래 설명 섹션으로 계산 기준까지 함께 이해해 보세요.
            </p>
          </header>

          <section style={{ marginBottom: '2.5rem' }}>
            <div className={styles.cardGrid}>
              {CALCS.map((calc) => (
                <Link key={calc.href} href={calc.href} className={styles.linkCard}>
                  <p className={styles.cardEmoji}>{calc.emoji}</p>
                  <p className={styles.cardTitle}>{calc.title}</p>
                  <p className={styles.cardDesc}>{calc.desc}</p>
                </Link>
              ))}
            </div>
          </section>

          <section className={styles.content}>
            <h2 className={styles.h2}>계산기별 상세 설명</h2>
            <p>
              메인 페이지에서는 각 계산기가 어떤 상황에서 필요한지 먼저 파악할 수 있도록 요약 설명을 제공합니다.
              광고성 문장보다 실제 사용 장면에 가까운 내용을 중심으로 구성해, 검색으로 바로 들어온 사용자도 원하는 계산기를 쉽게 찾을 수 있게 했습니다.
            </p>
            <div className={styles.sectionStack}>
              {CALC_DETAILS.map((item) => (
                <div key={item.href} className={styles.infoCard}>
                  <Link href={item.href} style={{ textDecoration: 'none' }}>
                    <p className={styles.infoCardTitle}>{item.title}</p>
                  </Link>
                  <p className={styles.infoCardText}>{item.summary}</p>
                  <ul className={styles.bulletList}>
                    {item.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <h2 className={styles.h2}>사이트 이용방법</h2>
            <p>
              이 사이트는 복잡한 가입 절차 없이 필요한 계산만 빠르게 할 수 있도록 설계했습니다. 메인 화면에서 계산기를 고른 뒤 값을 입력하면 결과가 바로 나오고, 이어지는 설명 섹션에서 계산 원리와 자주 묻는 질문을 확인할 수 있습니다.
            </p>
            <div className={styles.stepGrid}>
              {HOW_TO_USE.map((step) => (
                <div key={step.title} className={styles.noteBox}>
                  <p className={styles.infoCardTitle}>{step.title}</p>
                  <p className={styles.infoCardText}>{step.text}</p>
                </div>
              ))}
            </div>

            <h2 className={styles.h2}>이런 분께 잘 맞습니다</h2>
            <div className={styles.infoGrid}>
              <div className={styles.infoCard}>
                <span className={styles.label}>직장인</span>
                <p className={styles.infoCardText}>
                  월급 세후 금액이 궁금하거나 부양가족과 비과세 식대를 반영해 실수령액을 빠르게 계산하고 싶은 분께 적합합니다.
                </p>
              </div>
              <div className={styles.infoCard}>
                <span className={styles.label}>전월세 계약 준비</span>
                <p className={styles.infoCardText}>
                  전세와 월세 중 어떤 조건이 더 부담이 적은지 비교하고, 전세대출 이자까지 포함해 월 고정비를 점검하려는 분께 도움이 됩니다.
                </p>
              </div>
              <div className={styles.infoCard}>
                <span className={styles.label}>행정·일상 확인</span>
                <p className={styles.infoCardText}>
                  만 나이 통일 이후 서류나 지원 자격을 확인할 때, 생년월일 기준 나이를 빠르게 계산하고 싶은 분이 자주 사용합니다.
                </p>
              </div>
              <div className={styles.infoCard}>
                <span className={styles.label}>입문용 사주</span>
                <p className={styles.infoCardText}>
                  천간, 지지, 오행처럼 낯선 개념을 처음 접하는 분이 기본 구조를 가볍게 살펴보는 용도로 쓰기 좋습니다.
                </p>
              </div>
            </div>

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
              본 사이트의 계산 결과는 참고용입니다. 급여, 세금, 대출, 임대차처럼 실제 금전이 오가는 사안은 공식 자료와 계약 조건을 함께 확인하세요.
            </p>
          </footer>
        </div>
      </main>
    </>
  )
}
