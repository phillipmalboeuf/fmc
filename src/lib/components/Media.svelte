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

  let play: string
</script>

<article class="{box({ color: 'white' })} {grid({ columns: 2 })}">
  {#if entry.fields.title}<h2>{entry.fields.title}</h2>{/if}
  {#if entry.fields.body}<Document body={entry.fields.body} />{/if}
  {#each entry.fields.assets as media}
  {#if media.fields.description?.startsWith('https://')}
  <figure use:slideIn class="{col({ span: 2 })}" class:play={play !== media.sys.id} on:click={() => play = media.sys.id}>
    <figcaption>{media.fields.title}</figcaption>
    {#if play === media.sys.id}
    <iframe style="aspect-ratio: {media.fields.file.details.image.width} / {media.fields.file.details.image.height}" src={media.fields.description} title={media.fields.title} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen />
    {:else}
    <Picture {media} noDescription />
    {/if}
  </figure>
  {:else}
  <figure use:slideIn class="{col({ span: 2 })} {!media.fields.file.contentType.startsWith('video/') && box({ color: 'outline' })}">
    <figcaption>{media.fields.title}</figcaption>
    <Picture {media} />
  </figure>
  {/if}
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

  figure :global(img) {
    border-radius: 12px;
    overflow: hidden;
  }

  figure.play {
    cursor: pointer;
  }

  figure.play:after {
    content: "PLAY";
    position: absolute;
    top: 50%;
    left: 50%;
    font-family: "Trim Poster";
    font-size: 12rem;
    color: white;
    transform: translate(-50%, -48%);
  }

  figcaption {
    font-size: 1.5em;
    margin-bottom: 1rem;
  }

  iframe {
    width: 100%;
    border: none;
    border-radius: 12px;
  }
</style>