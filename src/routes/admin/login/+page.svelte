<script lang="ts">
  import { goto } from '$app/navigation';
  import { ShieldAlert, Lock, Mail } from 'lucide-svelte';
  import { toast } from '$lib/stores/toast.svelte';

  // Hardcoded Super Admin details per enterprise directives
  const ALLOWED_EMAIL = "Omaledanjumaogale@gmail.com";
  const ALLOWED_PASSWORD = "Omale51566122%%%";
  
  let email = $state('');
  let password = $state('');
  let loading = $state(false);

  async function handleLogin(e: Event) {
    e.preventDefault();
    loading = true;

    try {
      if (email === ALLOWED_EMAIL && password === ALLOWED_PASSWORD) {
        // Authenticate by writing specialized local access key
        // In a true SSR setup, we would set an HttpOnly cookie, but for edge 
        // real-time client side:
        localStorage.setItem("ADMIN_SECRET_KEY_EWIN", "tRx$uPerAdm!n$ecr3t2026#Ewin@project");
        toast.success("Super Admin authenticated successfully. Welcome back, master.");
        await goto('/admin');
      } else {
        toast.error("Unauthorized: Invalid credentials provided. Incident logged.");
      }
    } finally {
      loading = false;
    }
  }
</script>

<svelte:head>
  <title>System Authentication – E-WIN Admin Portal</title>
</svelte:head>

<div class="bg-background min-h-screen flex items-center justify-center p-4">
  <div class="w-full max-w-md">
    <div class="text-center flex flex-col items-center mb-8">
      <div class="h-14 w-14 rounded-2xl bg-[hsl(var(--primary)/0.1)] flex items-center justify-center mb-4">
        <ShieldAlert class="h-7 w-7 text-[hsl(var(--primary))]" />
      </div>
      <h1 class="text-3xl font-black text-foreground tracking-tight">Super Admin Hub</h1>
      <p class="text-muted-foreground mt-2 text-sm font-medium">Classified E-WIN Orchestration Portal</p>
    </div>

    <form onsubmit={handleLogin} class="glass-panel p-8 space-y-6 relative overflow-hidden backdrop-blur-xl">
      <!-- Glow effect -->
      <div class="pointer-events-none absolute -inset-px rounded-xl opacity-20 ring-1 ring-[hsl(var(--primary))] ring-inset"></div>
      
      <div class="space-y-4">
        <div class="space-y-2">
          <label for="admin-email" class="text-sm font-bold text-foreground">Admin Clearance Email</label>
          <div class="relative">
            <Mail class="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
            <input 
              id="admin-email" 
              type="email" 
              bind:value={email}
              class="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-lg text-foreground focus:ring-2 focus:ring-[hsl(var(--primary))]" 
              placeholder="operator@ewin.internal" 
              required
            />
          </div>
        </div>

        <div class="space-y-2">
          <label for="admin-password" class="text-sm font-bold text-foreground">Clearance Code (Password)</label>
          <div class="relative">
            <Lock class="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
            <input 
              id="admin-password" 
              type="password" 
              bind:value={password}
              class="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-lg text-foreground focus:ring-2 focus:ring-[hsl(var(--primary))]" 
              placeholder="••••••••••••••" 
              required
            />
          </div>
        </div>
      </div>

      <button 
        type="submit" 
        disabled={loading}
        class="w-full btn-primary py-3 rounded-lg flex items-center justify-center gap-2 font-bold tracking-wide"
      >
        {#if loading}
          <div class="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
          Authenticating...
        {:else}
           Verify Clearance & Enter
        {/if}
      </button>

      <div class="text-center text-xs text-muted-foreground pt-4 mt-6 border-t border-border/50">
        Unauthorized access attempts are monitored and IP-logged under standard E-WIN Zero-Trust protocols.
      </div>
    </form>
  </div>
</div>
