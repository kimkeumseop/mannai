import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      background: 'var(--surface)',
      marginTop: 'auto',
    }}>
      <div style={{
        maxWidth: '560px',
        margin: '0 auto',
        padding: '1.25rem 1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        alignItems: 'center',
      }}>
        <nav style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/privacy" style={{ fontSize: '12px', color: 'var(--text-hint)' }}>개인정보처리방침</Link>
          <Link href="/terms" style={{ fontSize: '12px', color: 'var(--text-hint)' }}>이용약관</Link>
          <Link href="/about" style={{ fontSize: '12px', color: 'var(--text-hint)' }}>사이트 소개</Link>
        </nav>
        <p style={{ fontSize: '11px', color: 'var(--text-hint)' }}>
          © {new Date().getFullYear()} 계산기 모음. 계산 결과는 참고용입니다.
        </p>
      </div>
    </footer>
  )
}
