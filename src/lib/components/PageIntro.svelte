
<script lang="ts">
  import type { Entry } from 'contentful'
  import type { PageDocument } from './Page.svelte'

  import Document from './document/Document.svelte'
  import { slideIn } from '$lib/animations'
  import Picture from './Picture.svelte'
  import ReadMore from './ReadMore.svelte'
  
	export let page: Entry<PageDocument>
  export let h1 = false
</script>

<header>
  <center>
    {#if h1}<h1 use:slideIn>{page.fields.title}</h1>{:else}<h2>{page.fields.title}</h2>{/if}
    {#if page.fields.description}<h5 use:slideIn>{page.fields.description}</h5>{/if}
  </center>
</header>

{#if page.fields.image}
<figure use:slideIn><Picture media={page.fields.image} /></figure>
{/if}

<div><ReadMore body={page.fields.body} /></div>

<style>
  header,
  div {
    max-width: 50rem;
    margin: 0 auto;
  }

  figure {
    margin-bottom: 3rem;
    border-radius: 20px;
    overflow: hidden;
  }

  h5 {
    text-transform: none;
  }

  @media (max-width: 888px) {
    h1, h5, h2 {
      text-align: left;
    }

    h2 {
      /* font-size: 2rem; */
    }
  }
</style>