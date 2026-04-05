<script lang="ts">
  import { onMount } from "svelte";
  import { getConvexClient } from "$lib/convex";
  import { api } from "../../../../convex/_generated/api";
  import { Search, ShieldAlert, UserX, UserCheck, MoreVertical } from "lucide-svelte";
  import { toast } from "$lib/stores/toast.svelte";

  const SECRET_KEY = "tRx$uPerAdm!n$ecr3t2026#Ewin@project";

  let searchTerm = $state("");
  let page = $state(1);
  let isSuspending = $state(false);
  
  let rawUsers = $state<any[]>([]);
  let errorMsg = $state<string | null>(null);
  let loading = $state(true);

  let client = getConvexClient();

  onMount(async () => {
     try {
       const res = await client.query(api.admin.listUsers, { 
         secret: SECRET_KEY, 
         paginationOpts: { numItems: 50, cursor: null }
       });
       rawUsers = res.page;
     } catch (e: any) {
       errorMsg = e.message;
     } finally {
       loading = false;
     }
  });

  let displayedUsers = $derived(() => {
    if (!rawUsers || rawUsers.length === 0) return [];
    const list = rawUsers;
    if (!searchTerm) return list;
    const lower = searchTerm.toLowerCase();
    return list.filter((u: any) => 
      u.email?.toLowerCase().includes(lower) || 
      u.displayName?.toLowerCase().includes(lower) ||
      u.firebaseUid?.toLowerCase().includes(lower)
    );
  });

  async function toggleUserSuspension(user: any) {
    if (!confirm(`Are you sure you want to ${user.subscriptionStatus === 'inactive' ? 'restore' : 'suspend'} this user's platform access?`)) return;
    
    isSuspending = true;
    try {
      const newStatus = user.subscriptionStatus === 'inactive' ? 'active' : 'inactive';
      await client.mutation(api.admin.suspendUser, {
        secret: SECRET_KEY,
        userId: user._id,
        status: newStatus
      });
      user.subscriptionStatus = newStatus; // optimistic
      toast.success(`User access definitively ${newStatus}. Logged to audit stream.`);
    } catch (e: any) {
      toast.error(`Operation failed: ${e.message}`);
    } finally {
      isSuspending = false;
    }
  }
</script>

<svelte:head>
  <title>Directory Management – Admin</title>
</svelte:head>

<div class="space-y-6 animate-fade-in">
  <div>
    <h1 class="text-3xl font-black text-foreground tracking-tight">Directory & RBAC Access</h1>
    <p class="text-muted-foreground mt-1 text-sm">Super-admin controls over system identities spanning Firebase and Convex.</p>
  </div>

  <div class="glass-panel p-4 rounded-2xl border border-border flex flex-col md:flex-row items-center justify-between gap-4">
    <div class="relative w-full md:max-w-md">
      <Search class="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
      <input 
        type="text" 
        bind:value={searchTerm}
        placeholder="Query users by email, identifier or alias..." 
        class="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-xl text-foreground focus:ring-2 focus:ring-[hsl(var(--primary))]" 
      />
    </div>
    
    <button class="btn-outline px-4 py-2 text-sm font-bold w-full md:w-auto h-[42px]">
      Export Directory (.CSV)
    </button>
  </div>

  <div class="glass-panel border border-border rounded-xl overflow-hidden shadow-sm">
    <div class="overflow-x-auto">
      <table class="w-full text-sm text-left">
        <thead class="text-xs text-muted-foreground uppercase bg-muted/50 border-b border-border">
          <tr>
            <th class="px-6 py-4 font-bold">Identity</th>
            <th class="px-6 py-4 font-bold">Platform State</th>
            <th class="px-6 py-4 font-bold">Created At</th>
            <th class="px-6 py-4 font-bold text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {#if loading}
             <tr>
               <td colspan="4" class="px-6 py-8 text-center text-muted-foreground">
                 <div class="animate-pulse flex items-center justify-center gap-2">
                   <ShieldAlert class="h-5 w-5 animate-spin" /> Fetching secure directory...
                 </div>
               </td>
             </tr>
          {:else if errorMsg}
             <tr>
               <td colspan="4" class="px-6 py-8 text-center text-red-500 font-bold bg-red-500/5">
                 Authorization boundary failed: {errorMsg}
               </td>
             </tr>
          {:else if displayedUsers().length === 0}
             <tr>
               <td colspan="4" class="px-6 py-8 text-center text-muted-foreground font-medium">
                 No identities matching search criteria.
               </td>
             </tr>
          {:else}
            {#each displayedUsers() as user}
              <tr class="border-b border-border hover:bg-muted/30 transition-colors">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center gap-3">
                    <div class="h-8 w-8 rounded-full bg-[hsl(var(--primary)/0.2)] text-[hsl(var(--primary))] flex items-center justify-center font-bold">
                       {user.email ? user.email.charAt(0).toUpperCase() : '?'}
                    </div>
                    <div>
                      <div class="font-bold text-foreground">{user.displayName || "Unknown User"}</div>
                      <div class="text-xs text-muted-foreground truncate w-48">{user.email || user.firebaseUid}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4">
                  {#if user.subscriptionStatus === 'inactive'}
                    <span class="px-2.5 py-1 rounded-md bg-red-500/10 text-red-600 border border-red-500/20 text-[10px] uppercase font-black tracking-widest">
                      Suspended
                    </span>
                  {:else}
                    <span class="px-2.5 py-1 rounded-md bg-green-500/10 text-green-600 border border-green-500/20 text-[10px] uppercase font-black tracking-widest">
                      {user.subscriptionStatus || 'Active'}
                    </span>
                  {/if}
                </td>
                <td class="px-6 py-4 text-muted-foreground font-medium">
                  {new Date(user._creationTime).toLocaleDateString()}
                </td>
                <td class="px-6 py-4 text-right">
                  <div class="flex items-center justify-end gap-2">
                    <button 
                       disabled={isSuspending}
                       onclick={() => toggleUserSuspension(user)}
                       class="p-2 rounded hover:bg-muted text-muted-foreground transition-colors"
                       aria-label={user.subscriptionStatus === 'inactive' ? 'Restore access' : 'Suspend account'}
                    >
                      {#if user.subscriptionStatus === 'inactive'}
                        <UserCheck class="h-4 w-4 text-green-500" />
                      {:else}
                        <UserX class="h-4 w-4 hover:text-red-500" />
                      {/if}
                    </button>
                    <button class="p-2 rounded hover:bg-muted text-muted-foreground transition-colors">
                      <MoreVertical class="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            {/each}
          {/if}
        </tbody>
      </table>
    </div>
  </div>
</div>
