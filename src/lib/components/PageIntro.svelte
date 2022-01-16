
<script lang="ts">
  import type { Entry } from 'contentful'
  import type { PageDocument } from './Page.svelte'

  import Document from './document/Document.svelte'
  import { slideIn } from '$lib/animations'
  
	export let page: Entry<PageDocument>
  export let h1 = false
</script>

<header>
  <center>
    {#if h1}<h1>{page.fields.title}</h1>{:else}<h2>{page.fields.title}</h2>{/if}
    {#if page.fields.description}<h4 use:slideIn>{page.fields.description}</h4>{/if}
  </center>

  {#if page.fields.body}
  <div use:slideIn><Document body={page.fields.body} /></div>
  {/if}
</header>

<style>
  header {
    max-width: 55rem;
    margin: 0 auto;
  }

  @media (max-width: 888px) {
    h4 {
      text-align: left;
    }
  }
</style>