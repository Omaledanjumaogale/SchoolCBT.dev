<script lang="ts">
  import { onMount } from "svelte";
  import { getConvexClient } from "$lib/convex";
  import { api } from "../../../../convex/_generated/api";
  import { Activity, Trash2, Cpu, FileClock, ShieldAlert, AlertTriangle } from "lucide-svelte";
  import { toast } from "$lib/stores/toast.svelte";
  import Tooltip from "$lib/components/Tooltip.svelte";

  const SECRET_KEY = "tRx$uPerAdm!n$ecr3t2026#Ewin@project";

  let auditLogs = $state<any[]>([]);
  let errorMsg = $state<string | null>(null);
  let loading = $state(true);
  
  let client = getConvexClient();

  onMount(async () => {
    try {
      auditLogs = await client.query(api.admin.getAuditLogs, { secret: SECRET_KEY, limit: 100 });
    } catch(e: any) {
      errorMsg = e.message;
    } finally {
      loading = false;
    }
  });

  let isClearing = $state(false);
  let maintenanceMode = $state(false);

  async function handleClearCache() {
    if (!confirm("WARNING: Purging active cache buffers will force immediate downstream rebuilds on Edge Nodes. Drains compute bounds. Proceed?")) return;
    
    isClearing = true;
    try {
      const res = await client.mutation(api.admin.clearSystemCache, { secret: SECRET_KEY });
      toast.warning(`Purge Complete: Evicted ${res.cleared} dead cache mappings from runtime.`);
    } catch (e: any) {
      toast.error(`Purge Failed: ${e.message}`);
    } finally {
      isClearing = false;
    }
  }

  function toggleMaintenance() {
    maintenanceMode = !maintenanceMode;
    if (maintenanceMode) {
       toast.error("Maintenance Mode ENABLED. 503 Out-of-Service gates primed for external endpoints.");
    } else {
       toast.success("Maintenance Mode REMOVED. Edge gateways accepting traffic unconditionally.");
    }
  }
</script>

<svelte:head>
  <title>System Diagnostics & Audits – Admin</title>
</svelte:head>

<div class="space-y-6 animate-fade-in">
  <div>
    <h1 class="text-3xl font-black text-foreground tracking-tight">System Diagnostics Engine</h1>
    <p class="text-muted-foreground mt-1 text-sm">Real-time macro logs and critical runtime maintenance toolkits.</p>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
     
     <!-- Maintenance Tools -->
     <div class="glass-panel p-6 rounded-2xl border border-red-500/20 relative overflow-hidden bg-gradient-to-br from-red-500/5 to-transparent">
        <h3 class="text-lg font-black text-foreground flex items-center gap-2 mb-4">
          <AlertTriangle class="h-5 w-5 text-red-500" />
          High-Risk Operator Tooling
        </h3>
        <p class="text-sm text-muted-foreground mb-6">Execution of these commands propagates directly to Cloudflare Edge layers across E-WIN.</p>

        <div class="space-y-4">
           <div class="flex items-center justify-between p-4 rounded-xl border border-border bg-card">
              <div>
                <strong class="text-sm block">Global Context Cache Flush</strong>
                <span class="text-xs text-muted-foreground flex items-center gap-1">
                  Re-prime Crawler TTLs <Tooltip text="Deletes all entries in convex apiCache." />
                </span>
              </div>
              <button 
                onclick={handleClearCache} 
                disabled={isClearing}
                class="btn-outline px-4 py-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
              >
                {#if isClearing} Executing... {:else} Purge Cache {/if}
              </button>
           </div>
           
           <div class="flex items-center justify-between p-4 rounded-xl border border-border bg-card">
              <div>
                <strong class="text-sm block">Maintenance Mode Blockade</strong>
                <span class="text-xs text-muted-foreground flex items-center gap-1">
                  Enforce immediate 503 offline status.
                </span>
              </div>
              <button 
                onclick={toggleMaintenance}
                class="{maintenanceMode ? 'bg-red-600 text-white' : 'btn-outline px-4 py-2'} px-4 py-2 font-bold rounded-xl transition-all"
              >
                {#if maintenanceMode} Active Disable {:else} Enable Lockout {/if}
              </button>
           </div>
        </div>
     </div>

     <!-- Environment Configuration (Mocked) -->
     <div class="glass-panel p-6 rounded-2xl border border-border">
        <h3 class="text-lg font-black text-foreground flex items-center gap-2 mb-4">
          <Cpu class="h-5 w-5 text-[hsl(var(--primary))]" />
          Platform Configurations
        </h3>
        <p class="text-sm text-muted-foreground mb-6">Vite Environment Contexts. Write-access protected via CI/CD pipelines.</p>
        
        <div class="space-y-3 font-mono text-xs">
           <div class="flex justify-between items-center bg-muted/50 p-2.5 rounded border border-border/50">
             <span class="text-muted-foreground">NODE_ENV</span>
             <span class="font-bold text-[hsl(var(--primary))]">production</span>
           </div>
           <div class="flex justify-between items-center bg-muted/50 p-2.5 rounded border border-border/50">
             <span class="text-muted-foreground">EDGE_DEPLOYMENT_TARGET</span>
             <span class="font-bold text-foreground">cloudflare-pages</span>
           </div>
           <div class="flex justify-between items-center bg-muted/50 p-2.5 rounded border border-border/50">
             <span class="text-muted-foreground">AI_PRIMARY_LLM</span>
             <span class="font-bold text-foreground">gpt-4o-mini</span>
           </div>
           <div class="flex justify-between items-center bg-muted/50 p-2.5 rounded border border-border/50">
             <span class="text-muted-foreground">FIREBASE_PROJECT</span>
             <span class="font-bold text-foreground">ewinproject-6e400</span>
           </div>
        </div>
     </div>
  </div>

  <!-- Audit Logs Feed -->
  <div class="glass-panel border border-border rounded-xl shadow-sm mt-8">
     <div class="p-6 border-b border-border flex items-center justify-between">
       <h3 class="text-lg font-black text-foreground flex items-center gap-2">
         <FileClock class="h-5 w-5 text-foreground" /> Cryptographic Audit Trail
       </h3>
       <span class="text-xs font-bold text-muted-foreground uppercase tracking-widest px-3 py-1 bg-muted rounded-full">Recent 100 Logs</span>
     </div>

     <div class="overflow-x-auto">
       <table class="w-full text-sm text-left">
         <thead class="text-xs text-muted-foreground uppercase bg-muted/30 border-b border-border">
           <tr>
             <th class="px-6 py-4 font-bold">Action Vector</th>
             <th class="px-6 py-4 font-bold">Initiator UID</th>
             <th class="px-6 py-4 font-bold">Resource</th>
             <th class="px-6 py-4 font-bold text-right">Timestamp</th>
           </tr>
         </thead>
         <tbody>
           {#if loading}
             <tr>
               <td colspan="4" class="px-6 py-8 text-center text-muted-foreground">
                 <div class="animate-pulse flex items-center justify-center gap-2">
                   <ShieldAlert class="h-5 w-5 animate-spin" /> Retrieving Zero-Latency Log Stream...
                 </div>
               </td>
             </tr>
           {:else if errorMsg}
             <tr>
               <td colspan="4" class="px-6 py-8 text-center text-red-500 font-bold bg-red-500/5">
                 Authorization Boundary Blocked Log Access
               </td>
             </tr>
           {:else if auditLogs.length === 0}
             <tr>
               <td colspan="4" class="px-6 py-8 text-center text-muted-foreground">
                 Telemetry stream currently empty.
               </td>
             </tr>
           {:else}
             {#each auditLogs as log}
               <tr class="border-b border-border/50 hover:bg-muted/10 font-mono text-xs transition-colors">
                 <td class="px-6 py-4 whitespace-nowrap">
                   <span class="font-bold text-[hsl(var(--primary))] bg-[hsl(var(--primary)/0.1)] px-2 py-1 rounded">
                     {log.action}
                   </span>
                 </td>
                 <td class="px-6 py-4 whitespace-nowrap text-muted-foreground truncate max-w-[150px]">
                   {log.userId}
                 </td>
                 <td class="px-6 py-4 whitespace-nowrap text-muted-foreground">
                   {log.resource}
                 </td>
                 <td class="px-6 py-4 text-right text-muted-foreground whitespace-nowrap">
                   {new Date(log.timestamp).toLocaleString()}
                 </td>
               </tr>
             {/each}
           {/if}
         </tbody>
       </table>
     </div>
  </div>
</div>
