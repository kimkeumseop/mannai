import SajuCalculator from './SajuCalculator'
import styles from '../page.module.css'
import Link from 'next/link'

export const metadata = {
  title: '사주 계산기 - 생년월일로 사주팔자 무료 계산',
  description:
    '생년월일과 태어난 시간을 입력하면 년주·월주·일주·시주의 사주팔자 8글자와 오행 비율을 무료로 계산합니다.',
  keywords: ['사주 계산기', '사주팔자', '사주 무료', '음양오행', '생년월일 사주'],
  alternates: { canonical: '/saju' },
  openGraph: {
    title: '사주 계산기 - 사주팔자 무료 계산',
    description: '생년월일로 사주팔자 8글자와 오행 비율을 계산하세요.',
    type: 'website',
    locale: 'ko_KR',
  },
}

const faqItems = [
  {
    q: '사주팔자란 무엇인가요?',
    a: '사주팔자(四柱八字)는 태어난 연(年)·월(月)·일(日)·시(時)의 네 기둥(四柱)과 각 기둥을 이루는 천간·지지 여덟 글자(八字)를 말합니다. 동양 전통 명리학에서 운명과 성격을 파악하는 데 사용합니다.',
  },
  {
    q: '천간과 지지란 무엇인가요?',
    a: '천간(天干)은 甲乙丙丁戊己庚辛壬癸의 10글자, 지지(地支)는 子丑寅卯辰巳午未申酉戌亥의 12글자입니다. 둘을 조합해 60갑자 주기를 이룹니다.',
  },
  {
    q: '오행은 무엇인가요?',
    a: '오행(五行)은 木(목)·火(화)·土(토)·金(금)·水(수)의 다섯 가지 기운으로, 천간과 지지 각각에 해당하는 오행이 정해져 있습니다. 사주에서 오행 구성의 균형 정도를 파악해 강약을 분석합니다.',
  },
  {
    q: '일주(일간)가 중요한 이유는 무엇인가요?',
    a: '일주는 태어난 날을 나타내며, 특히 일간(일주의 천간)은 본인 자신을 상징합니다. 명리학에서는 일간을 기준으로 다른 기둥과의 관계를 분석해 성격, 직업, 대인관계 등을 풀이합니다.',
  },
  {
    q: '태어난 시간이 없으면 어떻게 하나요?',
    a: '시간을 모르면 시주를 제외한 연·월·일주 3기둥 6글자로 분석합니다. 시주가 없어도 기본적인 사주 풀이가 가능하지만, 더 정확한 분석을 위해서는 시주가 포함되는 것이 좋습니다.',
  },
  {
    q: '음력으로 태어난 경우 어떻게 입력하나요?',
    a: '상단의 "음력" 버튼을 선택한 뒤 음력 생년월일을 입력하면 자동으로 양력으로 변환하여 사주를 계산합니다. 윤달 태생은 양력 변환 결과를 꼭 확인하세요.',
  },
]

export default function SajuPage() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div style={{ marginBottom: '1rem' }}>
          <Link href="/" style={{ fontSize: '13px', color: 'var(--text-hint)' }}>← 계산기 목록</Link>
        </div>

        <header className={styles.header}>
          <h1 className={styles.h1}>사주 계산기</h1>
          <p className={styles.desc}>생년월일로 사주팔자 8글자와 오행 비율을 무료로 계산합니다.</p>
        </header>

        <section className={styles.calcBox}>
          <SajuCalculator />
        </section>

        {/* AdBanner 자리 */}
        {/* <AdBanner slot="XXXXXXXXXX" /> */}

        {/* 사주 풀이 링크 배너 */}
        <section style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '12px',
          padding: '18px 20px',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
        }}>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            더 자세한 사주 풀이가 궁금하다면?
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
            사주 풀이 자세히 보기 →
          </a>
        </section>

        <section className={styles.content}>
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
          <p>본 계산 결과는 절기 기준 자동 계산이며, 전문 명리학 상담을 대체하지 않습니다.</p>
        </footer>
      </div>
    </main>
  )
}
