<script lang="ts">
	import { ShieldCheck } from 'lucide-svelte';
</script>

<svelte:head>
	<title>Privacy Policy – SchoolCBT</title>
	<meta
		name="description"
		content="SchoolCBT privacy policy — how we collect, use and protect your personal data."
	/>
</svelte:head>

<div class="bg-background min-h-[calc(100vh-64px)] px-4 py-16">
	<div class="mx-auto max-w-3xl">
		<div class="mb-10 text-center">
			<div
				class="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[hsl(var(--primary)/0.1)]"
			>
				<ShieldCheck class="h-7 w-7 text-[hsl(var(--primary))]" />
			</div>
			<div class="section-badge mb-4">Your Privacy</div>
			<h1 class="text-foreground mb-2 text-3xl font-black">Privacy Policy</h1>
			<p class="text-muted-foreground text-sm">Last updated: April 2025 · NDPR & GDPR Compliant</p>
		</div>

		<div class="glass-panel space-y-8 p-8">
			{#each [{ title: '1. Information We Collect', body: 'We collect information you provide directly: name, email, phone number, school details, exam targets, and uploaded academic reports. We also collect usage data — questions answered, scores, time per question, and session activity — to power AI personalization. We collect payment information only via our secure payment processor (Paystack/Stripe); we never store card details.' }, { title: '2. How We Use Your Information', body: 'We use your information to: deliver personalized CBT batches and study plans; match you with qualified tutors; generate performance reports and analytics; send important platform notifications; improve our AI accuracy; and fulfil subscription and payment obligations. We do not sell your personal data to third parties.' }, { title: '3. AI-Powered Processing', body: 'SchoolCBT uses AI systems (Google Vertex AI, Anthropic Claude) to analyse academic reports, generate questions, and produce explanations. Uploaded documents are processed for text extraction only and are not shared with third parties. AI outputs are validated by our Quality Evaluator agent before delivery.' }, { title: '4. Data Sharing', body: 'We share data only with: (a) your assigned tutor — limited to performance data necessary for tutoring; (b) Firebase (Google) for authentication; (c) Convex for real-time database storage; (d) Cloudflare for content delivery. All partners are bound by data processing agreements compliant with NDPR and GDPR.' }, { title: '5. Data Retention', body: 'Account data is retained for the duration of your subscription plus 12 months. Uploaded documents are deleted after AI processing (within 30 days). You can request deletion of all personal data by contacting us at privacy@schoolcbt.dev.' }, { title: '6. Your Rights', body: 'Under the Nigeria Data Protection Regulation (NDPR) you have the right to: access your personal data; correct inaccurate data; request deletion; restrict processing; and data portability. To exercise any right, contact privacy@schoolcbt.dev. We respond within 30 days.' }, { title: '7. Security', body: 'We implement industry-standard security: all data in transit is encrypted via TLS 1.3; data at rest is encrypted in Convex and Firebase; access is restricted to authorised personnel only; we conduct regular security reviews. However, no internet transmission is 100% secure and we cannot guarantee absolute security.' }, { title: '8. Cookies & Tracking', body: 'SchoolCBT uses functional cookies necessary for authentication and session management. We do not use third-party advertising cookies. You can disable cookies in your browser settings, though this may affect platform functionality.' }, { title: "9. Children's Privacy", body: 'Students under 13 must have verifiable parental or guardian consent to register. If we discover we have collected data from a child under 13 without consent, we will delete that data immediately.' }, { title: '10. Contact', body: 'For privacy concerns or to exercise your rights: email privacy@schoolcbt.dev. For general enquiries: hello@schoolcbt.dev. SchoolCBT is operated by EwinProject, Lagos, Nigeria.' }] as s}
				<div>
					<h2 class="text-foreground mb-3 text-base font-black">{s.title}</h2>
					<p class="text-muted-foreground text-sm leading-relaxed">{s.body}</p>
				</div>
			{/each}
		</div>
	</div>
</div>
