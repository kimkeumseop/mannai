import styles from '../page.module.css'
import Link from 'next/link'

export const metadata = {
  title: '이용약관 - 계산기 모음',
  description: '계산기 모음 사이트의 이용약관입니다. 서비스 이용 조건, 면책조항, 저작권 등을 확인하세요.',
  alternates: { canonical: '/terms' },
}

export default function TermsPage() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div style={{ marginBottom: '1rem' }}>
          <Link href="/" style={{ fontSize: '13px', color: 'var(--text-hint)' }}>← 홈으로</Link>
        </div>

        <header className={styles.header}>
          <h1 className={styles.h1}>이용약관</h1>
          <p className={styles.desc}>시행일: 2024년 1월 1일</p>
        </header>

        <section className={styles.content}>

          <h2 className={styles.h2}>제1조 (목적)</h2>
          <p>
            본 약관은 계산기 모음(이하 "사이트")이 제공하는 온라인 계산기 서비스(이하 "서비스")의
            이용 조건 및 절차, 이용자와 사이트 간의 권리·의무 및 책임 사항을 규정함을 목적으로 합니다.
          </p>

          <h2 className={styles.h2}>제2조 (서비스 소개)</h2>
          <p>
            본 사이트는 이용자가 일상에서 필요로 하는 다양한 계산을 편리하게 수행할 수 있도록
            아래와 같은 무료 계산기 서비스를 제공합니다:
          </p>
          <ul style={{ paddingLeft: '20px', fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.9', marginTop: '8px' }}>
            <li>만 나이 계산기 (만 나이, 세는나이, 연 나이)</li>
            <li>급여 실수령액 계산기 (4대보험·소득세 공제 계산)</li>
            <li>전월세 계산기 (전세↔월세 변환, 대출이자 계산)</li>
            <li>사주 계산기 (사주팔자 8글자, 오행 비율)</li>
          </ul>
          <p style={{ marginTop: '10px' }}>
            서비스는 별도의 회원가입 없이 무료로 이용할 수 있으며, 향후 새로운 계산기가 추가될 수 있습니다.
          </p>

          <h2 className={styles.h2}>제3조 (계산 결과의 성격)</h2>
          <p>
            본 사이트가 제공하는 모든 계산 결과는 일반적인 참고 목적으로만 제공됩니다.
            계산 결과는 법률, 세무, 금융, 의료, 명리학 등 전문적 판단을 대체하지 않습니다.
          </p>
          <p style={{ marginTop: '10px' }}>
            특히 아래 사항에 유의하시기 바랍니다:
          </p>
          <ul style={{ paddingLeft: '20px', fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.9', marginTop: '8px' }}>
            <li>급여 실수령액 계산 결과는 실제 원천징수액과 다를 수 있습니다.</li>
            <li>전월세 계산 결과는 실제 계약 조건에 따라 달라질 수 있습니다.</li>
            <li>사주 계산은 전통 명리학의 참고용 정보이며, 운명을 확정하지 않습니다.</li>
            <li>나이 계산 결과는 법적 효력이 없으며, 공식 기준은 관련 기관에서 확인하세요.</li>
          </ul>

          <h2 className={styles.h2}>제4조 (면책조항)</h2>
          <p>
            사이트는 계산 결과의 정확성·완전성을 보증하지 않으며, 이용자가 계산 결과를 근거로
            내린 결정에 대한 법적 책임을 지지 않습니다. 이용자는 중요한 결정을 내리기 전
            반드시 관련 전문가(세무사, 법무사, 공인중개사 등)의 자문을 받으시기 바랍니다.
          </p>
          <p style={{ marginTop: '10px' }}>
            사이트는 서버 장애, 시스템 점검 등 불가피한 사유로 서비스가 일시 중단될 수 있으며,
            이로 인해 발생하는 손해에 대해 책임을 지지 않습니다.
          </p>

          <h2 className={styles.h2}>제5조 (저작권)</h2>
          <p>
            본 사이트의 콘텐츠(텍스트, 이미지, 디자인, 코드 등)에 대한 저작권은 사이트에 귀속됩니다.
            이용자는 개인적, 비상업적 목적으로 콘텐츠를 이용할 수 있으나, 사이트의 사전 서면 동의 없이
            복제, 배포, 상업적 이용을 금지합니다.
          </p>

          <h2 className={styles.h2}>제6조 (광고)</h2>
          <p>
            본 사이트는 Google AdSense 등 제3자 광고 서비스를 통해 광고를 게재할 수 있습니다.
            광고 콘텐츠는 사이트의 의견을 대표하지 않으며, 광고주와의 거래로 인한 피해에 대해
            사이트는 책임을 지지 않습니다.
          </p>

          <h2 className={styles.h2}>제7조 (약관 변경)</h2>
          <p>
            사이트는 필요한 경우 본 약관을 변경할 수 있으며, 변경된 약관은 사이트 내 공지를 통해
            안내합니다. 변경 후에도 서비스를 계속 이용하는 경우 변경된 약관에 동의한 것으로 간주합니다.
          </p>

          <h2 className={styles.h2}>제8조 (문의)</h2>
          <p>
            이용약관에 대한 문의는 아래 이메일로 연락해 주세요.
            <br />
            이메일: <span style={{ color: 'var(--text)' }}>example@email.com</span>
          </p>

        </section>

        <footer className={styles.footer}>
          <p>본 약관은 2024년 1월 1일부터 시행됩니다.</p>
        </footer>
      </div>
    </main>
  )
}
