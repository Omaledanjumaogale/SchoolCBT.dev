<script lang="ts">
	import { Check, X, ArrowRight, Star } from 'lucide-svelte';
	import { onMount } from 'svelte';

	interface Testimonial {
		name: string;
		school: string;
		exam: string;
		quote: string;
		score: string;
	}

	const testimonials: Testimonial[] = [
		{
			name: 'Adaeze Okafor',
			school: 'FGGC Onitsha',
			exam: 'WAEC 2024',
			quote:
				"SchoolCBT's AI feedback explained every mistake clearly. I went from 52% to 91% in Chemistry in 6 weeks.",
			score: 'A1 in Chemistry'
		},
		{
			name: 'Emeka Nwosu',
			school: 'Government College Umuahia',
			exam: 'JAMB 2025',
			quote:
				'The pass probability feature kept me motivated. When my chance hit 85%, I knew I was ready. Scored 298!',
			score: '298 in JAMB'
		},
		{
			name: 'Fatimah Bello',
			school: 'GGSS Kaduna',
			exam: 'NECO 2024',
			quote:
				'My tutor matched by SchoolCBT specifically for my Physics weakness was brilliant. Distinction in every science subject.',
			score: 'Distinction in 5 subjects'
		}
	];

	let currentTestimonial = $state(0);

	onMount(() => {
		const interval = setInterval(() => {
			currentTestimonial = (currentTestimonial + 1) % testimonials.length;
		}, 5000);
		return () => clearInterval(interval);
	});
</script>

<!-- ── PRICING ──────────────────────────────── -->
<section id="pricing" class="border-border relative border-y bg-[hsl(120,20%,97%)] py-20 md:py-28">
	<div
		class="pointer-events-none absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-[hsl(var(--accent)/0.05)] blur-[100px]"
	></div>

	<div class="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<!-- Header -->
		<div class="mx-auto mb-16 max-w-3xl text-center">
			<div class="section-badge mb-4">Transparent Pricing</div>
			<h2 class="text-foreground mb-4 text-3xl font-black tracking-tight md:text-4xl">
				Simple Plans, <span class="shimmer-text">Guaranteed Results</span>
			</h2>
			<p class="text-muted-foreground text-lg">
				One flat subscription per exam type. No surprises. Cancel anytime.
			</p>
		</div>

		<!-- Pricing Cards -->
		<div class="mb-16 grid gap-6 md:grid-cols-3">
			<!-- Plan 1: Basic -->
			<div class="glass-panel card-hover flex flex-col p-8">
				<div
					class="mb-5 inline-flex self-start rounded-full bg-[hsl(var(--secondary)/0.1)] px-3 py-1 text-xs font-bold tracking-wider text-[hsl(var(--secondary))] uppercase"
				>
					Student · Single Exam
				</div>
				<div class="mb-1 flex items-baseline gap-1">
					<span class="text-foreground text-4xl font-black">₦10,000</span>
				</div>
				<p class="text-muted-foreground mb-8 text-sm">
					per exam (e.g. JAMB) — valid until exam date
				</p>

				<ul class="mb-8 flex-grow space-y-3.5">
					{#each ['Unlimited 50-Q CBT batches', 'AI-generated dynamic study plan', 'Automated topic report cards', 'Predictive Pass Probability', 'Study Center learning modules', 'AI Explanation Engine'] as feature}
						<li class="text-foreground flex items-start gap-3 text-sm font-medium">
							<Check class="mt-0.5 h-4 w-4 shrink-0 text-[hsl(var(--primary))]" />
							{feature}
						</li>
					{/each}
					<li class="text-muted-foreground flex items-start gap-3 text-sm font-medium opacity-50">
						<X class="mt-0.5 h-4 w-4 shrink-0" />
						AI Tutor Matching
					</li>
				</ul>
				<a href="/auth/signup?plan=basic" class="btn-outline mt-auto py-3.5 text-sm">Get Started</a>
			</div>

			<!-- Plan 2: Premium (Featured) -->
			<div
				class="glass-panel card-hover from-card relative flex flex-col border-[hsl(var(--accent)/0.5)] bg-gradient-to-b to-[hsl(var(--accent)/0.04)] p-8"
				style="box-shadow: 0 8px 40px hsl(var(--accent)/0.15)"
			>
				<div class="absolute -top-4 left-1/2 -translate-x-1/2">
					<span
						class="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[hsl(var(--accent))] to-amber-400 px-5 py-1.5 text-xs font-black tracking-wider text-[hsl(var(--accent-foreground))] uppercase shadow-md"
					>
						<Star class="h-3 w-3 fill-current" /> Most Popular
					</span>
				</div>
				<div
					class="mb-5 inline-flex self-start rounded-full bg-[hsl(var(--accent)/0.15)] px-3 py-1 text-xs font-bold tracking-wider text-[hsl(var(--accent))] uppercase"
				>
					Student + Tutor
				</div>
				<div class="mb-1 flex items-baseline gap-1">
					<span class="text-foreground text-4xl font-black">₦25,000</span>
				</div>
				<p class="text-muted-foreground mb-8 text-sm">for three months per exam + dedicated AI-matched tutor</p>

				<ul class="mb-8 flex-grow space-y-3.5">
					{#each ['Everything in Single Exam', 'Intelligent AI tutor matching', '1-on-1 virtual teaching sessions', 'WhatsApp & platform chat', 'Live tutor performance monitoring', 'Priority AI support queue'] as feature, i}
						<li class="text-foreground flex items-start gap-3 text-sm font-medium">
							<Check
								class="mt-0.5 h-4 w-4 shrink-0 {i === 0
									? 'text-[hsl(var(--primary))]'
									: 'text-[hsl(var(--accent))]'}"
							/>
							{feature}
						</li>
					{/each}
				</ul>
				<a
					href="/auth/signup?plan=premium"
					class="btn-gold mt-auto py-3.5 text-sm shadow-lg shadow-[hsl(var(--accent)/0.25)]"
					>Subscribe Now</a
				>
			</div>

			<!-- Plan 3: Tutor -->
			<div class="glass-panel card-hover flex flex-col p-8">
				<div
					class="mb-5 inline-flex self-start rounded-full bg-[hsl(var(--primary)/0.1)] px-3 py-1 text-xs font-bold tracking-wider text-[hsl(var(--primary))] uppercase"
				>
					Tutor Registration
				</div>
				<div class="mb-1 flex items-baseline gap-1">
					<span class="text-foreground text-4xl font-black">Free</span>
				</div>
				<p class="text-muted-foreground mb-8 text-sm">
					earn per subject, student, and session hour
				</p>

				<ul class="mb-8 flex-grow space-y-3.5">
					{#each ['Free registration & vetting', 'Digital wallet payout system', 'AI-assisted grading tools', 'Live student progress monitoring', 'Admin-approved onboarding', 'Session management dashboard'] as feature}
						<li class="text-foreground flex items-start gap-3 text-sm font-medium">
							<Check class="mt-0.5 h-4 w-4 shrink-0 text-[hsl(var(--primary))]" />
							{feature}
						</li>
					{/each}
				</ul>
				<a href="/auth/signup?role=tutor" class="btn-outline mt-auto border-dashed py-3.5 text-sm"
					>Join as Tutor</a
				>
			</div>
		</div>

		<!-- ── TESTIMONIALS ── -->
		<div
			class="glass-panel mx-auto max-w-3xl border-t-2 border-t-[hsl(var(--primary)/0.3)] p-8 md:p-10"
		>
			<div class="mb-8 text-center">
				<div class="section-badge mb-3">Student Success Stories</div>
				<h3 class="text-foreground text-xl font-bold">What Our Students Say</h3>
			</div>

			<div class="relative min-h-[180px]">
				{#each testimonials as t, i}
					{#if i === currentTestimonial}
						<div class="animate-fade-in text-center">
							<div class="mb-3 flex justify-center">
								{#each [1, 2, 3, 4, 5] as _}
									<Star class="h-4 w-4 fill-[hsl(var(--accent))] text-[hsl(var(--accent))]" />
								{/each}
							</div>
							<blockquote class="text-foreground mb-5 text-base leading-relaxed font-medium italic">
								"{t.quote}"
							</blockquote>
							<div class="flex items-center justify-center gap-3">
								<div
									class="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(174,60%,28%)] text-sm font-bold text-white"
								>
									{t.name.charAt(0)}
								</div>
								<div class="text-left">
									<p class="text-foreground text-sm font-bold">{t.name}</p>
									<p class="text-muted-foreground text-xs">
										{t.school} ·
										<span class="font-semibold text-[hsl(var(--primary))]">{t.score}</span>
									</p>
								</div>
							</div>
						</div>
					{/if}
				{/each}
			</div>

			<!-- Dots -->
			<div class="mt-6 flex justify-center gap-2">
				{#each testimonials as _, i}
					<button
						class="h-2 rounded-full transition-all duration-300 {i === currentTestimonial
							? 'w-6 bg-[hsl(var(--primary))]'
							: 'bg-muted w-2'}"
						onclick={() => (currentTestimonial = i)}
						aria-label="View testimonial {i + 1}"
					></button>
				{/each}
			</div>
		</div>
	</div>
</section>
