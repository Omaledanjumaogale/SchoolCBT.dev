import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	const baseUrl = 'https://schoolcbt.dev';
	const now = new Date().toISOString().split('T')[0];

	const pages = [
		{ url: '/', priority: '1.0', changefreq: 'weekly' },
		{ url: '/about', priority: '0.8', changefreq: 'monthly' },
		{ url: '/curriculum', priority: '0.9', changefreq: 'monthly' },
		{ url: '/exam', priority: '0.9', changefreq: 'weekly' },
		{ url: '/pricing', priority: '0.8', changefreq: 'monthly' },
		{ url: '/contact', priority: '0.7', changefreq: 'yearly' },
		{ url: '/terms', priority: '0.4', changefreq: 'yearly' },
		{ url: '/privacy', priority: '0.4', changefreq: 'yearly' }
	];

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
	.map(
		(p) => `  <url>
    <loc>${baseUrl}${p.url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=3600, s-maxage=86400'
		}
	});
};
