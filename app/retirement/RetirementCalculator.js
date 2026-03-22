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

function parseAmount(str) {
  return parseInt(str.replace(/[^0-9]/g, '') || '0') || 0
}

function formatAmount(str) {
  const raw = str.replace(/[^0-9]/g, '')
  return raw ? parseInt(raw).toLocaleString() : ''
}

// 근속연수 공제
function calcServiceDeduction(years) {
  if (years <= 5) return years * 300000
  if (years <= 10) return 1500000 + (years - 5) * 500000
  if (years <= 20) return 4000000 + (years - 10) * 800000
  return 12000000 + (years - 20) * 1200000
}

// 환산급여 공제
function calcConvertedDeduction(converted) {
  if (converted <= 8000000) return converted
  if (converted <= 70000000) return 8000000 + (converted - 8000000) * 0.6
  if (converted <= 100000000) return 45200000 + (converted - 70000000) * 0.55
  if (converted <= 300000000) return 61700000 + (converted - 100000000) * 0.45
  return 151700000 + (converted - 300000000) * 0.35
}

// 소득세율 적용
function calcIncomeTax(taxBase) {
  if (taxBase <= 0) return 0
  if (taxBase <= 14000000) return taxBase * 0.06
  if (taxBase <= 50000000) return 840000 + (taxBase - 14000000) * 0.15
  if (taxBase <= 88000000) return 6240000 + (taxBase - 50000000) * 0.24
  if (taxBase <= 150000000) return 15360000 + (taxBase - 88000000) * 0.35
  if (taxBase <= 300000000) return 37060000 + (taxBase - 150000000) * 0.38
  if (taxBase <= 500000000) return 94060000 + (taxBase - 300000000) * 0.40
  return 174060000 + (taxBase - 500000000) * 0.42
}

function calcRetirementTax(retirementPay, workDays) {
  if (retirementPay <= 0) return { incomeTax: 0, localTax: 0, total: 0 }

  const serviceYears = Math.ceil(workDays / 365)
  const serviceDeduction = calcServiceDeduction(serviceYears)
  const taxableBase = Math.max(0, retirementPay - serviceDeduction)

  const convertedPay = serviceYears > 0 ? (taxableBase * 12) / serviceYears : 0
  const convertedDeduction = calcConvertedDeduction(convertedPay)
  const taxBase = Math.max(0, convertedPay - convertedDeduction)

  const annualTax = calcIncomeTax(taxBase)
  const finalTax = Math.floor((annualTax * serviceYears) / 12)
  const incomeTax = Math.max(0, finalTax)
  const localTax = Math.floor(incomeTax * 0.1)

  return { incomeTax, localTax, total: incomeTax + localTax, serviceYears, serviceDeduction, convertedPay, taxBase }
}

const fmt = (n) => Math.round(n).toLocaleString()

export default function RetirementCalculator() {
  const [joinDate, setJoinDate] = useState('')
  const [leaveDate, setLeaveDate] = useState('')
  const [salary1, setSalary1] = useState('')
  const [salary2, setSalary2] = useState('')
  const [salary3, setSalary3] = useState('')
  const [bonus, setBonus] = useState('')
  const [vacationPay, setVacationPay] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  function calculate() {
    setError('')

    if (!joinDate || !leaveDate) {
      setError('입사일과 퇴사일을 모두 입력해 주세요.')
      return
    }

    const join = new Date(joinDate)
    const leave = new Date(leaveDate)

    if (leave <= join) {
      setError('퇴사일은 입사일보다 이후 날짜여야 합니다.')
      return
    }

    const workDays = Math.floor((leave - join) / (1000 * 60 * 60 * 24))

    if (workDays < 365) {
      setError(`재직 기간이 ${workDays}일로 1년 미만입니다. 퇴직금은 1년 이상 근무해야 발생합니다.`)
      return
    }

    const s1 = parseAmount(salary1)
    const s2 = parseAmount(salary2)
    const s3 = parseAmount(salary3)

    if (!s1 || !s2 || !s3) {
      setError('최근 3개월 급여를 모두 입력해 주세요.')
      return
    }

    const totalSalary3 = s1 + s2 + s3
    const annualBonus = parseAmount(bonus)
    const annualVacation = parseAmount(vacationPay)

    // 평균임금 = (3개월 급여 합계 + 연간 상여금 × 3/12 + 연차수당 × 3/12) / 91일
    const avgWageDaily = (totalSalary3 + (annualBonus * 3 / 12) + (annualVacation * 3 / 12)) / 91
    const retirementPay = avgWageDaily * 30 * (workDays / 365)

    // 재직 기간 계산
    let years = leave.getFullYear() - join.getFullYear()
    let months = leave.getMonth() - join.getMonth()
    let days = leave.getDate() - join.getDate()
    if (days < 0) { months--; days += 30 }
    if (months < 0) { years--; months += 12 }

    const taxInfo = calcRetirementTax(retirementPay, workDays)
    const netPay = retirementPay - taxInfo.total

    setResult({
      workDays,
      years,
      months,
      days,
      avgWageDaily,
      retirementPay,
      ...taxInfo,
      netPay,
    })
  }

  return (
    <div>
      <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(8px) } to { opacity:1; transform:translateY(0) } }`}</style>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <div>
            <label style={labelStyle}>입사일</label>
            <input type="date" value={joinDate} onChange={e => setJoinDate(e.target.value)} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>퇴사일</label>
            <input type="date" value={leaveDate} onChange={e => setLeaveDate(e.target.value)} style={inputStyle} />
          </div>
        </div>

        <p style={{ fontSize: '12px', color: 'var(--text-hint)', fontWeight: '500', margin: '4px 0 -4px' }}>최근 3개월 급여 (세전, 원)</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
          <div>
            <label style={labelStyle}>3개월 전 급여</label>
            <input
              type="text"
              inputMode="numeric"
              placeholder="3,000,000"
              value={salary1}
              onChange={e => setSalary1(formatAmount(e.target.value))}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>2개월 전 급여</label>
            <input
              type="text"
              inputMode="numeric"
              placeholder="3,000,000"
              value={salary2}
              onChange={e => setSalary2(formatAmount(e.target.value))}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>1개월 전 급여</label>
            <input
              type="text"
              inputMode="numeric"
              placeholder="3,000,000"
              value={salary3}
              onChange={e => setSalary3(formatAmount(e.target.value))}
              style={inputStyle}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <div>
            <label style={labelStyle}>연간 상여금 (원)</label>
            <input
              type="text"
              inputMode="numeric"
              placeholder="0"
              value={bonus}
              onChange={e => setBonus(formatAmount(e.target.value))}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>연차수당 (원)</label>
            <input
              type="text"
              inputMode="numeric"
              placeholder="0"
              value={vacationPay}
              onChange={e => setVacationPay(formatAmount(e.target.value))}
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
          퇴직금 계산하기
        </button>
      </div>

      {result && (
        <div style={fadeUpContainerStyle}>
          {/* 실수령액 */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '10px', padding: '20px 22px', marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
            <div>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '4px' }}>세후 예상 실수령액</p>
              <p style={{ fontSize: '12px', color: 'var(--text-hint)' }}>
                재직 {result.years}년 {result.months}개월 {result.days}일 ({result.workDays}일)
              </p>
            </div>
            <p style={{ fontSize: '30px', fontWeight: '700', letterSpacing: '-0.03em', flexShrink: 0 }}>
              {fmt(result.netPay)}<span style={{ fontSize: '14px', fontWeight: '400', color: 'var(--text-muted)', marginLeft: '4px' }}>원</span>
            </p>
          </div>

          {/* 세부 내역 */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '10px', overflow: 'hidden', marginBottom: '10px' }}>
            {[
              { label: '평균임금 (일)', value: `${fmt(result.avgWageDaily)}원` },
              { label: '퇴직금 (세전)', value: `${fmt(result.retirementPay)}원` },
              { label: `퇴직소득세 (근속 ${result.serviceYears}년 기준)`, value: `- ${fmt(result.incomeTax)}원` },
              { label: '지방소득세 (퇴직소득세 × 10%)', value: `- ${fmt(result.localTax)}원` },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '11px 16px', borderBottom: i < 3 ? '1px solid var(--border)' : 'none', fontSize: '14px' }}>
                <span style={{ color: 'var(--text-muted)' }}>{item.label}</span>
                <span style={{ fontWeight: '500', flexShrink: 0, marginLeft: '8px' }}>{item.value}</span>
              </div>
            ))}
          </div>

          <div style={{ fontSize: '12px', color: 'var(--text-hint)', lineHeight: '1.7', padding: '12px 14px', borderLeft: '2px solid var(--border)', borderRadius: '0 6px 6px 0' }}>
            2026년 기준 퇴직금 및 퇴직소득세 추정값입니다. 실제 금액은 회사 규정, 세금 감면 혜택, 근무 형태에 따라 달라질 수 있습니다.
          </div>
        </div>
      )}
    </div>
  )
}
