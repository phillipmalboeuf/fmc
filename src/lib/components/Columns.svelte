<script lang="ts">
  import type { Asset, Entry, RichTextContent } from 'contentful'
  import { col, grid } from '$lib/styles/grid.css'
  import { box } from '$lib/styles/box.css'
  import { vars } from '$lib/styles/styles.css'

  // import type { Lien } from '../Link.svelte'
  import Document from './document/Document.svelte'
  import Picture from './Picture.svelte'
  import Title from './Title.svelte'
  import { slideIn } from '$lib/animations'

  // import Link from '../Link.svelte'
  // import Logo from '../icons/Logo.svelte'

  export let entry: Entry<{
    title: string
    id: string
    body: RichTextContent
    secondBody: RichTextContent
    asideContent: RichTextContent
    quote: string
    image: Asset
    photos: Asset[]
    hideTitle: boolean
    noSplit: boolean
  }>
  export let color: string = undefined
  export let noCenter: boolean = false
</script>

<article style="--heading-color: {vars.colors[color]}" class="{grid({ columns: 2, gap: entry.fields.noSplit ? 'medium' : 'small' })}">
  {#if entry.fields.title && !entry.fields.hideTitle}<Title title={entry.fields.title} />{/if}
  {#if entry.fields.image}<figure use:slideIn class="{col({span: 2})}"><Picture media={entry.fields.image} /></figure>{/if}
  {#if entry.fields.body}<div use:slideIn><Document body={entry.fields.body} /></div>{/if}
  {#if entry.fields.photos?.length}{#each entry.fields.photos as media, i}<figure use:slideIn
  class="{entry.fields.photos.length > 1 ? (i === 0 && col({ start: 1 })) : col({ align: 'bottom' })}">
    <Picture {media} small />
  </figure>{/each}{/if}
  {#if entry.fields.quote}<center use:slideIn class="{col({span: 2})}"><h2>{entry.fields.quote}</h2></center>{/if}
  {#if !entry.fields.noSplit && !entry.fields.quote && !entry.fields.photos?.length && !noCenter}<div class="spacer {col({span: 2})}"></div>{/if}
  {#if entry.fields.asideContent}<aside use:slideIn class="{box({ color: 'outline', padding: 'tight' })} {col({ align: 'bottom' })}"><Document body={entry.fields.asideContent} /></aside>{/if}
  {#if entry.fields.secondBody}<div use:slideIn class="{col({ start: 2 })}"><Document body={entry.fields.secondBody} /></div>{/if}
</article>

<style>
  article {
    margin: 2rem 0;
    transform: translate3d(0,0,0);
  }

  figure :global(img) {
    border-radius: 6px;
  }

  aside {
    width: 66%;
    margin-bottom: 2.5rem;
    border-color: var(--color);
  }

  aside :global(a:hover),
  aside :global(a:focus) {
    color: var(--color);
  }

  div :global(h2),
  div :global(h3),
  div :global(h4),
  div :global(h5),
  div :global(h6) {
    color: var(--heading-color);
  }

  div :global(h2 + p) {
    color: var(--heading-color);
    font-size: 1.5rem;
  }

  aside :global(h2),
  aside :global(h3) {
    color: var(--color);
  }

  aside :global(p:last-child) {
    margin-bottom: 0;
  }

  @media (max-width: 888px) {
    .spacer {
      display: none;
    }

    aside {
      width: 100%;
    }
  }
</style>