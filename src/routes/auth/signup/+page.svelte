<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import { fade, fly } from 'svelte/transition';

	let name = $state('');
	let email = $state('');
	let password = $state('');
	let level = $state('SSS');
	let isLoading = $state(false);

	function handleSignup() {
		isLoading = true;
		setTimeout(() => (isLoading = false), 2000);
	}
</script>

<SEO 
	title="Sign Up | SchoolCBT Enterprise"
	description="Create your scholar account and join 50,000+ students preparing for JAMB, WAEC, and NECO with SchoolCBT."
/>

<Header />

<main class="pt-24 min-h-screen bg-hero pb-20 flex items-center justify-center">
	<div class="max-w-md w-full px-4 relative z-10">
		<div in:fade class="glass-card p-8 sm:p-12 relative overflow-hidden group">
			<div class="absolute top-0 right-0 p-10 text-9xl opacity-[0.03] group-hover:scale-110 transition-transform">✨</div>
			<div class="relative z-10">
				<div class="text-center mb-10">
					<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-jade/10 border border-jade/20 text-jade text-[10px] font-black uppercase tracking-widest mb-6">
						<span>🚀</span> Join the Elite
					</div>
					<h1 class="text-3xl font-sora font-900 text-white mb-2 tracking-tight">Create <span class="text-gold">Account</span></h1>
					<p class="text-white/40 text-sm font-medium">Your journey to success starts here. 🇳🇬🎓</p>
				</div>

				<form onsubmit={handleSignup} class="space-y-6">
					<div class="space-y-2">
						<label class="text-white/40 text-[10px] font-bold uppercase tracking-widest ml-1" for="name">Full Name</label>
						<input 
							id="name" 
							type="text" 
							bind:value={name}
							placeholder="Danjuma Ogale"
							class="w-full bg-white/05 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-gold/50 transition-all placeholder:text-white/10"
							required
						/>
					</div>
					<div class="space-y-2">
						<label class="text-white/40 text-[10px] font-bold uppercase tracking-widest ml-1" for="email">Student Email</label>
						<input 
							id="email" 
							type="email" 
							bind:value={email}
							placeholder="scholar@email.com"
							inputmode="email"
							class="w-full bg-white/05 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-gold/50 transition-all placeholder:text-white/10"
							required
						/>
					</div>
					<div class="space-y-2">
						<label class="text-white/40 text-[10px] font-bold uppercase tracking-widest ml-1" for="level">Educational Level</label>
						<select id="level" bind:value={level} class="w-full bg-white/05 border border-white/10 rounded-2xl p-4 text-white font-bold focus:border-gold/50 outline-none transition-all appearance-none cursor-pointer">
							<option value="JSS">👶 Junior Secondary (JSS)</option>
							<option value="SSS">🎓 Senior Secondary (SSS)</option>
						</select>
					</div>
					<div class="space-y-2">
						<label class="text-white/40 text-[10px] font-bold uppercase tracking-widest ml-1" for="password">Create Password</label>
						<input 
							id="password" 
							type="password" 
							bind:value={password}
							placeholder="••••••••"
							class="w-full bg-white/05 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-gold/50 transition-all placeholder:text-white/10"
							required
						/>
					</div>

					<button 
						type="submit"
						disabled={isLoading}
						class="w-full btn-gold py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-gold/20 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-3"
					>
						{#if isLoading}
							<span class="w-5 h-5 border-4 border-cobalt/30 border-t-cobalt rounded-full animate-spin"></span>
							Creating Account...
						{:else}
							🔥 Start Practice Free
						{/if}
					</button>
				</form>

				<div class="mt-10 pt-8 border-t border-white/05 text-center">
					<p class="text-white/40 text-xs mb-6 font-medium">Already have an account?</p>
					<a 
						href="/auth/login" 
						class="w-full btn-outline py-4 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-white/05 transition-all"
					>
						🔑 Secure Sign In
					</a>
				</div>
			</div>
		</div>
	</div>
</main>

<Footer />
