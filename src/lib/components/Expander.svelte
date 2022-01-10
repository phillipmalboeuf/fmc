<script lang="ts">
  import { page } from '$app/stores'
  import { setContext } from 'svelte'

  import { btn } from '$lib/styles/button.css'
  import { box } from '$lib/styles/box.css'

  export let color: any
  export let href: string = undefined
  export let back: string = undefined

  export let expanded = false
  export let bold = false

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
  <a class:bold class="close" href={back} on:click={close}>Close</a>

  <slot></slot>
</section>
{:else}
<a class={btn({ full: true, hover: color, color: bold ? color : 'outline' })} {href} on:click={(e) => {
  e.preventDefault()
  expanded = true

  if (href) {
    history.replaceState({}, '', href)
  }
}}>
  <slot name="label" />
</a>
{/if}

<style>
  .close {
    position: absolute;
    top: 0.5em;
    right: 0.5em;
  }

  .close.bold {
    top: auto;
    bottom: 1em;
    left: 0.5em;
    text-align: center;
  }
</style>