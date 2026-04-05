<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { LayoutDashboard, Users, Activity, Settings, LogOut, ShieldAlert, Cpu } from 'lucide-svelte';
  import { toast } from '$lib/stores/toast.svelte';

  let { children } = $props();

  let isAuthorized = $state(false);
  let loadingAuth = $state(true);

  // Constants
  const SECRET_KEY = "tRx$uPerAdm!n$ecr3t2026#Ewin@project";

  const adminMenu = [
    { title: 'Overview', href: '/admin', icon: LayoutDashboard },
    { title: 'User Management', href: '/admin/users', icon: Users },
    { title: 'System Diagnostics', href: '/admin/system', icon: Activity },
  ];

  onMount(() => {
    // Check Authorization dynamically (Edge-ready bypass)
    const storedSecret = localStorage.getItem("ADMIN_SECRET_KEY_EWIN");
    if (!storedSecret || storedSecret !== SECRET_KEY) {
      if ($page.url.pathname !== '/admin/login') {
        goto('/admin/login');
      } else {
        loadingAuth = false;
      }
    } else {
      isAuthorized = true;
      loadingAuth = false;
    }
  });

  function handleLogout() {
    localStorage.removeItem("ADMIN_SECRET_KEY_EWIN");
    toast.info("Super Admin session terminated cleanly. Keys purged.");
    goto('/admin/login');
  }

  function isActive(href: string) {
    if (href === '/admin') return $page.url.pathname === '/admin';
    return $page.url.pathname.startsWith(href);
  }
</script>

{#if loadingAuth}
  <div class="min-h-screen bg-background flex flex-col items-center justify-center space-y-4">
    <div class="animate-spin text-[hsl(var(--primary))]"><ShieldAlert class="h-10 w-10"/></div>
    <p class="text-sm text-muted-foreground font-semibold">Validating Integrity Keys...</p>
  </div>
{:else if $page.url.pathname === '/admin/login'}
  {@render children()}
{:else if isAuthorized}
  <div class="flex h-screen bg-background overflow-hidden relative">
    
    <!-- Enterprise Sidebar -->
    <aside class="w-64 border-r border-border bg-card hidden md:flex flex-col z-20 shadow-xl">
      <div class="h-16 flex items-center px-6 border-b border-border/60">
        <div class="flex items-center gap-2">
           <ShieldAlert class="max-w-[20px] text-[hsl(var(--primary))]" />
           <span class="font-black text-foreground tracking-tight text-lg">E-WIN Admin</span>
        </div>
      </div>

      <nav class="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
        <div class="mb-4 px-2">
          <p class="text-xs font-bold text-muted-foreground uppercase tracking-widest">Portal Controls</p>
        </div>
        
        {#each adminMenu as item}
          <a
            href={item.href}
            class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all {isActive(item.href) ? 'bg-[hsl(var(--primary)/0.15)] text-[hsl(var(--primary))] shadow-sm' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}"
          >
            <item.icon class="h-4 w-4" />
            {item.title}
          </a>
        {/each}
      </nav>

      <div class="p-4 border-t border-border/50">
        <div class="p-3 mb-4 rounded-xl bg-gradient-to-br from-[hsl(var(--primary)/0.1)] to-transparent border border-[hsl(var(--primary)/0.15)]">
          <div class="flex items-center gap-2 mb-1">
             <Cpu class="h-4 w-4 text-[hsl(var(--primary))]" />
             <span class="text-xs font-bold text-foreground">Edge Real-time Active</span>
          </div>
          <p class="text-[10px] text-muted-foreground leading-tight">Convex WS stream established</p>
        </div>

        <button 
          onclick={handleLogout}
          class="flex w-full items-center gap-2 px-3 py-2.5 text-sm font-bold text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
        >
          <LogOut class="h-4 w-4" /> Terminate Session
        </button>
      </div>
    </aside>

    <!-- Main Workspace -->
    <main class="flex-1 h-screen overflow-y-auto relative bg-background">
      <!-- Mobile Topbar header -->
      <header class="h-16 bg-card border-b border-border md:hidden flex items-center justify-between px-4 sticky top-0 z-20">
         <div class="flex items-center gap-2">
           <ShieldAlert class="h-5 w-5 text-[hsl(var(--primary))]" />
           <span class="font-black text-foreground tracking-tight">Admin</span>
        </div>
        <button onclick={handleLogout} class="text-red-500 p-2"><LogOut class="h-5 w-5" /></button>
      </header>

      <div class="p-4 sm:p-6 md:p-8 max-w-[1600px] mx-auto min-h-full">
         {@render children()}
      </div>
    </main>

  </div>
{/if}
