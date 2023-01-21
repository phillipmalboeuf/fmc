<script lang="ts">
  import type { RichTextContent } from 'contentful'
  import Document from './document/Document.svelte'

  import { slideIn } from '$lib/animations'
  import { onMount } from 'svelte'
  import { page } from '$app/stores'

  export let body: RichTextContent
  let element: HTMLElement
  let height: number
  let open = true
  let hasMore = true

  onMount(() => {
    if (!element) return
    height = element.offsetHeight
    if (height && height > 210) {
      hasMore = true
      open = false
    }
  })
</script>

{#if body}
<section use:slideIn bind:this={element} class:open class:hasMore>
  <div style="max-height: {height}px;"><Document {body} /></div>

  {#if hasMore}
  <button on:click={() => open = !open}>{#if open}{$page.params.locale === 'fr' ? 'En lire moins' : 'Read Less'} ↑{:else}{$page.params.locale === 'fr' ? 'En lire plus' : 'Read More'} ↓{/if}</button>
  {/if}
</section>
{/if}

<style>
  div {
    overflow: hidden;
    transition: max-height 666ms;
  }

  section.hasMore {
    position: relative;
    margin-bottom: 3rem;
  }

  /* section.open > div {
    max-height: fit-content;
  } */

  section:not(.open) > div {
    max-height: 210px !important;
  }

  button {
    position: relative;
    z-index: 2;
    border: none;
    background: none;
    font-size: 1.2rem;
    text-transform: uppercase;
    padding: 0;
  }

  section:not(.open):after {
    content: "";
    pointer-events: none;
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 150px;
    background: linear-gradient(180deg, rgba(255,255,255, 0) 0%, rgba(255,255,255, 1) 70%, rgba(255,255,255, 1) 100%);
  }
</style>