<script lang="ts">
  import { page } from '$app/stores'
  import { setContext } from 'svelte'

  import { btn } from '$lib/styles/button.css'
  import { box } from '$lib/styles/box.css'
  import { slideIn } from '$lib/animations'

  export let color: any
  export let href: string = undefined
  export let back: string = undefined

  export let expanded = false
  export let bold = false

  export let onOpen: Function = undefined

  function close(e) {
    e.preventDefault()
    expanded = false

    if (back) {
      history.replaceState({}, '', back)
    }
  }

  setContext('close', close)
</script>

{#if expanded}
<section class={box({ color: bold ? 'muted' : undefined })}>
  <slot></slot>

  <a class:bold class="close" href={back} on:click={close}><span>CLOSE&nbsp;</span>×</a>
</section>
{:else}
<a use:slideIn class={btn({ full: true, hover: color, color: bold ? color : 'outline' })} {href} on:click={(e) => {
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

  .close.bold {
    position: relative;
    text-align: center;
    display: block;
    width: 100%;
    margin-bottom: 1.33em;
    text-decoration: none;
    font-size: 1.5em;
  }

  @media (max-width: 888px) {
    .close {
      font-size: 1.5em;
    }
    .close span {
      display: none;
    }
  }
</style>