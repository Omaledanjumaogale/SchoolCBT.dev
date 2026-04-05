<script lang="ts">
  import { onMount } from "svelte";
  import { getConvexClient } from "$lib/convex";
  import { api } from "../../../convex/_generated/api";
  import { 
    Users, 
    Activity, 
    ShieldCheck, 
    Database, 
    ArrowUpRight, 
    ArrowDownRight 
  } from "lucide-svelte";
  import Tooltip from "$lib/components/Tooltip.svelte";

  const SECRET_KEY = "tRx$uPerAdm!n$ecr3t2026#Ewin@project";

  let metrics = $state<any>(null);
  let errorMsg = $state<string | null>(null);
  let loading = $state(true);

  onMount(async () => {
    try {
      const client = getConvexClient();
      metrics = await client.query(api.admin.getSystemMetrics, { secret: SECRET_KEY });
    } catch(e: any) {
      errorMsg = e.message;
    } finally {
      loading = false;
    }
  });

  // Compute stats safely via derived runes
  let stats = $derived([
    {
      label: "Total Unique Users",
      value: metrics?.users ?? 0,
      icon: Users,
      trend: "+12%",
      up: true,
      color: "hsl(var(--primary))"
    },
    {
      label: "Active Real-time Sessions",
      value: metrics?.activeSessions ?? 0,
      icon: Activity,
      trend: "stable",
      up: true,
      color: "hsl(210, 100%, 50%)"
    },
    {
      label: "Logged Audits Events",
      value: metrics?.totalAudits ?? 0,
      icon: ShieldCheck,
      trend: "+404",
      up: true,
      color: "hsl(145,100%,39%)"
    },
    {
      label: "API Request Load (1h)",
      value: "1.2k",
      icon: Database,
      trend: "-2%",
      up: false,
      color: "hsl(270, 70%, 55%)"
    }
  ]);
</script>

<svelte:head>
  <title>Overview – E-WIN Admin Portal</title>
</svelte:head>

<div class="space-y-8 animate-fade-in">
  
  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
    <div>
      <h1 class="text-3xl font-black text-foreground tracking-tight">System Overview</h1>
      <p class="text-muted-foreground mt-1 text-sm">Real-time macro telemetry and infrastructure status.</p>
    </div>
    
    <div class="flex items-center gap-3">
       <div class="px-3 py-1.5 rounded-md bg-green-500/10 border border-green-500/20 text-green-600 text-xs font-bold flex items-center gap-2">
         <span class="relative flex h-2 w-2">
           <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
           <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
         </span>
         All Systems Operational
       </div>
    </div>
  </div>

  {#if loading}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {#each Array(4) as _}
        <div class="h-32 rounded-xl bg-muted animate-pulse"></div>
      {/each}
    </div>
  {:else if errorMsg}
    <div class="p-6 bg-red-500/10 border border-red-500/20 rounded-xl">
      <h3 class="text-red-600 font-bold mb-2">Telemetry Authorization Failed</h3>
      <p class="text-red-500/80 text-sm">{errorMsg}</p>
    </div>
  {:else}
    <!-- Status Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {#each stats as s}
        <div class="glass-panel p-5 rounded-2xl border border-border/50 relative overflow-hidden group">
          <div class="absolute top-0 right-0 -mr-4 -mt-4 w-16 h-16 rounded-full opacity-10 transition-transform group-hover:scale-150 duration-500" style="background-color: {s.color}"></div>
          
          <div class="flex items-start justify-between mb-4 relative z-10">
            <div class="p-2 rounded-lg bg-[hsl(var(--primary)/0.1)] border border-[hsl(var(--primary)/0.15)] flex items-center justify-center">
              <s.icon class="h-5 w-5" style="color: {s.color}" />
            </div>
            
            <div class="flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full {s.up ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-600'}">
              {#if s.up}<ArrowUpRight class="h-3 w-3" />{:else}<ArrowDownRight class="h-3 w-3" />{/if}
              {s.trend}
            </div>
          </div>
          
          <div class="relative z-10">
            <h3 class="text-3xl font-black text-foreground mb-1">{s.value.toLocaleString()}</h3>
            <p class="text-sm font-semibold text-muted-foreground flex items-center gap-1.5">
               {s.label}
               {#if s.label === "Active Real-time Sessions"}
                 <Tooltip text="Proxied via RateLimiter edge pings to avoid memory bloat." />
               {/if}
            </p>
          </div>
        </div>
      {/each}
    </div>

    <!-- Active Feed & Quick Actions -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
       <div class="lg:col-span-2 glass-panel rounded-2xl border border-border p-6">
         <h3 class="text-lg font-black text-foreground mb-6 flex items-center gap-2">
            <Activity class="h-5 w-5 text-[hsl(var(--primary))]" /> Production Traffic Index
         </h3>
         
         <div class="h-64 flex items-end justify-between gap-2 border-b border-l border-border/50 p-4 relative">
            <!-- Simulated CSS Bar Chart for Zero-Dependency Enterprise UI -->
            {#each Array(14).fill(0) as _, i}
              <div class="w-full flex flex-col justify-end items-center gap-2 relative group h-full">
                <div class="w-full bg-[hsl(var(--primary))] rounded-t-sm transition-all duration-500 hover:brightness-110" style="height: {Math.floor(Math.random() * 80 + 20)}%"></div>
                <div class="absolute -top-8 bg-card border border-border px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity font-bold z-10 shadow-lg pointer-events-none whitespace-nowrap">
                  Load {i * 12}k
                </div>
              </div>
            {/each}
         </div>
         <div class="flex justify-between mt-2 text-xs text-muted-foreground font-semibold px-4">
           <span>14 days ago</span>
           <span>Today</span>
         </div>
       </div>

       <div class="glass-panel rounded-2xl border border-border p-6 flex flex-col">
         <h3 class="text-lg font-black text-foreground mb-4">Quick Operations</h3>
         <div class="space-y-3 flex-1">
            <a href="/admin/users" class="w-full text-left p-4 rounded-xl border border-border hover:bg-muted transition-colors flex items-center justify-between group">
              <div>
                <strong class="text-sm block">Directory Access</strong>
                <span class="text-xs text-muted-foreground">Manage RBAC roles and user accounts</span>
              </div>
              <ArrowUpRight class="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </a>
            <a href="/admin/system" class="w-full text-left p-4 rounded-xl border border-border hover:bg-muted transition-colors flex items-center justify-between group">
              <div>
                <strong class="text-sm block">System Diagnostics</strong>
                <span class="text-xs text-muted-foreground">Clear caches and inspect logs</span>
              </div>
              <ArrowUpRight class="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </a>
         </div>
       </div>
    </div>
  {/if}
</div>
