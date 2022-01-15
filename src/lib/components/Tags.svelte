<script lang="ts">
  import { page } from '$app/stores'
  import { pills, pill } from '$lib/styles/pill.css'
  export let tags: string[]
</script>

<div class="{pills()}">
  {#each tags as tag}
  <a href="{$page.params.locale === 'fr' ? "/fr" : ""}/tags/{tag}" class="{pill({ clickable: true })}">{tag}</a>
  {/each}
</div>