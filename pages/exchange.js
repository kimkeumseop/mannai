import { useState, useEffect } from 'react';
import Head from 'next/head';
import ContentSection from '../components/ContentSection';

const CURRENCIES = ['USD', 'JPY', 'EUR', 'CNY', 'GBP'];

export default function ExchangePage() {
  const [rates, setRates] = useState(null);
  const [updatedAt, setUpdatedAt] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [amount, setAmount] = useState('100');
  const [fromCur, setFromCur] = useState('USD');
  const [toCur, setToCur] = useState('KRW');

  useEffect(() => {
    fetch('/api/exchange-rate')
      .then(r => r.json())
      .then(data => { if (data.error) throw new Error(); setRates(data.rates); setUpdatedAt(data.updatedAt); })
      .catch(() => setError('환율 데이터를 불러올 수 없습니다.'))
      .finally(() => setLoading(false));
  }, []);

  const getConverted = () => {
    if (!rates || !amount) return '—';
    const n = Number(String(amount).replace(/,/g, ''));
    if (isNaN(n)) return '—';
    let krw;
    if (fromCur === 'KRW') krw = n;
    else if (fromCur === 'JPY') krw = Math.round((n / 100) * rates['JPY'].rate);
    else krw = Math.round(n * rates[fromCur].rate);
    if (toCur === 'KRW') return krw.toLocaleString() + ' 원';
    if (toCur === 'JPY') return ((krw / rates['JPY'].rate) * 100).toFixed(0) + ' 엔';
    return (krw / rates[toCur].rate).toFixed(2) + ' ' + toCur;
  };

  const allCurrencies = ['KRW', ...CURRENCIES];
  const card = { background: '#fff', border: '1px solid #eee', borderRadius: 12, padding: 16, marginBottom: 8 };
  const lbl = { display: 'block', fontSize: 12, color: '#888', marginBottom: 4 };
  const inp = { width: '100%', padding: '8px 10px', fontSize: 14, border: '1px solid #ddd', borderRadius: 8, boxSizing: 'border-box' };

  return (
    <>
      <Head>
        <title>환율 계산기 2026 — 달러 엔화 유로 원화 실시간 변환 | 만나이</title>
        <meta name="description" content="달러(USD), 엔화(JPY), 유로(EUR), 위안(CNY) 원화 환율을 실시간으로 계산하세요. 1시간 주기 업데이트, 주요 통화 한눈에 비교." />
      </Head>

      <main style={{ maxWidth: 680, margin: '0 auto', padding: '24px 16px 0', fontFamily: 'sans-serif' }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>💱 환율 계산기</h1>
        <p style={{ fontSize: 14, color: '#888', marginBottom: 24 }}>
          {updatedAt ? `기준: ${new Date(updatedAt).toLocaleDateString('ko-KR')} 업데이트` : '실시간 환율 기준 · 1시간 주기 갱신'}
        </p>

        <div style={card}>
          <div style={{ display: 'flex', gap: 10, marginBottom: 12, flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 120 }}>
              <label style={lbl}>금액</label>
              <input type="number" value={amount} onChange={e => setAmount(e.target.value)} style={inp} placeholder="금액 입력" />
            </div>
            <div style={{ flex: 1, minWidth: 100 }}>
              <label style={lbl}>변환 전</label>
              <select value={fromCur} onChange={e => setFromCur(e.target.value)} style={inp}>
                {allCurrencies.map(c => <option key={c} value={c}>{c === 'KRW' ? '🇰🇷 KRW 원화' : `${rates?.[c]?.flag || ''} ${c} ${rates?.[c]?.name || ''}`}</option>)}
              </select>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', paddingBottom: 6 }}>
              <span style={{ fontSize: 20, color: '#aaa' }}>→</span>
            </div>
            <div style={{ flex: 1, minWidth: 100 }}>
              <label style={lbl}>변환 후</label>
              <select value={toCur} onChange={e => setToCur(e.target.value)} style={inp}>
                {allCurrencies.map(c => <option key={c} value={c}>{c === 'KRW' ? '🇰🇷 KRW 원화' : `${rates?.[c]?.flag || ''} ${c} ${rates?.[c]?.name || ''}`}</option>)}
              </select>
            </div>
          </div>
          <div style={{ background: '#f0f4ff', borderRadius: 10, padding: '16px 20px', textAlign: 'center' }}>
            <div style={{ fontSize: 13, color: '#888', marginBottom: 4 }}>환산 결과</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: '#1a56db' }}>
              {loading ? '불러오는 중...' : error ? error : getConverted()}
            </div>
          </div>
        </div>

        <h2 style={{ fontSize: 16, fontWeight: 700, margin: '28px 0 12px' }}>오늘의 주요 환율</h2>
        {loading && <p style={{ color: '#aaa', fontSize: 14 }}>불러오는 중...</p>}
        {rates && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {CURRENCIES.map(cur => {
              const r = rates[cur];
              return (
                <div key={cur} style={{ ...card, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', marginBottom: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 22 }}>{r.flag}</span>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14 }}>{r.name}</div>
                      <div style={{ fontSize: 12, color: '#888' }}>{cur}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 18, fontWeight: 700 }}>{Math.round(r.rate).toLocaleString()} <span style={{ fontSize: 13, color: '#888' }}>원</span></div>
                    <div style={{ fontSize: 11, color: '#aaa' }}>{cur === 'JPY' ? '100엔 기준' : `1${cur} 기준`}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <div style={{ marginTop: 16, padding: '12px 16px', background: '#fffbe6', borderRadius: 10, fontSize: 12, color: '#888' }}>
          ※ 시장 환율 기준이며 실제 환전 시 은행 수수료가 적용됩니다.
        </div>
      </main>

      <ContentSection sections={[
        {
          title: '환율 계산기 사용 방법',
          type: 'steps',
          items: [
            '환산할 금액을 입력합니다. (예: 100)',
            '변환 전 통화를 선택합니다. (예: USD 미국 달러)',
            '변환 후 통화를 선택합니다. (예: KRW 한국 원)',
            '결과창에 환산된 금액이 즉시 표시됩니다.',
            '아래 주요 환율 표에서 오늘의 통화별 환율을 한눈에 확인할 수 있습니다.',
          ],
        },
        {
          title: '주요 통화 안내',
          type: 'list',
          items: [
            { term: 'USD (미국 달러)', desc: '세계 기축통화로 국제 거래의 기준이 되는 통화입니다. 원달러 환율은 한국 경제에 가장 큰 영향을 미칩니다.' },
            { term: 'JPY (일본 엔화)', desc: '일본의 공식 통화로, 한국인 여행객이 가장 많이 환전하는 통화 중 하나입니다. 보통 100엔 단위로 환율을 표시합니다.' },
            { term: 'EUR (유로)', desc: '유럽연합(EU) 19개국이 공동으로 사용하는 통화입니다. 달러 다음으로 거래량이 많은 기축통화입니다.' },
            { term: 'CNY (중국 위안)', desc: '중국의 공식 통화로 인민폐라고도 부릅니다. 중국과의 교역 증가로 원위안 환율의 중요성이 높아지고 있습니다.' },
            { term: 'GBP (영국 파운드)', desc: '영국의 공식 통화로 세계에서 가장 오래된 통화 중 하나입니다. 주요 통화 중 단위 가치가 높습니다.' },
          ],
        },
        {
          title: '환율 관련 자주 묻는 질문',
          type: 'faq',
          items: [
            { q: '이 환율 계산기는 얼마나 자주 업데이트되나요?', a: '환율 데이터는 1시간 주기로 자동 갱신됩니다. 표시된 환율은 국제 외환 시장 기준의 참고 환율이며, 실제 은행 창구 환율과는 소폭 차이가 있을 수 있습니다.' },
            { q: '실제 환전할 때 계산기 금액과 다른 이유는 무엇인가요?', a: '은행과 환전소는 매매기준율에 수수료(스프레드)를 더해 환전 금액을 산정합니다. 시중 은행은 보통 1~1.5%의 환전 수수료를 적용합니다. 인터넷·앱 환전이나 환전 우대쿠폰을 이용하면 수수료를 줄일 수 있습니다.' },
            { q: '환율이 오르면 어떤 의미인가요?', a: '원달러 환율이 오른다는 것은 달러 대비 원화 가치가 하락(원화 약세)함을 의미합니다. 수출 기업에게는 유리하지만 수입 물가가 상승하고, 해외여행·유학 비용이 늘어납니다.' },
            { q: '일본 엔화 환율이 100엔 기준인 이유는 무엇인가요?', a: '엔화는 단위가 작아 1엔당 원화 환율이 한 자리 수가 되기 때문에 편의상 100엔 기준으로 표시하는 것이 일반적입니다. 예를 들어 100엔 = 940원이라면 1엔 = 9.4원입니다.' },
          ],
        },
      ]} />
    </>
  );
}
