import styles from '../page.module.css'
import Link from 'next/link'

export const metadata = {
  title: '사이트 소개 - 계산기 모음',
  description: '계산기 모음은 만나이, 급여, 전월세, 사주 등 일상에서 자주 쓰는 계산기를 무료로 제공하는 사이트입니다.',
  alternates: { canonical: '/about' },
}

const CALC_LIST = [
  {
    title: '만 나이 계산기',
    href: '/mannai',
    desc: '생년월일을 입력하면 만 나이, 세는나이, 연 나이를 즉시 계산합니다. 다음 생일 D-day, 살아온 날수, 태어난 요일, 띠까지 한 번에 확인할 수 있습니다. 2023년 만 나이 통일법 이후 공식 기준이 된 만 나이를 쉽게 파악하세요.',
  },
  {
    title: '급여 실수령액 계산기',
    href: '/salary',
    desc: '2026년 기준 국민연금(4.75%), 건강보험(3.595%), 장기요양보험, 고용보험(0.9%)과 근로소득세·지방소득세를 모두 반영한 실수령액을 계산합니다. 부양가족 수와 자녀 수에 따른 세액공제도 적용됩니다.',
  },
  {
    title: '전월세 계산기',
    href: '/jeonwolse',
    desc: '전세를 월세로, 월세를 전세로 변환하는 계산기와 전세대출 이자 계산기를 한 곳에서 제공합니다. 전월세 전환율을 직접 입력해 다양한 시나리오를 비교할 수 있습니다.',
  },
  {
    title: '사주 계산기',
    href: '/saju',
    desc: '생년월일과 태어난 시간을 입력하면 년주·월주·일주·시주의 사주팔자 8글자를 계산합니다. 천간·지지 한자와 한글을 함께 표시하고, 오행(목·화·토·금·수) 비율을 시각화하며, 일간 기반 성격 설명도 제공합니다. 음력 생년월일도 지원합니다.',
  },
]

export default function AboutPage() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div style={{ marginBottom: '1rem' }}>
          <Link href="/" style={{ fontSize: '13px', color: 'var(--text-hint)' }}>← 홈으로</Link>
        </div>

        <header className={styles.header}>
          <h1 className={styles.h1}>사이트 소개</h1>
          <p className={styles.desc}>계산기 모음은 일상에서 자주 쓰는 계산기를 무료로 제공합니다.</p>
        </header>

        <section className={styles.content}>
          <h2 className={styles.h2}>어떤 사이트인가요?</h2>
          <p>
            계산기 모음은 복잡한 공식 없이 숫자만 입력하면 바로 결과를 확인할 수 있는
            무료 계산기 모음 사이트입니다. 나이 계산, 급여 공제 계산, 부동산 전월세 계산,
            사주팔자까지 실생활에서 자주 필요한 계산기를 한 곳에서 제공합니다.
          </p>
          <p style={{ marginTop: '10px' }}>
            모든 계산은 브라우저 내에서 처리되며, 입력한 데이터는 외부 서버로 전송되지 않습니다.
            회원가입이나 앱 설치 없이 누구나 바로 사용할 수 있습니다.
          </p>

          <h2 className={styles.h2}>제공 계산기</h2>
          <div className={styles.faqList}>
            {CALC_LIST.map((item) => (
              <div key={item.href} className={styles.faqItem}>
                <p className={styles.faqQ}>
                  <Link href={item.href} style={{ color: 'var(--text)', textDecoration: 'underline' }}>
                    {item.title}
                  </Link>
                </p>
                <p className={styles.faqA}>{item.desc}</p>
              </div>
            ))}
          </div>

          <h2 className={styles.h2}>앞으로의 계획</h2>
          <p>
            현재 제공 중인 4가지 계산기 외에도 이용자가 자주 필요로 하는 계산기를 지속적으로 추가할 예정입니다.
            추가를 원하는 계산기나 기능 개선 의견이 있다면 아래 이메일로 알려주세요.
          </p>
          <ul style={{ paddingLeft: '20px', fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.9', marginTop: '8px' }}>
            <li>대출 원리금 상환 계산기 (원금균등, 원리금균등)</li>
            <li>BMI / 표준 체중 계산기</li>
            <li>D-day 계산기</li>
            <li>로또 번호 생성기</li>
          </ul>

          <h2 className={styles.h2}>문의</h2>
          <p>
            서비스 이용 중 불편한 점이나 오류를 발견하신 경우 아래 이메일로 연락 주시면 빠르게 반영하겠습니다.
            <br />
            이메일: <span style={{ color: 'var(--text)' }}>example@email.com</span>
          </p>
        </section>

        <footer className={styles.footer}>
          <p>계산기 모음 — 무료 계산기를 빠르고 간편하게.</p>
        </footer>
      </div>
    </main>
  )
}
