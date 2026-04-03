'use client'

import { useState, useEffect } from 'react'

const RED = '#E24B4A'
const RED_BG = 'rgba(226,75,74,0.08)'
const PENSION_CAP = 265500

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

function calcPension(monthly) {
  return Math.min(Math.floor(monthly * 0.045 / 10) * 10, PENSION_CAP)
}
function calcHealth(monthly) {
  return Math.floor(monthly * 0.03545 / 10) * 10
}
function calcLongterm(health) {
  return Math.floor(health * 0.1295 / 10) * 10
}
function calcEmployment(monthly) {
  return Math.floor(monthly * 0.009 / 10) * 10
}
function calcIncomeTax(monthly, dependents) {
  const nonTaxable = 200000
  const taxable = Math.max(0, monthly - nonTaxable)
  const annual = taxable * 12

  let earned = 0
  if (annual <= 5000000) earned = annual * 0.7
  else if (annual <= 15000000) earned = 3500000 + (annual - 5000000) * 0.4
  else if (annual <= 45000000) earned = 7500000 + (annual - 15000000) * 0.15
  else if (annual <= 100000000) earned = 12000000 + (annual - 45000000) * 0.05
  else earned = 14750000

  const earnedIncome = annual - earned
  const personalDeduction = Math.min(dependents, 10) * 1500000
  const pensionDeduction = Math.min(taxable, 5900000) * 0.045 * 12
  const taxBase = Math.max(0, earnedIncome - personalDeduction - pensionDeduction)

  let tax = 0
  if (taxBase <= 14000000) tax = taxBase * 0.06
  else if (taxBase <= 50000000) tax = 840000 + (taxBase - 14000000) * 0.15
  else if (taxBase <= 88000000) tax = 6240000 + (taxBase - 50000000) * 0.24
  else if (taxBase <= 150000000) tax = 15360000 + (taxBase - 88000000) * 0.35
  else if (taxBase <= 300000000) tax = 37060000 + (taxBase - 150000000) * 0.38
  else if (taxBase <= 500000000) tax = 94060000 + (taxBase - 300000000) * 0.40
  else tax = 174060000 + (taxBase - 500000000) * 0.42

  let taxCredit = tax <= 1300000 ? tax * 0.55 : 715000 + (tax - 1300000) * 0.30
  const creditLimit =
    annual <= 33000000 ? 740000
    : annual <= 70000000 ? Math.max(660000, 740000 - (annual - 33000000) * 0.008)
    : 660000
  taxCredit = Math.min(taxCredit, creditLimit)

  const annualTax = Math.max(0, tax - taxCredit)
  return Math.max(0, Math.floor(annualTax / 12 / 10) * 10)
}

const fmt = (n) => Math.round(n).toLocaleString('ko-KR')
const fmtMan = (n) => {
  const man = Math.round(n / 10000)
  return man >= 10000 ? `${(man / 10000).toFixed(1)}억` : `${man}만`
}

function getHumorMessages(annualLoss) {
  return [
    `해외여행 ${Math.max(1, Math.floor(annualLoss / 1500000))}번 ✈️`,
    `치킨 ${Math.floor(annualLoss / 25000).toLocaleString('ko-KR')}마리 🍗`,
    `아이폰 ${Math.max(1, Math.floor(annualLoss / 1400000))}대 📱`,
    `스타벅스 아아 ${Math.floor(annualLoss / 6500).toLocaleString('ko-KR')}잔 ☕`,
  ]
}

function getAnnualRangeLabel(annual) {
  const unit = Math.floor(annual / 10000000)
  return `${unit * 1000}만원대`
}

function timeAgo(ts) {
  const diff = Date.now() - ts
  if (diff < 60000) return '방금 전'
  if (diff < 3600000) return `${Math.floor(diff / 60000)}분 전`
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}시간 전`
  return `${Math.floor(diff / 86400000)}일 전`
}

const SEED_FEED = [
  { range: '4000만원대', rate: 17.8, net: 2749000, ts: Date.now() - 600000 },
  { range: '3000만원대', rate: 15.2, net: 2118000, ts: Date.now() - 1800000 },
  { range: '6000만원대', rate: 21.3, net: 3940000, ts: Date.now() - 3600000 },
  { range: '5000만원대', rate: 19.4, net: 3365000, ts: Date.now() - 7200000 },
  { range: '2000만원대', rate: 11.2, net: 1482000, ts: Date.now() - 10800000 },
  { range: '7000만원대', rate: 22.7, net: 4497000, ts: Date.now() - 14400000 },
  { range: '4000만원대', rate: 17.5, net: 2750000, ts: Date.now() - 18000000 },
  { range: '8000만원대', rate: 25.1, net: 5000000, ts: Date.now() - 21600000 },
  { range: '5000만원대', rate: 18.9, net: 3390000, ts: Date.now() - 28800000 },
  { range: '3000만원대', rate: 14.9, net: 2128000, ts: Date.now() - 36000000 },
]

export default function WolgupDodukCalculator() {
  const [annualInput, setAnnualInput] = useState('')
  const [dependents, setDependents] = useState(1)
  const [workYears, setWorkYears] = useState(5)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [feed, setFeed] = useState([])

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('wolgup_feed') || '[]')
      const combined = [...stored, ...SEED_FEED]
        .sort((a, b) => b.ts - a.ts)
        .slice(0, 20)
      setFeed(combined)
    } catch {
      setFeed(SEED_FEED)
    }
  }, [])

  function calculate() {
    setError('')
    const annual = parseInt(annualInput.replace(/[^0-9]/g, '') || '0')
    if (!annual || annual < 10000000) {
      setError('연봉을 1,000만원 이상으로 입력해 주세요.')
      return
    }
    if (annual > 2000000000) {
      setError('연봉을 올바르게 입력해 주세요.')
      return
    }

    const monthly = Math.floor(annual / 12)
    const pension = calcPension(monthly)
    const health = calcHealth(monthly)
    const longterm = calcLongterm(health)
    const employment = calcEmployment(monthly)
    const incomeTax = calcIncomeTax(monthly, dependents)
    const localTax = Math.floor(incomeTax * 0.1 / 10) * 10

    const totalDeduction = pension + health + longterm + employment + incomeTax + localTax
    const netSalary = monthly - totalDeduction
    const deductionRate = (totalDeduction / monthly * 100)
    const annualLoss = totalDeduction * 12
    const lifetimeLoss = annualLoss * workYears

    const items = [
      { label: '국민연금', rate: '4.5%', value: pension },
      { label: '건강보험료', rate: '3.545%', value: health },
      { label: '장기요양보험', rate: '건보×12.95%', value: longterm },
      { label: '고용보험', rate: '0.9%', value: employment },
      { label: '근로소득세', rate: '간이세액표', value: incomeTax },
      { label: '지방소득세', rate: '소득세×10%', value: localTax },
    ]

    const calcResult = {
      annual, monthly, pension, health, longterm, employment,
      incomeTax, localTax, totalDeduction, netSalary,
      deductionRate, annualLoss, lifetimeLoss, items,
    }
    setResult(calcResult)

    // Save to feed
    const newEntry = {
      range: getAnnualRangeLabel(annual),
      rate: parseFloat(deductionRate.toFixed(1)),
      net: netSalary,
      ts: Date.now(),
    }
    try {
      const stored = JSON.parse(localStorage.getItem('wolgup_feed') || '[]')
      const updated = [newEntry, ...stored].slice(0, 20)
      localStorage.setItem('wolgup_feed', JSON.stringify(updated))
      const combined = [...updated, ...SEED_FEED]
        .sort((a, b) => b.ts - a.ts)
        .slice(0, 20)
      setFeed(combined)
    } catch {}
  }

  async function handleShare() {
    if (!result) return
    const text = `나 연봉 ${fmtMan(result.annual)}원인데 매달 ${fmtMan(result.totalDeduction)}원 뺏기고 있음 ㅠ\n공제율 ${result.deductionRate.toFixed(1)}% / 실수령 ${fmtMan(result.netSalary)}원\n\n월급 도둑 계산기 👉 https://mannai-two.vercel.app/wolgup-doduk`
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ text })
        return
      } catch {}
    }
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {}
  }

  const maxDeduction = result ? Math.max(...result.items.map(i => i.value)) : 1

  return (
    <div>
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(10px) } to { opacity:1; transform:translateY(0) } }
        @keyframes shockPulse { 0%,100% { transform:scale(1) } 50% { transform:scale(1.03) } }
      `}</style>

      {/* Inputs */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
        <div>
          <label style={labelStyle}>연봉 (세전, 원)</label>
          <input
            type="text"
            inputMode="numeric"
            placeholder="40,000,000"
            value={annualInput}
            onChange={e => {
              const raw = e.target.value.replace(/[^0-9]/g, '')
              setAnnualInput(raw ? parseInt(raw).toLocaleString('ko-KR') : '')
            }}
            style={inputStyle}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <div>
            <label style={labelStyle}>부양가족 수 (본인 포함)</label>
            <select
              value={dependents}
              onChange={e => setDependents(parseInt(e.target.value))}
              style={inputStyle}
            >
              {[1,2,3,4,5,6,7,8,9,10].map(n => (
                <option key={n} value={n}>{n}명</option>
              ))}
            </select>
          </div>
          <div>
            <label style={labelStyle}>근무 연수</label>
            <select
              value={workYears}
              onChange={e => setWorkYears(parseInt(e.target.value))}
              style={inputStyle}
            >
              {[1,2,3,4,5,6,7,8,9,10,15,20,25,30].map(n => (
                <option key={n} value={n}>{n}년</option>
              ))}
            </select>
          </div>
        </div>

        {error && (
          <p style={{ fontSize: '13px', color: RED, padding: '8px 12px', background: RED_BG, borderRadius: '6px' }}>
            {error}
          </p>
        )}

        <button
          onClick={calculate}
          style={{
            width: '100%',
            padding: '14px',
            background: RED,
            color: '#fff',
            border: 'none',
            borderRadius: '10px',
            fontSize: '16px',
            fontWeight: '700',
            cursor: 'pointer',
            fontFamily: 'inherit',
            letterSpacing: '-0.01em',
          }}
        >
          💸 얼마나 뺏기는지 계산하기
        </button>
      </div>

      {result && (
        <div style={{ animation: 'fadeUp 0.4s ease' }}>
          {/* Shock Card */}
          <div style={{
            background: RED_BG,
            border: `2px solid ${RED}`,
            borderRadius: '14px',
            padding: '24px 20px',
            marginBottom: '12px',
            textAlign: 'center',
            animation: 'shockPulse 0.6s ease 0.3s',
          }}>
            <p style={{ fontSize: '13px', color: RED, fontWeight: '600', marginBottom: '8px', letterSpacing: '0.02em' }}>
              💸 매달 뺏기는 금액
            </p>
            <p style={{ fontSize: '48px', fontWeight: '900', color: RED, letterSpacing: '-0.04em', lineHeight: 1.1 }}>
              {fmt(result.totalDeduction)}
              <span style={{ fontSize: '20px', fontWeight: '400', marginLeft: '4px' }}>원</span>
            </p>
            <p style={{ marginTop: '8px', fontSize: '14px', color: RED, opacity: 0.8 }}>
              공제율 {result.deductionRate.toFixed(1)}% — 10명 중 {Math.round(result.deductionRate / 10)}명은 국가에게
            </p>
          </div>

          {/* 4-Metric Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px' }}>
            {[
              { label: '세전 월급', value: `${fmt(result.monthly)}원`, sub: `연봉 ${fmtMan(result.annual)}원` },
              { label: '실수령액', value: `${fmt(result.netSalary)}원`, sub: '실제 통장 입금액' },
              { label: '공제율', value: `${result.deductionRate.toFixed(1)}%`, sub: '월급 대비 공제 비율' },
              { label: `${workYears}년 누적 손실`, value: `${fmtMan(result.lifetimeLoss)}원`, sub: '근무연수 기준 추정' },
            ].map((m, i) => (
              <div key={i} style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                padding: '14px 16px',
              }}>
                <p style={{ fontSize: '11px', color: 'var(--text-hint)', fontWeight: '600', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{m.label}</p>
                <p style={{ fontSize: '18px', fontWeight: '700', color: i === 0 || i === 1 ? 'var(--text)' : RED, letterSpacing: '-0.02em', lineHeight: 1.2 }}>{m.value}</p>
                <p style={{ fontSize: '11px', color: 'var(--text-hint)', marginTop: '4px' }}>{m.sub}</p>
              </div>
            ))}
          </div>

          {/* Deduction Bar Chart */}
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            overflow: 'hidden',
            marginBottom: '12px',
          }}>
            <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border)', background: 'var(--bg)' }}>
              <p style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text)' }}>도둑별 상세 내역</p>
            </div>
            {result.items.map((item, i) => (
              <div key={i} style={{
                padding: '12px 16px',
                borderBottom: i < result.items.length - 1 ? '1px solid var(--border)' : 'none',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <div>
                    <span style={{ fontSize: '13px', fontWeight: '500', color: 'var(--text)' }}>{item.label}</span>
                    <span style={{ fontSize: '11px', color: 'var(--text-hint)', marginLeft: '6px' }}>{item.rate}</span>
                  </div>
                  <span style={{ fontSize: '13px', fontWeight: '600', color: RED, flexShrink: 0, marginLeft: '8px' }}>
                    -{fmt(item.value)}원
                  </span>
                </div>
                <div style={{ height: '6px', background: 'var(--bg)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    width: `${(item.value / maxDeduction) * 100}%`,
                    background: RED,
                    borderRadius: '3px',
                    transition: 'width 0.6s ease',
                    opacity: 0.7 + (item.value / maxDeduction) * 0.3,
                  }} />
                </div>
              </div>
            ))}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '12px 16px',
              background: 'var(--bg)',
              borderTop: '1px solid var(--border)',
            }}>
              <span style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text)' }}>총 공제액</span>
              <span style={{ fontSize: '14px', fontWeight: '700', color: RED }}>-{fmt(result.totalDeduction)}원</span>
            </div>
          </div>

          {/* Annual Loss + Humor */}
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '12px',
          }}>
            <p style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text)', marginBottom: '10px' }}>
              연간 뺏기는 금액: <span style={{ color: RED }}>{fmt(result.annualLoss)}원</span>
            </p>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' }}>이 돈으로 할 수 있는 것들 😤</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
              {getHumorMessages(result.annualLoss).map((msg, i) => (
                <div key={i} style={{
                  background: 'var(--bg)',
                  borderRadius: '8px',
                  padding: '8px 10px',
                  fontSize: '12px',
                  color: 'var(--text-muted)',
                  fontWeight: '500',
                }}>
                  {msg}
                </div>
              ))}
            </div>
          </div>

          {/* Share Button */}
          <button
            onClick={handleShare}
            style={{
              width: '100%',
              padding: '13px',
              background: copied ? '#4caf50' : 'var(--accent)',
              color: 'var(--accent-text)',
              border: 'none',
              borderRadius: '10px',
              fontSize: '15px',
              fontWeight: '600',
              cursor: 'pointer',
              fontFamily: 'inherit',
              marginBottom: '12px',
              transition: 'background 0.2s ease',
            }}
          >
            {copied ? '✅ 클립보드에 복사됨!' : '📤 결과 공유하기'}
          </button>

          {/* AdSense Slot 1 */}
          {/* <AdBanner slot="XXXXXXXXXX" /> */}

          {/* Community Feed */}
          <div style={{ marginTop: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <p style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text)' }}>다른 사람들 결과 보기</p>
              <span style={{ fontSize: '11px', color: 'var(--text-hint)', background: 'var(--bg)', padding: '2px 8px', borderRadius: '99px' }}>
                최신 {Math.min(feed.length, 20)}개
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {feed.slice(0, 20).map((entry, i) => (
                <div key={i} style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '10px',
                  padding: '10px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '8px',
                }}>
                  <div style={{ minWidth: 0 }}>
                    <p style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text)', lineHeight: 1.3 }}>
                      연봉 {entry.range}
                    </p>
                    <p style={{ fontSize: '11px', color: 'var(--text-hint)', marginTop: '2px' }}>
                      공제율 {entry.rate}% · 실수령 {Math.round(entry.net / 10000)}만원
                    </p>
                  </div>
                  <span style={{ fontSize: '11px', color: 'var(--text-hint)', flexShrink: 0 }}>
                    {timeAgo(entry.ts)}
                  </span>
                </div>
              ))}
            </div>

            {/* AdSense Slot 2 */}
            {/* <AdBanner slot="XXXXXXXXXX" /> */}

            {/* Range stats */}
            <div style={{ marginTop: '16px', padding: '12px 14px', background: 'var(--bg)', borderRadius: '10px', border: '1px solid var(--border)' }}>
              <p style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text)', marginBottom: '8px' }}>연봉구간별 평균 공제율</p>
              {[
                { label: '2000만원대', rate: 11.2 },
                { label: '3000만원대', rate: 15.0 },
                { label: '4000만원대', rate: 17.6 },
                { label: '5000만원대', rate: 19.2 },
                { label: '6000만원대 이상', rate: 21.5 },
              ].map((stat, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 0', borderBottom: i < 4 ? '1px solid var(--border)' : 'none' }}>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{stat.label}</span>
                  <span style={{ fontSize: '12px', fontWeight: '600', color: RED }}>{stat.rate}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
