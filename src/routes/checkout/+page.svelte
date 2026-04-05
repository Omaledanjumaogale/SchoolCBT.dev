<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { authStore } from '$lib/stores/auth';
	import { goto } from '$app/navigation';
	import { Shield, CreditCard, CheckCircle2, AlertCircle, Loader2, ChevronDown } from 'lucide-svelte';

	// ── Plan configuration ────────────────────────────────────────
	const plans: Record<string, {
		name: string; price: number; description: string; features: string[];
		badge?: string; color: string;
	}> = {
		basic: {
			name: 'Student · Single Exam',
			price: 10000,
			description: 'Per exam (e.g. JAMB) — valid until exam date',
			badge: '',
			color: 'hsl(var(--secondary))',
			features: [
				'Unlimited 50-question CBT sessions',
				'AI-generated dynamic study plan',
				'Automated topic report cards',
				'Predictive Pass Probability',
				'Study Center learning modules',
				'AI Explanation Engine'
			]
		},
		premium: {
			name: 'Student + Tutor Plan',
			price: 25000,
			description: 'For three months per exam + AI-matched dedicated tutor',
			badge: 'Most Popular',
			color: 'hsl(var(--accent))',
			features: [
				'Everything in Single Exam plan',
				'Intelligent AI tutor matching',
				'1-on-1 virtual teaching sessions',
				'WhatsApp & platform chat',
				'Live tutor performance monitoring',
				'Priority AI support queue'
			]
		}
	};

	// ── State ─────────────────────────────────────────────────────
	let planKey = $state<string>('basic');
	let selectedPlan = $derived(plans[planKey] ?? plans.basic);
	let isLoading = $state(false);
	let error = $state('');
	let paymentMethod = $state<'flutterwave' | 'korapay'>('flutterwave');

	// Form fields
	let firstName = $state('');
	let lastName = $state('');
	let email = $state('');
	let phone = $state('');

	// Load plan from URL param and prefill email from auth
	onMount(() => {
		const plan = $page.url.searchParams.get('plan') ?? 'basic';
		planKey = plan in plans ? plan : 'basic';

		if ($authStore.user?.email) {
			email = $authStore.user.email;
		}
		if ($authStore.user?.displayName) {
			const parts = $authStore.user.displayName.split(' ');
			firstName = parts[0] ?? '';
			lastName = parts.slice(1).join(' ') ?? '';
		}
	});

	// ── Payment handlers ─────────────────────────────────────────

	async function initiateFlutterwave() {
		if (!validateForm()) return;
		isLoading = true;
		error = '';

		try {
			const txRef = `SCHOOLCBT-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

			// @ts-ignore – Flutterwave SDK loaded from CDN
			FlutterwaveCheckout({
				public_key: 'FLWPUBK_TEST-3d7724be0c384ba7bbb06bfab94637b1-X', // Replace with live key in production
				tx_ref: txRef,
				amount: selectedPlan.price,
				currency: 'NGN',
				payment_options: 'card, banktransfer, ussd',
				customer: {
					email,
					phone_number: phone,
					name: `${firstName} ${lastName}`.trim()
				},
				customizations: {
					title: 'SchoolCBT Subscription',
					description: selectedPlan.name,
					logo: 'https://schoolcbt.dev/favicon.png'
				},
				callback: function (data: any) {
					if (data.status === 'successful') {
						// Verify on server and activate subscription
						verifyAndActivate('flutterwave', txRef, data.transaction_id);
					} else {
						error = 'Payment was not completed. Please try again.';
						isLoading = false;
					}
				},
				onclose: function () {
					isLoading = false;
				}
			});
		} catch (e: any) {
			error = 'Could not launch payment. Please try again.';
			isLoading = false;
		}
	}

	async function initiateKorapay() {
		if (!validateForm()) return;
		isLoading = true;
		error = '';

		try {
			const response = await fetch('/api/payments/korapay/initiate', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					amount: selectedPlan.price,
					currency: 'NGN',
					customer: {
						name: `${firstName} ${lastName}`.trim(),
						email,
						phone
					},
					narration: `SchoolCBT — ${selectedPlan.name}`,
					reference: `SCHOOLCBT-${Date.now()}`
				})
			});

			const data = await response.json();

			if (data.status === 'success' && data.data?.checkout_url) {
				window.location.href = data.data.checkout_url;
			} else {
				error = data.message || 'Failed to initiate Korapay payment.';
				isLoading = false;
			}
		} catch (e: any) {
			error = 'Network error. Please check your connection and try again.';
			isLoading = false;
		}
	}

	async function verifyAndActivate(provider: string, txRef: string, transactionId: string) {
		try {
			const res = await fetch('/api/payments/verify', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ provider, txRef, transactionId, plan: planKey })
			});
			const data = await res.json();
			if (data.success) {
				goto('/dashboard?payment=success');
			} else {
				error = 'Payment verified but activation failed. Contact support.';
			}
		} catch {
			error = 'Verification error. Contact support with reference: ' + txRef;
		} finally {
			isLoading = false;
		}
	}

	function handlePayment() {
		if (paymentMethod === 'flutterwave') {
			initiateFlutterwave();
		} else {
			initiateKorapay();
		}
	}

	function validateForm(): boolean {
		if (!firstName.trim()) { error = 'Please enter your first name.'; return false; }
		if (!lastName.trim()) { error = 'Please enter your last name.'; return false; }
		if (!email.trim() || !email.includes('@')) { error = 'Please enter a valid email address.'; return false; }
		if (!phone.trim() || phone.length < 10) { error = 'Please enter a valid phone number.'; return false; }
		error = '';
		return true;
	}

	// Format amount
	const formattedAmount = $derived(
		new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(selectedPlan.price)
	);
</script>

<svelte:head>
	<title>Checkout – SchoolCBT | Secure Payment</title>
	<meta name="description" content="Complete your SchoolCBT subscription payment securely via Flutterwave or Korapay." />
	<!-- Flutterwave Checkout SDK -->
	<script src="https://checkout.flutterwave.com/v3.js" defer></script>
</svelte:head>

<div class="bg-background min-h-[calc(100vh-64px)] py-12">
	<div class="mx-auto max-w-5xl px-4 sm:px-6">
		<div class="grid gap-8 lg:grid-cols-5">

			<!-- ── ORDER SUMMARY (right on desktop, top on mobile) ─── -->
			<div class="order-first lg:order-last lg:col-span-2">
				<div class="glass-panel p-6 lg:sticky lg:top-24">
					<h2 class="text-foreground mb-4 text-base font-black">Order Summary</h2>

					<!-- Plan switcher -->
					<div class="mb-4 space-y-2">
						{#each Object.entries(plans) as [key, plan]}
							<button
								class="relative w-full rounded-xl border-2 p-4 text-left transition-all {planKey === key
									? 'border-[hsl(var(--primary))] bg-[hsl(var(--primary)/0.05)]'
									: 'border-border hover:border-[hsl(var(--primary)/0.4)]'}"
								onclick={() => (planKey = key)}
							>
								{#if plan.badge}
									<span class="absolute -top-2.5 left-4 rounded-full bg-gradient-to-r from-[hsl(var(--accent))] to-amber-400 px-3 py-0.5 text-[10px] font-black uppercase tracking-wider text-white">
										{plan.badge}
									</span>
								{/if}
								<div class="flex items-start justify-between gap-2">
									<div>
										<p class="text-foreground text-xs font-black">{plan.name}</p>
										<p class="text-muted-foreground text-xs">{plan.description}</p>
									</div>
									<div class="shrink-0">
										<div class="text-foreground text-lg font-black">{new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(plan.price)}</div>
									</div>
								</div>
								{#if planKey === key}
									<div class="mt-3 space-y-1.5">
										{#each plan.features as f}
											<div class="flex items-center gap-2">
												<CheckCircle2 class="h-3.5 w-3.5 shrink-0 text-[hsl(var(--primary))]" />
												<span class="text-muted-foreground text-xs">{f}</span>
											</div>
										{/each}
									</div>
								{/if}
							</button>
						{/each}
					</div>

					<div class="border-border my-4 border-t pt-4">
						<div class="flex items-center justify-between font-bold">
							<span class="text-foreground">Total</span>
							<span class="text-2xl text-[hsl(var(--primary))]">{formattedAmount}</span>
						</div>
						<p class="text-muted-foreground mt-1 text-xs">One-time payment · No recurring charges</p>
					</div>

					<!-- Security badges -->
					<div class="grid grid-cols-2 gap-2">
						{#each [
							{ icon: '🔒', text: '256-bit SSL Encryption' },
							{ icon: '✅', text: 'CBN Licensed Partners' },
							{ icon: '🇳🇬', text: 'Nigerian Naira (NGN)' },
							{ icon: '📱', text: 'Instant Activation' }
						] as badge}
							<div class="border-border flex items-center gap-2 rounded-lg border p-2 text-xs">
								<span>{badge.icon}</span>
								<span class="text-muted-foreground">{badge.text}</span>
							</div>
						{/each}
					</div>
				</div>
			</div>

			<!-- ── PAYMENT FORM ─────────────────────────────────── -->
			<div class="lg:col-span-3">
				<div class="mb-6">
					<div class="section-badge mb-3">Secure Checkout</div>
					<h1 class="text-foreground text-2xl font-black">Complete Your Payment</h1>
					<p class="text-muted-foreground text-sm">Your subscription will activate instantly after payment.</p>
				</div>

				<div class="glass-panel p-6">
					<!-- Customer Details -->
					<h3 class="text-foreground mb-4 text-sm font-bold uppercase tracking-wider">Your Details</h3>
					<div class="mb-6 grid gap-4 sm:grid-cols-2">
						<div>
							<label class="mb-1.5 block text-xs font-bold text-[hsl(var(--foreground))]" for="first-name">First Name *</label>
							<input
								id="first-name"
								bind:value={firstName}
								type="text"
								placeholder="Emeka"
								class="input-field"
								autocomplete="given-name"
							/>
						</div>
						<div>
							<label class="mb-1.5 block text-xs font-bold text-[hsl(var(--foreground))]" for="last-name">Last Name *</label>
							<input
								id="last-name"
								bind:value={lastName}
								type="text"
								placeholder="Okafor"
								class="input-field"
								autocomplete="family-name"
							/>
						</div>
						<div>
							<label class="mb-1.5 block text-xs font-bold text-[hsl(var(--foreground))]" for="checkout-email">Email Address *</label>
							<input
								id="checkout-email"
								bind:value={email}
								type="email"
								placeholder="emeka@email.com"
								class="input-field"
								autocomplete="email"
							/>
						</div>
						<div>
							<label class="mb-1.5 block text-xs font-bold text-[hsl(var(--foreground))]" for="checkout-phone">Phone Number *</label>
							<input
								id="checkout-phone"
								bind:value={phone}
								type="tel"
								placeholder="08012345678"
								class="input-field"
								autocomplete="tel"
							/>
						</div>
					</div>

					<!-- Payment Method Selection -->
					<h3 class="text-foreground mb-4 text-sm font-bold uppercase tracking-wider">Payment Method</h3>
					<div class="mb-6 grid gap-3 sm:grid-cols-2">
						<!-- Flutterwave -->
						<button
							onclick={() => (paymentMethod = 'flutterwave')}
							class="relative rounded-xl border-2 p-4 text-left transition-all {paymentMethod === 'flutterwave'
								? 'border-[hsl(145,100%,39%)] bg-[hsl(145,100%,39%,0.05)]'
								: 'border-border hover:border-[hsl(145,100%,39%,0.4)]'}"
						>
							<div class="mb-2 flex items-center justify-between">
								<span class="text-foreground text-sm font-black">Flutterwave</span>
								{#if paymentMethod === 'flutterwave'}
									<CheckCircle2 class="h-4 w-4 text-[hsl(145,100%,39%)]" />
								{/if}
							</div>
							<p class="text-muted-foreground text-xs">Card, Bank Transfer, USSD, Mobile Money</p>
							<div class="mt-2 flex flex-wrap gap-1 text-[10px] font-bold text-[hsl(145,60%,30%)]">
								<span class="rounded bg-[hsl(145,100%,39%,0.1)] px-1.5 py-0.5">Visa</span>
								<span class="rounded bg-[hsl(145,100%,39%,0.1)] px-1.5 py-0.5">Mastercard</span>
								<span class="rounded bg-[hsl(145,100%,39%,0.1)] px-1.5 py-0.5">Bank</span>
							</div>
						</button>

						<!-- Korapay -->
						<button
							onclick={() => (paymentMethod = 'korapay')}
							class="relative rounded-xl border-2 p-4 text-left transition-all {paymentMethod === 'korapay'
								? 'border-[hsl(210,80%,55%)] bg-[hsl(210,80%,55%,0.05)]'
								: 'border-border hover:border-[hsl(210,80%,55%,0.4)]'}"
						>
							<div class="mb-2 flex items-center justify-between">
								<span class="text-foreground text-sm font-black">Korapay</span>
								{#if paymentMethod === 'korapay'}
									<CheckCircle2 class="h-4 w-4 text-[hsl(210,80%,55%)]" />
								{/if}
							</div>
							<p class="text-muted-foreground text-xs">Card, Bank Transfer, USSD, Pay with Bank</p>
							<div class="mt-2 flex flex-wrap gap-1 text-[10px] font-bold text-[hsl(210,60%,35%)]">
								<span class="rounded bg-[hsl(210,80%,55%,0.1)] px-1.5 py-0.5">Visa</span>
								<span class="rounded bg-[hsl(210,80%,55%,0.1)] px-1.5 py-0.5">Mastercard</span>
								<span class="rounded bg-[hsl(210,80%,55%,0.1)] px-1.5 py-0.5">USSD</span>
							</div>
						</button>

						<!-- Paystack — coming soon -->
						<div class="relative cursor-not-allowed rounded-xl border-2 border-dashed border-border p-4 opacity-50">
							<span class="text-foreground text-sm font-black">Paystack</span>
							<span class="ml-2 rounded-full bg-[hsl(var(--muted))] px-2 py-0.5 text-[10px] font-bold text-[hsl(var(--muted-foreground))]">Coming soon</span>
							<p class="text-muted-foreground mt-1 text-xs">API keys pending</p>
						</div>

						<!-- Seerbit — coming soon -->
						<div class="relative cursor-not-allowed rounded-xl border-2 border-dashed border-border p-4 opacity-50">
							<span class="text-foreground text-sm font-black">Seerbit</span>
							<span class="ml-2 rounded-full bg-[hsl(var(--muted))] px-2 py-0.5 text-[10px] font-bold text-[hsl(var(--muted-foreground))]">Coming soon</span>
							<p class="text-muted-foreground mt-1 text-xs">API keys pending</p>
						</div>
					</div>

					<!-- Error display -->
					{#if error}
						<div class="mb-4 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
							<AlertCircle class="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
							<p class="text-sm text-red-700">{error}</p>
						</div>
					{/if}

					<!-- Pay button -->
					<button
						id="pay-now-btn"
						onclick={handlePayment}
						disabled={isLoading}
						class="btn-primary w-full py-4 text-base font-black disabled:opacity-60"
					>
						{#if isLoading}
							<span class="inline-block h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>
							Processing Payment...
						{:else}
							<Shield class="h-5 w-5" />
							Pay {formattedAmount} Securely
						{/if}
					</button>

					<p class="text-muted-foreground mt-3 text-center text-xs">
						By completing payment you agree to our
						<a href="/terms" class="text-[hsl(var(--primary))] hover:underline">Terms of Service</a>
						and
						<a href="/privacy" class="text-[hsl(var(--primary))] hover:underline">Privacy Policy</a>.
					</p>
				</div>

				<!-- Support note -->
				<p class="text-muted-foreground mt-4 text-center text-xs">
					Need help? Email <a href="mailto:support@schoolcbt.dev" class="text-[hsl(var(--primary))] hover:underline">support@schoolcbt.dev</a>
				</p>
			</div>
		</div>
	</div>
</div>
