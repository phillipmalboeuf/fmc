<script lang="ts">
  import { page } from '$app/stores'
  import { btn } from '$lib/styles/button.css'

  export let label: string
  export let color: 'blue' | 'cyan' | 'green' | 'pink'
  export let href: string = undefined

  export let expanded = false
</script>

{#if expanded}
<section>
  <a href="/" on:click={(e) => {
    e.preventDefault()
    expanded = false

    if (href) {
      history.replaceState({}, '', '/')
    }
  }}>Close</a>

  <slot></slot>
</section>
{:else}
<a class={btn({ full: true, hover: color })} {href} on:click={(e) => {
  e.preventDefault()
  expanded = true

  if (href) {
    history.replaceState({}, '', href)
  }
}}>
  {label}
</a>
{/if}