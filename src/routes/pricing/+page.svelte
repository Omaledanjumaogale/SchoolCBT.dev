<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import { fade, fly } from 'svelte/transition';

	const plans = [
		{
			name: 'Basic',
			price: '₦2,500',
			period: 'per term',
			features: [
				'Access to JSS/SSS Curriculum',
				'50 Practice Batches',
				'AI Explanations',
				'Standard Report Cards'
			],
			cta: 'Get Started',
			color: 'white',
			badge: 'Free Trial Available'
		},
		{
			name: 'Enterprise',
			price: '₦5,000',
			period: 'per term',
			features: [
				'Unlimited Practice Batches',
				'Predictive Pass Analytics',
				'AI Study Plans',
				'Tutor Matching',
				'Priority AI Explanations'
			],
			cta: 'Go Enterprise 🔥',
			color: 'gold',
			badge: 'MOST POPULAR',
			popular: true
		},
		{
			name: 'School Pack',
			price: 'Custom',
			period: 'for institutions',
			features: [
				'Bulk Student Accounts',
				'Admin Performance Dashboard',
				'Custom Exam Generation',
				'Teacher Analytics Tools',
				'Dedicated Support'
			],
			cta: 'Contact Sales',
			color: 'jade',
			badge: 'FOR SCHOOLS'
		}
	];
</script>

<SEO 
	title="Pricing & Plans | SchoolCBT Enterprise"
	description="Choose the right plan for your exam success. Affordable JSS and SSS practice batches, AI insights, and tutor matching."
/>

<Header />

<main class="pt-24 min-h-screen bg-hero pb-20">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
		<div in:fade class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-bold uppercase tracking-widest mb-8">
			<span>💳</span> Flexible Pricing
		</div>
		<h1 in:fly={{ y: 20, duration: 600 }} class="text-4xl sm:text-6xl font-sora font-900 text-white mb-6 tracking-tight">
			Invest in Your <span class="text-gold">Future</span> 🎓
		</h1>
		<p in:fly={{ y: 20, duration: 600, delay: 200 }} class="text-white/40 max-w-2xl mx-auto text-lg sm:text-xl leading-relaxed mb-20">
			Choose the plan that fits your academic goals. From individual practice to 
			full school implementation, we have the perfect RaaS solution. 🇳🇬🚀
		</p>

		<div class="grid md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
			{#each plans as plan}
				<div in:fly={{ y: 20, delay: 400 }} class="glass-card p-6 sm:p-10 lg:p-12 flex flex-col h-full relative overflow-hidden transition-all duration-300 hover:border-{plan.color}/30 hover:-translate-y-2 group {plan.popular ? 'border-gold/30 shadow-2xl shadow-gold/10' : 'border-white/05'}">
					{#if plan.popular}
						<div class="absolute top-0 right-0 px-4 py-1 bg-gold text-cobalt font-black text-[10px] uppercase tracking-widest rounded-bl-xl shadow-lg">
							{plan.badge}
						</div>
					{/if}
					
					<div class="mb-10 text-left">
						<div class="text-white/40 text-[10px] font-black uppercase tracking-[0.2em] mb-4">{plan.name} Plan</div>
						<div class="flex items-baseline gap-2">
							<span class="text-4xl sm:text-5xl font-sora font-900 text-white group-hover:text-{plan.color} transition-colors">{plan.price}</span>
							<span class="text-white/30 text-xs font-bold uppercase tracking-widest">/ {plan.period}</span>
						</div>
					</div>

					<ul class="space-y-6 mb-12 text-left flex-grow">
						{#each plan.features as feature}
							<li class="flex items-center gap-4 text-white/60 text-sm font-medium group-hover:text-white transition-colors">
								<span class="text-jade text-lg">✅</span> {feature}
							</li>
						{/each}
					</ul>

					<button class="w-full py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl transition-all active:scale-95
						{plan.color === 'gold' 
							? 'btn-gold shadow-gold/20' 
							: plan.color === 'jade' 
								? 'bg-jade text-cobalt shadow-jade/20' 
								: 'btn-outline hover:bg-white/05'}">
						{plan.cta}
					</button>
				</div>
			{/each}
		</div>

		<!-- Payment Methods -->
		<div in:fade={{ delay: 800 }} class="mt-24 pt-12 border-t border-white/05">
			<p class="text-white/20 text-[10px] font-black uppercase tracking-[0.3em] mb-10">Secure Multi-Modal Payments Powered by</p>
			<div class="flex flex-wrap justify-center items-center gap-12 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
				<span class="text-white font-black text-xl tracking-tighter">Flutterwave</span>
				<span class="text-white font-black text-xl tracking-tighter">Paystack</span>
				<span class="text-white font-black text-xl tracking-tighter">Seerbit</span>
				<span class="text-white font-black text-xl tracking-tighter">KoraPay</span>
			</div>
		</div>
	</div>
</main>

<Footer />
