import { useState } from 'react';
import Head from 'next/head';
import ContentSection from '../components/ContentSection';

function comma(n) { return (!n && n !== 0) ? '' : Math.round(n).toLocaleString(); }

function calcEqualPayment(p, ar, m) {
  const r = ar / 100 / 12;
  if (r === 0) return { monthly: p / m, totalInterest: 0, total: p };
  const monthly = (p * r * Math.pow(1 + r, m)) / (Math.pow(1 + r, m) - 1);
  return { monthly, totalInterest: monthly * m - p, total: monthly * m };
}

function calcEqualPrincipal(p, ar, m) {
  const r = ar / 100 / 12;
  const ppm = p / m;
  let totalInterest = 0;
  for (let i = 0; i < m; i++) totalInterest += (p - ppm * i) * r;
  return { firstMonth: ppm + p * r, totalInterest, total: p + totalInterest };
}

function calcDeposit(p, ar, m, type) {
  const r = ar / 100;
  if (type === 'simple') {
    const interest = p * r * (m / 12);
    return { interest, total: p + interest, afterTax: interest * 0.846 };
  }
  const total = p * Math.pow(1 + r / 12, m);
  const interest = total - p;
  return { interest, total, afterTax: interest * 0.846 };
}

function Row({ label, children }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: 'block', fontSize: 12, color: '#888', marginBottom: 5 }}>{label}</label>
      {children}
    </div>
  );
}

function StatCard({ label, value, accent }) {
  return (
    <div style={{ background: accent ? '#f0f4ff' : '#f8f8f8', border: `1px solid ${accent ? '#c7d7fa' : '#eee'}`, borderRadius: 10, padding: '12px 14px' }}>
      <div style={{ fontSize: 11, color: '#888', marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 16, fontWeight: 700, color: accent ? '#1a56db' : '#111', wordBreak: 'break-all' }}>{value}</div>
    </div>
  );
}

export default function InterestPage() {
  const [tab, setTab] = useState('loan');
  const [repayType, setRepayType] = useState('equal');
  const [loanAmt, setLoanAmt] = useState('100000000');
  const [loanRate, setLoanRate] = useState('4.5');
  const [loanMonths, setLoanMonths] = useState('240');
  const [depAmt, setDepAmt] = useState('10000000');
  const [depRate, setDepRate] = useState('3.5');
  const [depMonths, setDepMonths] = useState('12');
  const [depType, setDepType] = useState('compound');

  const card = { background: '#fff', border: '1px solid #eee', borderRadius: 12, padding: '20px 16px', marginBottom: 16 };
  const inp = { width: '100%', padding: '8px 10px', fontSize: 14, border: '1px solid #ddd', borderRadius: 8, boxSizing: 'border-box' };

  const loanRes = (() => {
    const p = Number(loanAmt), r = Number(loanRate), m = Number(loanMonths);
    if (!p || !r || !m) return null;
    return repayType === 'equal' ? calcEqualPayment(p, r, m) : calcEqualPrincipal(p, r, m);
  })();

  const depRes = (() => {
    const p = Number(depAmt), r = Number(depRate), m = Number(depMonths);
    if (!p || !r || !m) return null;
    return calcDeposit(p, r, m, depType);
  })();

  const tabBtn = (id, label) => (
    <button onClick={() => setTab(id)} style={{ padding: '7px 18px', borderRadius: 20, border: 'none', fontSize: 13, cursor: 'pointer', background: tab === id ? '#111' : '#f0f0f0', color: tab === id ? '#fff' : '#555', fontWeight: tab === id ? 700 : 400 }}>{label}</button>
  );

  const toggleBtn = (current, setCurrent, id, label) => (
    <button onClick={() => setCurrent(id)} style={{ padding: '6px 14px', borderRadius: 8, border: '1px solid #ddd', fontSize: 13, cursor: 'pointer', background: current === id ? '#e8f0fe' : '#fff', color: current === id ? '#1a56db' : '#555', fontWeight: current === id ? 700 : 400 }}>{label}</button>
  );

  return (
    <>
      <Head>
        <title>대출이자 계산기 · 예금이자 계산기 2026 | 만나이</title>
        <meta name="description" content="대출 월 납입금, 총 이자, 예금 만기 수령액을 바로 계산하세요. 원리금균등·원금균등 상환 방식 모두 지원. 세후 이자 자동 계산." />
      </Head>

      <main style={{ maxWidth: 680, margin: '0 auto', padding: '24px 16px 0', fontFamily: 'sans-serif' }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>🏦 대출 · 예금 이자 계산기</h1>
        <p style={{ fontSize: 14, color: '#888', marginBottom: 20 }}>대출 월 상환액, 예금 만기 수령액을 즉시 계산해보세요</p>

        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          {tabBtn('loan', '대출 이자')}
          {tabBtn('deposit', '예금 이자')}
        </div>

        {tab === 'loan' && (
          <>
            <div style={card}>
              <Row label="대출 금액 (원)">
                <input type="number" value={loanAmt} onChange={e => setLoanAmt(e.target.value)} style={inp} />
                <div style={{ fontSize: 11, color: '#aaa', marginTop: 3 }}>{Number(loanAmt) ? `${(Number(loanAmt)/10000).toLocaleString()} 만원` : ''}</div>
              </Row>
              <Row label="연이율 (%)"><input type="number" step="0.1" value={loanRate} onChange={e => setLoanRate(e.target.value)} style={inp} /></Row>
              <Row label="상환 기간 (개월)">
                <input type="number" value={loanMonths} onChange={e => setLoanMonths(e.target.value)} style={inp} />
                <div style={{ fontSize: 11, color: '#aaa', marginTop: 3 }}>{Number(loanMonths) ? `${(Number(loanMonths)/12).toFixed(1)}년` : ''}</div>
              </Row>
              <Row label="상환 방식">
                <div style={{ display: 'flex', gap: 8 }}>
                  {toggleBtn(repayType, setRepayType, 'equal', '원리금균등')}
                  {toggleBtn(repayType, setRepayType, 'principal', '원금균등')}
                </div>
              </Row>
            </div>
            {loanRes && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                <StatCard label={repayType === 'equal' ? '월 납입액' : '첫달 납입액'} value={`${comma(repayType === 'equal' ? loanRes.monthly : loanRes.firstMonth)}원`} accent />
                <StatCard label="총 이자" value={`${comma(loanRes.totalInterest)}원`} />
                <StatCard label="총 상환액" value={`${comma(loanRes.total)}원`} />
              </div>
            )}
          </>
        )}

        {tab === 'deposit' && (
          <>
            <div style={card}>
              <Row label="예금 원금 (원)">
                <input type="number" value={depAmt} onChange={e => setDepAmt(e.target.value)} style={inp} />
                <div style={{ fontSize: 11, color: '#aaa', marginTop: 3 }}>{Number(depAmt) ? `${(Number(depAmt)/10000).toLocaleString()} 만원` : ''}</div>
              </Row>
              <Row label="연이율 (%)"><input type="number" step="0.1" value={depRate} onChange={e => setDepRate(e.target.value)} style={inp} /></Row>
              <Row label="기간 (개월)"><input type="number" value={depMonths} onChange={e => setDepMonths(e.target.value)} style={inp} /></Row>
              <Row label="이자 방식">
                <div style={{ display: 'flex', gap: 8 }}>
                  {toggleBtn(depType, setDepType, 'compound', '복리')}
                  {toggleBtn(depType, setDepType, 'simple', '단리')}
                </div>
              </Row>
            </div>
            {depRes && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                <StatCard label="세전 이자" value={`${comma(depRes.interest)}원`} accent />
                <StatCard label="세후 이자 (15.4%)" value={`${comma(depRes.afterTax)}원`} />
                <StatCard label="만기 수령액" value={`${comma(depRes.total)}원`} />
              </div>
            )}
          </>
        )}

        <div style={{ marginTop: 16, padding: '12px 16px', background: '#f0f4ff', borderRadius: 10, fontSize: 12, color: '#888' }}>
          ※ 이자소득세 15.4% (소득세 14% + 지방소득세 1.4%) 기준. 실제 금리는 금융사마다 다릅니다.
        </div>
      </main>

      <ContentSection sections={[
        {
          title: '대출 이자 계산기 사용 방법',
          type: 'steps',
          items: [
            '대출 금액을 입력합니다. 예: 3억 원이라면 300000000을 입력합니다.',
            '금융사에서 안내받은 연이율(%)을 입력합니다.',
            '상환 기간을 개월 단위로 입력합니다. 20년 = 240개월입니다.',
            '원리금균등 또는 원금균등 방식을 선택합니다.',
            '월 납입액, 총 이자, 총 상환액이 자동으로 계산됩니다.',
          ],
        },
        {
          title: '원리금균등 vs 원금균등 차이',
          type: 'list',
          items: [
            { term: '원리금균등 상환', desc: '매달 같은 금액을 납부합니다. 초반에는 이자 비중이 높고 후반에는 원금 비중이 높아집니다. 고정된 월 납입액으로 생활비 계획을 세우기 쉬운 장점이 있습니다.' },
            { term: '원금균등 상환', desc: '매달 같은 금액의 원금을 갚고 이자는 잔여 원금에 비례해 줄어듭니다. 초반 납입액이 높지만 총 이자 부담이 원리금균등보다 적습니다.' },
            { term: '단리 (예금)', desc: '원금에만 이자가 붙는 방식입니다. 계산이 단순하며 단기 예금 상품에 주로 적용됩니다.' },
            { term: '복리 (예금)', desc: '이자에 이자가 붙는 방식으로 기간이 길수록 단리보다 더 많은 이자를 받을 수 있습니다. 장기 저축 상품에 유리합니다.' },
          ],
        },
        {
          title: '자주 묻는 질문',
          type: 'faq',
          items: [
            { q: '예금 이자에서 세금이 얼마나 빠지나요?', a: '이자소득에는 소득세 14%와 지방소득세 1.4%가 부과되어 총 15.4%가 원천징수됩니다. 예를 들어 세전 이자가 100만 원이라면 실제 수령액은 846,000원입니다.' },
            { q: '2026년 현재 주택담보대출 금리는 얼마인가요?', a: '2026년 기준 주요 시중은행의 주택담보대출 금리는 연 3.5~5% 수준입니다. 금리는 개인 신용등급, 담보 조건에 따라 달라지므로 각 은행 홈페이지에서 확인하시길 권장합니다.' },
            { q: '중도상환수수료는 계산기에 포함되나요?', a: '본 계산기는 약정 기간 동안 정상 상환하는 경우를 기준으로 합니다. 중도 상환 시 발생하는 수수료(통상 잔여 원금의 0~1.4%)는 포함되어 있지 않습니다.' },
          ],
        },
      ]} />
    </>
  );
}
