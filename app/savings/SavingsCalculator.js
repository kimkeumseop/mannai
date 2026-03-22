'use client'

import { useState } from 'react'

const inputStyle = {
  width: '100%',
  padding: '10px 12px',
  border: '1px solid var(--border)',
  borderRadius: '10px',
  background: 'var(--surface)',
  color: 'var(--text)',
  fontSize: '15px',
  outline: 'none',
  fontFamily: 'inherit',
}
const labelStyle = {
  fontSize: '12px',
  color: 'var(--text-muted)',
  marginBottom: '5px',
  display: 'block',
  fontWeight: '500',
}

const fmt = (n) => Math.round(n).toLocaleString()

export default function SavingsCalculator() {
  const [monthly, setMonthly] = useState('')
  const [rate, setRate] = useState('')
  const [period, setPeriod] = useState('12')
  const [taxType, setTaxType] = useState('normal')
  const [showTable, setShowTable] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  function formatAmount(str) {
    const raw = str.replace(/[^0-9]/g, '')
    return raw ? parseInt(raw).toLocaleString() : ''
  }

  function calculate() {
    setError('')
    const m = parseInt(monthly.replace(/[^0-9]/g, '') || '0')
    const r = parseFloat(rate)
    const n = parseInt(period)

    if (!m || m < 1000) { setError('월 납입금액을 올바르게 입력해 주세요.'); return }
    if (!r || r <= 0 || r > 100) { setError('연 이자율을 올바르게 입력해 주세요.'); return }
    if (!n || n < 1 || n > 600) { setError('적금 기간을 올바르게 입력해 주세요.'); return }

    const monthlyRate = r / 100 / 12
    const totalPrincipal = m * n
    // 단리 적금 이자: 각 회차 납입금 × 이자율 × 잔여기간
    let preTaxInterest = 0
    const schedule = []
    let cumInterest = 0
    for (let i = 1; i <= n; i++) {
      const monthsLeft = n - i + 1
      const interest = m * monthlyRate * monthsLeft
      preTaxInterest += interest
      cumInterest += interest
      schedule.push({ month: i, principal: m, interest: Math.round(interest), cumPrincipal: m * i, cumInterest: Math.round(cumInterest) })
    }

    const taxRate = taxType === 'normal' ? 0.154 : 0
    const taxAmount = preTaxInterest * taxRate
    const afterTaxInterest = preTaxInterest - taxAmount
    const maturity = totalPrincipal + afterTaxInterest

    setResult({ totalPrincipal, preTaxInterest, taxAmount, afterTaxInterest, maturity, schedule })
    setShowTable(false)
  }

  return (
    <div>
      <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(8px) } to { opacity:1; transform:translateY(0) } }`}</style>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
        <div>
          <label style={labelStyle}>월 납입금액 (원)</label>
          <input
            type="text"
            inputMode="numeric"
            placeholder="300,000"
            value={monthly}
            onChange={e => setMonthly(formatAmount(e.target.value))}
            style={inputStyle}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <div>
            <label style={labelStyle}>연 이자율 (%)</label>
            <input
              type="number"
              inputMode="decimal"
              placeholder="3.5"
              value={rate}
              onChange={e => setRate(e.target.value)}
              style={inputStyle}
              step="0.1"
            />
          </div>
          <div>
            <label style={labelStyle}>적금 기간 (개월)</label>
            <select value={period} onChange={e => setPeriod(e.target.value)} style={inputStyle}>
              {[6,12,18,24,36,48,60].map(m => (
                <option key={m} value={m}>{m}개월</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label style={labelStyle}>이자 과세</label>
          <select value={taxType} onChange={e => setTaxType(e.target.value)} style={inputStyle}>
            <option value="normal">일반과세 (15.4%)</option>
            <option value="free">비과세</option>
          </select>
        </div>

        {error && (
          <p style={{ fontSize: '13px', color: '#d95c2e', padding: '8px 12px', background: 'rgba(217,92,46,0.08)', borderRadius: '6px' }}>
            {error}
          </p>
        )}

        <button
          onClick={calculate}
          style={{ width: '100%', padding: '13px', background: 'var(--accent)', color: 'var(--accent-text)', border: 'none', borderRadius: '10px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit' }}
        >
          만기 수령액 계산하기
        </button>
      </div>

      {result && (
        <div style={{ animation: 'fadeUp 0.3s ease' }}>
          {/* 만기 수령액 */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '10px', padding: '20px 22px', marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
            <div>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '4px' }}>만기 수령액 (세후)</p>
              <p style={{ fontSize: '12px', color: 'var(--text-hint)' }}>
                총 납입 {fmt(result.totalPrincipal)}원
              </p>
            </div>
            <p style={{ fontSize: '30px', fontWeight: '700', letterSpacing: '-0.03em', flexShrink: 0 }}>
              {fmt(result.maturity)}<span style={{ fontSize: '14px', fontWeight: '400', color: 'var(--text-muted)', marginLeft: '4px' }}>원</span>
            </p>
          </div>

          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '10px', overflow: 'hidden', marginBottom: '10px' }}>
            {[
              { label: '총 납입금액', value: `${fmt(result.totalPrincipal)}원` },
              { label: '세전 이자', value: `${fmt(result.preTaxInterest)}원` },
              { label: '이자 세금 (15.4%)', value: `- ${fmt(result.taxAmount)}원` },
              { label: '세후 이자', value: `${fmt(result.afterTaxInterest)}원`, highlight: true },
            ].map((item, i, arr) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '11px 16px', borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : 'none', fontSize: '14px', background: item.highlight ? 'var(--bg)' : 'transparent' }}>
                <span style={{ color: 'var(--text-muted)' }}>{item.label}</span>
                <span style={{ fontWeight: item.highlight ? '600' : '500', flexShrink: 0, marginLeft: '8px' }}>{item.value}</span>
              </div>
            ))}
          </div>

          {/* 월별 이자 표 토글 */}
          <button
            onClick={() => setShowTable(v => !v)}
            style={{ width: '100%', padding: '10px', background: 'var(--bg)', color: 'var(--text-muted)', border: '1px solid var(--border)', borderRadius: '10px', fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit', marginBottom: '10px' }}
          >
            {showTable ? '월별 이자 표 닫기 ▲' : '월별 이자 표 보기 ▼'}
          </button>

          {showTable && (
            <div style={{ border: '1px solid var(--border)', borderRadius: '10px', overflow: 'hidden', fontSize: '12px', marginBottom: '10px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', padding: '8px 12px', background: 'var(--bg)', borderBottom: '1px solid var(--border)', fontWeight: '600', color: 'var(--text)' }}>
                <span>회차</span><span style={{ textAlign: 'right' }}>납입금</span><span style={{ textAlign: 'right' }}>이자</span><span style={{ textAlign: 'right' }}>누계원금</span>
              </div>
              <div style={{ maxHeight: '240px', overflowY: 'auto' }}>
                {result.schedule.map(row => (
                  <div key={row.month} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', padding: '7px 12px', borderBottom: '1px solid var(--border)', color: 'var(--text-muted)' }}>
                    <span>{row.month}개월</span>
                    <span style={{ textAlign: 'right' }}>{fmt(row.principal)}</span>
                    <span style={{ textAlign: 'right' }}>{fmt(row.interest)}</span>
                    <span style={{ textAlign: 'right' }}>{fmt(row.cumPrincipal)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ fontSize: '12px', color: 'var(--text-hint)', lineHeight: '1.7', padding: '12px 14px', borderLeft: '2px solid var(--border)', borderRadius: '0 6px 6px 0' }}>
            단리 방식 기준 추정값입니다. 실제 이자는 은행별 금리 적용 방식과 이자 지급일에 따라 다를 수 있습니다.
          </div>
        </div>
      )}
    </div>
  )
}
