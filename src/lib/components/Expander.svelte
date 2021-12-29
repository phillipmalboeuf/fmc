<script lang="ts">
  import { page } from '$app/stores'
  import { btn } from '$lib/styles/button.css'
  import { box } from '$lib/styles/box.css'

  export let color: any
  export let href: string = undefined

  export let expanded = false
  export let bold = false
</script>

{#if expanded}
<section class={box()}>
  <a class="close" href="/" on:click={(e) => {
    e.preventDefault()
    expanded = false

    if (href) {
      history.replaceState({}, '', '/')
    }
  }}>Close</a>

  <slot></slot>
</section>
{:else}
<a class={btn({ full: true, hover: color, color: bold ? 'bold' : 'outline' })} {href} on:click={(e) => {
  e.preventDefault()
  expanded = true

  if (href) {
    history.replaceState({}, '', href)
  }
}}>
  <slot name="label" />
</a>
{/if}