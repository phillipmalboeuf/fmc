<script lang="ts">
  import { slideIn } from '$lib/animations'
  import { box } from '$lib/styles/box.css'
  import { col, grid } from '$lib/styles/grid.css'
  import { vars } from '$lib/styles/styles.css'

  import type { Entry, RichTextContent } from 'contentful'
  import { onMount } from 'svelte'
  
  import Document from './document/Document.svelte'
  import Expander from './Expander.svelte'


  interface Text {
    title: string
    id: string
    subtitle: string
    body: RichTextContent
    big: boolean
    boxed: boolean
    hideTitle: boolean
    subTexts: Entry<Text>[]
  }

  export let entry: Entry<Text>
  export let color: any = 'muted'

  let phone = false

  onMount(() => {
    if (window.innerWidth < 888) {
      phone = true
    }
  })
</script>

<section use:slideIn class:big={entry.fields.big} class:boxed={entry.fields.boxed} style="--color: {vars.colors[color]}" class="{entry.fields.boxed && box({ color })}">
{#if entry.fields.subtitle}<p>{entry.fields.subtitle}</p>{/if}
{#if entry.fields.title && !entry.fields.hideTitle}
  {#if entry.fields.big}
  <h1>{entry.fields.title}</h1>
  {:else}
  <h2>{entry.fields.title}</h2>
  {/if}
{/if}
{#if entry.fields.subTexts?.length}
<div class="subbed {!phone && grid()}">
  {#if entry.fields.body}<Document body={entry.fields.body} />{/if}
  {#if phone}
  <br><br>
  {#each entry.fields.subTexts as sub}
  <Expander tight>
    <span slot="label">{sub.fields.title}</span>

    <h5>{sub.fields.title}</h5>
    <Document body={sub.fields.body} />
  </Expander>
  {/each}
  {:else}
  {#each entry.fields.subTexts as sub, i}
  <small class="{i === 0 && col({ start: 1 })}">
    {#if sub.fields.title}<em>{sub.fields.title}</em>{/if}
    <Document body={sub.fields.body} />
  </small>
  {/each}
  {/if}
</div>
{:else}
{#if entry.fields.body}<div><Document body={entry.fields.body} /></div>{/if}
{/if}
</section>

<style>
  section {
    text-decoration-color: var(--color);
    text-decoration-thickness: 1px;
  }

  .big :global(p) {
    font-size: 1.5em;
    margin-bottom: 0.5em;
  }

  .big :global(h1) {
    margin-bottom: 0.25em;
  }

  .boxed {
    margin: 2rem 0;
  }

  .boxed > div {
    columns: 2;
  }

  .boxed :global(a) {
    text-decoration-color: currentColor;
  }

  .subbed > :global(p) {
    font-size: 1.5em;
    grid-column: span 2;
  }

  small em {
    display: block;
    font-style: normal;
    text-transform: uppercase;
    margin-bottom: 1rem;
  }

  @media (max-width: 888px) {
    .boxed div {
      columns: 1;
    }

    .big :global(h1) {
      font-size: 5rem;
    }
  }

  @media (max-width: 400px) {
    .big :global(h1) {
      font-size: 3.5rem;
    }

    .big :global(p) {
      font-size: 1.25em;
    }
  }

  section :global(p:last-child) {
    margin-bottom: 0;
  }
</style>