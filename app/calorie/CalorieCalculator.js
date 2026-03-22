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

const ACTIVITY_LEVELS = [
  { value: '1.2', label: '비활동적', desc: '거의 운동 안 함' },
  { value: '1.375', label: '가벼운 활동', desc: '주 1~3회' },
  { value: '1.55', label: '보통 활동', desc: '주 3~5회' },
  { value: '1.725', label: '활발한 활동', desc: '주 6~7회' },
  { value: '1.9', label: '매우 활발', desc: '운동선수 수준' },
]

const fmt = (n) => Math.round(n).toLocaleString()

export default function CalorieCalculator() {
  const [gender, setGender] = useState('male')
  const [age, setAge] = useState('')
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [activity, setActivity] = useState('1.55')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  function calculate() {
    setError('')
    const a = parseInt(age)
    const h = parseFloat(height)
    const w = parseFloat(weight)
    const act = parseFloat(activity)

    if (!a || a < 1 || a > 120) { setError('나이를 올바르게 입력해 주세요.'); return }
    if (!h || h < 50 || h > 250) { setError('키를 올바르게 입력해 주세요. (50~250cm)'); return }
    if (!w || w < 10 || w > 300) { setError('체중을 올바르게 입력해 주세요. (10~300kg)'); return }

    // Mifflin-St Jeor 공식
    const bmr = gender === 'male'
      ? 10 * w + 6.25 * h - 5 * a + 5
      : 10 * w + 6.25 * h - 5 * a - 161

    const tdee = bmr * act
    const actLabel = ACTIVITY_LEVELS.find(l => l.value === activity)

    setResult({
      bmr,
      tdee,
      lose: tdee - 500,
      gain: tdee + 500,
      actLabel: actLabel?.label,
    })
  }

  return (
    <div>
      <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(8px) } to { opacity:1; transform:translateY(0) } }`}</style>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
        <div>
          <label style={labelStyle}>성별</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            {[{ value: 'male', label: '남성' }, { value: 'female', label: '여성' }].map(opt => (
              <button
                key={opt.value}
                onClick={() => setGender(opt.value)}
                style={{
                  padding: '10px',
                  fontSize: '14px',
                  borderRadius: '10px',
                  border: `1px solid ${gender === opt.value ? 'var(--accent)' : 'var(--border)'}`,
                  background: gender === opt.value ? 'var(--accent)' : 'var(--surface)',
                  color: gender === opt.value ? 'var(--accent-text)' : 'var(--text-muted)',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  fontWeight: gender === opt.value ? '600' : '400',
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
          <div>
            <label style={labelStyle}>나이</label>
            <input type="number" inputMode="numeric" placeholder="30" value={age} onChange={e => setAge(e.target.value)} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>키 (cm)</label>
            <input type="number" inputMode="decimal" placeholder="170" value={height} onChange={e => setHeight(e.target.value)} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>체중 (kg)</label>
            <input type="number" inputMode="decimal" placeholder="65" value={weight} onChange={e => setWeight(e.target.value)} style={inputStyle} />
          </div>
        </div>

        <div>
          <label style={labelStyle}>활동량</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {ACTIVITY_LEVELS.map(level => (
              <button
                key={level.value}
                onClick={() => setActivity(level.value)}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: `1px solid ${activity === level.value ? 'var(--accent)' : 'var(--border)'}`,
                  background: activity === level.value ? 'var(--accent)' : 'var(--surface)',
                  color: activity === level.value ? 'var(--accent-text)' : 'var(--text)',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  textAlign: 'left',
                }}
              >
                <span style={{ fontSize: '14px', fontWeight: activity === level.value ? '600' : '400' }}>{level.label}</span>
                <span style={{ fontSize: '12px', opacity: 0.7 }}>{level.desc}</span>
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
          칼로리 계산하기
        </button>
      </div>

      {result && (
        <div style={{ animation: 'fadeUp 0.3s ease' }}>
          {/* BMR */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '10px', padding: '16px 20px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
            <div>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '2px' }}>기초대사량 (BMR)</p>
              <p style={{ fontSize: '11px', color: 'var(--text-hint)' }}>아무것도 안 해도 소모되는 칼로리</p>
            </div>
            <p style={{ fontSize: '26px', fontWeight: '700', letterSpacing: '-0.02em', flexShrink: 0 }}>
              {fmt(result.bmr)}<span style={{ fontSize: '13px', fontWeight: '400', color: 'var(--text-muted)', marginLeft: '3px' }}>kcal</span>
            </p>
          </div>

          {/* TDEE */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '10px', padding: '16px 20px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
            <div>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '2px' }}>일일 권장 칼로리 (TDEE)</p>
              <p style={{ fontSize: '11px', color: 'var(--text-hint)' }}>{result.actLabel} 기준</p>
            </div>
            <p style={{ fontSize: '26px', fontWeight: '700', letterSpacing: '-0.02em', flexShrink: 0 }}>
              {fmt(result.tdee)}<span style={{ fontSize: '13px', fontWeight: '400', color: 'var(--text-muted)', marginLeft: '3px' }}>kcal</span>
            </p>
          </div>

          {/* 목적별 칼로리 */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '10px', overflow: 'hidden', marginBottom: '10px' }}>
            {[
              { label: '🔽 체중 감량', value: `${fmt(result.lose)} kcal`, note: 'TDEE - 500kcal', color: '#5b9bd5' },
              { label: '⚖️ 체중 유지', value: `${fmt(result.tdee)} kcal`, note: 'TDEE 유지', color: '#4caf50' },
              { label: '🔼 체중 증가', value: `${fmt(result.gain)} kcal`, note: 'TDEE + 500kcal', color: '#ff7043' },
            ].map((item, i, arr) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '13px 16px', borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : 'none', fontSize: '14px' }}>
                <div>
                  <p style={{ fontWeight: '600', color: item.color, marginBottom: '2px' }}>{item.label}</p>
                  <p style={{ fontSize: '12px', color: 'var(--text-hint)' }}>{item.note}</p>
                </div>
                <span style={{ fontWeight: '700', flexShrink: 0, marginLeft: '8px', color: item.color }}>{item.value}</span>
              </div>
            ))}
          </div>

          <div style={{ fontSize: '12px', color: 'var(--text-hint)', lineHeight: '1.7', padding: '12px 14px', borderLeft: '2px solid var(--border)', borderRadius: '0 6px 6px 0' }}>
            Mifflin-St Jeor 공식 기반 추정값입니다. 개인의 체지방률, 건강 상태에 따라 실제 값이 다를 수 있습니다.
          </div>
        </div>
      )}
    </div>
  )
}
