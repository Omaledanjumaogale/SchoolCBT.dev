export const prerender = true;

export async function GET() {
  const pages = [
    '',
    'about',
    'curriculum',
    'exam',
    'pricing',
    'questions',
    'auth/login',
    'auth/signup'
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages.map(page => `
  <url>
    <loc>https://schoolcbt.dev/${page}</loc>
    <changefreq>weekly</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`).join('')}
</urlset>`.trim();

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml'
    }
  });
}
