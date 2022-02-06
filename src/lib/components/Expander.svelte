<script lang="ts">
  import { page } from '$app/stores'
  import { setContext } from 'svelte'

  import { btn } from '$lib/styles/button.css'
  import { box } from '$lib/styles/box.css'
  import { slideIn } from '$lib/animations'
  import { browser } from '$app/env'

  export let color: any = undefined
  export let href: string = undefined
  export let back: string = undefined

  export let expanded = false
  export let bold = false
  export let tight = false
  export let closeButtons = false

  export let onOpen: Function = undefined

  let element: HTMLElement

  function close(e) {
    e.preventDefault()
    expanded = false

    if (back) {
      history.replaceState({}, '', back)
    }
  }

  setContext('close', close)

  function scroll() {
    setTimeout(() => window.scrollTo({ top: element.getBoundingClientRect().top + window.pageYOffset - 100, behavior: 'smooth' }), 10)
  }

  $: browser && href && expanded && element && scroll()
</script>

{#if expanded}
<section bind:this={element} class={box({ color: bold ? 'muted' : undefined })}>
  {#if closeButtons}<a class="close" href={back} on:click={close}><span>CLOSE&nbsp;</span>×</a>{/if}

  <slot></slot>

  {#if closeButtons}<a class="close second" href={back} on:click={close}><span>CLOSE&nbsp;</span>×</a>{/if}
</section>
{:else}
<a use:slideIn class:bold class={btn({ full: true, hover: color, color: bold ? color : tight ? 'none' : 'outline', size: tight ? 'tight' : 'small' })} {href} on:click={(e) => {
  e.preventDefault()
  expanded = true

  if (href) {
    history.replaceState({}, '', href)
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
    margin-bottom: 1.33em;
    text-decoration: none;
    font-size: 1.5em;
    right: 0;
  }

  @media (max-width: 888px) {
    a.bold:after {
      display: none;
    }
    .close {
      font-size: 1.5em;
    }
    .close:not(.bold) span {
      display: none;
    }
  }
</style>