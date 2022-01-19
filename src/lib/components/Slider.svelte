<script lang="ts">
  import type { Asset, Entry, RichTextContent } from 'contentful'
  import { fade, fly, slide } from 'svelte/transition'
  import { onMount } from 'svelte'
  import Carousel from 'svelte-carousel'

  import { box } from '$lib/styles/box.css'
  import { vars } from '$lib/styles/styles.css'
  
  import Text from './Text.svelte'
  import Columns from './Columns.svelte'
  import Media from './Media.svelte'
  import Chart from './Chart.svelte'
  import { highlights } from '$lib/formatters'
  
  let ready: boolean
  onMount(async () => {
    ready = true
  })

  export let entry: Entry<{
    title?: string
    id?: string
    slides: Entry<any>[]
  }>
  export let initialPageIndex: number = undefined
  export let color: string = undefined
</script>

<section style="--color: {vars.colors[highlights(color)]}" class="{box({ color: 'muted' })}" id={entry.fields.id}>
  {#if entry.fields.title}<h2>{entry.fields.title}</h2>{/if}
  {#if ready}
  <Carousel
    {initialPageIndex}
    let:currentPageIndex
    let:pagesCount
    let:showPage
    let:showPrevPage
    let:showNextPage
  >
    {#each entry.fields.slides as entry, index}
    <article>
      {#if entry.sys.contentType.sys.id === 'text'}
      <Text {entry} />
      {:else if entry.sys.contentType.sys.id === 'columns'}
      <Columns {entry} noCenter />
      {:else if entry.sys.contentType.sys.id === 'media'}
      <Media {entry} />
      {:else if entry.sys.contentType.sys.id === 'chart'}
      <Chart {entry} />
      {/if}
    </article>
    {/each}
    
    <button slot="prev" on:click={showPrevPage} class="arrow arrow-prev">←</button>
    <button slot="next" on:click={showNextPage} class="arrow arrow-next">→</button>

    <div slot="dots" class="dots">
      {#each Array(pagesCount) as _, pageIndex (pageIndex)}
        <button
          class:active={currentPageIndex === pageIndex}
          on:click={() => showPage(pageIndex)}
        >{pageIndex + 1}</button>
      {/each}
    </div>
  </Carousel>
  {/if}
</section>


<style>
  section {
    position: relative;
  }

  article {
    cursor: ew-resize;
    padding: 2vw;
  }

  button {
    border: none;
    background: transparent;
    font-size: 3rem;
    padding: 0;
  }

  button:hover,
  button:focus {
    color: var(--color);
  }

  .dots button {
    font-family: 'Trim Poster', sans-serif;
    padding: 0 1vw;
  }

  .dots button:not(.active) {
    opacity: 0.5;
  }

  button.arrow {
    font-family: 'Trim', sans-serif;
    align-self: flex-end;
    margin-bottom: -3.5rem;
  }

  @media (max-width: 888px) {
    button {
      font-size: 2rem;
    }

    button.arrow {
      margin-bottom: -2.5rem;
    }
  }
</style>