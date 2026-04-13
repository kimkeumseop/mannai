export default async function handler(req, res) {
  try {
    const response = await fetch('https://open.er-api.com/v6/latest/USD');
    if (!response.ok) throw new Error('환율 API 오류');
    const data = await response.json();
    const usdToKrw = data.rates.KRW;
    const rates = {
      USD: { rate: usdToKrw, name: '미국 달러', symbol: '$', flag: '🇺🇸' },
      JPY: { rate: (usdToKrw / data.rates.JPY) * 100, name: '일본 엔 (100엔)', symbol: '¥', flag: '🇯🇵' },
      EUR: { rate: usdToKrw / data.rates.EUR, name: '유로', symbol: '€', flag: '🇪🇺' },
      CNY: { rate: usdToKrw / data.rates.CNY, name: '중국 위안', symbol: '¥', flag: '🇨🇳' },
      GBP: { rate: usdToKrw / data.rates.GBP, name: '영국 파운드', symbol: '£', flag: '🇬🇧' },
    };
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    res.status(200).json({ rates, updatedAt: data.time_last_update_utc });
  } catch (err) {
    res.status(500).json({ error: '환율 데이터를 불러올 수 없습니다.' });
  }
}
