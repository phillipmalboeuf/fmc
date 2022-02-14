<script lang="ts">
  import { page } from '$app/stores'
  import { setContext, tick } from 'svelte'

  import { btn } from '$lib/styles/button.css'
  import { box } from '$lib/styles/box.css'
  import { slideIn } from '$lib/animations'
  import { browser } from '$app/env'
  import BackIcon from './BackIcon.svelte'
import { currentPage } from '$lib/history';

  export let color: any = undefined
  export let href: string = undefined
  export let back: string = undefined

  export let expanded = false
  export let bold = false
  export let tight = false
  export let closeButtons = false
  export let arrows = false

  export let onOpen: Function = undefined

  let element: HTMLElement
  let button: HTMLAnchorElement

  async function close(e) {
    e.preventDefault()
    expanded = false

    if (back) {
      history.replaceState({}, '', back)
      currentPage.set(back.split('/')[1])
    }

    await tick()
    scroll(button)
  }

  setContext('close', close)

  function scroll(e: HTMLElement) {
    setTimeout(() => window.scrollTo({ top: e.getBoundingClientRect().top + window.pageYOffset - 100, behavior: 'smooth' }), 10)
  }

  $: browser && expanded && element && scroll(element)
</script>

{#if expanded}
<section bind:this={element} class:bold class={!arrows && box({ color: bold ? 'muted' : undefined })}>
  {#if arrows}<a class:bold class="up {btn({ full: true, hover: !arrows && color, color: arrows ? color : bold ? color : tight ? 'none' : 'outline', size: tight ? 'tight' : 'small', arrows })}" {href} on:click={(e) => {
    e.preventDefault()
    expanded = false
  }}>
  <slot name="label" />
  </a>{/if}
  {#if closeButtons}<a class="close" href={back} on:click={close}><span>{$page.params.locale === 'fr' ? 'FERMER' : 'CLOSE'}&nbsp;</span>×</a>{/if}

  <slot></slot>

  {#if !arrows}<a class="close second" href={back} on:click={close}>
    {#if bold}
    {$page.params.locale === 'fr' ? 'RETOUR' : 'BACK'} <BackIcon />
    {:else}
    <span>{$page.params.locale === 'fr' ? 'FERMER' : 'CLOSE'}&nbsp;</span>×
    {/if}
  </a>{/if}
</section>
{:else}
<a bind:this={button} use:slideIn class:arrows class:bold class={btn({ full: true, hover: !arrows && color, color: arrows ? color : bold ? color : tight ? 'none' : 'outline', size: tight ? 'tight' : 'small', arrows })} {href} on:click={(e) => {
  e.preventDefault()
  expanded = true

  if (href) {
    history.replaceState({}, '', href)
    currentPage.set(href.split('/')[1])

    // @ts-ignore
		if (typeof gtag !== "undefined"){
			// @ts-ignore
			window.gtag("config", 'G-R4NBBMK66N', {
				page_path: href,
			})
		}
  }

  onOpen && onOpen()
}}>
  <slot name="label" />
</a>
{/if}

<style>
  .close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    cursor: pointer;
  }

  .close.second {
    position: relative;
    text-align: center;
    display: block;
    width: 100%;
    margin: 1.33em 0 1.66em;
    text-decoration: none;
    font-size: 1.5em;
    right: 0;
  }

  @media (max-width: 888px) {
    section.bold {
      margin-left: min(-2vw, -2vh);
      margin-right: min(-2vw, -2vh);
    }

    a.bold:after {
      display: none;
    }
    .close {
      font-size: 1.5em;
    }
    .close:not(.bold):not(.second) span {
      display: none;
    }
  }
</style>