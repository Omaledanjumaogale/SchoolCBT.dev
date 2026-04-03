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
	class="fixed top-0 left-0 right-0 z-[100] transition-all duration-500 {isScrolled
		? 'glass-nav py-2'
		: 'bg-transparent py-5'}"
>
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex items-center justify-between h-16">
			<!-- Logo -->
			<a href="/" class="flex items-center gap-3 group shrink-0 relative z-[110]">
				<div
					class="w-10 h-10 rounded-xl bg-gradient-to-br from-cobalt-light to-cobalt flex items-center justify-center border border-gold/30 glow-gold transition-all group-hover:scale-110 group-hover:rotate-3"
				>
					<span class="text-xl">🎓</span>
				</div>
				<div class="flex flex-col">
					<span class="font-sora font-900 text-xl tracking-tighter leading-none">
						<span class="text-white">School</span><span class="text-gold">CBT</span>
					</span>
					<span class="text-[10px] text-jade font-bold tracking-widest uppercase mt-0.5">Enterprise RaaS</span>
				</div>
			</a>

			<!-- CTA & Hamburger -->
			<div class="flex items-center gap-4 relative z-[110]">
				<!-- Desktop CTAs (Still visible on desktop for better conversion) -->
				<div class="hidden md:flex items-center gap-3 mr-2">
					<a href="/auth/login" class="text-white/70 hover:text-white text-sm font-bold transition-colors">Sign In</a>
					<a href="/auth/signup" class="btn-gold px-6 py-2.5 text-sm font-bold">Get Started →</a>
				</div>

				<!-- The Global Hamburger Button -->
				<button
					id="hamburger"
					onclick={toggleMenu}
					class="flex flex-col items-end gap-1.5 p-3 rounded-2xl bg-white/05 hover:bg-white/10 border border-white/10 transition-all active:scale-90"
					aria-label="Toggle Menu"
				>
					<span
						class="h-0.5 bg-white rounded-full transition-all duration-300 block {isMenuOpen
							? 'w-6 rotate-45 translate-y-2'
							: 'w-6'}"
					></span>
					<span
						class="h-0.5 bg-white rounded-full transition-all duration-300 block {isMenuOpen
							? 'opacity-0'
							: 'w-4'}"
					></span>
					<span
						class="h-0.5 bg-white rounded-full transition-all duration-300 block {isMenuOpen
							? 'w-6 -rotate-45 -translate-y-2'
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
			class="fixed inset-0 z-[90] bg-cobalt-xdark/95 backdrop-blur-2xl flex flex-col items-center justify-center p-6"
		>
			<!-- Animated Background Orbs for the Menu -->
			<div class="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
				<div class="orb orb-blue top-[-10%] left-[-10%]"></div>
				<div class="orb orb-green bottom-[-10%] right-[-10%]"></div>
			</div>

			<div class="w-full max-w-2xl mx-auto relative z-10">
				<div class="grid md:grid-cols-2 gap-4 md:gap-6">
					{#each navLinks as link, i}
						<div
							in:fly={{ y: 20, delay: 100 + i * 50, duration: 500 }}
							out:fly={{ y: -20, delay: i * 30, duration: 300 }}
						>
							<a
								href={link.href}
								onclick={toggleMenu}
								class="group flex items-center gap-5 p-5 rounded-3xl bg-white/03 border border-white/05 hover:bg-white/07 hover:border-gold/30 transition-all"
							>
								<div class="w-14 h-14 rounded-2xl bg-cobalt/40 border border-white/10 flex items-center justify-center text-3xl group-hover:scale-110 group-hover:rotate-3 transition-transform">
									{link.name.split(' ')[0]}
								</div>
								<div>
									<div class="text-white font-sora font-bold text-lg group-hover:text-gold transition-colors">{link.name.split(' ').slice(1).join(' ')}</div>
									<div class="text-white/40 text-xs mt-1">{link.desc}</div>
								</div>
							</a>
						</div>
					{/each}
				</div>

				<!-- Mobile-only CTAs inside menu -->
				<div 
					in:fly={{ y: 20, delay: 500, duration: 500 }}
					class="md:hidden mt-10 grid grid-cols-2 gap-4"
				>
					<a href="/auth/login" onclick={toggleMenu} class="btn-outline py-4 font-bold text-center">Sign In</a>
					<a href="/auth/signup" onclick={toggleMenu} class="btn-gold py-4 font-bold text-center">Sign Up</a>
				</div>
				
				<div 
					in:fade={{ delay: 700 }}
					class="mt-12 text-center"
				>
					<p class="text-white/20 text-[10px] uppercase tracking-[0.3em] font-bold">© 2026 SchoolCBT Enterprise • All Rights Reserved</p>
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
