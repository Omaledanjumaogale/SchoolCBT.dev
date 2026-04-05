<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import {
		Menu,
		X,
		ChevronDown,
		ChevronRight,
		BookOpen,
		LayoutDashboard,
		GraduationCap,
		Shield,
		LogIn,
		LogOut,
		User,
		Users,
		Star,
		Home,
		Info,
		CreditCard,
		Brain,
		FileText
	} from 'lucide-svelte';
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
	let openDropdown = $state<string | null>(null);

	onMount(() => {
		if (!browser) return;

		import('firebase/auth').then(({ onAuthStateChanged }) => {
			if (auth) {
				onAuthStateChanged(auth, (user) => {
					authStore.setUser(user);
				});
			}
		});

		const handleScroll = () => {
			isScrolled = window.scrollY > 20;
		};
		window.addEventListener('scroll', handleScroll, { passive: true });

		// Close dropdowns on outside click
		const handleOutsideClick = (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			if (!target.closest('.nav-dropdown-wrapper')) {
				openDropdown = null;
				isUserMenuOpen = false;
			}
		};
		window.addEventListener('click', handleOutsideClick);

		try {
			const client = getConvexClient();
			client.mutation(api.workflows.seedWorkflows, {}).catch(() => {});
		} catch {
			/* Convex not configured */
		}

		if ('serviceWorker' in navigator && 'PushManager' in window) {
			navigator.serviceWorker.register('/service-worker.js').catch(() => {});
		}

		return () => {
			window.removeEventListener('scroll', handleScroll);
			window.removeEventListener('click', handleOutsideClick);
		};
	});

	function closeMobileMenu() {
		isMobileMenuOpen = false;
		openDropdown = null;
	}

	function toggleDropdown(id: string, e: MouseEvent) {
		e.stopPropagation();
		openDropdown = openDropdown === id ? null : id;
	}

	async function handleSignOut() {
		if (auth) {
			const { signOut } = await import('firebase/auth');
			await signOut(auth);
		}
		isUserMenuOpen = false;
		closeMobileMenu();
		goto('/');
	}

	const primaryLinks = [
		{ name: 'Home', href: '/', icon: Home },
		{ name: 'Curriculum', href: '/curriculum', icon: BookOpen },
		{ name: 'CBT Center', href: '/exam', icon: Brain },
		{ name: 'Pricing', href: '/pricing', icon: CreditCard },
		{ name: 'About', href: '/about', icon: Info }
	];

	const portalLinks = [
		{
			id: 'student',
			name: 'Student Login',
			href: '/auth/login?role=student',
			icon: GraduationCap,
			desc: 'Access your study dashboard'
		},
		{
			id: 'tutor',
			name: 'Tutor Login',
			href: '/auth/login?role=tutor',
			icon: Users,
			desc: 'Access your tutor dashboard'
		},
		{
			id: 'admin',
			name: 'Admin Portal',
			href: '/admin',
			icon: Shield,
			desc: 'Administrator access only'
		}
	];

	function isActive(href: string) {
		if (href === '/') return $page.url.pathname === '/';
		return $page.url.pathname.startsWith(href.split('#')[0]) && href.split('#')[0] !== '/';
	}

	const displayName = $derived(
		$authStore.user?.displayName ?? $authStore.user?.email?.split('@')[0] ?? 'User'
	);
</script>

<svelte:head>
	<title>SchoolCBT – Nigeria's Premier AI-Powered CBT Platform</title>
	<meta
		name="description"
		content="AI-powered CBT practice for JAMB, WAEC & NECO. Predictive analytics, instant AI feedback, and tutor matching for Nigerian secondary school students."
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

			<!-- Desktop Nav (hidden — all moved to hamburger) -->
			<!-- Mobile + Desktop hamburger toggle -->
			<div class="flex items-center gap-3">
				<!-- Authenticated user avatar shortcut (desktop) -->
				{#if $authStore.user}
					<div class="nav-dropdown-wrapper relative hidden md:block">
						<button
							class="border-border hover:bg-muted flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium transition-colors"
							onclick={(e) => { e.stopPropagation(); isUserMenuOpen = !isUserMenuOpen; }}
						>
							<div
								class="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--secondary))] text-xs font-bold text-white"
							>
								{$authStore.user.email?.charAt(0).toUpperCase() ?? 'U'}
							</div>
							<span class="max-w-[100px] truncate">{displayName}</span>
							<ChevronDown class="text-muted-foreground h-3.5 w-3.5" />
						</button>
						{#if isUserMenuOpen}
							<div class="glass-panel absolute top-full right-0 z-50 mt-2 w-52 py-1 shadow-xl">
								<a
									href="/dashboard"
									class="hover:bg-muted flex items-center gap-2 px-4 py-2.5 text-sm transition-colors"
									onclick={() => (isUserMenuOpen = false)}
								>
									<LayoutDashboard class="h-4 w-4" /> Dashboard
								</a>
								<a
									href="/dashboard#reports"
									class="hover:bg-muted flex items-center gap-2 px-4 py-2.5 text-sm transition-colors"
									onclick={() => (isUserMenuOpen = false)}
								>
									<FileText class="h-4 w-4" /> My Reports
								</a>
								<hr class="border-border my-1" />
								<button
									class="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-red-600 transition-colors hover:bg-red-50"
									onclick={handleSignOut}
								>
									<LogOut class="h-4 w-4" /> Sign Out
								</button>
							</div>
						{/if}
					</div>
				{:else}
					<a
						href="/auth/signup"
						class="btn-primary hidden px-5 py-2 text-sm md:flex"
					>Get Started →</a>
				{/if}

				<!-- Hamburger button — ALL devices -->
				<button
					class="border-border bg-card text-foreground hover:bg-muted inline-flex h-10 w-10 items-center justify-center rounded-xl border transition-colors"
					onclick={(e) => { e.stopPropagation(); isMobileMenuOpen = !isMobileMenuOpen; openDropdown = null; }}
					aria-label="Toggle navigation menu"
					aria-expanded={isMobileMenuOpen}
				>
					{#if isMobileMenuOpen}<X class="h-5 w-5" />{:else}<Menu class="h-5 w-5" />{/if}
				</button>
			</div>
		</div>

		<!-- ── HAMBURGER DROPDOWN MENU ─────────────── -->
		{#if isMobileMenuOpen}
		<div
			class="glass-panel border-border animate-scale-in absolute inset-x-0 top-16 z-40 border-t shadow-2xl"
			role="none"
			onclick={(e) => e.stopPropagation()}
			onkeydown={(e) => e.stopPropagation()}
		>
				<div class="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
					<div class="grid gap-1 md:grid-cols-2 lg:grid-cols-3">
						<!-- Primary Navigation -->
						<div class="md:col-span-2 lg:col-span-2">
							<p class="text-muted-foreground mb-2 px-2 text-xs font-semibold tracking-wider uppercase">
								Navigation
							</p>
							<nav class="flex flex-col gap-1">
								{#each primaryLinks as link}
									<a
										href={link.href}
										class="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors {isActive(
											link.href
										)
											? 'bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))]'
											: 'text-foreground hover:bg-muted'}"
										onclick={closeMobileMenu}
									>
										<link.icon class="h-4 w-4 shrink-0" />
										{link.name}
										{#if isActive(link.href)}
											<span class="ml-auto h-1.5 w-1.5 rounded-full bg-[hsl(var(--primary))]"></span>
										{/if}
									</a>
								{/each}

								<!-- Dashboard link if authenticated -->
								{#if $authStore.user}
									<a
										href="/dashboard"
										class="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors {isActive('/dashboard')
											? 'bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))]'
											: 'text-foreground hover:bg-muted'}"
										onclick={closeMobileMenu}
									>
										<LayoutDashboard class="h-4 w-4 shrink-0" />
										My Dashboard
									</a>
								{/if}
							</nav>
						</div>

						<!-- Portals Section -->
						<div>
							<p class="text-muted-foreground mb-2 px-2 text-xs font-semibold tracking-wider uppercase">
								Portals
							</p>
							<div class="flex flex-col gap-1">
								{#each portalLinks as portal}
									<a
										href={portal.href}
										class="group flex items-start gap-3 rounded-xl border border-transparent px-3 py-2.5 text-sm transition-all hover:border-[hsl(var(--primary)/0.2)] hover:bg-[hsl(var(--primary)/0.05)]"
										onclick={closeMobileMenu}
									>
										<div
											class="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[hsl(var(--primary)/0.1)]"
										>
											<portal.icon class="h-4 w-4 text-[hsl(var(--primary))]" />
										</div>
										<div>
											<p class="text-foreground font-semibold">{portal.name}</p>
											<p class="text-muted-foreground text-xs">{portal.desc}</p>
										</div>
									</a>
								{/each}
							</div>

							<!-- Auth CTA -->
							<div class="border-border mt-4 flex flex-col gap-2 border-t pt-4">
								{#if $authStore.user}
									<button
										onclick={handleSignOut}
										class="btn-outline flex items-center justify-center gap-2 py-2.5 text-sm text-red-600 border-red-200 hover:bg-red-50"
									>
										<LogOut class="h-4 w-4" /> Sign Out
									</button>
								{:else}
									<a href="/auth/login" class="btn-outline py-2.5 text-sm" onclick={closeMobileMenu}>
										<LogIn class="mr-2 inline h-4 w-4" /> Sign In
									</a>
									<a href="/auth/signup" class="btn-primary py-2.5 text-sm" onclick={closeMobileMenu}>
										Get Started Free →
									</a>
								{/if}
							</div>
						</div>
					</div>
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
