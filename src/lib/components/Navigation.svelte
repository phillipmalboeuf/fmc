<script lang="ts">
  import type { Entry } from 'contentful'
  import { slide } from 'svelte/transition'

  import { page, session } from '$app/stores'
  import { goto } from '$app/navigation'
  import { browser } from '$app/env'

  import Link from './Link.svelte'
  import type { Lien } from './Link.svelte'
  import { getContext, onMount, setContext } from 'svelte'
  import Logo from './Logo.svelte'
  import MenuIcon from './MenuIcon.svelte'
  import { currentArticle, currentPage } from '$lib/history'

  export let contentHeight: number
  export let path: string = undefined
  export let index: boolean = false
  export let landing: boolean = false
  export let black: boolean = false

  const { main } = getContext<{ main: Entry<{ links: Entry<Lien>[] }> }>('navigation')

  let scrollY: number = 0
  let innerHeight: number
  let innerWidth: number
  let nav: HTMLElement

  let open: boolean = true
  let locale: string = $page.params.locale || 'en'

  async function change(l: string) {
    const href = await fetch(`${($page.params.locale === 'fr' ? "/fr" : "")}/switch.json?l=${l}&path=${window.location.pathname}`)
    window.location.assign((await href.json()).href)
  }

  function resize(w: number) {
    innerHeight = window.innerHeight
    
    open = w > 888
  }

  $: browser && resize(innerWidth)
  $: {
    currentPage.set($page.params.page)
    currentArticle.set($page.params.article)
  }
</script>

<svelte:window bind:scrollY bind:innerWidth />

<div class="spacer" />
<nav class:black class:landing class:scrolled={scrollY > 0}>
  <div bind:this={nav}>
    <a class="logo" href="{($page.params.locale === 'fr' ? "/fr" : "/")}" aria-label="{($page.params.locale === 'fr' ? "Page d'accueil" : "Home page")}">
      <Logo {locale} />
    </a>

    <div class="locales">
      <input type="radio" id="en" checked={locale==="en"} on:change={() => change("en")} value="en" >
      <label for="en">EN</label> 
      <input type="radio" id="fr" checked={locale==="fr"} on:change={() => change("fr")} value="fr" >
      <label for="fr">FR</label> 
    </div>

    {#if !landing}
    <details bind:open={open}>
      <summary><span>Menu</span> <MenuIcon {open} /></summary>
      {#if main}
      {#each main.fields.links as link}
      <div>
        <Link active={link.fields.path.includes($currentPage)} external={link.fields.path.startsWith('/#')} {link} on:click={e => {
          if (index && !link.fields.path.startsWith('/#')) {
            e.preventDefault()
            history.pushState({}, null, ($page.params.locale === 'fr' ? "/fr" : "") + link.fields.path)
            window.scrollTo({ top: document.getElementById(link.fields.path.replace('/', '')).offsetTop, behavior: 'smooth' })
            path = link.fields.path
            // currentPage.set(link.fields.path.replace('/fr', '').split('/')[1])

            if (window.innerWidth < 888) {
              open = false
            }
          }
        }} />

        {#if link.fields.subLinks}
        <nav>
        {#each link.fields.subLinks as subLink}
        <Link active={subLink.fields.path.includes($currentArticle)} external={link.fields.path.startsWith('/#')} link={subLink} on:click={e => {
          if (index && !subLink.fields.path.startsWith('/#')) {
            e.preventDefault()
            history.pushState({}, null, ($page.params.locale === 'fr' ? "/fr" : "") + subLink.fields.path)
            window.scrollTo({ top: document.getElementById(subLink.fields.path.replace('/', '')).offsetTop, behavior: 'smooth' })
            path = subLink.fields.path
            // currentPage.set(subLink.fields.path.replace('/fr', '').split('/')[1])

            if (window.innerWidth < 888) {
              open = false
            }
          }
        }} /><br>
        {/each}
        </nav>
        {/if}
      </div>
      {/each}
      {:else}
      <!-- {#if page.fields.content}
      {#each page.fields.content.filter(c => c.fields.id) as entry}
      <a href="#{entry.fields.id}">{entry.fields.title}</a><br>
      {/each}
      {/if} -->
      {/if}
    </details>
    {/if}
  </div>

  {#if !landing && scrollY !== undefined && innerHeight}
  <!-- <progress value={scrollY + 1} max={Math.max(offsetHeight - innerHeight, 1)} /> -->
  <progress style={nav && `width: calc(90vh - ${nav.clientHeight}px);`} value={scrollY + innerHeight} max={Math.max(contentHeight, innerHeight)} />
  {/if}
</nav>

<style>
  nav {
    position: sticky;
    position: -webkit-sticky;
    top: max(2.5vw, 2.5vh);
    left: 0;
    width: 12rem;
    z-index: 10;
    align-self: flex-start;

    --color: black;
    color: var(--color);
  }

  @media (min-width: 888px) {
    nav.landing {
      position: relative;
      top: -2vw;
      left: -2vw;
      margin-bottom: -7rem;
    }
  }

  @media (max-width: 888px) {
    nav.landing {
      position: absolute;
    }
  }

  @media print {
    nav {
      display: none;
    }

    :global(.content) {
      grid-column: span 4;
    }
  }
/* 
  :global(body.hero--black) nav,
  nav.black {
    --color: black;
  } */

  nav :global(a) {
    text-decoration: none;
    display: inline-block;
    padding: 0.33em;
    margin-bottom: 0.33em;
    border-radius: 6px;
    color: var(--color);
    /* transition: color 666ms; */
  }

  @media (max-width: 888px) {
    nav :global(a) {
      padding: 0.33em 0;
    }
  }

  nav :global(a:not(.logo):hover),
  nav :global(a:not(.logo):focus),
  nav :global(a.active) {
    color: white;
    background-color: black;
    opacity: 1;
  }

  summary {
    display: none;
  }

  .locales {
    display: inline-flex;
    border: 1px solid;
    border-radius: 9px;
    overflow: hidden;
    margin-bottom: 1rem;
  }

  input[type="radio"] {
    display: none;
  }

  input[type="radio"] + label {
    cursor: pointer;
    font-weight: bold;
    padding: 0.5em 1em;
    transition: background-color 333ms, color 333ms;
  }

  input[type="radio"]:checked + label {
    color: white;
    background-color: black;
  }

  /* :global(body.hero--black) input[type="radio"]:checked + label,
  nav.black input[type="radio"]:checked + label {
    color: white;
    background-color: black;
    transition: color 666ms, background-color 666ms;
  } */

  div.spacer {
    display: none;
  }

  details div {
    position: relative;
  }

  details div > nav {
    display: none;
    position: absolute;
    top: 90%;
    left: 1rem;
    border: 1px solid;
    border-radius: 9px;
    width: 100%;
    z-index: 1;
    background-color: white;
  }

    details div > nav :global(a) {
      margin-bottom: 0 !important;
    }

  details div:hover > nav {
    display: block;
  }
  
  @media (max-width: 888px) {
    nav {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      padding: max(2vw, 2vh) max(2vw, 2vh) 0;
      transition: background-color 333ms, color 333ms;
    }

    div.spacer {
      display: block;
      height: 8rem
    }

    nav.scrolled:not(.landing) {
      color: black;
      background-color: white;
      border-bottom-left-radius: 12px;
      border-bottom-right-radius: 12px;
    }

    nav :global(svg) {
      transition: color 333ms;
    }

    nav.scrolled:not(.landing) :global(svg) {
      color: black;
    }

    summary {
      display: block;
      cursor: pointer;
      outline: none;
      padding: 1.5vh;
    }

    summary :global(svg) {
      float: right;
    }

    summary::-webkit-details-marker {
      display: none;
    }

    summary::details-marker {
      display: none;
    }

    details,
    .locales {
      position: absolute;
      top: -0.5rem;
      right: 0;
    }

    .landing .locales {
      top: 2rem;
    }

    details {
      top: 2.5rem;
      width: 66%;
      color: black;
      --color: black;
      background-color: white;
      border-radius: 6px;
      font-size: 1.33em;
      max-height: 2.5em;
      overflow: hidden;
      border: 1px solid transparent;
      transition: max-height 666ms, border-color 333ms;
    }

    nav.scrolled details {
      border: 1px solid;
    }

    details :global(a) {
      opacity: 0.5;
    }

    details[open] {
      padding: 1.5vh;
      max-height: 100vh;
    }

    details[open] summary {
      padding: 0;
      padding-bottom: 1.5vh;
    }

    nav.scrolled:not(.landing) input[type="radio"]:checked + label {
      background-color: black;
      color: white;
    }
  }

  progress {
    -webkit-appearance: none;
    /* -moz-appearance: none; */
    appearance: none;
    border: none;

    transform: translateX(0.66em) rotate(90deg);
    transform-origin: top left;
    background: var(--color);
    border-radius: 2px;
    height: 2px;
  }

  progress[value]::-webkit-progress-bar {
    background: var(--color);
  }

  progress[value]::-moz-progress-bar {
    background: var(--color);
    border-radius: 6px;
    height: 4px;
    transform: translateY(-1px);
    transition: background-color 666ms;
  }

  /* progress[value]::progress-bar {
    background: var(--color);
    border-radius: 2px;
    height: 2px;
    transition: background-color 666ms;
  } */

  progress[value]::-webkit-progress-value {
    background: var(--color);
    border-radius: 6px;
    height: 4px;
    position: relative;
    bottom: 1px;
    transition: background-color 666ms;
  }

  progress[value]::progress-value {
    background: var(--color);
    border-radius: 6px;
    height: 4px;
    position: relative;
    bottom: 1px;
    transition: background-color 666ms;
  }

  @media (max-width: 888px) {
    progress {
      display: none;
      /* position: absolute;
      top: 0;
      left: 40%;
      width: 100% !important;

      --color: black; */
    }
  }
</style>