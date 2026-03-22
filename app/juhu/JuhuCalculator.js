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

export default function JuhuCalculator() {
  const [hourlyWage, setHourlyWage] = useState(String(MIN_WAGE_2026))
  const [dailyHours, setDailyHours] = useState('8')
  const [weekDays, setWeekDays] = useState('5')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  function calculate() {
    setError('')
    const wage = parseInt(hourlyWage.replace(/[^0-9]/g, '') || '0')
    const hours = parseFloat(dailyHours)
    const days = parseInt(weekDays)

    if (!wage || wage < 1000) { setError('시급을 올바르게 입력해 주세요.'); return }
    if (!hours || hours <= 0 || hours > 24) { setError('1일 근무시간을 올바르게 입력해 주세요.'); return }
    if (!days || days < 1 || days > 7) { setError('주 근무일수를 올바르게 입력해 주세요.'); return }

    const weeklyHours = hours * days
    const hasJuhu = weeklyHours >= 15

    // 주휴수당 = (주 소정근로시간 ÷ 40) × 8 × 시급
    const juhuPay = hasJuhu ? (weeklyHours / 40) * 8 * wage : 0
    const weeklyBasePay = wage * hours * days
    const weeklyTotal = weeklyBasePay + juhuPay
    // 월급 환산: 주급 × (365/7/12)
    const monthlyPay = weeklyTotal * (365 / 7 / 12)

    setResult({ wage, weeklyHours, hasJuhu, juhuPay, weeklyBasePay, weeklyTotal, monthlyPay })
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
            value={hourlyWage}
            onChange={e => {
              const raw = e.target.value.replace(/[^0-9]/g, '')
              setHourlyWage(raw ? parseInt(raw).toLocaleString() : '')
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

        {error && (
          <p style={{ fontSize: '13px', color: '#d95c2e', padding: '8px 12px', background: 'rgba(217,92,46,0.08)', borderRadius: '6px' }}>
            {error}
          </p>
        )}

        <button
          onClick={calculate}
          style={{ width: '100%', padding: '13px', background: 'var(--accent)', color: 'var(--accent-text)', border: 'none', borderRadius: '10px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit' }}
        >
          주휴수당 계산하기
        </button>
      </div>

      {result && (
        <div style={{ animation: 'fadeUp 0.3s ease' }}>
          {/* 주휴수당 발생 여부 */}
          <div style={{
            padding: '12px 16px',
            borderRadius: '10px',
            marginBottom: '10px',
            background: result.hasJuhu ? 'rgba(76,175,80,0.08)' : 'rgba(217,92,46,0.08)',
            border: `1px solid ${result.hasJuhu ? 'rgba(76,175,80,0.3)' : 'rgba(217,92,46,0.3)'}`,
          }}>
            <p style={{ fontSize: '13px', fontWeight: '600', color: result.hasJuhu ? '#388e3c' : '#c0392b' }}>
              {result.hasJuhu
                ? `✓ 주휴수당 발생 (주 ${result.weeklyHours}시간 근무)`
                : `✗ 주휴수당 미발생 — 주 ${result.weeklyHours}시간으로 15시간 미만입니다`}
            </p>
          </div>

          {/* 결과 카드 */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '10px', overflow: 'hidden', marginBottom: '10px' }}>
            {[
              { label: '주휴수당', value: `${fmt(result.juhuPay)}원`, highlight: true },
              { label: '주급 (기본)', value: `${fmt(result.weeklyBasePay)}원` },
              { label: '주급 (주휴수당 포함)', value: `${fmt(result.weeklyTotal)}원`, highlight: true },
              { label: '월급 환산', value: `${fmt(result.monthlyPay)}원` },
            ].map((item, i, arr) => (
              <div key={i} style={{
                display: 'flex', justifyContent: 'space-between',
                padding: '12px 16px',
                borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : 'none',
                fontSize: '14px',
                background: item.highlight ? 'var(--bg)' : 'transparent',
              }}>
                <span style={{ color: 'var(--text-muted)' }}>{item.label}</span>
                <span style={{ fontWeight: item.highlight ? '700' : '500', flexShrink: 0, marginLeft: '8px' }}>{item.value}</span>
              </div>
            ))}
          </div>

          <div style={{ fontSize: '12px', color: 'var(--text-hint)', lineHeight: '1.7', padding: '12px 14px', borderLeft: '2px solid var(--border)', borderRadius: '0 6px 6px 0' }}>
            월급 환산은 1년 52주 기준 (×365÷7÷12)입니다. 실제 월급은 해당 월의 근무일수에 따라 다를 수 있습니다.
          </div>
        </div>
      )}
    </div>
  )
}
