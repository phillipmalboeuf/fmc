<script lang="ts">
  import { pills, pill } from '$lib/styles/pill.css'
  export let tags: string[]
</script>

<div class="{pills()}">
  {#each tags as tag}
  <a href="/articles?t={tag}" class="{pill({ clickable: true })}">{tag}</a>
  {/each}
</div>