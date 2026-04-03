<script lang="ts">
	const currentYear = new Date().getFullYear();
</script>

<footer class="bg-cobalt-xdark/80 border-t border-white/05 pt-16 sm:pt-24 pb-24 md:pb-12 relative overflow-hidden backdrop-blur-3xl">
	<!-- Background Elements -->
	<div class="absolute inset-0 pointer-events-none opacity-10">
		<div class="orb orb-blue bottom-[-10%] left-[-10%] w-[500px] h-[500px]"></div>
		<div class="orb orb-green top-[-10%] right-[-10%] w-[400px] h-[400px]"></div>
	</div>

	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-16 mb-20">
			<!-- Logo & Mission -->
			<div class="lg:col-span-1">
				<a href="#home" class="flex items-center gap-3 mb-8 group">
					<div
						class="w-12 h-12 rounded-2xl bg-gradient-to-br from-cobalt-light to-cobalt flex items-center justify-center border border-gold/30 glow-gold transition-all group-hover:scale-110 group-hover:rotate-3"
					>
						<span class="text-2xl">🎓</span>
					</div>
					<div class="flex flex-col">
						<span class="font-sora font-900 text-2xl tracking-tighter text-white leading-none">
							School<span class="text-gold">CBT</span>
						</span>
						<span class="text-[10px] text-jade font-bold tracking-widest uppercase mt-1">Enterprise RaaS</span>
					</div>
				</a>
				<p class="text-white/40 text-base leading-relaxed mb-8 max-w-sm">
					Nigeria's premier AI-powered CBT platform. Results as a Service — we don't just give you
					access to questions, we guarantee exam readiness for a brighter future. 🇳🇬🚀
				</p>
				<div class="flex gap-4">
					{#each ['🐦', '📸', '💼', '📺'] as emoji}
						<a
							href="/"
							class="w-12 h-12 rounded-2xl bg-white/03 border border-white/05 flex items-center justify-center text-xl hover:bg-white/07 hover:border-gold/30 hover:-translate-y-1 transition-all"
						>
							{emoji}
						</a>
					{/each}
				</div>
			</div>

			<!-- Quick Navigation -->
			<div>
				<h4 class="text-white font-sora font-800 mb-8 text-sm uppercase tracking-[0.2em] flex items-center gap-2">
					<span>🚀</span> Platform
				</h4>
				<ul class="space-y-5">
					{#each [
						{ name: '🏠 Home', href: '#home' },
						{ name: '✨ Features', href: '#features' },
						{ name: '📚 Curriculum', href: '#curriculum' },
						{ name: '📝 CBT Demo', href: '#cbt-demo' },
						{ name: '📊 Dashboard', href: '#student-dashboard' }
					] as link}
						<li>
							<a href={link.href} class="text-white/40 hover:text-gold text-sm font-bold transition-all flex items-center gap-3 group">
								<span class="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
								{link.name}
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Resources & Legal -->
			<div>
				<h4 class="text-white font-sora font-800 mb-8 text-sm uppercase tracking-[0.2em] flex items-center gap-2">
					<span>📖</span> Resources
				</h4>
				<ul class="space-y-5">
					{#each [
						{ name: '📰 Exam Blog', href: '/about' },
						{ name: '💡 Help Center', href: '/about' },
						{ name: '📜 Privacy Policy', href: '/about' },
						{ name: '🤝 Terms of Service', href: '/about' },
						{ name: '💼 Careers', href: '/about' }
					] as link}
						<li>
							<a
								href={link.href}
								class="text-white/40 hover:text-jade text-sm font-bold transition-all flex items-center gap-3 group"
							>
								<span class="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
								{link.name}
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Newsletter Engagement -->
			<div>
				<h4 class="text-white font-sora font-800 mb-8 text-sm uppercase tracking-[0.2em] flex items-center gap-2">
					<span>📧</span> Stay Updated
				</h4>
				<p class="text-white/40 text-sm mb-8 leading-relaxed">
					Get the latest exam tips, AI insights, and platform updates directly in your inbox.
				</p>
				<div class="relative group">
					<input
						type="email"
						placeholder="future_leader@email.com"
						class="w-full bg-white/05 border border-white/10 rounded-2xl py-4 pl-5 pr-16 text-sm text-white outline-none focus:border-gold/50 transition-all placeholder:text-white/20"
					/>
					<button class="absolute right-2 top-2 bottom-2 px-4 rounded-xl bg-gold text-cobalt font-black text-[10px] uppercase tracking-widest shadow-lg shadow-gold/20 hover:scale-105 active:scale-95 transition-all">
						Join
					</button>
				</div>
				<p class="mt-4 text-[10px] text-white/20 font-medium italic">
					✨ Join 5,000+ students already preparing with us!
				</p>
			</div>
		</div>

		<!-- Footer Bottom -->
		<div class="pt-12 border-t border-white/05 flex flex-col lg:flex-row justify-between items-center gap-8">
			<div class="text-white/30 text-xs font-medium text-center lg:text-left">
				© {currentYear} <span class="text-white/50 font-black">SchoolCBT Enterprise</span>. 
				Built for the <span class="text-jade font-bold">Next Generation</span> of African Leaders. 🌍✨
			</div>
			
			<div class="flex flex-wrap items-center justify-center gap-8">
				<div class="flex items-center gap-3 px-4 py-2 rounded-full bg-jade/05 border border-jade/10">
					<span class="w-2 h-2 rounded-full bg-jade animate-pulse shadow-[0_0_8px_#50C878]"></span>
					<span class="text-jade text-[10px] font-black uppercase tracking-[0.2em]">All Systems Nominal</span>
				</div>
				<div class="flex items-center gap-4">
					<span class="text-white/20 text-[10px] font-black uppercase tracking-widest">Powered by</span>
					<div class="flex items-center gap-4 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
						<span class="text-white font-black text-xs">CLOUDFLARE</span>
						<span class="text-white font-black text-xs">CONVEX</span>
						<span class="text-white font-black text-xs">FIREBASE</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</footer>
