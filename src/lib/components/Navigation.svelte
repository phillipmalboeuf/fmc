<script lang="ts">
  import type { Entry } from 'contentful'
  import { slide } from 'svelte/transition'

  import { page } from '$app/stores'
  import { goto } from '$app/navigation'
  import { browser } from '$app/env'

  import Link from './Link.svelte'
  import type { Lien } from './Link.svelte'
  import { getContext, onMount, setContext } from 'svelte'
  import Logo from './Logo.svelte'
  import MenuIcon from './MenuIcon.svelte'

  export let contentHeight: number
  export let path: string = undefined
  export let index: boolean = false
  export let black: boolean = false

  const { main } = getContext<{ main: Entry<{ links: Entry<Lien>[] }> }>('navigation')

  let scrollY: number
  let innerHeight: number
  let navHeight: number

  let open: boolean = true
  let locale: string = $page.params.locale || 'en'

  onMount(() => {
    innerHeight = window.innerHeight
    if (window.innerWidth < 888) {
      open = false
    }
  })

  function change(l: string) {
    locale = l
    goto((locale === 'fr' ? '/fr' : '/') + ($page.params.page ? (locale === 'fr' ? '/' : '')+ $page.params.page : "") + ($page.params.article ? "/" + $page.params.article : ""))
  }
</script>

<svelte:window bind:scrollY />

<nav class:black>
  <div bind:offsetHeight={navHeight}>
    <a class="logo" href="{($page.params.locale === 'fr' ? "/fr" : "/")}">
      <Logo {locale} />
    </a>

    <div class="locales">
      <input type="radio" id="en" checked={locale==="en"} on:change={() => change("en")} value="en" >
      <label for="en">EN</label> 
      <input type="radio" id="fr" checked={locale==="fr"} on:change={() => change("fr")} value="fr" >
      <label for="fr">FR</label> 
    </div>

    <details bind:open={open}>
      <summary><span>Menu</span> <MenuIcon {open} /></summary>
      {#if main}
      {#each main.fields.links as link}
      <Link {link} on:click={e => {
        if (index && !link.fields.path.startsWith('/#')) {
          e.preventDefault()
          history.pushState({}, null, ($page.params.locale === 'fr' ? "/fr" : "") + link.fields.path)
          window.scrollTo({ top: document.getElementById(link.fields.path.replace('/', '')).offsetTop, behavior: 'smooth' })
          path = link.fields.path

          if (window.innerWidth < 888) {
            open = false
          }
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
    </details>
  </div>

  {#if scrollY !== undefined && innerHeight}
  <!-- <progress value={scrollY + 1} max={Math.max(offsetHeight - innerHeight, 1)} /> -->
  <progress style="width: calc(95vh - {navHeight}px);" value={scrollY + innerHeight} max={Math.max(contentHeight, innerHeight)} />
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
    color: var(--color);
  }

  :global(body.hero--black) nav,
  nav.black {
    --color: black;
  }

  nav :global(a) {
    text-decoration: none;
    display: inline-block;
    padding: 0.33em;
    margin-bottom: 0.33em;
    border-radius: 6px;
    color: var(--color);
    transition: color 666ms;
  }

  nav :global(a:not(.logo):hover),
  nav :global(a:not(.logo):focus) {
    color: black;
    background-color: white;
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
  }

  input[type="radio"]:checked + label {
    color: black;
    background-color: white;
  }

  :global(body.hero--black) input[type="radio"]:checked + label,
  nav.black input[type="radio"]:checked + label {
    color: white;
    background-color: black;
    transition: color 666ms, background-color 666ms;
  }

  @media (max-width: 888px) {
    nav {
      position: relative;
      width: 100%;
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
      top: -1rem;
      right: -3vh;
    }

    details {
      top: 2rem;
      width: 66%;
      color: black;
      --color: black;
      background-color: white;
      border-radius: 6px;
      font-size: 1.33em;
      max-height: 2.5em;
      overflow: hidden;
      transition: max-height 666ms;
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
  }

  progress {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: none;

    transform: translateX(0.66em) rotate(90deg);
    transform-origin: top left;
    height: 4px;
    background: transparent;
  }

  progress[value]::-webkit-progress-bar {
    background: var(--color);
    border-radius: 2px;
    height: 2px;
    transition: background-color 666ms;
  }

  progress[value]::-moz-progress-bar {
    background: var(--color);
    border-radius: 2px;
    height: 2px;
    transition: background-color 666ms;
  }

  progress[value]::progress-bar {
    background: var(--color);
    border-radius: 2px;
    height: 2px;
    transition: background-color 666ms;
  }

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