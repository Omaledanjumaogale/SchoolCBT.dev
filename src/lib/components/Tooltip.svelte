<script lang="ts">
  import { HelpCircle } from 'lucide-svelte';
  
  let { text = "Information" } = $props<{ text: string }>();
  let visible = $state(false);
</script>

<div 
  class="relative inline-flex items-center" 
  onmouseenter={() => visible = true} 
  onmouseleave={() => visible = false}
  onfocus={() => visible = true}
  onblur={() => visible = false}
  role="tooltip"
  aria-label={text}
  tabindex="0"
>
  <HelpCircle class="w-4 h-4 text-muted-foreground hover:text-primary transition-colors cursor-help ml-1.5 inline-block shrink-0" />
  
  {#if visible}
    <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-xs z-50">
      <div class="bg-popover text-popover-foreground text-xs rounded-md shadow-md py-1.5 px-3 border border-border">
        {text}
      </div>
      <!-- Triangle pointer -->
      <div class="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-border"></div>
      <div class="absolute top-full left-1/2 -translate-x-1/2 -mt-[2px] border-4 border-transparent border-t-popover"></div>
    </div>
  {/if}
</div>
