<script lang="ts">
  import type { Asset, Entry } from 'contentful'

  import Document from './document/Document.svelte'
  import Expander from './Expander.svelte'
  import PageArticles from './PageArticles.svelte'
  import PageIntro from './PageIntro.svelte'
  import Text from './Text.svelte'
  import Columns from './Columns.svelte'
  import Chart from './Chart.svelte'
  import Media from './Media.svelte'
  import Picture from './Picture.svelte'
  import Slider from './Slider.svelte'

  import { box } from '$lib/styles/box.css'
  import { vars } from '$lib/styles/styles.css'
  import { backs, texts } from '$lib/formatters'

  export let content: Entry<any>[]
  export let path: string = undefined
  export let color: string = undefined
  export let media: Asset = undefined
</script>

{#if content}
{#each content as entry, i}
<div class:hero={!!media && i === 0} id={entry.fields.id} style={!!media && i === 0 && `padding-bottom: ${media.fields.file.details.image.height / media.fields.file.details.image.width * 120}%; --back: ${vars.colors[backs(color)]}; --text: ${vars.colors[texts(backs(color))]}`}>
  {#if media && i === 0}
  <figure>
    <Picture {media} eager />
  </figure>
  {/if}

  <div>
    {#if entry.sys.contentType.sys.id === 'page'}
    <Expander expanded={path === `/${entry.fields.id}`} color={entry.fields.color.toLowerCase()} href="/{entry.fields.id}">
      <span slot="label">{entry.fields.title}</span>

      <PageIntro page={entry} />

      <svelte:self content={entry.fields.content} />

      <PageArticles page={entry} />
    </Expander>
    {:else if entry.sys.contentType.sys.id === 'text'}
    <Text {entry} />
    {:else if entry.sys.contentType.sys.id === 'columns'}
    <Columns {entry} />
    {:else if entry.sys.contentType.sys.id === 'media'}
    <Media {entry} />
    {:else if entry.sys.contentType.sys.id === 'chart'}
    <Chart {entry} />
    {:else if entry.sys.contentType.sys.id === 'slider'}
    <Slider {entry} />
    {/if}
  </div>
</div>
{/each}
{/if}

<style>
  figure {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 0;
    width: 100vw;
    z-index: 0;
  }

  .hero {
    position: relative;
    margin: -2vw -2vw 2rem -26.5vw;
    padding: 12rem 20vw 2vw 26.5vw;

    color: var(--text);
    background-color: var(--back);
  }

  .hero > div {
    position: relative;
    z-index: 1;
  }
</style>