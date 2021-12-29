<script lang="ts">
  import { pills, pill } from '$lib/styles/pill.css'
  export let tags: string[]
</script>

<div class="{pills()}">
  {#each tags as tag}
  <div class="{pill()}">{tag}</div>
  {/each}
</div>