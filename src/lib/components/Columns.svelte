<script lang="ts">
  import type { Asset, Entry, RichTextContent } from 'contentful'
  import { col, grid } from '$lib/styles/grid.css'
  import { box } from '$lib/styles/box.css'

  // import type { Lien } from '../Link.svelte'
  import Document from './document/Document.svelte'
  import Picture from './Picture.svelte'

  // import Link from '../Link.svelte'
  // import Logo from '../icons/Logo.svelte'

  export let entry: Entry<{
    title: string
    id: string
    body: RichTextContent
    secondBody: RichTextContent
    quote: string
    image: Asset
  }>
</script>

<article class="{grid({ columns: 2 })}">
  {#if entry.fields.title}<center class="{col({span: 2})} {box()} title"><h2>{entry.fields.title}</h2></center>{/if}
  {#if entry.fields.image}<figure class="{col({span: 2})}"><Picture media={entry.fields.image} /></figure>{/if}
  {#if entry.fields.body}<div><Document body={entry.fields.body} /></div>{/if}
  <center class="{col({span: 2})}">{#if entry.fields.quote}<h2>{entry.fields.quote}</h2>{/if}</center>
  {#if entry.fields.secondBody}<div class="{col({ start: 2 })}"><Document body={entry.fields.secondBody} /></div>{/if}
</article>

<style>
  .title {
    color: var(--header-color);
    background-color: var(--decoration-color);
  }

  .title h2 {
    margin-bottom: 0;
  }

  figure :global(img) {
    border-radius: 6px;
  }
</style>