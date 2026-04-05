<script lang="ts">
  import { toast } from '$lib/stores/toast.svelte';
  import { fade, fly } from 'svelte/transition';
  import { XCircle, CheckCircle, Info, AlertTriangle, X } from 'lucide-svelte';
</script>

<div class="fixed top-4 right-4 z-[999] flex flex-col gap-3 pointer-events-none w-full max-w-sm">
  {#each toast.toasts as t (t.id)}
    <div
      in:fly={{ y: -20, duration: 300 }}
      out:fade={{ duration: 200 }}
      class="pointer-events-auto overflow-hidden rounded-xl bg-card border border-border shadow-lg"
      role="alert"
    >
      <div class="flex items-start gap-4 p-4">
        {#if t.type === 'success'}
          <CheckCircle class="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
        {:else if t.type === 'error'}
          <XCircle class="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
        {:else if t.type === 'warning'}
          <AlertTriangle class="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
        {:else}
          <Info class="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
        {/if}

        <div class="flex-1">
          <p class="text-sm font-medium text-foreground">{t.message}</p>
        </div>

        <button 
          class="text-muted-foreground hover:text-foreground transition-colors" 
          onclick={() => toast.remove(t.id)}
          aria-label="Close notification"
        >
          <X class="h-4 w-4" />
        </button>
      </div>
    </div>
  {/each}
</div>
