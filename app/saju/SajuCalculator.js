'use client'

import { useState } from 'react'
import { Solar, Lunar } from 'lunar-javascript'

// 천간 (Heavenly Stems)
const CHEONGAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']
const CHEONGAN_KR = ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계']
// 지지 (Earthly Branches)
const JIJI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']
const JIJI_KR = ['자', '축', '인', '묘', '진', '사', '오', '미', '신', '유', '술', '해']

// 오행 (Five Elements) per 천간
const OHAENG_CG = ['목', '목', '화', '화', '토', '토', '금', '금', '수', '수']
// 오행 per 지지
const OHAENG_JJ = ['수', '토', '목', '목', '토', '화', '화', '토', '금', '금', '토', '수']
const OHAENG_COLOR = {
  목: '#4caf50',
  화: '#f44336',
  토: '#ff9800',
  금: '#9e9e9e',
  수: '#2196f3',
}

// 시진 (Hour Pillars)
const SIJIN = [
  { label: '자시(子時)', range: '23:00~01:00', branch: 0 },
  { label: '축시(丑時)', range: '01:00~03:00', branch: 1 },
  { label: '인시(寅時)', range: '03:00~05:00', branch: 2 },
  { label: '묘시(卯時)', range: '05:00~07:00', branch: 3 },
  { label: '진시(辰時)', range: '07:00~09:00', branch: 4 },
  { label: '사시(巳時)', range: '09:00~11:00', branch: 5 },
  { label: '오시(午時)', range: '11:00~13:00', branch: 6 },
  { label: '미시(未時)', range: '13:00~15:00', branch: 7 },
  { label: '신시(申時)', range: '15:00~17:00', branch: 8 },
  { label: '유시(酉時)', range: '17:00~19:00', branch: 9 },
  { label: '술시(戌時)', range: '19:00~21:00', branch: 10 },
  { label: '해시(亥時)', range: '21:00~23:00', branch: 11 },
]

// 일간별 성격 설명
const ILGAN_DESC = {
  갑: '목기가 강한 갑목 일간입니다. 곧고 뻗는 나무처럼 진취적이고 리더십이 있으며, 책임감이 강합니다. 새로운 도전을 두려워하지 않고, 원칙을 중시하는 성향입니다.',
  을: '부드러운 을목 일간입니다. 유연하고 적응력이 뛰어나며, 친화력이 좋습니다. 섬세하고 예술적 감각이 있으며, 사람들과 잘 어울립니다.',
  병: '밝고 뜨거운 병화 일간입니다. 활발하고 표현력이 풍부하며, 주목받는 것을 즐깁니다. 열정적이고 긍정적인 에너지로 주변을 밝게 합니다.',
  정: '따뜻하고 섬세한 정화 일간입니다. 감수성이 풍부하고 예의 바르며, 내면의 열정을 지닌 성격입니다. 사람에 대한 배려심이 깊습니다.',
  무: '넓고 두터운 무토 일간입니다. 신뢰감 있고 포용력이 크며, 묵직한 존재감을 가집니다. 안정적이고 실용적인 성향으로 믿음직스럽습니다.',
  기: '세밀하고 실질적인 기토 일간입니다. 성실하고 꼼꼼하며, 현실적인 문제 해결 능력이 뛰어납니다. 친절하고 봉사 정신이 강합니다.',
  경: '강하고 단단한 경금 일간입니다. 의지가 굳고 결단력이 있으며, 정의감이 강합니다. 원칙적이고 솔직한 성격으로 신뢰를 줍니다.',
  신: '빛나고 예리한 신금 일간입니다. 총명하고 미적 감각이 뛰어나며, 완벽을 추구합니다. 예리한 판단력과 세련된 감각을 지닙니다.',
  임: '깊고 흐르는 임수 일간입니다. 지혜롭고 유연하며, 큰 그림을 보는 능력이 있습니다. 잠재력이 크고 다재다능한 성격입니다.',
  계: '맑고 섬세한 계수 일간입니다. 총명하고 분석적이며, 직관력이 뛰어납니다. 감성적이고 사려 깊으며, 창의적인 사고를 즐깁니다.',
}

// Julian Day Number 계산
function getJDN(year, month, day) {
  const a = Math.floor((14 - month) / 12)
  const y = year + 4800 - a
  const m = month + 12 * a - 3
  return day + Math.floor((153 * m + 2) / 5) + 365 * y +
    Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045
}

// 연주 계산 (입춘 기준: 약 2월 4일)
function getYearPillar(year, month, day) {
  // 입춘 전이면 전년도 기준
  const adjYear = (month === 1 || (month === 2 && day < 4)) ? year - 1 : year
  const stemIdx = ((adjYear - 4) % 10 + 10) % 10
  const branchIdx = ((adjYear - 4) % 12 + 12) % 12
  return { stemIdx, branchIdx }
}

// 월주 계산 (절기 기준 근사값)
// 각 월의 절기 시작일 (근사: ±1일 오차 가능)
const MONTH_JEOLGI = [6, 4, 6, 5, 6, 6, 7, 7, 8, 8, 7, 7] // 각 월 절기 시작일
const MONTH_BRANCH = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0] // 각 월의 지지 (1월=축, 2월=인, ...)

function getMonthPillar(yearStemIdx, month, day) {
  const jeolgiDay = MONTH_JEOLGI[month - 1]
  let mBranchIdx
  if (day < jeolgiDay) {
    // 절기 이전 → 전달의 지지
    const prevMonth = month === 1 ? 12 : month - 1
    mBranchIdx = MONTH_BRANCH[prevMonth - 1]
  } else {
    mBranchIdx = MONTH_BRANCH[month - 1]
  }

  // 월간 계산 (오호둔두법: 연간 그룹에 따라 인월 천간 결정)
  // 갑/기년: 병인 시작 (2), 을/경년: 무인 시작 (4), 병/신년: 경인 (6), 정/임년: 임인 (8), 무/계년: 갑인 (0)
  const yearGroup = yearStemIdx % 5
  const inmonthStemStart = [2, 4, 6, 8, 0][yearGroup] // 인월 천간 시작 인덱스
  // 인월=2지지, 현재 월지지로부터 인월 이후 몇 번째 달인지 계산
  const monthsFromIn = ((mBranchIdx - 2) % 12 + 12) % 12
  const mStemIdx = (inmonthStemStart + monthsFromIn) % 10
  return { stemIdx: mStemIdx, branchIdx: mBranchIdx }
}

// 일주 계산
// 기준: 2020-01-01 = 병자일(丙子, index 12)
// dayIndex = (JDN + 22) % 60
function getDayPillar(year, month, day) {
  const jdn = getJDN(year, month, day)
  const dayIndex = ((jdn + 22) % 60 + 60) % 60
  const stemIdx = dayIndex % 10
  const branchIdx = dayIndex % 12
  return { stemIdx, branchIdx }
}

// 시주 계산 (오자둔두법)
function getHourPillar(dayStemIdx, hourBranchIdx) {
  const dayGroup = dayStemIdx % 5
  // 갑/기일: 갑자(0), 을/경일: 병자(2), 병/신일: 무자(4), 정/임일: 경자(6), 무/계일: 임자(8)
  const ziStemStart = [0, 2, 4, 6, 8][dayGroup]
  const stemIdx = (ziStemStart + hourBranchIdx) % 10
  return { stemIdx, branchIdx: hourBranchIdx }
}

function pillarLabel(stemIdx, branchIdx) {
  return `${CHEONGAN[stemIdx]}${JIJI[branchIdx]}`
}
function pillarKr(stemIdx, branchIdx) {
  return `${CHEONGAN_KR[stemIdx]}${JIJI_KR[branchIdx]}`
}

export default function SajuCalculator() {
  const [year, setYear] = useState('')
  const [month, setMonth] = useState('')
  const [day, setDay] = useState('')
  const [hour, setHour] = useState('-1') // -1 = 모름
  const [calType, setCalType] = useState('solar') // 'solar' | 'lunar'
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const currentYear = new Date().getFullYear()

  function calculate() {
    setError('')
    const y = parseInt(year)
    const m = parseInt(month)
    const d = parseInt(day)

    if (!y || !m || !d) { setError('생년월일을 모두 입력해 주세요.'); return }
    if (y < 1900 || y > currentYear) { setError('올바른 연도를 입력해 주세요.'); return }

    let solarY = y, solarM = m, solarD = d

    if (calType === 'lunar') {
      try {
        const lunar = Lunar.fromYmd(y, m, d)
        const solar = lunar.getSolar()
        solarY = solar.getYear()
        solarM = solar.getMonth()
        solarD = solar.getDay()
      } catch {
        setError('음력 날짜 변환에 실패했습니다. 날짜를 확인해 주세요.')
        return
      }
    }

    // 유효성 검사
    const testDate = new Date(solarY, solarM - 1, solarD)
    if (testDate.getFullYear() !== solarY || testDate.getMonth() !== solarM - 1 || testDate.getDate() !== solarD) {
      setError('유효하지 않은 날짜입니다.')
      return
    }

    const yearPillar = getYearPillar(solarY, solarM, solarD)
    const monthPillar = getMonthPillar(yearPillar.stemIdx, solarM, solarD)
    const dayPillar = getDayPillar(solarY, solarM, solarD)

    const hourBranch = parseInt(hour)
    let hourPillar = null
    if (hourBranch >= 0) {
      hourPillar = getHourPillar(dayPillar.stemIdx, hourBranch)
    }

    // 오행 집계
    const pillars = [yearPillar, monthPillar, dayPillar, ...(hourPillar ? [hourPillar] : [])]
    const ohaengCount = { 목: 0, 화: 0, 토: 0, 금: 0, 수: 0 }
    pillars.forEach(p => {
      ohaengCount[OHAENG_CG[p.stemIdx]]++
      ohaengCount[OHAENG_JJ[p.branchIdx]]++
    })
    const total = Object.values(ohaengCount).reduce((a, b) => a + b, 0)

    setResult({
      year: yearPillar,
      month: monthPillar,
      day: dayPillar,
      hour: hourPillar,
      ohaengCount,
      total,
      ilgan: CHEONGAN_KR[dayPillar.stemIdx],
      solarDate: calType === 'lunar' ? `${solarY}년 ${solarM}월 ${solarD}일 (양력 변환)` : null,
    })
  }

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
    appearance: 'none',
    WebkitAppearance: 'none',
  }
  const labelStyle = {
    fontSize: '12px',
    color: 'var(--text-muted)',
    marginBottom: '5px',
    display: 'block',
    fontWeight: '500',
  }

  return (
    <div>
      {/* 양력/음력 토글 */}
      <div style={{ display: 'flex', gap: '6px', marginBottom: '14px' }}>
        {['solar', 'lunar'].map((type) => (
          <button
            key={type}
            onClick={() => setCalType(type)}
            style={{
              padding: '7px 20px',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              background: calType === type ? 'var(--accent)' : 'var(--surface)',
              color: calType === type ? 'var(--accent-text)' : 'var(--text-muted)',
              fontSize: '13px',
              fontWeight: calType === type ? '600' : '400',
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            {type === 'solar' ? '양력' : '음력'}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
        {/* 날짜 입력 */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 1.5fr', gap: '10px' }}>
          <div>
            <label style={labelStyle}>연도</label>
            <input type="number" placeholder="1990" value={year} min="1900" max={currentYear}
              onChange={e => setYear(e.target.value)} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>월</label>
            <select value={month} onChange={e => setMonth(e.target.value)} style={inputStyle}>
              <option value="">월</option>
              {Array.from({ length: 12 }, (_, i) => i + 1).map(m => (
                <option key={m} value={m}>{m}월</option>
              ))}
            </select>
          </div>
          <div>
            <label style={labelStyle}>일</label>
            <select value={day} onChange={e => setDay(e.target.value)} style={inputStyle}>
              <option value="">일</option>
              {Array.from({ length: 31 }, (_, i) => i + 1).map(d => (
                <option key={d} value={d}>{d}일</option>
              ))}
            </select>
          </div>
        </div>

        {/* 시간 선택 */}
        <div>
          <label style={labelStyle}>태어난 시간</label>
          <select value={hour} onChange={e => setHour(e.target.value)} style={inputStyle}>
            <option value="-1">모름 (시주 제외)</option>
            {SIJIN.map((s, i) => (
              <option key={i} value={s.branch}>{s.label} ({s.range})</option>
            ))}
          </select>
        </div>

        {error && (
          <p style={{ fontSize: '13px', color: '#d95c2e', padding: '8px 12px', background: 'rgba(217,92,46,0.08)', borderRadius: '6px' }}>{error}</p>
        )}

        <button onClick={calculate} style={{ width: '100%', padding: '13px', background: 'var(--accent)', color: 'var(--accent-text)', border: 'none', borderRadius: '10px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit' }}>
          사주 계산하기
        </button>
      </div>

      {result && (
        <div style={{ animation: 'fadeUp 0.3s ease' }}>
          <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(8px) } to { opacity:1; transform:translateY(0) } }`}</style>

          {result.solarDate && (
            <p style={{ fontSize: '12px', color: 'var(--text-hint)', marginBottom: '10px' }}>
              양력 변환: {result.solarDate}
            </p>
          )}

          {/* 사주팔자 */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '10px', padding: '18px 16px', marginBottom: '10px' }}>
            <p style={{ fontSize: '12px', color: 'var(--text-hint)', marginBottom: '12px' }}>사주팔자</p>
            <div style={{ display: 'grid', gridTemplateColumns: result.hour ? '1fr 1fr 1fr 1fr' : '1fr 1fr 1fr', gap: '8px' }}>
              {[
                { label: '년주', pillar: result.year },
                { label: '월주', pillar: result.month },
                { label: '일주', pillar: result.day, isDay: true },
                ...(result.hour ? [{ label: '시주', pillar: result.hour }] : []),
              ].map(({ label, pillar, isDay }) => (
                <div key={label} style={{
                  textAlign: 'center',
                  padding: '14px 8px',
                  border: `1px solid ${isDay ? 'var(--accent)' : 'var(--border)'}`,
                  borderRadius: '10px',
                  background: isDay ? 'var(--bg)' : 'transparent',
                }}>
                  <p style={{ fontSize: '11px', color: 'var(--text-hint)', marginBottom: '8px' }}>{label}</p>
                  <p style={{ fontSize: '26px', fontWeight: '700', letterSpacing: '0.05em', lineHeight: 1 }}>
                    {CHEONGAN[pillar.stemIdx]}
                  </p>
                  <p style={{ fontSize: '26px', fontWeight: '700', letterSpacing: '0.05em', lineHeight: 1, marginTop: '4px' }}>
                    {JIJI[pillar.branchIdx]}
                  </p>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '6px' }}>
                    {pillarKr(pillar.stemIdx, pillar.branchIdx)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 오행 비율 */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '10px', padding: '16px', marginBottom: '10px' }}>
            <p style={{ fontSize: '12px', color: 'var(--text-hint)', marginBottom: '12px' }}>오행 비율</p>
            {['목', '화', '토', '금', '수'].map(elem => {
              const count = result.ohaengCount[elem]
              const pct = Math.round(count / result.total * 100)
              return (
                <div key={elem} style={{ marginBottom: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: '500' }}>{elem}</span>
                    <span style={{ fontSize: '12px', color: 'var(--text-hint)' }}>{count}개 ({pct}%)</span>
                  </div>
                  <div style={{ height: '6px', background: 'var(--border)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${pct}%`, background: OHAENG_COLOR[elem], borderRadius: '3px', transition: 'width 0.6s ease' }} />
                  </div>
                </div>
              )
            })}
          </div>

          {/* 일간 성격 */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '10px', padding: '16px', marginBottom: '10px' }}>
            <p style={{ fontSize: '12px', color: 'var(--text-hint)', marginBottom: '8px' }}>일간 ({CHEONGAN[result.day.stemIdx]}{CHEONGAN_KR[result.day.stemIdx]}) 기반 성격</p>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.8' }}>
              {ILGAN_DESC[result.ilgan]}
            </p>
          </div>

          <div style={{ fontSize: '12px', color: 'var(--text-hint)', lineHeight: '1.7', padding: '12px 14px', borderLeft: '2px solid var(--border)', borderRadius: '0 6px 6px 0' }}>
            절기 기준 계산이며, 절기 전후 1~2일은 실제 명리학 전문가의 판단이 다를 수 있습니다.
          </div>
        </div>
      )}
    </div>
  )
}
