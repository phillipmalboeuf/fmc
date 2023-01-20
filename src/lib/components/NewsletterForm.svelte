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
  export let landing = false
</script>

<section use:slideIn class:landing class="{box({ color: 'outline' })} {grid({ columns: entry.fields.title ? landing ? 1 : 2 : 1 })}" style="--color: {vars.colors[highlights(color)]}; background: {vars.colors.beige};">
  {#if entry.fields.title}{#if landing}<h5>{entry.fields.title}</h5>{:else}<h2>{entry.fields.title}</h2>{/if}{/if}
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

  @media (max-width: 888px) {
    section.landing {
      margin-top: 2rem;
    }
  }

  @media (min-width: 888px) {
    section.landing {
      margin: 0 2vw;
    }
  }

  h2, h5 {
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
    font-size: 1.5rem;
    text-transform: uppercase;
    border: 1px solid;
    border-radius: 12px;
    padding: 0.5em;
    margin-bottom: 0;
  }

  div :global(button):after {
    content: "→";
    margin-left: 0.5em;
  }

  div :global(button:hover),
  div :global(button:focus) {
    background-color: var(--color);
    color: black;
  }
</style>