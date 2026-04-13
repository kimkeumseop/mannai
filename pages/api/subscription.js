const BASE_URL = 'http://openapi.lh.or.kr/WebOpenApi/service/PblancInfoApi/getPblancList';

export default async function handler(req, res) {
  const { sido = '', pageNo = 1, numOfRows = 20 } = req.query;
  const serviceKey = process.env.PUBLIC_DATA_KEY;

  if (!serviceKey) {
    return res.status(200).json({ items: getMockData(), totalCount: 6, isMock: true });
  }

  try {
    const params = new URLSearchParams({ serviceKey, pageNo, numOfRows, type: 'json', ...(sido && { SIDO_NM: sido }) });
    const response = await fetch(`${BASE_URL}?${params}`);
    if (!response.ok) throw new Error('LH API 오류');
    const data = await response.json();
    const items = (data.body?.items?.item || []).map((item) => ({
      id: item.PBLANC_NO,
      name: item.PBLANC_NM,
      region: `${item.SIDO_NM} ${item.SIGUNGU_NM}`,
      company: item.BSNS_MBY_NM,
      startDate: item.RCRIT_PBLANC_DE,
      endDate: item.SUBS_RCRIT_PBLANC_DE,
      supplyType: item.HOUSE_SECD_NM,
      totalCount: item.TOT_SUPLY_HSHLDCO,
      url: item.PBLANC_URL,
    }));
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    res.status(200).json({ items, totalCount: data.body?.totalCount || 0, isMock: false });
  } catch (err) {
    res.status(500).json({ error: '청약 데이터를 불러올 수 없습니다.' });
  }
}

function getMockData() {
  return [
    { id: '1', name: '위례신도시 A3-1블록 공공분양', region: '경기 성남시', company: 'LH', startDate: '20260401', endDate: '20260405', supplyType: '공공분양', totalCount: 480, url: '#' },
    { id: '2', name: '인천검단 AA29블록 행복주택', region: '인천 서구', company: 'LH', startDate: '20260408', endDate: '20260412', supplyType: '행복주택', totalCount: 210, url: '#' },
    { id: '3', name: '고양창릉 A1블록 3기신도시', region: '경기 고양시', company: 'LH', startDate: '20260415', endDate: '20260417', supplyType: '공공분양', totalCount: 890, url: '#' },
    { id: '4', name: '남양주왕숙 B4블록 뉴홈', region: '경기 남양주시', company: 'LH', startDate: '20260422', endDate: '20260424', supplyType: '뉴홈', totalCount: 650, url: '#' },
    { id: '5', name: '부산에코델타시티 행복주택', region: '부산 강서구', company: 'LH', startDate: '20260501', endDate: '20260507', supplyType: '행복주택', totalCount: 320, url: '#' },
    { id: '6', name: '대전도안 2-2BL 공공임대', region: '대전 유성구', company: 'LH', startDate: '20260510', endDate: '20260514', supplyType: '공공임대', totalCount: 175, url: '#' },
  ];
}
