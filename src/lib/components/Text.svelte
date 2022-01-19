<script lang="ts">
  import { slideIn } from '$lib/animations'
  import { box } from '$lib/styles/box.css'

  import type { Entry, RichTextContent } from 'contentful'
  // import type { Lien } from '../Link.svelte'
  import Document from './document/Document.svelte'
  // import Link from '../Link.svelte'
  // import Logo from '../icons/Logo.svelte'

  export let entry: Entry<{
    title: string
    id: string
    subtitle: string
    body: RichTextContent
    big: boolean
    boxed: boolean
    hideTitle: boolean
  }>
  export let color: string = 'muted'
</script>

<section use:slideIn class:big={entry.fields.big} class:boxed={entry.fields.boxed} class="{entry.fields.boxed && box({ color })}">
{#if entry.fields.subtitle}<p>{entry.fields.subtitle}</p>{/if}
{#if entry.fields.title && !entry.fields.hideTitle}<h2>{entry.fields.title}</h2>{/if}
{#if entry.fields.body}<div><Document body={entry.fields.body} /></div>{/if}
</section>

<style>
  .big :global(p) {
    font-size: 1.66em;
  }

  section {
    /* margin-bottom: 4rem; */
  }

  .boxed div {
    columns: 2;
  }

  @media (max-width: 888px) {
    .boxed div {
      columns: 1;
    }
  }

  section :global(p:last-child) {
    margin-bottom: 0;
  }
</style>