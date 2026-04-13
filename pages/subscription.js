import { useState, useEffect } from 'react';
import Head from 'next/head';
import ContentSection from '../components/ContentSection';

const SIDO_LIST = ['전체','서울','경기','인천','부산','대구','광주','대전','울산','세종','강원','충북','충남','전북','전남','경북','경남','제주'];
const TYPE_COLORS = {
  '공공분양': { bg: '#e8f0fe', text: '#1a56db' },
  '뉴홈':    { bg: '#fce8f3', text: '#9c1b78' },
  '행복주택': { bg: '#def7ec', text: '#057a55' },
  '공공임대': { bg: '#fdf6b2', text: '#92400e' },
  '기타':    { bg: '#f3f4f6', text: '#374151' },
};

function getDday(s) {
  if (!s) return null;
  const target = new Date(`${s.slice(0,4)}-${s.slice(4,6)}-${s.slice(6,8)}`);
  const today = new Date(); today.setHours(0,0,0,0);
  return Math.ceil((target - today) / 86400000);
}
function fmt(s) { return s?.length >= 8 ? `${s.slice(0,4)}.${s.slice(4,6)}.${s.slice(6,8)}` : s; }

export default function SubscriptionPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sido, setSido] = useState('전체');
  const [isMock, setIsMock] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/subscription?sido=${encodeURIComponent(sido === '전체' ? '' : sido)}&numOfRows=30`)
      .then(r => r.json())
      .then(data => { if (data.error) throw new Error(); setItems(data.items || []); setIsMock(data.isMock); })
      .catch(() => setError('데이터를 불러올 수 없습니다.'))
      .finally(() => setLoading(false));
  }, [sido]);

  return (
    <>
      <Head>
        <title>LH 청약 일정 2026 — 공공분양·뉴홈·행복주택 | 만나이</title>
        <meta name="description" content="2026년 LH 공공분양, 뉴홈, 행복주택, 공공임대 청약 일정을 지역별로 확인하세요. 접수 마감 D-day 자동 표시." />
      </Head>

      <main style={{ maxWidth: 680, margin: '0 auto', padding: '24px 16px 0', fontFamily: 'sans-serif' }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>🏠 LH 청약 일정</h1>
        <p style={{ fontSize: 14, color: '#888', marginBottom: 20 }}>공공분양·뉴홈·행복주택 청약 공고를 지역별로 확인하세요</p>

        {isMock && (
          <div style={{ background: '#fffbe6', border: '1px solid #ffe58f', borderRadius: 10, padding: '10px 14px', marginBottom: 16, fontSize: 12, color: '#888' }}>
            ⚠️ 샘플 데이터 표시 중. .env.local에 PUBLIC_DATA_KEY 등록 시 실시간 연동됩니다.
          </div>
        )}

        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 20 }}>
          {SIDO_LIST.map(s => (
            <button key={s} onClick={() => setSido(s)} style={{ padding: '5px 12px', borderRadius: 20, border: 'none', fontSize: 12, cursor: 'pointer', background: sido === s ? '#111' : '#f0f0f0', color: sido === s ? '#fff' : '#555', fontWeight: sido === s ? 700 : 400 }}>{s}</button>
          ))}
        </div>

        {loading && <div style={{ textAlign: 'center', padding: 40, color: '#aaa' }}>청약 정보 불러오는 중...</div>}
        {error && <p style={{ color: '#e55' }}>{error}</p>}

        {!loading && !error && (
          <>
            <div style={{ fontSize: 13, color: '#888', marginBottom: 10 }}>총 <strong style={{ color: '#111' }}>{items.length}</strong>건</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {items.map(item => {
                const dday = getDday(item.endDate);
                const tc = TYPE_COLORS[item.supplyType] || TYPE_COLORS['기타'];
                const ddayColor = dday === null ? '#888' : dday < 0 ? '#9ca3af' : dday <= 3 ? '#dc2626' : dday <= 7 ? '#d97706' : '#1a56db';
                const ddayBg = dday === null ? '#f3f4f6' : dday < 0 ? '#f3f4f6' : dday <= 3 ? '#fee2e2' : dday <= 7 ? '#fef3c7' : '#f0f4ff';
                return (
                  <div key={item.id} style={{ background: '#fff', border: '1px solid #eee', borderRadius: 12, padding: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ fontSize: 11, padding: '3px 8px', borderRadius: 20, fontWeight: 600, background: tc.bg, color: tc.text }}>{item.supplyType}</span>
                      {dday !== null && <span style={{ fontSize: 11, padding: '3px 8px', borderRadius: 20, fontWeight: 600, background: ddayBg, color: ddayColor }}>{dday < 0 ? '마감' : dday === 0 ? 'D-Day' : `D-${dday}`}</span>}
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: '#111', marginBottom: 8, lineHeight: 1.4 }}>{item.name}</div>
                    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', fontSize: 13, color: '#555', marginBottom: 10 }}>
                      <span>📍 {item.region}</span>
                      <span>🏢 {item.company}</span>
                      {item.totalCount && <span>🏠 {Number(item.totalCount).toLocaleString()}세대</span>}
                    </div>
                    <div style={{ display: 'flex', gap: 16, paddingTop: 10, borderTop: '1px solid #f5f5f5', fontSize: 12, color: '#888' }}>
                      <span>접수 시작 <strong style={{ color: '#333' }}>{fmt(item.startDate)}</strong></span>
                      <span>접수 마감 <strong style={{ color: dday !== null && dday >= 0 && dday <= 3 ? '#dc2626' : '#333' }}>{fmt(item.endDate)}</strong></span>
                    </div>
                    {item.url && item.url !== '#' && <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', marginTop: 10, fontSize: 12, color: '#1a56db', textDecoration: 'none' }}>공고 자세히 보기 →</a>}
                  </div>
                );
              })}
            </div>
          </>
        )}
        <div style={{ marginTop: 20, padding: '12px 16px', background: '#f8f8f8', borderRadius: 10, fontSize: 12, color: '#888' }}>
          ※ LH 공공데이터 기반. 청약 신청은 반드시 <a href="https://www.applyhome.co.kr" target="_blank" rel="noopener noreferrer" style={{ color: '#1a56db' }}>청약홈 공식 사이트</a>에서 확인하세요.
        </div>
      </main>

      <ContentSection sections={[
        {
          title: '공공 청약 유형별 안내',
          type: 'list',
          items: [
            { term: '공공분양 (뉴홈 포함)', desc: 'LH 또는 지방공사가 공급하는 분양 주택으로 시세보다 저렴하게 내 집을 마련할 수 있습니다. 무주택 세대구성원이라면 청약통장 가입 후 일정 기간이 지나면 신청 가능합니다.' },
            { term: '행복주택', desc: '청년, 신혼부부, 주거급여 수급자 등을 위한 공공임대주택입니다. 시세 대비 60~80% 수준의 임대료로 최대 6~10년 거주가 가능합니다.' },
            { term: '공공임대', desc: '국민임대, 영구임대, 장기전세 등 다양한 유형의 공공임대주택입니다. 소득 수준에 따라 임대료가 결정되며 장기간 안정적으로 거주할 수 있습니다.' },
            { term: '통합공공임대', desc: '기존 복잡한 공공임대 유형을 통합한 새로운 유형으로, 입주자 소득에 따라 임대 조건이 자동으로 조정됩니다.' },
          ],
        },
        {
          title: '청약 신청 절차',
          type: 'steps',
          items: [
            '청약통장 가입 — 주택청약종합저축에 가입하여 매월 일정 금액을 납입합니다.',
            '청약 공고 확인 — 본 페이지 또는 청약홈(applyhome.co.kr)에서 관심 지역 공고를 확인합니다.',
            '입주자모집공고문 열람 — 공급 세대수, 자격 조건, 청약 일정을 꼼꼼히 확인합니다.',
            '청약 신청 — 인터넷(청약홈), 모바일 앱 또는 은행 방문을 통해 청약을 신청합니다.',
            '당첨자 발표 확인 — 청약홈에서 당첨 여부를 확인하고, 당첨 시 서류를 준비합니다.',
            '계약 체결 — 지정된 기간 내에 계약을 완료합니다.',
          ],
        },
        {
          title: '청약 관련 자주 묻는 질문',
          type: 'faq',
          items: [
            { q: '청약통장은 언제부터 가입할 수 있나요?', a: '주택청약종합저축은 연령 제한 없이 누구나 가입 가능하며, 가입 즉시 효력이 발생합니다. 공공분양의 경우 통상 12~24회 이상 납입 실적이 필요하므로 가능한 빨리 가입하는 것이 유리합니다.' },
            { q: '뉴홈(나눔형)과 일반 공공분양의 차이는 무엇인가요?', a: '뉴홈은 시세의 70~80% 수준으로 분양받고, 전매 시 시세차익의 일부를 LH에 반환하는 조건으로 더 낮은 가격에 내 집을 마련하는 공공분양 유형입니다.' },
            { q: '행복주택 입주 후 계속 거주할 수 있나요?', a: '행복주택은 청년(6년), 신혼부부(6~10년), 고령자(20년) 등 계층별로 최대 거주 기간이 정해져 있습니다. 2년 단위로 재계약이 가능합니다.' },
          ],
        },
      ]} />
    </>
  );
}
