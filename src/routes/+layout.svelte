<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { Menu, X, ChevronDown } from 'lucide-svelte';
	import BottomNav from '$lib/components/BottomNav.svelte';
	import EWINBanner from '$lib/components/EWINBanner.svelte';
	import ToastProvider from '$lib/components/ToastProvider.svelte';
	import { getConvexClient } from '$lib/convex';
	import { authStore } from '$lib/stores/auth';
	import { auth } from '$lib/firebase';
	import { api } from '../../convex/_generated/api';

	let { children } = $props();

	let isMobileMenuOpen = $state(false);
	let isScrolled = $state(false);
	let isUserMenuOpen = $state(false);

	onMount(() => {
		if (!browser) return;

		// Firebase auth listener
		import('firebase/auth').then(({ onAuthStateChanged }) => {
			if (auth) {
				onAuthStateChanged(auth, (user) => {
					authStore.setUser(user);
				});
			}
		});

		// Scroll listener for nav shadow
		const handleScroll = () => {
			isScrolled = window.scrollY > 20;
		};
		window.addEventListener('scroll', handleScroll, { passive: true });

		// Seed workflow definitions on first load (idempotent, fire-and-forget)
		try {
			const client = getConvexClient();
			client.mutation(api.workflows.seedWorkflows, {}).catch(() => {});
		} catch {
			/* Convex not configured — silently skip */
		}

		// Progressive Web Push Hook initialization
		if ('serviceWorker' in navigator && 'PushManager' in window) {
			navigator.serviceWorker.register('/service-worker.js').then((reg) => {
				// Silent injection point hook ready for push notification payloads
			}).catch(() => {
				// Silently degrade gracefully
			});
		}

		return () => window.removeEventListener('scroll', handleScroll);
	});

	function closeMobileMenu() {
		isMobileMenuOpen = false;
	}

	const navLinks = [
		{ name: 'Home', href: '/' },
		{ name: 'Features', href: '/#features' },
		{ name: 'Curriculum', href: '/curriculum' },
		{ name: 'CBT Demo', href: '/exam' },
		{ name: 'Dashboard', href: '/dashboard' },
		{ name: 'Pricing', href: '/pricing' },
		{ name: 'About', href: '/about' }
	];

	function isActive(href: string) {
		if (href === '/') return $page.url.pathname === '/';
		return $page.url.pathname.startsWith(href.split('#')[0]) && href.split('#')[0] !== '/';
	}
</script>

<svelte:head>
	<title>SchoolCBT – Nigeria's Premier AI-Powered CBT Platform</title>
	<meta
		name="description"
		content="Results as a Service for JAMB, WAEC & NECO. AI-grounded CBT practice with predictive analytics."
	/>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,300;0,14..32,400;0,14..32,500;0,14..32,600;0,14..32,700;0,14..32,800;0,14..32,900&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="bg-background relative flex min-h-screen flex-col">
	<!-- ── TOP NAVIGATION ──────────────────────── -->
	<header class="glass-nav sticky top-0 z-50 w-full {isScrolled ? 'scrolled' : ''}">
		<div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
			<!-- Logo -->
			<a href="/" class="flex shrink-0 items-center gap-2.5" onclick={closeMobileMenu}>
				<div
					class="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[hsl(145,100%,39%)] to-[hsl(160,80%,30%)] shadow-md shadow-[hsl(145,100%,39%)]/20"
				>
					<span class="text-base leading-none font-black text-white">SC</span>
				</div>
				<span class="text-foreground text-lg font-black tracking-tight">
					School<span style="color: hsl(var(--primary))">CBT</span>
				</span>
			</a>

			<!-- Desktop Nav -->
			<nav class="hidden items-center gap-1 md:flex" aria-label="Main navigation">
				{#each navLinks as link}
					<a
						href={link.href}
						class="nav-link rounded-lg px-3 py-1.5 {isActive(link.href)
							? 'active bg-[hsl(var(--primary)/0.06)]'
							: ''}"
					>
						{link.name}
					</a>
				{/each}
			</nav>

			<!-- Desktop CTA -->
			<div class="hidden items-center gap-3 md:flex">
				{#if $authStore.user}
					<div class="relative">
						<button
							class="border-border hover:bg-muted flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium transition-colors"
							onclick={() => (isUserMenuOpen = !isUserMenuOpen)}
						>
							<div
								class="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--secondary))] text-xs font-bold text-white"
							>
								{$authStore.user.email?.charAt(0).toUpperCase() ?? 'U'}
							</div>
							<span class="max-w-[100px] truncate"
								>{$authStore.user.displayName ?? $authStore.user.email?.split('@')[0]}</span
							>
							<ChevronDown class="text-muted-foreground h-3.5 w-3.5" />
						</button>
						{#if isUserMenuOpen}
							<div class="glass-panel absolute top-full right-0 z-50 mt-2 w-48 py-1 shadow-xl">
								<a
									href="/dashboard"
									class="hover:bg-muted flex items-center gap-2 px-4 py-2.5 text-sm transition-colors"
									onclick={() => (isUserMenuOpen = false)}>Dashboard</a
								>
								<a
									href="/dashboard"
									class="hover:bg-muted flex items-center gap-2 px-4 py-2.5 text-sm transition-colors"
									onclick={() => (isUserMenuOpen = false)}>My Reports</a
								>
								<hr class="border-border my-1" />
								<button
									class="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-red-600 transition-colors hover:bg-red-50"
									onclick={async () => {
										if (auth) {
											const { signOut } = await import('firebase/auth');
											await signOut(auth);
										}
										isUserMenuOpen = false;
									}}>Sign Out</button
								>
							</div>
						{/if}
					</div>
				{:else}
					<a
						href="/auth/login"
						class="text-muted-foreground hover:text-foreground px-3 py-2 text-sm font-semibold transition-colors"
						>Sign In</a
					>
					<a href="/auth/signup" class="btn-primary px-5 py-2.5 text-sm">Get Started →</a>
				{/if}
			</div>

			<!-- Mobile toggle -->
			<button
				class="border-border bg-card text-foreground hover:bg-muted inline-flex h-10 w-10 items-center justify-center rounded-xl border transition-colors md:hidden"
				onclick={() => (isMobileMenuOpen = !isMobileMenuOpen)}
				aria-label="Toggle navigation menu"
				aria-expanded={isMobileMenuOpen}
			>
				{#if isMobileMenuOpen}<X class="h-5 w-5" />{:else}<Menu class="h-5 w-5" />{/if}
			</button>
		</div>

		<!-- Mobile Menu -->
		{#if isMobileMenuOpen}
			<div
				class="glass-panel border-border animate-scale-in absolute inset-x-0 top-16 z-40 border-t p-4 shadow-2xl md:hidden"
			>
				<nav class="mb-4 flex flex-col gap-1" aria-label="Mobile navigation">
					{#each navLinks as link}
						<a
							href={link.href}
							class="flex items-center rounded-xl px-4 py-3 text-sm font-semibold transition-colors {isActive(
								link.href
							)
								? 'bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))]'
								: 'text-foreground hover:bg-muted'}"
							onclick={closeMobileMenu}
						>
							{link.name}
						</a>
					{/each}
				</nav>
				<div class="border-border flex flex-col gap-2 border-t pt-4">
					{#if $authStore.user}
						<a href="/dashboard" class="btn-primary py-3 text-sm" onclick={closeMobileMenu}
							>Go to Dashboard</a
						>
					{:else}
						<a href="/auth/login" class="btn-outline py-3 text-sm" onclick={closeMobileMenu}
							>Sign In</a
						>
						<a href="/auth/signup" class="btn-primary py-3 text-sm" onclick={closeMobileMenu}
							>Get Started Free</a
						>
					{/if}
				</div>
			</div>
		{/if}
	</header>

	<!-- ── E-WIN ECOSYSTEM BANNER ───────────── -->
	<EWINBanner />

	<!-- ── PAGE CONTENT ─────────────────────── -->
	<main class="flex-grow pb-20 md:pb-0">
		{@render children()}
	</main>

	<BottomNav />
	
	<!-- ── GLOBAL TOAST NOTIFICATIONS ────────── -->
	<ToastProvider />
</div>
