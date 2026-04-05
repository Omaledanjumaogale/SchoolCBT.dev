<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import FeaturesGrid from '$lib/components/FeaturesGrid.svelte';
	import AIAgents from '$lib/components/AIAgents.svelte';
	import Pricing from '$lib/components/Pricing.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
	<title>SchoolCBT – Nigeria's Premier AI-Powered CBT Platform | JAMB, WAEC, NECO</title>
	<meta
		name="description"
		content="Results as a Service (RaaS) for JSS & SSS students. AI-curated CBT practice for JAMB, WAEC, NECO with predictive analytics and tutor matching."
	/>
	<meta property="og:title" content="SchoolCBT – Ace JAMB, WAEC & NECO with AI Precision" />
	<meta
		property="og:description"
		content="50-question AI batches, instant feedback, pass probability analytics. Nigeria's most advanced CBT study platform."
	/>
</svelte:head>

<Hero />
<FeaturesGrid />
<AIAgents />
<Pricing />
<Footer />
