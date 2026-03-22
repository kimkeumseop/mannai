'use client'

import { useState } from 'react'

const MIN_WAGE_2026 = 10320

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

export default function HourlyCalculator() {
  const [wage, setWage] = useState(String(MIN_WAGE_2026))
  const [dailyHours, setDailyHours] = useState('8')
  const [weekDays, setWeekDays] = useState('5')
  const [includeJuhu, setIncludeJuhu] = useState(true)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  function calculate() {
    setError('')
    const w = parseInt(wage.replace(/[^0-9]/g, '') || '0')
    const h = parseFloat(dailyHours)
    const d = parseInt(weekDays)

    if (!w || w < 1000) { setError('시급을 올바르게 입력해 주세요.'); return }
    if (!h || h <= 0 || h > 24) { setError('1일 근무시간을 올바르게 입력해 주세요.'); return }
    if (!d || d < 1 || d > 7) { setError('주 근무일수를 올바르게 입력해 주세요.'); return }

    const weeklyHours = h * d
    const canJuhu = weeklyHours >= 15
    const juhuPay = (canJuhu && includeJuhu) ? (weeklyHours / 40) * 8 * w : 0

    const daily = w * h
    const weeklyBase = daily * d
    const weeklyTotal = weeklyBase + juhuPay
    const monthly = weeklyTotal * (365 / 7 / 12)
    const annual = monthly * 12

    const minDaily = MIN_WAGE_2026 * h
    const minWeekly = minDaily * d + (canJuhu ? (weeklyHours / 40) * 8 * MIN_WAGE_2026 : 0)
    const minMonthly = minWeekly * (365 / 7 / 12)

    setResult({ w, h, d, weeklyHours, canJuhu, juhuPay, daily, weeklyBase, weeklyTotal, monthly, annual, minMonthly, isMinWage: w < MIN_WAGE_2026 })
  }

  return (
    <div>
      <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(8px) } to { opacity:1; transform:translateY(0) } }`}</style>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
        <div>
          <label style={labelStyle}>시급 (원)</label>
          <input
            type="text"
            inputMode="numeric"
            placeholder={MIN_WAGE_2026.toLocaleString()}
            value={wage}
            onChange={e => {
              const raw = e.target.value.replace(/[^0-9]/g, '')
              setWage(raw ? parseInt(raw).toLocaleString() : '')
            }}
            style={inputStyle}
          />
          <p style={{ fontSize: '11px', color: 'var(--text-hint)', marginTop: '4px' }}>
            2026년 최저시급: {MIN_WAGE_2026.toLocaleString()}원
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <div>
            <label style={labelStyle}>1일 근무시간</label>
            <select value={dailyHours} onChange={e => setDailyHours(e.target.value)} style={inputStyle}>
              {[2,3,4,5,6,7,8,9,10,11,12].map(h => (
                <option key={h} value={h}>{h}시간</option>
              ))}
            </select>
          </div>
          <div>
            <label style={labelStyle}>주 근무일수</label>
            <select value={weekDays} onChange={e => setWeekDays(e.target.value)} style={inputStyle}>
              {[1,2,3,4,5,6,7].map(d => (
                <option key={d} value={d}>{d}일</option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={() => setIncludeJuhu(v => !v)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 14px',
            background: 'var(--surface)',
            border: `1px solid ${includeJuhu ? 'var(--accent)' : 'var(--border)'}`,
            borderRadius: '10px',
            cursor: 'pointer',
            fontFamily: 'inherit',
            fontSize: '14px',
            color: 'var(--text)',
            textAlign: 'left',
            width: '100%',
          }}
        >
          <span style={{ width: '18px', height: '18px', borderRadius: '4px', border: `2px solid ${includeJuhu ? 'var(--accent)' : 'var(--border)'}`, background: includeJuhu ? 'var(--accent)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            {includeJuhu && <span style={{ color: 'var(--accent-text)', fontSize: '12px', lineHeight: 1 }}>✓</span>}
          </span>
          주휴수당 포함
        </button>

        {error && (
          <p style={{ fontSize: '13px', color: '#d95c2e', padding: '8px 12px', background: 'rgba(217,92,46,0.08)', borderRadius: '6px' }}>
            {error}
          </p>
        )}

        <button
          onClick={calculate}
          style={{ width: '100%', padding: '13px', background: 'var(--accent)', color: 'var(--accent-text)', border: 'none', borderRadius: '10px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit' }}
        >
          급여 계산하기
        </button>
      </div>

      {result && (
        <div style={{ animation: 'fadeUp 0.3s ease' }}>
          {result.isMinWage && (
            <div style={{ padding: '10px 14px', borderRadius: '10px', marginBottom: '10px', background: 'rgba(217,92,46,0.08)', border: '1px solid rgba(217,92,46,0.3)', fontSize: '13px', color: '#c0392b' }}>
              ⚠️ 입력한 시급이 2026년 최저시급({MIN_WAGE_2026.toLocaleString()}원)보다 낮습니다.
            </div>
          )}

          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '10px', overflow: 'hidden', marginBottom: '10px' }}>
            {[
              { label: '일급', value: `${fmt(result.daily)}원` },
              { label: '주급 (기본)', value: `${fmt(result.weeklyBase)}원` },
              { label: '주휴수당', value: result.canJuhu && includeJuhu ? `${fmt(result.juhuPay)}원` : (result.canJuhu ? '포함 안 함' : `미발생 (주 ${result.weeklyHours}시간)`) },
              { label: '주급 합계', value: `${fmt(result.weeklyTotal)}원`, highlight: true },
              { label: '월급 환산', value: `${fmt(result.monthly)}원`, highlight: true },
              { label: '연봉 환산', value: `${fmt(result.annual)}원` },
            ].map((item, i, arr) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '11px 16px', borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : 'none', fontSize: '14px', background: item.highlight ? 'var(--bg)' : 'transparent' }}>
                <span style={{ color: 'var(--text-muted)' }}>{item.label}</span>
                <span style={{ fontWeight: item.highlight ? '700' : '500', flexShrink: 0, marginLeft: '8px' }}>{item.value}</span>
              </div>
            ))}
          </div>

          {/* 최저시급 비교 */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '10px', padding: '14px 16px', marginBottom: '10px' }}>
            <p style={{ fontSize: '12px', color: 'var(--text-hint)', marginBottom: '8px', fontWeight: '500' }}>최저시급 기준 비교 ({MIN_WAGE_2026.toLocaleString()}원)</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
              <span style={{ color: 'var(--text-muted)' }}>최저시급 기준 월급</span>
              <span style={{ fontWeight: '500' }}>{fmt(result.minMonthly)}원</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginTop: '6px' }}>
              <span style={{ color: 'var(--text-muted)' }}>현재 시급 대비</span>
              <span style={{ fontWeight: '600', color: result.monthly >= result.minMonthly ? '#388e3c' : '#d32f2f' }}>
                {result.monthly >= result.minMonthly ? '+' : ''}{fmt(result.monthly - result.minMonthly)}원
              </span>
            </div>
          </div>

          <div style={{ fontSize: '12px', color: 'var(--text-hint)', lineHeight: '1.7', padding: '12px 14px', borderLeft: '2px solid var(--border)', borderRadius: '0 6px 6px 0' }}>
            월급 환산은 365÷7÷12 기준입니다. 주휴수당은 주 15시간 이상 근무 시 발생합니다.
          </div>
        </div>
      )}
    </div>
  )
}
