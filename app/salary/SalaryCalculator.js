'use client'

import { useState } from 'react'

const PENSION_CAP = 6370000

function calcPension(monthly) {
  return Math.floor(Math.min(monthly, PENSION_CAP) * 0.0475 / 10) * 10
}

function calcHealth(monthly) {
  return Math.floor(monthly * 0.03595 / 10) * 10
}

function calcLongterm(health) {
  return Math.floor(health * 0.1314 / 10) * 10
}

function calcEmployment(monthly) {
  return Math.floor(monthly * 0.009 / 10) * 10
}

function calcIncomeTax(monthly, nonTaxable, dependents, children) {
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
  const pensionDeduction = Math.min(taxable, PENSION_CAP) * 0.0475 * 12
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

  const childCredit =
    children === 1 ? 150000
    : children === 2 ? 350000
    : children >= 3 ? 350000 + (children - 2) * 300000
    : 0

  const annualTax = Math.max(0, tax - taxCredit - childCredit)
  return Math.max(0, Math.floor(annualTax / 12 / 10) * 10)
}

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

export default function SalaryCalculator() {
  const [salary, setSalary] = useState('')
  const [dependents, setDependents] = useState(1)
  const [children, setChildren] = useState(0)
  const [nonTaxable, setNonTaxable] = useState(200000)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  function calculate() {
    setError('')
    const monthly = parseInt(salary.replace(/[^0-9]/g, '') || '0')
    if (!monthly || monthly < 100000) {
      setError('월 급여를 올바르게 입력해 주세요.')
      return
    }

    const pension = calcPension(monthly)
    const health = calcHealth(monthly)
    const longterm = calcLongterm(health)
    const employment = calcEmployment(monthly)
    const incomeTax = calcIncomeTax(monthly, nonTaxable, dependents, children)
    const localTax = Math.floor(incomeTax * 0.1 / 10) * 10

    const totalDeduction = pension + health + longterm + employment + incomeTax + localTax
    const netSalary = monthly - totalDeduction
    const netRatio = ((netSalary / monthly) * 100).toFixed(1)

    setResult({ pension, health, longterm, employment, incomeTax, localTax, totalDeduction, netSalary, netRatio })
  }

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
        <div>
          <label style={labelStyle}>월 급여 (세전, 원)</label>
          <input
            type="text"
            inputMode="numeric"
            placeholder="3,000,000"
            value={salary}
            onChange={e => {
              const raw = e.target.value.replace(/[^0-9]/g, '')
              setSalary(raw ? parseInt(raw).toLocaleString() : '')
            }}
            style={inputStyle}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
          <div>
            <label style={labelStyle}>부양가족 수</label>
            <select value={dependents} onChange={e => setDependents(parseInt(e.target.value))} style={inputStyle}>
              {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n}명</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>20세 이하 자녀</label>
            <select value={children} onChange={e => setChildren(parseInt(e.target.value))} style={inputStyle}>
              {[0,1,2,3,4,5].map(n => <option key={n} value={n}>{n}명</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>비과세액</label>
            <select value={nonTaxable} onChange={e => setNonTaxable(parseInt(e.target.value))} style={inputStyle}>
              <option value={200000}>20만원 (식대)</option>
              <option value={100000}>10만원</option>
              <option value={0}>없음</option>
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
          실수령액 계산하기
        </button>
      </div>

      {result && (
        <div style={{ animation: 'fadeUp 0.3s ease' }}>
          <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(8px) } to { opacity:1; transform:translateY(0) } }`}</style>

          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '10px', padding: '20px 22px', marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
            <div>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '4px' }}>예상 실수령액</p>
              <p style={{ fontSize: '12px', color: 'var(--text-hint)' }}>실수령 비율 {result.netRatio}%</p>
            </div>
            <p style={{ fontSize: '34px', fontWeight: '700', letterSpacing: '-0.03em', flexShrink: 0 }}>
              {fmt(result.netSalary)}<span style={{ fontSize: '16px', fontWeight: '400', color: 'var(--text-muted)', marginLeft: '4px' }}>원</span>
            </p>
          </div>

          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '10px', overflow: 'hidden', marginBottom: '10px' }}>
            {[
              { label: '국민연금 (4.75%)', value: result.pension },
              { label: '건강보험 (3.595%)', value: result.health },
              { label: '장기요양보험 (건보료 × 13.14%)', value: result.longterm },
              { label: '고용보험 (0.9%)', value: result.employment },
              { label: '소득세', value: result.incomeTax },
              { label: '지방소득세 (소득세 × 10%)', value: result.localTax },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '11px 16px', borderBottom: '1px solid var(--border)', fontSize: '14px' }}>
                <span style={{ color: 'var(--text-muted)' }}>{item.label}</span>
                <span style={{ fontWeight: '500', flexShrink: 0, marginLeft: '8px' }}>- {fmt(item.value)}원</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', fontSize: '14px', fontWeight: '600', background: 'var(--bg)' }}>
              <span>총 공제액</span>
              <span>{fmt(result.totalDeduction)}원</span>
            </div>
          </div>

          <div style={{ fontSize: '12px', color: 'var(--text-hint)', lineHeight: '1.7', padding: '12px 14px', borderLeft: '2px solid var(--border)', borderRadius: '0 6px 6px 0' }}>
            2026년 기준 근로소득 간이세액표에 따른 추정값입니다. 실제 공제액은 근무 형태, 추가 공제 항목에 따라 다를 수 있습니다.
          </div>
        </div>
      )}
    </div>
  )
}
