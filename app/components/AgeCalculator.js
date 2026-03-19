'use client'

import { useState } from 'react'
import styles from './AgeCalculator.module.css'

const MONTHS = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']
const DAYS_LABEL = ['일', '월', '화', '수', '목', '금', '토']
const ZODIAC = ['쥐', '소', '호랑이', '토끼', '용', '뱀', '말', '양', '원숭이', '닭', '개', '돼지']

function getDaysInMonth(year, month) {
  return new Date(year, month, 0).getDate()
}

export default function AgeCalculator() {
  const today = new Date()
  const currentYear = today.getFullYear()
  const [year, setYear] = useState('')
  const [month, setMonth] = useState('')
  const [day, setDay] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const maxDays = year && month ? getDaysInMonth(Number(year), Number(month)) : 31

  function calculate() {
    setError('')

    const y = Number(year)
    const m = Number(month)
    const d = Number(day)

    if (!y || !m || !d) {
      setError('생년월일을 모두 입력해 주세요.')
      return
    }

    if (y < 1900 || y > currentYear) {
      setError('올바른 출생 연도를 입력해 주세요.')
      return
    }

    const birth = new Date(y, m - 1, d)
    const isValidDate =
      birth.getFullYear() === y && birth.getMonth() === m - 1 && birth.getDate() === d

    if (!isValidDate) {
      setError('유효한 날짜를 입력해 주세요.')
      return
    }

    if (birth > today) {
      setError('출생일이 오늘보다 미래입니다.')
      return
    }

    let manAge = currentYear - y
    if (today.getMonth() < m - 1 || (today.getMonth() === m - 1 && today.getDate() < d)) {
      manAge -= 1
    }

    const koreanAge = currentYear - y + 1
    const yearAge = currentYear - y
    const birthWeekday = `${DAYS_LABEL[birth.getDay()]}요일`
    const totalDays = Math.floor((today - birth) / 86400000)

    const nextBirthdayYear =
      today.getMonth() > m - 1 || (today.getMonth() === m - 1 && today.getDate() >= d)
        ? currentYear + 1
        : currentYear
    const nextBirthday = new Date(nextBirthdayYear, m - 1, d)
    const dday = Math.ceil((nextBirthday - today) / 86400000)
    const ddayStr = dday === 0 ? '오늘이 생일입니다!' : `D-${dday.toLocaleString()}`

    setResult({
      manAge,
      koreanAge,
      yearAge,
      birthWeekday,
      totalDays,
      totalHours: totalDays * 24,
      ddayStr,
      zodiacSign: ZODIAC[(y - 4 + 1200) % 12],
    })
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.inputSection}>
        <div className={styles.inputRow}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>연도</label>
            <input
              className={styles.input}
              type="number"
              placeholder="1990"
              value={year}
              min="1900"
              max={currentYear}
              onChange={(event) => {
                setYear(event.target.value)
                setDay('')
              }}
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>월</label>
            <select
              className={styles.select}
              value={month}
              onChange={(event) => {
                setMonth(event.target.value)
                setDay('')
              }}
            >
              <option value="">월 선택</option>
              {MONTHS.map((monthLabel, index) => (
                <option key={monthLabel} value={index + 1}>
                  {monthLabel}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>일</label>
            <select
              className={styles.select}
              value={day}
              onChange={(event) => setDay(event.target.value)}
              disabled={!month}
            >
              <option value="">일 선택</option>
              {Array.from({ length: maxDays }, (_, index) => index + 1).map((dayValue) => (
                <option key={dayValue} value={dayValue}>
                  {dayValue}일
                </option>
              ))}
            </select>
          </div>
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <button className={styles.btn} onClick={calculate}>
          만나이 계산하기
        </button>
      </div>

      {result && (
        <div className={styles.resultSection}>
          <div className={styles.mainCard}>
            <p className={styles.mainLabel}>
              만 나이
              <span className={styles.badge}>법적 기준</span>
            </p>
            <p className={styles.mainValue}>
              {result.manAge}
              <span className={styles.mainUnit}>세</span>
            </p>
          </div>

          <div className={styles.cardGrid}>
            <div className={styles.card}>
              <p className={styles.cardLabel}>세는나이</p>
              <p className={styles.cardValue}>
                {result.koreanAge}
                <span className={styles.cardUnit}>세</span>
              </p>
            </div>

            <div className={styles.card}>
              <p className={styles.cardLabel}>연 나이</p>
              <p className={styles.cardValue}>
                {result.yearAge}
                <span className={styles.cardUnit}>세</span>
              </p>
            </div>

            <div className={styles.card}>
              <p className={styles.cardLabel}>다음 생일</p>
              <p className={styles.cardValueSm}>{result.ddayStr}</p>
            </div>

            <div className={styles.card}>
              <p className={styles.cardLabel}>태어난 요일</p>
              <p className={styles.cardValueSm}>{result.birthWeekday}</p>
            </div>

            <div className={styles.card}>
              <p className={styles.cardLabel}>살아온 날짜</p>
              <p className={styles.cardValueSm}>{result.totalDays.toLocaleString()}일</p>
            </div>

            <div className={styles.card}>
              <p className={styles.cardLabel}>띠</p>
              <p className={styles.cardValueSm}>{result.zodiacSign}띠</p>
            </div>
          </div>

          <div className={styles.notice}>
            2023년 6월 28일부터 행정과 민사상의 나이 기준은 원칙적으로 <strong>만 나이</strong>
            입니다. 다만 병역이나 학교 제도처럼 별도 기준이 있는 영역은 예외일 수 있습니다.
          </div>
        </div>
      )}
    </div>
  )
}
