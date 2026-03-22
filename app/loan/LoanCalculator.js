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

function calcEqual(principal, monthlyRate, n) {
  // 원리금균등상환
  if (monthlyRate === 0) {
    const monthly = principal / n
    return Array.from({ length: n }, (_, i) => ({
      month: i + 1,
      payment: Math.round(monthly),
      principal: Math.round(monthly),
      interest: 0,
      balance: Math.round(principal - monthly * (i + 1)),
    }))
  }
  const r = monthlyRate
  const monthly = principal * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1)
  let balance = principal
  return Array.from({ length: n }, (_, i) => {
    const interest = balance * r
    const princ = monthly - interest
    balance -= princ
    return {
      month: i + 1,
      payment: Math.round(monthly),
      principal: Math.round(princ),
      interest: Math.round(interest),
      balance: Math.max(0, Math.round(balance)),
    }
  })
}

function calcEqualPrincipal(principal, monthlyRate, n) {
  // 원금균등상환
  const monthlyPrincipal = principal / n
  let balance = principal
  return Array.from({ length: n }, (_, i) => {
    const interest = balance * monthlyRate
    const payment = monthlyPrincipal + interest
    balance -= monthlyPrincipal
    return {
      month: i + 1,
      payment: Math.round(payment),
      principal: Math.round(monthlyPrincipal),
      interest: Math.round(interest),
      balance: Math.max(0, Math.round(balance)),
    }
  })
}

function calcBullet(principal, monthlyRate, n) {
  // 만기일시상환
  const monthlyInterest = principal * monthlyRate
  return Array.from({ length: n }, (_, i) => ({
    month: i + 1,
    payment: i < n - 1 ? Math.round(monthlyInterest) : Math.round(principal + monthlyInterest),
    principal: i < n - 1 ? 0 : Math.round(principal),
    interest: Math.round(monthlyInterest),
    balance: i < n - 1 ? Math.round(principal) : 0,
  }))
}

export default function LoanCalculator() {
  const [amount, setAmount] = useState('')
  const [rate, setRate] = useState('')
  const [period, setPeriod] = useState('12')
  const [method, setMethod] = useState('equal')
  const [showTable, setShowTable] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  function formatAmount(str) {
    const raw = str.replace(/[^0-9]/g, '')
    return raw ? parseInt(raw).toLocaleString() : ''
  }

  function calculate() {
    setError('')
    const p = parseInt(amount.replace(/[^0-9]/g, '') || '0')
    const r = parseFloat(rate)
    const n = parseInt(period)

    if (!p || p < 10000) { setError('대출금액을 올바르게 입력해 주세요.'); return }
    if (!r || r <= 0 || r > 100) { setError('연 이자율을 올바르게 입력해 주세요.'); return }
    if (!n || n < 1 || n > 600) { setError('대출 기간을 올바르게 입력해 주세요.'); return }

    const monthlyRate = r / 100 / 12
    let schedule
    if (method === 'equal') schedule = calcEqual(p, monthlyRate, n)
    else if (method === 'equalPrincipal') schedule = calcEqualPrincipal(p, monthlyRate, n)
    else schedule = calcBullet(p, monthlyRate, n)

    const totalPayment = schedule.reduce((s, row) => s + row.payment, 0)
    const totalInterest = totalPayment - p
    const firstMonthly = schedule[0].payment
    const lastMonthly = schedule[n - 1].payment

    setResult({ firstMonthly, lastMonthly, totalPayment, totalInterest, principal: p, schedule, method })
    setShowTable(false)
  }

  const methodLabels = { equal: '원리금균등', equalPrincipal: '원금균등', bullet: '만기일시' }

  return (
    <div>
      <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(8px) } to { opacity:1; transform:translateY(0) } }`}</style>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
        <div>
          <label style={labelStyle}>대출금액 (원)</label>
          <input
            type="text"
            inputMode="numeric"
            placeholder="100,000,000"
            value={amount}
            onChange={e => setAmount(formatAmount(e.target.value))}
            style={inputStyle}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <div>
            <label style={labelStyle}>연 이자율 (%)</label>
            <input
              type="number"
              inputMode="decimal"
              placeholder="4.5"
              value={rate}
              onChange={e => setRate(e.target.value)}
              style={inputStyle}
              step="0.1"
            />
          </div>
          <div>
            <label style={labelStyle}>대출 기간</label>
            <select value={period} onChange={e => setPeriod(e.target.value)} style={inputStyle}>
              {[6,12,24,36,48,60,120,180,240,300,360].map(m => (
                <option key={m} value={m}>{m >= 12 ? `${m/12}년` : `${m}개월`}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label style={labelStyle}>상환 방식</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
            {[
              { value: 'equal', label: '원리금균등' },
              { value: 'equalPrincipal', label: '원금균등' },
              { value: 'bullet', label: '만기일시' },
            ].map(opt => (
              <button
                key={opt.value}
                onClick={() => setMethod(opt.value)}
                style={{
                  padding: '10px 8px',
                  fontSize: '13px',
                  borderRadius: '10px',
                  border: `1px solid ${method === opt.value ? 'var(--accent)' : 'var(--border)'}`,
                  background: method === opt.value ? 'var(--accent)' : 'var(--surface)',
                  color: method === opt.value ? 'var(--accent-text)' : 'var(--text-muted)',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  fontWeight: method === opt.value ? '600' : '400',
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
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
          이자 계산하기
        </button>
      </div>

      {result && (
        <div style={{ animation: 'fadeUp 0.3s ease' }}>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '10px', padding: '20px 22px', marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
            <div>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                {result.method === 'bullet' ? '매월 이자' : result.method === 'equal' ? '월 납입금 (균등)' : '첫 달 납입금'}
              </p>
              <p style={{ fontSize: '12px', color: 'var(--text-hint)' }}>{methodLabels[result.method]} 상환</p>
            </div>
            <p style={{ fontSize: '30px', fontWeight: '700', letterSpacing: '-0.03em', flexShrink: 0 }}>
              {fmt(result.firstMonthly)}<span style={{ fontSize: '14px', fontWeight: '400', color: 'var(--text-muted)', marginLeft: '4px' }}>원</span>
            </p>
          </div>

          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '10px', overflow: 'hidden', marginBottom: '10px' }}>
            {[
              { label: '대출 원금', value: `${fmt(result.principal)}원` },
              { label: '총 이자금액', value: `${fmt(result.totalInterest)}원`, highlight: true },
              { label: '총 상환금액', value: `${fmt(result.totalPayment)}원` },
            ].map((item, i, arr) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '11px 16px', borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : 'none', fontSize: '14px', background: item.highlight ? 'var(--bg)' : 'transparent' }}>
                <span style={{ color: 'var(--text-muted)' }}>{item.label}</span>
                <span style={{ fontWeight: item.highlight ? '700' : '500', flexShrink: 0, marginLeft: '8px', color: item.highlight ? 'var(--text)' : undefined }}>{item.value}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => setShowTable(v => !v)}
            style={{ width: '100%', padding: '10px', background: 'var(--bg)', color: 'var(--text-muted)', border: '1px solid var(--border)', borderRadius: '10px', fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit', marginBottom: '10px' }}
          >
            {showTable ? '상환 스케줄 닫기 ▲' : '상환 스케줄 보기 ▼'}
          </button>

          {showTable && (
            <div style={{ border: '1px solid var(--border)', borderRadius: '10px', overflow: 'hidden', fontSize: '12px', marginBottom: '10px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr 1.2fr 1.2fr', padding: '8px 12px', background: 'var(--bg)', borderBottom: '1px solid var(--border)', fontWeight: '600', color: 'var(--text)' }}>
                <span>회차</span>
                <span style={{ textAlign: 'right' }}>납입금</span>
                <span style={{ textAlign: 'right' }}>이자</span>
                <span style={{ textAlign: 'right' }}>잔여원금</span>
              </div>
              <div style={{ maxHeight: '280px', overflowY: 'auto' }}>
                {result.schedule.map(row => (
                  <div key={row.month} style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr 1.2fr 1.2fr', padding: '7px 12px', borderBottom: '1px solid var(--border)', color: 'var(--text-muted)' }}>
                    <span>{row.month}회</span>
                    <span style={{ textAlign: 'right' }}>{fmt(row.payment)}</span>
                    <span style={{ textAlign: 'right' }}>{fmt(row.interest)}</span>
                    <span style={{ textAlign: 'right' }}>{fmt(row.balance)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ fontSize: '12px', color: 'var(--text-hint)', lineHeight: '1.7', padding: '12px 14px', borderLeft: '2px solid var(--border)', borderRadius: '0 6px 6px 0' }}>
            이자 계산 결과는 추정값입니다. 실제 납입금은 금융기관별 상환 방식, 중도상환, 금리 변동에 따라 다를 수 있습니다.
          </div>
        </div>
      )}
    </div>
  )
}
