<script lang="ts">
	import { Mail, Lock, User, Eye, EyeOff, AlertCircle, Check, Phone } from 'lucide-svelte';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';

	let searchParams = browser ? new URLSearchParams(window.location.search) : null;
	let initialRole = (searchParams?.get('role') === 'tutor' ? 'tutor' : 'student') as
		| 'student'
		| 'tutor';

	let role = $state<'student' | 'tutor'>(initialRole);
	let fullName = $state('');
	let email = $state('');
	let phone = $state('');
	let password = $state('');
	let confirmPassword = $state('');
	let examTarget = $state('jamb');
	let educationLevel = $state('sss');
	let showPassword = $state(false);
	let loading = $state(false);
	let error = $state('');
	let step = $state(1); // 1 = account details, 2 = study profile

	const examOptions = [
		{ value: 'jamb', label: 'JAMB (UTME)' },
		{ value: 'waec', label: 'WAEC' },
		{ value: 'neco', label: 'NECO' },
		{ value: 'nabteb', label: 'NABTEB' },
		{ value: 'post-utme', label: 'Post-UTME' }
	];

	const levelOptions = [
		{ value: 'jss', label: 'Junior Secondary (JSS)' },
		{ value: 'sss', label: 'Senior Secondary (SSS)' }
	];

	function validateStep1() {
		if (!fullName.trim()) {
			error = 'Please enter your full name.';
			return false;
		}
		if (!email.includes('@')) {
			error = 'Please enter a valid email address.';
			return false;
		}
		if (phone && phone.length < 10) {
			error = 'Please enter a valid phone number.';
			return false;
		}
		if (password.length < 8) {
			error = 'Password must be at least 8 characters.';
			return false;
		}
		if (password !== confirmPassword) {
			error = 'Passwords do not match.';
			return false;
		}
		return true;
	}

	function nextStep() {
		error = '';
		if (!validateStep1()) return;
		step = 2;
	}

	async function handleSignup(e: Event) {
		e.preventDefault();
		if (step === 1) {
			nextStep();
			return;
		}
		if (!browser) return;
		error = '';
		loading = true;
		try {
			const { auth } = await import('$lib/firebase');
			const { createUserWithEmailAndPassword, updateProfile } = await import('firebase/auth');
			if (!auth) throw new Error('Auth not initialized');
			const credential = await createUserWithEmailAndPassword(auth, email, password);
			await updateProfile(credential.user, { displayName: fullName });

			// Persist to Convex
			const { getConvexClient } = await import('$lib/convex');
			const { api } = await import('../../../../convex/_generated/api');
			const convex = getConvexClient();
			await convex.mutation(api.users.upsertUser, {
				uid: credential.user.uid,
				name: fullName,
				email,
				role: role === 'tutor' ? 'tutor' : 'student',
				level: educationLevel,
				school: ''
			});

			const plan = $page.url.searchParams.get('plan');
			if (plan) {
				goto(`/checkout?plan=${plan}`);
			} else {
				goto(role === 'tutor' ? '/tutor' : '/dashboard');
			}
		} catch (err: unknown) {
			const code = (err as { code?: string })?.code ?? '';
			if (code === 'auth/email-already-in-use') {
				error = 'This email is already registered. Please sign in instead.';
			} else if (code === 'auth/weak-password') {
				error = 'Password is too weak. Use at least 8 characters with mixed case.';
			} else {
				error = 'Registration failed. Please try again.';
			}
			step = 1;
		} finally {
			loading = false;
		}
	}

	async function handleGoogleSignUp() {
		if (!browser) return;
		loading = true;
		error = '';
		try {
			const { auth } = await import('$lib/firebase');
			const { signInWithPopup, GoogleAuthProvider } = await import('firebase/auth');
			if (!auth) throw new Error('Auth not initialized');
			await signInWithPopup(auth, new GoogleAuthProvider());
			goto('/dashboard');
		} catch {
			error = 'Google sign-up failed. Please try again.';
		} finally {
			loading = false;
		}
	}

	const passwordStrength = $derived(() => {
		if (!password) return 0;
		let score = 0;
		if (password.length >= 8) score++;
		if (/[A-Z]/.test(password)) score++;
		if (/[0-9]/.test(password)) score++;
		if (/[^A-Za-z0-9]/.test(password)) score++;
		return score;
	});

	const strengthLabel = $derived(() => {
		const s = passwordStrength();
		if (s <= 1) return { text: 'Weak', color: 'hsl(0,84%,55%)' };
		if (s === 2) return { text: 'Fair', color: 'hsl(38,100%,50%)' };
		if (s === 3) return { text: 'Good', color: 'hsl(var(--primary))' };
		return { text: 'Strong', color: 'hsl(142,71%,40%)' };
	});
</script>

<svelte:head>
	<title>Create Account – SchoolCBT</title>
	<meta
		name="description"
		content="Join SchoolCBT — Nigeria's premier AI-powered CBT exam prep platform for JAMB, WAEC, NECO & NABTEB."
	/>
</svelte:head>

<div class="flex min-h-[calc(100vh-64px)] items-center justify-center px-4 py-12">
	<div class="pointer-events-none absolute inset-0 overflow-hidden">
		<div
			class="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-[hsl(var(--primary)/0.06)] blur-[100px]"
		></div>
		<div
			class="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-[hsl(var(--accent)/0.05)] blur-[80px]"
		></div>
	</div>

	<div class="relative w-full max-w-md">
		<div class="glass-panel border-t-2 border-t-[hsl(var(--primary)/0.4)] p-8 shadow-2xl md:p-10">
			<!-- Logo + Header -->
			<div class="mb-7 text-center">
				<a href="/" class="mb-5 inline-flex items-center gap-2">
					<div
						class="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[hsl(145,100%,39%)] to-[hsl(160,80%,30%)] shadow-md"
					>
						<span class="text-sm font-black text-white">SC</span>
					</div>
					<span class="text-foreground text-lg font-black"
						>School<span class="text-[hsl(var(--primary))]">CBT</span></span
					>
				</a>
				<h1 class="text-foreground mb-1 text-2xl font-black">
					{step === 1 ? 'Create your account' : 'Set up your study profile'}
				</h1>
				<p class="text-muted-foreground text-sm">
					{step === 1
						? 'Start your AI-powered exam journey today'
						: 'Help us personalize your CBT experience'}
				</p>
			</div>

			<!-- Step indicator -->
			<div class="mb-7 flex items-center gap-3">
				{#each [1, 2] as s}
					<div class="flex flex-1 items-center gap-2">
						<div
							class="flex h-7 w-7 items-center justify-center rounded-full border-2 text-xs font-bold transition-all
              {s < step
								? 'border-[hsl(var(--primary))] bg-[hsl(var(--primary))] text-white'
								: s === step
									? 'border-[hsl(var(--primary))] bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))]'
									: 'border-border text-muted-foreground'}"
						>
							{s < step ? '✓' : s}
						</div>
						<span
							class="text-xs font-semibold {s === step
								? 'text-foreground'
								: 'text-muted-foreground'}"
						>
							{s === 1 ? 'Account' : 'Profile'}
						</span>
					</div>
					{#if s === 1}<div class="bg-border h-px flex-1"></div>{/if}
				{/each}
			</div>

			<!-- Role toggle -->
				<div class="relative z-50 mb-7">
					<div class="border-border bg-muted/60 flex rounded-xl border p-1 shadow-inner">
						<button
							type="button"
							class="flex-1 rounded-lg py-3 text-sm font-black transition-all duration-200 {role === 'student'
								? 'bg-white text-[hsl(var(--primary))] shadow-sm border border-border/50 scale-[1.02]'
								: 'text-muted-foreground hover:bg-muted/80'}"
							onclick={() => (role = 'student')}
						>
							Student
						</button>
						<button
							type="button"
							class="flex-1 rounded-lg py-3 text-sm font-black transition-all duration-200 {role === 'tutor'
								? 'bg-white text-[hsl(var(--primary))] shadow-sm border border-border/50 scale-[1.02]'
								: 'text-muted-foreground hover:bg-muted/80'}"
							onclick={() => (role = 'tutor')}
						>
							Tutor
						</button>
					</div>
				</div>
				
				<div class="mb-7 p-4 rounded-xl bg-[hsl(var(--primary)/0.03)] border border-[hsl(var(--primary)/0.1)] text-center transition-all duration-500">
					<p class="text-xs font-bold text-foreground mb-1">
						Joining as <span class="text-[hsl(var(--primary))] uppercase">{role}</span>
					</p>
					<p class="text-[10px] text-muted-foreground leading-relaxed px-2">
						{#if role === 'student'}
							Get AI-curated CBT batches, track your pass probability, and master your subjects.
						{:else}
							Assist students in their exam preparation, share your expertise, and build your tutor reputation.
						{/if}
					</p>
				</div>

			<!-- Error -->
			{#if error}
				<div
					class="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3"
				>
					<AlertCircle class="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
					<p class="text-sm font-medium text-red-700">{error}</p>
				</div>
			{/if}

			<form onsubmit={handleSignup}>
				{#if step === 1}
					<!-- STEP 1: Account Details -->
					<div class="space-y-4">
						<!-- Google -->
						<button
							type="button"
							class="btn-outline w-full gap-3 rounded-xl py-3.5 text-sm font-semibold"
							onclick={handleGoogleSignUp}
							disabled={loading}
						>
							<svg class="h-5 w-5" viewBox="0 0 24 24">
								<path
									d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
									fill="#4285F4"
								/>
								<path
									d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
									fill="#34A853"
								/>
								<path
									d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
									fill="#FBBC05"
								/>
								<path
									d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
									fill="#EA4335"
								/>
							</svg>
							Continue with Google
						</button>

						<div class="divider text-xs">or create with email</div>

						<div>
							<label for="fullName" class="text-foreground mb-1.5 block text-sm font-semibold"
								>Full Name</label
							>
							<div class="input-icon-wrap">
								<User class="input-icon h-4 w-4" />
								<input
									id="fullName"
									type="text"
									bind:value={fullName}
									placeholder="Chukwuemeka Obi"
									class="input-field rounded-xl"
									required
									autocomplete="name"
								/>
							</div>
						</div>

						<div>
							<label for="reg-email" class="text-foreground mb-1.5 block text-sm font-semibold"
								>Email Address</label
							>
							<div class="input-icon-wrap">
								<Mail class="input-icon h-4 w-4" />
								<input
									id="reg-email"
									type="email"
									bind:value={email}
									placeholder="student@example.com"
									class="input-field rounded-xl"
									required
									autocomplete="email"
								/>
							</div>
						</div>

						<div>
							<label for="phone" class="text-foreground mb-1.5 block text-sm font-semibold"
								>Phone Number <span class="text-muted-foreground font-normal">(optional)</span
								></label
							>
							<div class="input-icon-wrap">
								<Phone class="input-icon h-4 w-4" />
								<input
									id="phone"
									type="tel"
									bind:value={phone}
									placeholder="08012345678"
									class="input-field rounded-xl"
									autocomplete="tel"
								/>
							</div>
						</div>

						<div>
							<label for="reg-password" class="text-foreground mb-1.5 block text-sm font-semibold"
								>Password</label
							>
							<div class="input-icon-wrap relative">
								<Lock class="input-icon h-4 w-4" />
								<input
									id="reg-password"
									type={showPassword ? 'text' : 'password'}
									bind:value={password}
									placeholder="Minimum 8 characters"
									class="input-field rounded-xl pr-12"
									required
									autocomplete="new-password"
								/>
								<button
									type="button"
									class="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 p-1"
									onclick={() => (showPassword = !showPassword)}
								>
									{#if showPassword}<EyeOff class="h-4 w-4" />{:else}<Eye class="h-4 w-4" />{/if}
								</button>
							</div>
							{#if password}
								<div class="mt-2 space-y-1.5">
									<div class="flex gap-1">
										{#each [1, 2, 3, 4] as s}
											<div
												class="h-1.5 flex-1 rounded-full transition-all"
												style="background: {s <= passwordStrength()
													? strengthLabel().color
													: 'hsl(var(--muted))'}"
											></div>
										{/each}
									</div>
									<p class="text-xs font-semibold" style="color:{strengthLabel().color}">
										{strengthLabel().text} password
									</p>
								</div>
							{/if}
						</div>

						<div>
							<label
								for="confirm-password"
								class="text-foreground mb-1.5 block text-sm font-semibold">Confirm Password</label
							>
							<div class="input-icon-wrap">
								<Lock class="input-icon h-4 w-4" />
								<input
									id="confirm-password"
									type="password"
									bind:value={confirmPassword}
									placeholder="Repeat your password"
									class="input-field rounded-xl"
									required
									autocomplete="new-password"
								/>
							</div>
							{#if confirmPassword && confirmPassword !== password}
								<p class="mt-1 text-xs font-medium text-red-500">Passwords do not match</p>
							{/if}
						</div>

						<button
							type="button"
							class="btn-primary mt-2 w-full rounded-xl py-3.5 text-sm"
							onclick={nextStep}
							disabled={loading}
						>
							Continue to Study Profile →
						</button>
					</div>
				{:else}
					<!-- STEP 2: Study Profile -->
					<div class="space-y-5">
						{#if role === 'student'}
							<div>
								<span class="text-foreground mb-2 block text-sm font-semibold">Education Level</span
								>
								<div class="grid grid-cols-2 gap-3">
									{#each levelOptions as opt}
										<button
											type="button"
											class="rounded-xl border-2 px-4 py-3 text-left text-sm font-semibold transition-all {educationLevel ===
											opt.value
												? 'border-[hsl(var(--primary))] bg-[hsl(var(--primary)/0.08)] text-[hsl(var(--primary))]'
												: 'border-border text-foreground hover:border-[hsl(var(--primary)/0.4)]'}"
											onclick={() => (educationLevel = opt.value)}
										>
											{opt.label}
										</button>
									{/each}
								</div>
							</div>

							<div>
								<span class="text-foreground mb-2 block text-sm font-semibold">Target Exam</span>
								<div class="grid grid-cols-1 gap-2">
									{#each examOptions as opt}
										<button
											type="button"
											class="flex items-center gap-3 rounded-xl border-2 px-4 py-3 text-sm font-semibold transition-all {examTarget ===
											opt.value
												? 'border-[hsl(var(--primary))] bg-[hsl(var(--primary)/0.08)]'
												: 'border-border hover:border-[hsl(var(--primary)/0.4)]'}"
											onclick={() => (examTarget = opt.value)}
										>
											<div
												class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 {examTarget ===
												opt.value
													? 'border-[hsl(var(--primary))] bg-[hsl(var(--primary))]'
													: 'border-muted-foreground'}"
											>
												{#if examTarget === opt.value}<div
														class="h-2 w-2 rounded-full bg-white"
													></div>{/if}
											</div>
											{opt.label}
										</button>
									{/each}
								</div>
							</div>
						{:else}
							<!-- Tutor profile fields -->
							<div
								class="rounded-xl border border-[hsl(var(--primary)/0.2)] bg-[hsl(var(--primary)/0.04)] p-5"
							>
								<h3 class="text-foreground mb-2 text-sm font-bold">Tutor Registration</h3>
								<p class="text-muted-foreground text-xs leading-relaxed">
									After registering, our admin team will review your qualifications and set up your
									tutor wallet. You'll be matched to students based on your subject expertise.
								</p>
							</div>
							<div>
								<label
									for="teachingSubjects"
									class="text-foreground mb-2 block text-sm font-semibold"
									>Primary Teaching Subjects</label
								>
								<input
									id="teachingSubjects"
									type="text"
									placeholder="e.g. Mathematics, Physics, Chemistry"
									class="input-field rounded-xl"
								/>
							</div>
							<div>
								<label for="teachingExp" class="text-foreground mb-2 block text-sm font-semibold"
									>Years of Teaching Experience</label
								>
								<select id="teachingExp" class="input-field rounded-xl">
									<option>Less than 1 year</option>
									<option>1–3 years</option>
									<option>4–7 years</option>
									<option>8+ years</option>
								</select>
							</div>
						{/if}

						<div class="flex gap-3 pt-2">
							<button
								type="button"
								class="btn-outline rounded-xl px-5 py-3.5 text-sm"
								onclick={() => {
									step = 1;
									error = '';
								}}>← Back</button
							>
							<button
								type="submit"
								class="btn-primary flex-1 rounded-xl py-3.5 text-sm"
								disabled={loading}
							>
								{#if loading}
									<span
										class="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
									></span>
									Creating account…
								{:else}
									Create Account ✓
								{/if}
							</button>
						</div>
					</div>
				{/if}
			</form>

			<p class="text-muted-foreground mt-6 text-center text-xs">
				By creating an account you agree to our
				<a href="/terms" class="font-semibold text-[hsl(var(--primary))] hover:underline">Terms</a>
				&
				<a href="/privacy" class="font-semibold text-[hsl(var(--primary))] hover:underline"
					>Privacy Policy</a
				>.
			</p>

			<p class="text-muted-foreground mt-3 text-center text-sm">
				Already have an account?
				<a href="/auth/login" class="ml-1 font-bold text-[hsl(var(--primary))] hover:underline"
					>Sign In</a
				>
			</p>
		</div>
	</div>
</div>
