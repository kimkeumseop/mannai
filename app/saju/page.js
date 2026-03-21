import Link from 'next/link'
import styles from '../page.module.css'
import SajuCalculator from './SajuCalculator'
import { buildBreadcrumbSchema, buildFaqSchema, siteUrl } from '../lib/structuredData'

const pageUrl = `${siteUrl}/saju`

export const metadata = {
  title: '사주 계산기 - 생년월일로 사주팔자 무료 계산',
  description:
    '생년월일과 태어난 시간을 입력하면 사주팔자 8글자와 오행 비율을 확인할 수 있습니다. 사주팔자, 천간 지지, 오행 설명과 FAQ도 함께 제공합니다.',
  keywords: ['사주 계산기', '사주팔자', '무료 사주', '오행', '생년월일 사주'],
  alternates: { canonical: pageUrl },
  openGraph: {
    title: '사주 계산기 - 사주팔자 무료 계산',
    description: '생년월일로 사주팔자 8글자와 오행 비율을 계산하세요.',
    url: pageUrl,
    type: 'website',
    locale: 'ko_KR',
  },
}

const stemBranchCards = [
  {
    title: '천간',
    text: '천간은 갑·을·병·정처럼 10개의 글자로 이루어진 하늘의 기운 체계입니다. 사주에서는 겉으로 드러나는 성향과 흐름을 읽을 때 자주 활용합니다.',
  },
  {
    title: '지지',
    text: '지지는 자·축·인·묘처럼 12개의 글자로 이루어진 땅의 기운 체계입니다. 시간, 계절, 환경적 배경을 함께 해석할 때 핵심이 됩니다.',
  },
  {
    title: '사주팔자',
    text: '태어난 연·월·일·시 각각에 천간 1글자와 지지 1글자가 붙어 총 8글자가 만들어지는데, 이것을 보통 사주팔자라고 부릅니다.',
  },
  {
    title: '일간',
    text: '여덟 글자 가운데 나 자신을 가장 직접적으로 상징하는 글자가 일간입니다. 사주 해석을 시작할 때 가장 먼저 보는 기준점입니다.',
  },
]

const elementCards = [
  {
    title: '목(木)',
    text: '성장, 확장, 출발의 이미지를 가진 오행입니다. 계획을 세우고 앞으로 뻗어 나가는 힘을 상징하는 경우가 많습니다.',
  },
  {
    title: '화(火)',
    text: '표현, 열정, 활동성을 상징합니다. 드러나는 에너지와 속도감, 대인관계의 활발함을 읽을 때 자주 언급됩니다.',
  },
  {
    title: '토(土)',
    text: '균형, 안정, 중재의 성격을 지닌 오행입니다. 여러 기운 사이를 이어 주는 중심축처럼 해석되기도 합니다.',
  },
  {
    title: '금(金)',
    text: '정리, 판단, 절제의 성향과 연결됩니다. 구조를 만들고 기준을 세우는 힘으로 보는 경우가 많습니다.',
  },
  {
    title: '수(水)',
    text: '유연함, 지혜, 흐름을 상징합니다. 생각의 깊이, 적응력, 감정의 흐름을 해석할 때 많이 사용됩니다.',
  },
]

const faqItems = [
  {
    q: '사주팔자란 무엇인가요?',
    a: '사주팔자는 태어난 연, 월, 일, 시를 기준으로 만든 네 개의 기둥과 여덟 글자를 뜻합니다. 전통 명리학에서는 이 구조를 바탕으로 성향과 흐름을 해석합니다.',
  },
  {
    q: '태어난 시간을 모르면 사주를 볼 수 없나요?',
    a: '볼 수는 있습니다. 시간을 모르면 시주를 제외한 3주 6글자 기준으로 기본 구조를 확인할 수 있지만, 세부 해석은 태어난 시간을 알 때 더 정확해집니다.',
  },
  {
    q: '양력과 음력 중 무엇을 입력해야 하나요?',
    a: '정확한 생년월일 기준을 알고 있다면 둘 다 가능합니다. 이 계산기는 양력과 음력을 모두 지원하며, 음력으로 입력하면 양력으로 변환한 뒤 계산합니다.',
  },
  {
    q: '오행 비율이 많고 적은 것은 어떤 의미인가요?',
    a: '오행은 균형과 편중을 보는 참고 도구입니다. 특정 오행이 많다고 무조건 좋거나 나쁘다고 보지는 않으며, 전체 구조와 일간의 관계 속에서 함께 해석해야 합니다.',
  },
  {
    q: '인터넷 사주 계산기 결과만으로 충분한가요?',
    a: '기본 구조를 이해하는 데는 도움이 되지만, 깊은 해석은 절기 기준이나 대운 흐름처럼 더 많은 요소를 함께 봐야 합니다. 이 페이지는 입문용 구조 확인에 초점을 두고 있습니다.',
  },
  {
    q: '사주 결과가 사람마다 다르게 해석되는 이유는 무엇인가요?',
    a: '같은 팔자라도 어떤 이론을 중심으로 보느냐에 따라 강조점이 달라질 수 있습니다. 그래서 계산 결과는 동일하더라도 해석 문장은 상담자나 해석 관점에 따라 달라질 수 있습니다.',
  },
]

const faqSchema = buildFaqSchema(faqItems)
const breadcrumbSchema = buildBreadcrumbSchema([
  { name: '홈', path: '/' },
  { name: '사주 계산기', path: '/saju' },
])

export default function SajuPage() {
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
            <h1 className={styles.h1}>사주 계산기</h1>
            <p className={styles.desc}>
              생년월일과 태어난 시간을 입력하면 사주팔자 8글자와 오행 비율을 확인할 수 있습니다.
              처음 사주를 접하는 분도 구조를 이해할 수 있도록 기본 개념 설명을 함께 정리했습니다.
            </p>
          </header>

          <section className={styles.calcBox}>
            <SajuCalculator />
          </section>

          <section
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              padding: '18px 20px',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              flexWrap: 'wrap',
            }}
          >
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              사주 결과를 본 뒤 조금 더 자세한 해석이 필요하다면 별도 상담이나 전문 해설과 함께 비교해 볼 수 있습니다.
            </p>
            <a
              href="https://saju-cheatkey.kr"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                padding: '9px 16px',
                background: 'var(--accent)',
                color: 'var(--accent-text)',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: '600',
                whiteSpace: 'nowrap',
                textDecoration: 'none',
              }}
            >
              사주 풀이 자세히 보기
            </a>
          </section>

          <section className={styles.content}>
            <h2 className={styles.h2}>사주팔자란 무엇인가요?</h2>
            <p>
              사주팔자는 태어난 연, 월, 일, 시를 기준으로 만든 네 개의 기둥을 뜻하며, 각 기둥은 천간 1글자와 지지 1글자로 이루어집니다. 그래서 네 기둥을 합치면 총 여덟 글자가 되고, 이를 흔히 사주팔자라고 부릅니다. 명리학에서는 이 여덟 글자를 통해 사람의 기질, 강한 요소, 약한 요소, 관계의 흐름을 읽어내려는 전통적 해석 체계를 사용합니다.
            </p>
            <p>
              이 페이지의 사주 계산기는 복잡한 절기 계산을 직접 하지 않아도 기본 구조를 빠르게 확인할 수 있게 도와줍니다. 검색으로 들어온 사용자가 단순히 오늘 운세를 보기보다, 생년월일 기준의 사주 구조가 어떻게 만들어지는지 이해할 수 있도록 구성한 점이 특징입니다.
            </p>

            <h2 className={styles.h2}>천간 지지 설명</h2>
            <div className={styles.infoGrid}>
              {stemBranchCards.map((card) => (
                <div key={card.title} className={styles.infoCard}>
                  <p className={styles.infoCardTitle}>{card.title}</p>
                  <p className={styles.infoCardText}>{card.text}</p>
                </div>
              ))}
            </div>

            <h2 className={styles.h2}>오행이란?</h2>
            <p>
              오행은 목, 화, 토, 금, 수 다섯 가지 기운을 말합니다. 사주에서는 각 글자가 어떤 오행에 속하는지를 보고 전체 균형을 확인합니다. 오행이 특정 방향으로 몰려 있는지, 비교적 고르게 분포하는지를 살펴보면 자신의 성향을 이해하는 데 참고가 됩니다. 다만 오행 비율은 해석의 출발점이지 결론 자체는 아니므로, 단순히 많고 적음만으로 좋고 나쁨을 판단하는 것은 조심해야 합니다.
            </p>
            <div className={styles.sectionStack}>
              {elementCards.map((card) => (
                <div key={card.title} className={styles.infoCard}>
                  <p className={styles.infoCardTitle}>{card.title}</p>
                  <p className={styles.infoCardText}>{card.text}</p>
                </div>
              ))}
            </div>

            <h2 className={styles.h2}>사주 계산기 FAQ</h2>
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
              계산 결과는 전통 명리학 구조를 이해하기 위한 참고용입니다. 전문 상담이나 중요한 인생 결정은 다양한 정보와 현실적 상황을 함께 고려해 판단하세요.
            </p>
          </footer>
        </div>
      </main>
    </>
  )
}
