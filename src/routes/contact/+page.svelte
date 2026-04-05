<script lang="ts">
	import {
		Mail,
		Phone,
		MapPin,
		MessageCircle,
		Clock,
		Send,
		AlertCircle,
		CheckCircle2
	} from 'lucide-svelte';

	let name = $state('');
	let email = $state('');
	let subject = $state('general');
	let message = $state('');
	let loading = $state(false);
	let sent = $state(false);
	let error = $state('');

	const subjects = [
		{ value: 'general', label: 'General Enquiry' },
		{ value: 'technical', label: 'Technical Support' },
		{ value: 'billing', label: 'Billing & Subscription' },
		{ value: 'tutor', label: 'Tutor Registration' },
		{ value: 'school', label: 'School Partnership' }
	];

	async function handleSubmit(e: Event) {
		e.preventDefault();
		error = '';
		if (!name.trim() || !email.trim() || !message.trim()) {
			error = 'Please fill in all required fields.';
			return;
		}
		loading = true;
		// Simulate send — replace with actual Convex mutation
		await new Promise((r) => setTimeout(r, 1200));
		loading = false;
		sent = true;
	}

	const contactItems = [
		{
			icon: Mail,
			label: 'Email',
			value: 'hello@schoolcbt.dev',
			href: 'mailto:hello@schoolcbt.dev',
			color: 'hsl(145,100%,39%)'
		},
		{
			icon: MessageCircle,
			label: 'WhatsApp',
			value: '+234 800 000 0000',
			href: 'https://wa.me/2348000000000',
			color: 'hsl(142,71%,40%)'
		},
		{
			icon: MapPin,
			label: 'Location',
			value: 'Lagos, Nigeria',
			href: '#',
			color: 'hsl(var(--accent))'
		},
		{
			icon: Clock,
			label: 'Support Hours',
			value: 'Mon–Fri, 8am–8pm WAT',
			href: '#',
			color: 'hsl(174,60%,28%)'
		}
	];
</script>

<svelte:head>
	<title>Contact Us – SchoolCBT</title>
	<meta
		name="description"
		content="Get in touch with SchoolCBT — support for students, tutors, and school partnerships."
	/>
</svelte:head>

<div class="bg-background min-h-[calc(100vh-64px)] px-4 py-16">
	<div class="mx-auto max-w-6xl">
		<!-- Header -->
		<div class="mx-auto mb-16 max-w-2xl text-center">
			<div class="section-badge mb-4">Contact Us</div>
			<h1 class="text-foreground mb-4 text-4xl font-black tracking-tight">
				We're Here to <span class="gradient-text-primary">Help</span>
			</h1>
			<p class="text-muted-foreground text-lg">
				Questions about your subscription, technical help, or tutor registration? Our team responds
				within 2 hours on business days.
			</p>
		</div>

		<div class="grid gap-8 lg:grid-cols-5">
			<!-- Contact info sidebar -->
			<div class="space-y-4 lg:col-span-2">
				{#each contactItems as item}
					<a
						href={item.href}
						class="glass-panel card-hover block flex items-center gap-4 p-5 no-underline"
						target={item.href.startsWith('http') ? '_blank' : undefined}
						rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
					>
						<div
							class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
							style="background:{item.color}12; border:1px solid {item.color}30"
						>
							<item.icon class="h-6 w-6" style="color:{item.color}" />
						</div>
						<div>
							<p class="text-muted-foreground mb-0.5 text-xs font-bold tracking-wider uppercase">
								{item.label}
							</p>
							<p class="text-foreground text-sm font-semibold">{item.value}</p>
						</div>
					</a>
				{/each}

				<!-- FAQ shortcut -->
				<div
					class="glass-panel to-card mt-2 border-[hsl(var(--primary)/0.2)] bg-gradient-to-br from-[hsl(var(--primary)/0.04)] p-6"
				>
					<h3 class="text-foreground mb-3 text-sm font-bold">Quick answers</h3>
					<div class="space-y-2.5">
						{#each ['How do I reset my password?', 'How do I switch exam type?', 'When will my tutor be assigned?', 'How do I get my report card?'] as faq}
							<div class="text-muted-foreground flex items-start gap-2 text-sm">
								<div
									class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[hsl(var(--primary))]"
								></div>
								{faq}
							</div>
						{/each}
					</div>
				</div>
			</div>

			<!-- Contact form -->
			<div class="lg:col-span-3">
				<div class="glass-panel border-t-2 border-t-[hsl(var(--primary)/0.3)] p-8 shadow-xl">
					{#if sent}
						<!-- Success -->
						<div class="animate-scale-in py-10 text-center">
							<div
								class="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[hsl(145,100%,39%,0.1)]"
							>
								<CheckCircle2 class="h-8 w-8 text-[hsl(145,100%,39%)]" />
							</div>
							<h3 class="text-foreground mb-2 text-xl font-black">Message Sent!</h3>
							<p class="text-muted-foreground mb-6 text-sm">
								We'll get back to you within 2 hours on business days.
							</p>
							<button
								class="btn-outline rounded-xl px-6 py-2.5 text-sm"
								onclick={() => {
									sent = false;
									name = '';
									email = '';
									message = '';
								}}
							>
								Send another message
							</button>
						</div>
					{:else}
						<h2 class="text-foreground mb-6 text-lg font-black">Send us a message</h2>

						{#if error}
							<div
								class="mb-5 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3"
							>
								<AlertCircle class="h-4 w-4 shrink-0 text-red-500" />
								<p class="text-sm font-medium text-red-700">{error}</p>
							</div>
						{/if}

						<form onsubmit={handleSubmit} class="space-y-5">
							<div class="grid gap-5 sm:grid-cols-2">
								<div>
									<label
										for="contact-name"
										class="text-foreground mb-1.5 block text-sm font-semibold"
										>Full Name <span class="text-red-500">*</span></label
									>
									<input
										id="contact-name"
										type="text"
										bind:value={name}
										placeholder="Chukwuemeka Obi"
										class="input-field rounded-xl"
										required
									/>
								</div>
								<div>
									<label
										for="contact-email"
										class="text-foreground mb-1.5 block text-sm font-semibold"
										>Email Address <span class="text-red-500">*</span></label
									>
									<input
										id="contact-email"
										type="email"
										bind:value={email}
										placeholder="your@email.com"
										class="input-field rounded-xl"
										required
									/>
								</div>
							</div>

							<div>
								<label
									for="contact-subject"
									class="text-foreground mb-1.5 block text-sm font-semibold">Topic</label
								>
								<select id="contact-subject" bind:value={subject} class="input-field rounded-xl">
									{#each subjects as s}
										<option value={s.value}>{s.label}</option>
									{/each}
								</select>
							</div>

							<div>
								<label
									for="contact-message"
									class="text-foreground mb-1.5 block text-sm font-semibold"
									>Message <span class="text-red-500">*</span></label
								>
								<textarea
									id="contact-message"
									bind:value={message}
									placeholder="Tell us how we can help you..."
									rows="5"
									class="input-field resize-none rounded-xl"
									required
								></textarea>
								<p class="text-muted-foreground mt-1 text-right text-xs">{message.length} / 1000</p>
							</div>

							<button
								type="submit"
								class="btn-primary w-full rounded-xl py-4 text-sm"
								disabled={loading}
							>
								{#if loading}
									<span
										class="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
									></span>
									Sending…
								{:else}
									<Send class="h-4 w-4" />
									Send Message
								{/if}
							</button>
						</form>
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>
