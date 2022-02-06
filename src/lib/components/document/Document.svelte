<script lang="ts">
  import Node from './Node.svelte'

  export let body
</script>

{#if body}
{#each body.content as n}
<Node {n} />
{/each}
{/if}