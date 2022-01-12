<script lang="ts">
  import type { Entry } from 'contentful'
  import { slide } from 'svelte/transition'

  import Link from './Link.svelte'
  import type { Lien } from './Link.svelte'
  import { getContext, onMount, setContext } from 'svelte'
  import Logo from './Logo.svelte'


  export let contentHeight: number
  export let path: string = undefined
  export let index: boolean = false
  export let black: boolean = false

  const { main } = getContext<{ main: Entry<{ links: Entry<Lien>[] }> }>('navigation')

  let scrollY: number
  let innerHeight: number
  let navHeight: number
</script>

<svelte:window bind:scrollY bind:innerHeight />

<nav class:black>
  <div bind:offsetHeight={navHeight}>
    <a href="/">
      <Logo />
    </a>

    {#if main}
    {#each main.fields.links as link}
    <Link {link} on:click={e => {
      if (index && !link.fields.path.startsWith('/#')) {
        e.preventDefault()
        history.pushState({}, null, link.fields.path)
        window.scrollTo({ top: document.getElementById(link.fields.path.replace('/', '')).offsetTop, behavior: 'smooth' })
        path = link.fields.path
      }
    }} /><br>
    {/each}
    {:else}
    <!-- {#if page.fields.content}
    {#each page.fields.content.filter(c => c.fields.id) as entry}
    <a href="#{entry.fields.id}">{entry.fields.title}</a><br>
    {/each}
    {/if} -->
    {/if}
  </div>

  {#if scrollY !== undefined}
  <!-- <progress value={scrollY + 1} max={Math.max(offsetHeight - innerHeight, 1)} /> -->
  <progress style="width: calc(95vh - {navHeight}px);" transition:slide value={scrollY + innerHeight} max={Math.max(contentHeight, innerHeight)} />
  {/if}
</nav>

<style>
  nav {
    position: sticky;
    position: -webkit-sticky;
    top: 2vh;
    left: 0;
    width: 8rem;
    z-index: 10;
    align-self: flex-start;

    --color: white;
  }

  nav.black {
    --color: black;
  }

  nav :global(a:not(.logo)) {
    text-decoration: none;
    display: inline-block;
    padding: 0.33em;
    margin-bottom: 0.33em;
    border-radius: 6px;
    color: var(--color);
  }

  nav :global(a:not(.logo):hover),
  nav :global(a:not(.logo):focus) {
    color: black;
    background-color: white;
  }

  progress {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: none;

    transform: translateX(0.66em) rotate(90deg);
    transform-origin: top left;
  }

  progress[value]::-webkit-progress-bar {
    background: var(--color);
    border-radius: 2px;
    height: 2px;
  }

  progress[value]::progress-bar {
    background: var(--color);
    border-radius: 2px;
    height: 2px;
  }

  progress[value]::-webkit-progress-value {
    background: var(--color);
    border-radius: 6px;
    height: 4px;
    position: relative;
    bottom: 1px;
  }

  progress[value]::progress-value {
    background: var(--color);
    border-radius: 6px;
    height: 4px;
    position: relative;
    bottom: 1px;
  }
</style>