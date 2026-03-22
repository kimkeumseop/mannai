'use client'

import { useState, useEffect, useCallback } from 'react'

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

function getNextDate(month, day) {
  const now = new Date()
  const year = now.getFullYear()
  const d = new Date(year, month - 1, day)
  if (d <= now) d.setFullYear(year + 1)
  return d.toISOString().split('T')[0]
}

const QUICK_PICKS = [
  { label: '새해 첫날', getDate: () => getNextDate(1, 1) },
  { label: '크리스마스', getDate: () => getNextDate(12, 25) },
  { label: '광복절', getDate: () => getNextDate(8, 15) },
  { label: '봄 개강', getDate: () => getNextDate(3, 2) },
  { label: '어린이날', getDate: () => getNextDate(5, 5) },
  { label: '수능', getDate: () => {
    // 11월 셋째 목요일
    const year = new Date().getFullYear() + (new Date().getMonth() >= 10 ? 1 : 0)
    const d = new Date(year, 10, 1)
    let thursdays = 0
    while (thursdays < 3) {
      if (d.getDay() === 4) thursdays++
      if (thursdays < 3) d.setDate(d.getDate() + 1)
    }
    return d.toISOString().split('T')[0]
  }},
]

function calcDday(targetDateStr) {
  if (!targetDateStr) return null
  const now = new Date()
  const target = new Date(targetDateStr + 'T00:00:00')
  const diffMs = target - now
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24))

  const totalSeconds = Math.floor(Math.abs(diffMs) / 1000)
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return { diffDays, days, hours, minutes, seconds, isPast: diffMs < 0, targetDate: target }
}

function SavedDdayCard({ item, onDelete }) {
  const [tick, setTick] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 1000)
    return () => clearInterval(id)
  }, [])

  const info = calcDday(item.date)
  if (!info) return null

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
      <div>
        <p style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text)', marginBottom: '3px' }}>{item.name || item.date}</p>
        <p style={{ fontSize: '12px', color: 'var(--text-hint)' }}>{item.date}</p>
      </div>
      <div style={{ textAlign: 'right', flexShrink: 0 }}>
        <p style={{ fontSize: '22px', fontWeight: '700', color: info.isPast ? 'var(--text-muted)' : 'var(--text)', letterSpacing: '-0.02em' }}>
          {info.isPast ? `+${info.days}` : info.diffDays === 0 ? 'D-Day' : `D-${info.diffDays}`}
        </p>
        {!info.isPast && info.diffDays <= 7 && (
          <p style={{ fontSize: '11px', color: 'var(--text-hint)' }}>
            {info.hours}시간 {info.minutes}분 {info.seconds}초
          </p>
        )}
      </div>
      <button
        onClick={() => onDelete(item.id)}
        style={{ padding: '4px 8px', fontSize: '12px', color: 'var(--text-hint)', background: 'transparent', border: '1px solid var(--border)', borderRadius: '6px', cursor: 'pointer' }}
      >
        삭제
      </button>
    </div>
  )
}

export default function DdayCalculator() {
  const [targetDate, setTargetDate] = useState('')
  const [eventName, setEventName] = useState('')
  const [countdown, setCountdown] = useState(null)
  const [savedDdays, setSavedDdays] = useState([])

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('ddays') || '[]')
      setSavedDdays(saved)
    } catch {}
  }, [])

  useEffect(() => {
    if (!targetDate) { setCountdown(null); return }
    const update = () => setCountdown(calcDday(targetDate))
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [targetDate])

  function saveDday() {
    if (!targetDate) return
    const newItem = {
      id: Date.now(),
      date: targetDate,
      name: eventName.trim() || targetDate,
    }
    const updated = [newItem, ...savedDdays].slice(0, 10)
    setSavedDdays(updated)
    localStorage.setItem('ddays', JSON.stringify(updated))
    setEventName('')
  }

  function deleteDday(id) {
    const updated = savedDdays.filter(d => d.id !== id)
    setSavedDdays(updated)
    localStorage.setItem('ddays', JSON.stringify(updated))
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <div>
      <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(8px) } to { opacity:1; transform:translateY(0) } }`}</style>

      {/* 빠른 선택 */}
      <div style={{ marginBottom: '14px' }}>
        <p style={{ ...labelStyle, marginBottom: '8px' }}>자주 쓰는 날짜</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {QUICK_PICKS.map(pick => (
            <button
              key={pick.label}
              onClick={() => setTargetDate(pick.getDate())}
              style={{ padding: '6px 12px', fontSize: '12px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '20px', cursor: 'pointer', color: 'var(--text-muted)', fontFamily: 'inherit' }}
            >
              {pick.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
        <div>
          <label style={labelStyle}>목표 날짜</label>
          <input
            type="date"
            value={targetDate}
            onChange={e => setTargetDate(e.target.value)}
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>이벤트 이름 (선택)</label>
          <input
            type="text"
            placeholder="예: 시험일, 여행, 기념일"
            value={eventName}
            onChange={e => setEventName(e.target.value)}
            style={inputStyle}
          />
        </div>
      </div>

      {/* 결과 */}
      {countdown && (
        <div style={{ animation: 'fadeUp 0.3s ease', marginBottom: '16px' }}>
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '14px',
            padding: '24px',
            textAlign: 'center',
            marginBottom: '10px',
          }}>
            {countdown.isPast ? (
              <>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '6px' }}>경과 일수</p>
                <p style={{ fontSize: '64px', fontWeight: '700', letterSpacing: '-0.04em', lineHeight: 1, color: 'var(--text-muted)' }}>
                  +{countdown.days}
                </p>
                <p style={{ fontSize: '15px', color: 'var(--text-hint)', marginTop: '8px' }}>일이 지났습니다</p>
              </>
            ) : countdown.diffDays === 0 ? (
              <>
                <p style={{ fontSize: '56px', fontWeight: '700', letterSpacing: '-0.04em', lineHeight: 1, color: 'var(--text)' }}>
                  D-Day
                </p>
                <p style={{ fontSize: '15px', color: 'var(--text-muted)', marginTop: '8px' }}>오늘이 바로 그 날입니다!</p>
              </>
            ) : (
              <>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '6px' }}>
                  {targetDate.replace(/-/g, '. ')} 까지
                </p>
                <p style={{ fontSize: '64px', fontWeight: '700', letterSpacing: '-0.04em', lineHeight: 1, color: 'var(--text)' }}>
                  D-{countdown.diffDays}
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '16px' }}>
                  {[
                    { value: countdown.days, label: '일' },
                    { value: countdown.hours, label: '시간' },
                    { value: countdown.minutes, label: '분' },
                    { value: countdown.seconds, label: '초' },
                  ].map(({ value, label }) => (
                    <div key={label} style={{ textAlign: 'center', minWidth: '40px' }}>
                      <p style={{ fontSize: '28px', fontWeight: '700', letterSpacing: '-0.02em', lineHeight: 1, color: 'var(--text)' }}>
                        {String(value).padStart(2, '0')}
                      </p>
                      <p style={{ fontSize: '11px', color: 'var(--text-hint)', marginTop: '4px' }}>{label}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          <button
            onClick={saveDday}
            style={{ width: '100%', padding: '13px', background: 'var(--accent)', color: 'var(--accent-text)', border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit' }}
          >
            디데이 저장하기
          </button>
        </div>
      )}

      {/* 저장된 디데이 */}
      {savedDdays.length > 0 && (
        <div>
          <p style={{ ...labelStyle, marginBottom: '8px', marginTop: '8px' }}>저장된 디데이 ({savedDdays.length}개)</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {savedDdays.map(item => (
              <SavedDdayCard key={item.id} item={item} onDelete={deleteDday} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
