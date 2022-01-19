<script lang="ts">
  import { slideIn } from '$lib/animations'
  import { backs, highlights } from '$lib/formatters'
  import { box } from '$lib/styles/box.css'
  import { btn } from '$lib/styles/button.css'
  import { inpt } from '$lib/styles/input.css'
  import { grid, col } from '$lib/styles/grid.css'
  import { vars } from '$lib/styles/styles.css'

  import type { Entry, RichTextContent } from 'contentful'

  export let entry: Entry<{
    title: string
    id: string
    url: string
    emailLabel: string
    buttonLabel: string
  }>
  export let color: string = 'muted'
</script>

<section use:slideIn class="{box({ color: 'outline' })} {grid({ columns: 2 })}" style="--color: {vars.colors[highlights(color)]}">
  {#if entry.fields.title}<h2>{entry.fields.title}</h2>{/if}
  <form class="{grid({ columns: 2, gap: 'tight' })}" action="{entry.fields.url}" target="_blank">
    <input type="email" class="{inpt()}" placeholder="{entry.fields.emailLabel}">
    <button type="submit" class="{btn({ size: 'tight' })}">{entry.fields.buttonLabel} →</button>
  </form>
</section>

<style>
  section {
    color: var(--color);
    margin-bottom: 4rem;
  }

  h2 {
    margin-bottom: 0;
  }
</style>