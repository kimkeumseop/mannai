import Link from 'next/link'

export default function Header() {
  return (
    <header style={{
      borderBottom: '1px solid var(--border)',
      background: 'var(--surface)',
    }}>
      <div style={{
        maxWidth: '560px',
        margin: '0 auto',
        padding: '0 1rem',
        height: '52px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <Link href="/" style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text)', letterSpacing: '-0.02em' }}>
          계산기 모음
        </Link>
        <nav>
          <Link href="/" style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            홈
          </Link>
        </nav>
      </div>
    </header>
  )
}
