import styles from '../page.module.css'
import Link from 'next/link'

export const metadata = {
  title: '개인정보처리방침 - 계산기 모음',
  description: '계산기 모음 사이트의 개인정보처리방침입니다. 수집 정보, 이용 목적, 쿠키 사용 안내를 확인하세요.',
  alternates: { canonical: '/privacy' },
}

export default function PrivacyPage() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div style={{ marginBottom: '1rem' }}>
          <Link href="/" style={{ fontSize: '13px', color: 'var(--text-hint)' }}>← 홈으로</Link>
        </div>

        <header className={styles.header}>
          <h1 className={styles.h1}>개인정보처리방침</h1>
          <p className={styles.desc}>시행일: 2024년 1월 1일</p>
        </header>

        <section className={styles.content}>

          <h2 className={styles.h2}>1. 개요</h2>
          <p>
            계산기 모음(이하 "사이트")은 이용자의 개인정보를 소중히 여기며, 관련 법령을 준수합니다.
            본 방침은 사이트가 수집하는 정보의 종류, 이용 목적, 제3자 제공 여부 등을 설명합니다.
          </p>

          <h2 className={styles.h2}>2. 수집하는 정보</h2>
          <p>
            본 사이트는 별도의 회원가입 없이 계산기를 무료로 제공합니다. 이용자가 직접 입력하는 생년월일,
            급여 등의 계산 데이터는 서버에 전송되거나 저장되지 않으며, 브라우저 내에서만 처리됩니다.
          </p>
          <p style={{ marginTop: '10px' }}>
            다만 아래 항목은 서비스 제공 및 광고 목적으로 자동 수집될 수 있습니다:
          </p>
          <ul style={{ paddingLeft: '20px', fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.9', marginTop: '8px' }}>
            <li>접속 IP 주소, 브라우저 종류, 운영체제</li>
            <li>방문 일시, 방문 페이지, 체류 시간</li>
            <li>Google Analytics가 수집하는 익명화된 사용 통계</li>
            <li>Google AdSense 광고 쿠키 및 관련 식별자</li>
          </ul>

          <h2 className={styles.h2}>3. 정보 이용 목적</h2>
          <p>수집된 정보는 다음 목적으로만 이용됩니다:</p>
          <ul style={{ paddingLeft: '20px', fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.9', marginTop: '8px' }}>
            <li>서비스 이용 현황 분석 및 품질 개선</li>
            <li>맞춤형 광고 제공 (Google AdSense)</li>
            <li>서비스 오류 탐지 및 보안 강화</li>
          </ul>

          <h2 className={styles.h2}>4. 제3자 제공</h2>
          <p>
            본 사이트는 Google LLC에 광고 서비스(Google AdSense)를 위탁합니다. Google은 쿠키를
            사용하여 이용자의 관심사 기반 광고를 제공할 수 있습니다. Google의 개인정보처리방침은
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer"
              style={{ color: 'var(--text)', textDecoration: 'underline', marginLeft: '4px' }}>
              policies.google.com/privacy
            </a>에서 확인할 수 있습니다.
          </p>

          <h2 className={styles.h2}>5. 쿠키(Cookie) 사용 안내</h2>
          <p>
            쿠키는 웹사이트가 브라우저에 저장하는 소량의 데이터 파일입니다. 본 사이트는 광고 효율 측정 및
            방문자 분석을 위해 쿠키를 사용합니다. 브라우저 설정에서 쿠키 수신을 거부할 수 있으나,
            일부 기능이 제한될 수 있습니다.
          </p>
          <p style={{ marginTop: '10px' }}>
            Google AdSense 광고 쿠키 비활성화:
            <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer"
              style={{ color: 'var(--text)', textDecoration: 'underline', marginLeft: '4px' }}>
              google.com/settings/ads
            </a>
          </p>

          <h2 className={styles.h2}>6. 보유 및 이용 기간</h2>
          <p>
            자동 수집 정보(로그, 쿠키 등)는 수집 목적이 달성되거나 이용자가 삭제를 요청할 때까지
            보유됩니다. Google Analytics의 데이터 보유 기간은 Google 정책을 따릅니다.
          </p>

          <h2 className={styles.h2}>7. 이용자 권리</h2>
          <p>
            이용자는 언제든지 쿠키 삭제(브라우저 설정), 광고 개인화 거부(Google 광고 설정) 등을 통해
            개인정보 처리에 대한 동의를 철회할 수 있습니다.
          </p>

          <h2 className={styles.h2}>8. 문의</h2>
          <p>
            개인정보 관련 문의 사항은 아래 이메일로 연락해 주세요.
            <br />
            이메일: <span style={{ color: 'var(--text)' }}>example@email.com</span>
          </p>

          <h2 className={styles.h2}>9. 방침 변경</h2>
          <p>
            본 방침이 변경될 경우 사이트 내 공지를 통해 안내합니다.
            변경 전 7일 이상 고지하는 것을 원칙으로 합니다.
          </p>
        </section>

        <footer className={styles.footer}>
          <p>본 방침은 2024년 1월 1일부터 시행됩니다.</p>
        </footer>
      </div>
    </main>
  )
}
