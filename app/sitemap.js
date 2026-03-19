export default function sitemap() {
  const siteUrl = 'https://mannai-two.vercel.app'
  const now = new Date()

  return [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]
}
