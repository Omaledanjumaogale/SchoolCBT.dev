<script lang="ts">
	interface Props {
		title?: string;
		description?: string;
		url?: string;
		type?: string;
		image?: string;
	}

	let {
		title = "SchoolCBT - Nigeria's Premier AI-Powered CBT Platform",
		description = 'Guaranteed exam readiness for JAMB, WAEC & NECO through AI-orchestrated practice batches.',
		url = 'https://schoolcbt.ewinproject.org',
		type = 'website',
		image = 'https://schoolcbt.ewinproject.org/og-image.png'
	}: Props = $props();

	const schemaData = $derived({
		'@context': 'https://schema.org',
		'@type': 'WebApplication',
		name: 'SchoolCBT',
		url: url,
		description: description,
		applicationCategory: 'EducationalApplication',
		operatingSystem: 'Web',
		offers: {
			'@type': 'Offer',
			price: '0',
			priceCurrency: 'NGN'
		},
		educationalLevel: ['JSS', 'SSS'],
		provider: {
			'@type': 'Organization',
			name: 'SchoolCBT Enterprise',
			url: 'https://schoolcbt.ewinproject.org'
		}
	});
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />

	<!-- Open Graph -->
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={url} />
	<meta property="og:type" content={type} />
	<meta property="og:image" content={image} />

	<!-- Twitter -->
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />

	<!-- Schema.org JSON-LD -->
	{@html `<script type="application/ld+json">${JSON.stringify(schemaData)}</script>`}
</svelte:head>
