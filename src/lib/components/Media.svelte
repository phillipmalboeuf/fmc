<script lang="ts">
  import type { Asset, Entry, RichTextContent } from 'contentful'
  // import type { Lien } from '../Link.svelte'
  import Document from './document/Document.svelte'
  import { col, grid } from '$lib/styles/grid.css'
  import { box } from '$lib/styles/box.css'
  import Picture from './Picture.svelte'
  import { slideIn } from '$lib/animations'
  // import Link from '../Link.svelte'
  // import Logo from '../icons/Logo.svelte'

  export let entry: Entry<{
    title: string
    id: string
    body: RichTextContent
    assets: Asset[]
  }>
</script>

<article class="{box({ color: 'white' })} {grid({ columns: 2 })}">
  {#if entry.fields.title}<h2>{entry.fields.title}</h2>{/if}
  {#if entry.fields.body}<Document body={entry.fields.body} />{/if}
  {#each entry.fields.assets as media}
  <figure use:slideIn class="{col({ span: 2 })} {!media.fields.file.contentType.startsWith('video/') && box({ color: 'outline' })}">
    <figcaption>{media.fields.title}</figcaption>
    <Picture {media} />
  </figure>
  {/each}
</article>

<style>
  h2 {
    color: var(--color);
  }

  article {
    margin: 2rem 0;
  }

  figure {
    color: var(--color);
  }

  figcaption {
    font-size: 1.5em;
    margin-bottom: 1rem;
  }
</style>