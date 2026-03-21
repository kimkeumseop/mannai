export const siteUrl = 'https://mannai-two.vercel.app'

export function buildFaqSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: a,
      },
    })),
  }
}

export function buildBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.path === '/' ? siteUrl : `${siteUrl}${item.path}`,
    })),
  }
}

export function buildSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        name: '계산기 모음',
        url: siteUrl,
        description: '만나이, 급여, 전월세, 사주 무료 계산기',
      },
      {
        '@type': 'Organization',
        name: '계산기 모음',
        url: siteUrl,
        logo: `${siteUrl}/favicon.svg`,
      },
    ],
  }
}
