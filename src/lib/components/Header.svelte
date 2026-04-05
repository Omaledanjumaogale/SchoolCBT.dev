<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, slide, fly } from 'svelte/transition';

	let isMenuOpen = $state(false);
	let isScrolled = $state(false);

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
		if (isMenuOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}
	}

	onMount(() => {
		const handleScroll = () => {
			isScrolled = window.scrollY > 20;
		};
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
			document.body.style.overflow = 'auto';
		};
	});

	const navLinks = [
		{ name: '🏠 Home', href: '/', desc: 'Back to landing page' },
		{ name: '✨ Features', href: '/#features', desc: 'Explore what we offer' },
		{ name: '📚 Curriculum', href: '/curriculum', desc: 'Browse subject modules' },
		{ name: '⚙️ How It Works', href: '/#how-it-works', desc: 'The 4-step process' },
		{ name: '📝 CBT Demo', href: '/exam', desc: 'Try a sample exam' },
		{ name: '📊 Dashboard', href: '/dashboard', desc: 'Student progress tracking' },
		{ name: '💳 Pricing', href: '/pricing', desc: 'Plans and subscriptions' },
		{ name: 'ℹ️ About', href: '/about', desc: 'Our mission and team' }
	];
</script>

<nav
	id="navbar"
	class="fixed top-0 right-0 left-0 z-[100] transition-all duration-500 {isScrolled
		? 'glass-nav py-2'
		: 'bg-transparent py-5'}"
>
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 items-center justify-between">
			<!-- Logo -->
			<a href="/" class="group relative z-[110] flex shrink-0 items-center gap-3">
				<div
					class="from-cobalt-light to-cobalt border-gold/30 glow-gold flex h-10 w-10 items-center justify-center rounded-xl border bg-gradient-to-br transition-all group-hover:scale-110 group-hover:rotate-3"
				>
					<span class="text-xl">🎓</span>
				</div>
				<div class="flex flex-col">
					<span class="font-sora font-900 text-xl leading-none tracking-tighter">
						<span class="text-white">School</span><span class="text-gold">CBT</span>
					</span>
					<span class="text-jade mt-0.5 text-[10px] font-bold tracking-widest uppercase"
						>Enterprise RaaS</span
					>
				</div>
			</a>

			<!-- CTA & Hamburger -->
			<div class="relative z-[110] flex items-center gap-4">
				<!-- Desktop CTAs (Still visible on desktop for better conversion) -->
				<div class="mr-2 hidden items-center gap-3 md:flex">
					<a
						href="/auth/login"
						class="text-sm font-bold text-white/70 transition-colors hover:text-white">Sign In</a
					>
					<a href="/auth/signup" class="btn-gold px-6 py-2.5 text-sm font-bold">Get Started →</a>
				</div>

				<!-- The Global Hamburger Button -->
				<button
					id="hamburger"
					onclick={toggleMenu}
					class="bg-white/05 flex min-h-[44px] min-w-[44px] flex-col items-end justify-center gap-1.5 rounded-2xl border border-white/10 p-3 transition-all hover:bg-white/10 active:scale-90"
					aria-label="Toggle Menu"
				>
					<span
						class="block h-0.5 rounded-full bg-white transition-all duration-300 {isMenuOpen
							? 'w-6 translate-y-2 rotate-45'
							: 'w-6'}"
					></span>
					<span
						class="block h-0.5 rounded-full bg-white transition-all duration-300 {isMenuOpen
							? 'opacity-0'
							: 'w-4'}"
					></span>
					<span
						class="block h-0.5 rounded-full bg-white transition-all duration-300 {isMenuOpen
							? 'w-6 -translate-y-2 -rotate-45'
							: 'w-5'}"
					></span>
				</button>
			</div>
		</div>
	</div>

	<!-- Fullscreen Navigation Overlay -->
	{#if isMenuOpen}
		<div
			transition:fade={{ duration: 300 }}
			class="bg-cobalt-xdark/95 fixed inset-0 z-[90] flex flex-col items-center justify-center p-6 backdrop-blur-2xl"
		>
			<!-- Animated Background Orbs for the Menu -->
			<div class="pointer-events-none absolute inset-0 overflow-hidden opacity-20">
				<div class="orb orb-blue top-[-10%] left-[-10%]"></div>
				<div class="orb orb-green right-[-10%] bottom-[-10%]"></div>
			</div>

			<div class="relative z-10 mx-auto w-full max-w-2xl">
				<div class="grid gap-4 md:grid-cols-2 md:gap-6">
					{#each navLinks as link, i}
						<div
							in:fly={{ y: 20, delay: 100 + i * 50, duration: 500 }}
							out:fly={{ y: -20, delay: i * 30, duration: 300 }}
						>
							<a
								href={link.href}
								onclick={toggleMenu}
								class="group bg-white/03 border-white/05 hover:bg-white/07 hover:border-gold/30 flex items-center gap-5 rounded-3xl border p-5 transition-all"
							>
								<div
									class="bg-cobalt/40 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 text-3xl transition-transform group-hover:scale-110 group-hover:rotate-3"
								>
									{link.name.split(' ')[0]}
								</div>
								<div>
									<div
										class="font-sora group-hover:text-gold text-lg font-bold text-white transition-colors"
									>
										{link.name.split(' ').slice(1).join(' ')}
									</div>
									<div class="mt-1 text-xs text-white/40">{link.desc}</div>
								</div>
							</a>
						</div>
					{/each}
				</div>

				<!-- Mobile-only CTAs inside menu -->
				<div
					in:fly={{ y: 20, delay: 500, duration: 500 }}
					class="mt-10 grid grid-cols-2 gap-4 md:hidden"
				>
					<a href="/auth/login" onclick={toggleMenu} class="btn-outline py-4 text-center font-bold"
						>Sign In</a
					>
					<a href="/auth/signup" onclick={toggleMenu} class="btn-gold py-4 text-center font-bold"
						>Sign Up</a
					>
				</div>

				<div in:fade={{ delay: 700 }} class="mt-12 text-center">
					<p class="text-[10px] font-bold tracking-[0.3em] text-white/20 uppercase">
						© 2026 SchoolCBT Enterprise • All Rights Reserved
					</p>
				</div>
			</div>
		</div>
	{/if}
</nav>

<style>
	.orb {
		position: absolute;
		border-radius: 50%;
		filter: blur(80px);
		opacity: 0.18;
		pointer-events: none;
		animation: orbFloat 10s ease-in-out infinite alternate;
	}
	.orb-blue {
		background: #003399;
		width: 500px;
		height: 500px;
	}
	.orb-green {
		background: #50c878;
		width: 300px;
		height: 300px;
		animation-delay: 3s;
	}
	@keyframes orbFloat {
		0% {
			transform: translate(0, 0) scale(1);
		}
		100% {
			transform: translate(30px, 40px) scale(1.08);
		}
	}
</style>
