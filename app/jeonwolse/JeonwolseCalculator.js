'use client'

import { useState } from 'react'

const fmt = (n) => Math.round(n).toLocaleString()

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
const fieldStyle = { display: 'flex', flexDirection: 'column', gap: '5px' }
const resultBox = {
  background: 'var(--surface)',
  border: '1px solid var(--border)',
  borderRadius: '10px',
  padding: '18px 20px',
  marginBottom: '10px',
}
const resultRow = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '9px 0',
  borderBottom: '1px solid var(--border)',
  fontSize: '14px',
}

function NumInput({ label, value, onChange, placeholder, unit = '원' }) {
  return (
    <div style={fieldStyle}>
      <label style={labelStyle}>{label}</label>
      <div style={{ position: 'relative' }}>
        <input
          type="text"
          inputMode="numeric"
          placeholder={placeholder}
          value={value}
          onChange={e => {
            const raw = e.target.value.replace(/[^0-9]/g, '')
            onChange(raw ? parseInt(raw).toLocaleString() : '')
          }}
          style={{ ...inputStyle, paddingRight: unit ? '36px' : inputStyle.paddingRight }}
        />
        {unit && (
          <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '13px', color: 'var(--text-hint)', pointerEvents: 'none' }}>
            {unit}
          </span>
        )}
      </div>
    </div>
  )
}

function RateInput({ label, value, onChange, placeholder = '4.0' }) {
  return (
    <div style={fieldStyle}>
      <label style={labelStyle}>{label}</label>
      <div style={{ position: 'relative' }}>
        <input
          type="number"
          step="0.1"
          min="0"
          max="30"
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          style={{ ...inputStyle, paddingRight: '28px' }}
        />
        <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '13px', color: 'var(--text-hint)', pointerEvents: 'none' }}>%</span>
      </div>
    </div>
  )
}

const TABS = ['전세→월세', '월세→전세', '대출이자']

// Tab 1: 전세 → 월세
function JeonToWol() {
  const [jeon, setJeon] = useState('')
  const [deposit, setDeposit] = useState('')
  const [rate, setRate] = useState('4.0')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  function calculate() {
    setError('')
    const jeonAmt = parseInt(jeon.replace(/[^0-9]/g, '') || '0')
    const depositAmt = parseInt(deposit.replace(/[^0-9]/g, '') || '0')
    const rateVal = parseFloat(rate || '0')
    if (!jeonAmt) { setError('전세금을 입력해 주세요.'); return }
    if (depositAmt >= jeonAmt) { setError('보증금은 전세금보다 작아야 합니다.'); return }
    if (!rateVal || rateVal <= 0) { setError('전월세 전환율을 입력해 주세요.'); return }
    const diff = jeonAmt - depositAmt
    const monthly = Math.round(diff * rateVal / 100 / 12)
    setResult({ deposit: depositAmt, monthly, diff })
  }

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
        <NumInput label="전세금" value={jeon} onChange={setJeon} placeholder="200,000,000" />
        <NumInput label="보증금 (월세 보증금으로 전환)" value={deposit} onChange={setDeposit} placeholder="30,000,000" />
        <RateInput label="전월세 전환율 (%)" value={rate} onChange={setRate} placeholder="4.0" />
        {error && <p style={{ fontSize: '13px', color: '#d95c2e', padding: '8px 12px', background: 'rgba(217,92,46,0.08)', borderRadius: '6px' }}>{error}</p>}
        <button onClick={calculate} style={{ width: '100%', padding: '13px', background: 'var(--accent)', color: 'var(--accent-text)', border: 'none', borderRadius: '10px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit' }}>
          변환 계산하기
        </button>
      </div>
      {result && (
        <div style={resultBox}>
          <div style={{ ...resultRow }}>
            <span style={{ color: 'var(--text-muted)' }}>보증금</span>
            <span style={{ fontWeight: '600' }}>{fmt(result.deposit)}원</span>
          </div>
          <div style={{ ...resultRow, borderBottom: 'none' }}>
            <span style={{ color: 'var(--text-muted)' }}>월세</span>
            <span style={{ fontSize: '24px', fontWeight: '700', letterSpacing: '-0.02em' }}>{fmt(result.monthly)}<span style={{ fontSize: '14px', fontWeight: '400', marginLeft: '4px', color: 'var(--text-muted)' }}>원/월</span></span>
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-hint)', marginTop: '10px', paddingTop: '10px', borderTop: '1px solid var(--border)' }}>
            전환 기준금액 {fmt(result.diff)}원 × {rate}% ÷ 12
          </div>
        </div>
      )}
    </div>
  )
}

// Tab 2: 월세 → 전세
function WolToJeon() {
  const [deposit, setDeposit] = useState('')
  const [monthly, setMonthly] = useState('')
  const [rate, setRate] = useState('4.0')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  function calculate() {
    setError('')
    const depositAmt = parseInt(deposit.replace(/[^0-9]/g, '') || '0')
    const monthlyAmt = parseInt(monthly.replace(/[^0-9]/g, '') || '0')
    const rateVal = parseFloat(rate || '0')
    if (!monthlyAmt) { setError('월세를 입력해 주세요.'); return }
    if (!rateVal || rateVal <= 0) { setError('전월세 전환율을 입력해 주세요.'); return }
    const converted = Math.round(monthlyAmt * 12 / rateVal * 100)
    const jeon = depositAmt + converted
    setResult({ deposit: depositAmt, converted, jeon })
  }

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
        <NumInput label="현재 보증금" value={deposit} onChange={setDeposit} placeholder="30,000,000" />
        <NumInput label="월세" value={monthly} onChange={setMonthly} placeholder="700,000" />
        <RateInput label="전월세 전환율 (%)" value={rate} onChange={setRate} placeholder="4.0" />
        {error && <p style={{ fontSize: '13px', color: '#d95c2e', padding: '8px 12px', background: 'rgba(217,92,46,0.08)', borderRadius: '6px' }}>{error}</p>}
        <button onClick={calculate} style={{ width: '100%', padding: '13px', background: 'var(--accent)', color: 'var(--accent-text)', border: 'none', borderRadius: '10px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit' }}>
          전세 환산하기
        </button>
      </div>
      {result && (
        <div style={resultBox}>
          <div style={{ ...resultRow }}>
            <span style={{ color: 'var(--text-muted)' }}>월세 환산금액</span>
            <span style={{ fontWeight: '600' }}>{fmt(result.converted)}원</span>
          </div>
          <div style={{ ...resultRow, borderBottom: 'none' }}>
            <span style={{ color: 'var(--text-muted)' }}>전세 환산가</span>
            <span style={{ fontSize: '24px', fontWeight: '700', letterSpacing: '-0.02em' }}>{fmt(result.jeon)}<span style={{ fontSize: '14px', fontWeight: '400', marginLeft: '4px', color: 'var(--text-muted)' }}>원</span></span>
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-hint)', marginTop: '10px', paddingTop: '10px', borderTop: '1px solid var(--border)' }}>
            (보증금 {fmt(result.deposit)} + 월세환산 {fmt(result.converted)})원
          </div>
        </div>
      )}
    </div>
  )
}

// Tab 3: 전세대출 이자
function LoanInterest() {
  const [jeon, setJeon] = useState('')
  const [ratio, setRatio] = useState('80')
  const [rate, setRate] = useState('3.5')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  function calculate() {
    setError('')
    const jeonAmt = parseInt(jeon.replace(/[^0-9]/g, '') || '0')
    const ratioVal = parseFloat(ratio || '0')
    const rateVal = parseFloat(rate || '0')
    if (!jeonAmt) { setError('전세금을 입력해 주세요.'); return }
    if (!rateVal || rateVal <= 0) { setError('대출 금리를 입력해 주세요.'); return }
    const loanAmt = Math.round(jeonAmt * ratioVal / 100)
    const monthlyInterest = Math.round(loanAmt * rateVal / 100 / 12)
    const annualInterest = Math.round(loanAmt * rateVal / 100)
    setResult({ loanAmt, monthlyInterest, annualInterest })
  }

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
        <NumInput label="전세금" value={jeon} onChange={setJeon} placeholder="200,000,000" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <RateInput label="대출 비율 (%)" value={ratio} onChange={setRatio} placeholder="80" />
          <RateInput label="대출 금리 (연 %)" value={rate} onChange={setRate} placeholder="3.5" />
        </div>
        {error && <p style={{ fontSize: '13px', color: '#d95c2e', padding: '8px 12px', background: 'rgba(217,92,46,0.08)', borderRadius: '6px' }}>{error}</p>}
        <button onClick={calculate} style={{ width: '100%', padding: '13px', background: 'var(--accent)', color: 'var(--accent-text)', border: 'none', borderRadius: '10px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit' }}>
          이자 계산하기
        </button>
      </div>
      {result && (
        <div style={resultBox}>
          <div style={{ ...resultRow }}>
            <span style={{ color: 'var(--text-muted)' }}>대출금액</span>
            <span style={{ fontWeight: '600' }}>{fmt(result.loanAmt)}원</span>
          </div>
          <div style={{ ...resultRow }}>
            <span style={{ color: 'var(--text-muted)' }}>월 이자</span>
            <span style={{ fontSize: '24px', fontWeight: '700', letterSpacing: '-0.02em' }}>{fmt(result.monthlyInterest)}<span style={{ fontSize: '14px', fontWeight: '400', marginLeft: '4px', color: 'var(--text-muted)' }}>원/월</span></span>
          </div>
          <div style={{ ...resultRow, borderBottom: 'none' }}>
            <span style={{ color: 'var(--text-muted)' }}>연 이자</span>
            <span style={{ fontWeight: '600' }}>{fmt(result.annualInterest)}원/년</span>
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-hint)', marginTop: '10px', paddingTop: '10px', borderTop: '1px solid var(--border)' }}>
            원금 상환 없는 이자만 납부 기준 (거치식)
          </div>
        </div>
      )}
    </div>
  )
}

export default function JeonwolseCalculator() {
  const [tab, setTab] = useState(0)

  return (
    <div>
      <div style={{ display: 'flex', gap: '6px', marginBottom: '20px' }}>
        {TABS.map((label, i) => (
          <button
            key={i}
            onClick={() => setTab(i)}
            style={{
              flex: 1,
              padding: '9px 0',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              background: tab === i ? 'var(--accent)' : 'var(--surface)',
              color: tab === i ? 'var(--accent-text)' : 'var(--text-muted)',
              fontSize: '13px',
              fontWeight: tab === i ? '600' : '400',
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            {label}
          </button>
        ))}
      </div>
      {tab === 0 && <JeonToWol />}
      {tab === 1 && <WolToJeon />}
      {tab === 2 && <LoanInterest />}
    </div>
  )
}
