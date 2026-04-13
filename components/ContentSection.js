export default function ContentSection({ sections }) {
  return (
    <div style={{ maxWidth: 680, margin: '0 auto', padding: '0 16px 48px', fontFamily: 'sans-serif' }}>
      {sections.map((sec, i) => (
        <section key={i} style={{ marginTop: 40 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#111', marginBottom: 12, paddingBottom: 8, borderBottom: '2px solid #f0f0f0' }}>
            {sec.title}
          </h2>
          {sec.type === 'text' && (
            <p style={{ fontSize: 15, color: '#444', lineHeight: 1.85, margin: 0 }}>{sec.content}</p>
          )}
          {sec.type === 'list' && (
            <ul style={{ paddingLeft: 20, margin: 0 }}>
              {sec.items.map((item, j) => (
                <li key={j} style={{ fontSize: 15, color: '#444', lineHeight: 1.85, marginBottom: 6 }}>
                  <strong style={{ color: '#111' }}>{item.term}</strong> — {item.desc}
                </li>
              ))}
            </ul>
          )}
          {sec.type === 'faq' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {sec.items.map((item, j) => (
                <div key={j} style={{ background: '#f8f8f8', borderRadius: 10, padding: '14px 16px' }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#111', marginBottom: 6 }}>Q. {item.q}</div>
                  <div style={{ fontSize: 14, color: '#555', lineHeight: 1.75 }}>A. {item.a}</div>
                </div>
              ))}
            </div>
          )}
          {sec.type === 'steps' && (
            <ol style={{ paddingLeft: 20, margin: 0 }}>
              {sec.items.map((item, j) => (
                <li key={j} style={{ fontSize: 15, color: '#444', lineHeight: 1.85, marginBottom: 8 }}>{item}</li>
              ))}
            </ol>
          )}
        </section>
      ))}
    </div>
  );
}
