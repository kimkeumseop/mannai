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
const fadeUpContainerStyle = {
  animation: 'fadeUp 0.3s ease',
  willChange: 'transform, opacity',
}

const BMI_RANGES = [
  { label: '저체중', min: 0, max: 18.5, color: '#5b9bd5' },
  { label: '정상', min: 18.5, max: 23, color: '#4caf50' },
  { label: '과체중', min: 23, max: 25, color: '#ffc107' },
  { label: '비만', min: 25, max: 30, color: '#ff7043' },
  { label: '고도비만', min: 30, max: 99, color: '#d32f2f' },
]

function getBmiCategory(bmi) {
  if (bmi < 18.5) return BMI_RANGES[0]
  if (bmi < 23) return BMI_RANGES[1]
  if (bmi < 25) return BMI_RANGES[2]
  if (bmi < 30) return BMI_RANGES[3]
  return BMI_RANGES[4]
}

function getGaugePercent(bmi) {
  const minBmi = 14
  const maxBmi = 36
  const clamped = Math.max(minBmi, Math.min(maxBmi, bmi))
  return ((clamped - minBmi) / (maxBmi - minBmi)) * 100
}

const fmt = (n) => Number(n.toFixed(1)).toLocaleString()

export default function BmiCalculator() {
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [gender, setGender] = useState('male')
  const [age, setAge] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  function calculate() {
    setError('')
    const h = parseFloat(height)
    const w = parseFloat(weight)
    const a = parseInt(age)

    if (!h || h < 50 || h > 250) {
      setError('키를 올바르게 입력해 주세요. (50~250cm)')
      return
    }
    if (!w || w < 10 || w > 300) {
      setError('체중을 올바르게 입력해 주세요. (10~300kg)')
      return
    }
    if (!a || a < 1 || a > 120) {
      setError('나이를 올바르게 입력해 주세요.')
      return
    }

    const hm = h / 100
    const bmi = w / (hm * hm)
    const category = getBmiCategory(bmi)

    const minNormal = 18.5 * hm * hm
    const maxNormal = 22.9 * hm * hm

    const standardWeight = gender === 'male'
      ? (h - 100) * 0.9
      : (h - 100) * 0.85

    const gaugePercent = getGaugePercent(bmi)

    setResult({ bmi, category, minNormal, maxNormal, standardWeight, gaugePercent })
  }

  return (
    <div>
      <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(8px) } to { opacity:1; transform:translateY(0) } }`}</style>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <div>
            <label style={labelStyle}>키 (cm)</label>
            <input
              type="number"
              inputMode="decimal"
              placeholder="170"
              value={height}
              onChange={e => setHeight(e.target.value)}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>체중 (kg)</label>
            <input
              type="number"
              inputMode="decimal"
              placeholder="65"
              value={weight}
              onChange={e => setWeight(e.target.value)}
              style={inputStyle}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <div>
            <label style={labelStyle}>성별</label>
            <select value={gender} onChange={e => setGender(e.target.value)} style={inputStyle}>
              <option value="male">남성</option>
              <option value="female">여성</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>나이</label>
            <input
              type="number"
              inputMode="numeric"
              placeholder="30"
              value={age}
              onChange={e => setAge(e.target.value)}
              style={inputStyle}
            />
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
          BMI 계산하기
        </button>
      </div>

      {result && (
        <div style={fadeUpContainerStyle}>
          {/* BMI 수치 및 판정 */}
          <div style={{ background: 'var(--surface)', border: `2px solid ${result.category.color}`, borderRadius: '12px', padding: '20px 22px', marginBottom: '10px', textAlign: 'center' }}>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '6px' }}>나의 BMI 지수</p>
            <p style={{ fontSize: '48px', fontWeight: '700', letterSpacing: '-0.03em', color: result.category.color, lineHeight: 1.1 }}>
              {fmt(result.bmi)}
            </p>
            <p style={{ marginTop: '8px', fontSize: '18px', fontWeight: '600', color: result.category.color }}>
              {result.category.label}
            </p>
          </div>

          {/* 게이지 바 */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '16px 18px', marginBottom: '10px' }}>
            <p style={{ fontSize: '12px', color: 'var(--text-hint)', marginBottom: '10px', fontWeight: '500' }}>BMI 구간 위치</p>
            <div style={{ position: 'relative', height: '12px', borderRadius: '6px', overflow: 'hidden', background: 'linear-gradient(to right, #5b9bd5 0%, #4caf50 30%, #ffc107 52%, #ff7043 67%, #d32f2f 100%)', marginBottom: '6px' }}>
              <div style={{
                position: 'absolute',
                top: '-4px',
                left: `${result.gaugePercent}%`,
                transform: 'translateX(-50%)',
                width: '20px',
                height: '20px',
                background: 'var(--surface)',
                border: `3px solid ${result.category.color}`,
                borderRadius: '50%',
                boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
                transition: 'left 0.3s ease',
              }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-hint)', marginTop: '8px' }}>
              {BMI_RANGES.map(r => (
                <span key={r.label} style={{ color: r.label === result.category.label ? result.category.color : 'var(--text-hint)', fontWeight: r.label === result.category.label ? '600' : '400' }}>
                  {r.label}
                </span>
              ))}
            </div>
          </div>

          {/* 상세 정보 */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden', marginBottom: '10px' }}>
            {[
              { label: '정상 체중 범위', value: `${fmt(result.minNormal)} ~ ${fmt(result.maxNormal)} kg` },
              { label: '표준 체중', value: `${fmt(result.standardWeight)} kg` },
              { label: '현재 체중과 표준 체중 차이', value: `${parseFloat((parseFloat(weight) - result.standardWeight).toFixed(1)) > 0 ? '+' : ''}${fmt(parseFloat(weight) - result.standardWeight)} kg` },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', borderBottom: i < 2 ? '1px solid var(--border)' : 'none', fontSize: '14px' }}>
                <span style={{ color: 'var(--text-muted)' }}>{item.label}</span>
                <span style={{ fontWeight: '500', flexShrink: 0, marginLeft: '8px' }}>{item.value}</span>
              </div>
            ))}
          </div>

          <div style={{ fontSize: '12px', color: 'var(--text-hint)', lineHeight: '1.7', padding: '12px 14px', borderLeft: '2px solid var(--border)', borderRadius: '0 6px 6px 0' }}>
            WHO 아시아·태평양 기준을 적용한 추정값입니다. 표준 체중은 브로카 변형 공식(남: (키-100)×0.9, 여: (키-100)×0.85)을 사용합니다.
          </div>
        </div>
      )}
    </div>
  )
}
