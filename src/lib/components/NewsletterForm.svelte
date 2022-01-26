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
    embed: string
    // url: string
    // emailLabel: string
    // buttonLabel: string
  }>
  export let color: string = 'muted'
</script>

<section use:slideIn class="{box({ color: 'outline' })} {grid({ columns: 2 })}" style="--color: {vars.colors[highlights(color)]}">
  {#if entry.fields.title}<h2>{entry.fields.title}</h2>{/if}
  <div class="">
    {#if entry.fields.embed}{@html entry.fields.embed}{/if}
  </div>
  <!-- <form class="{grid({ columns: 2, gap: 'tight' })} {col({ align: 'bottom' })}" action="{entry.fields.url}" target="_blank">
    <input type="email" class="{inpt()}" placeholder="{entry.fields.emailLabel}">
    <button type="submit" class="{btn({ size: 'tight' })}">{entry.fields.buttonLabel} →</button>
  </form> -->
</section>

<style>
  section {
    color: var(--color);
    margin-bottom: 4rem;
  }

  h2 {
    margin-bottom: 0;
  }

  div :global(label),
  div :global(input),
  div :global(select) {
    display: block;
    width: 100%;
  }

  div :global(input),
  div :global(select),
  div :global(button) {
    font-size: 1.5rem;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    border: none;
    color: var(--color);
    border-bottom: 1px solid currentColor;
    background: transparent;
    border-radius: 0;
    margin-bottom: 1em;
    margin-top: 0.25em;
  }

  div :global(button) {
    font-size: 2rem;
    text-transform: uppercase;
    border: 1px solid;
    border-radius: 6px;
    padding: 0.5em;
    margin-bottom: 0;
  }

  div :global(button:hover),
  div :global(button:focus) {
    background-color: var(--color);
    color: black;
  }
</style>