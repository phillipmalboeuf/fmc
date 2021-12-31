<script lang="ts">
  import type { Entry } from 'contentful'

  import Document from './document/Document.svelte'
  import Expander from './Expander.svelte'
  import PageArticles from './PageArticles.svelte'
  import PageIntro from './PageIntro.svelte'
  import Text from './Text.svelte'
  import Columns from './Columns.svelte'
  import Chart from './Chart.svelte'

  export let content: Entry<any>[]
  export let path: string = undefined
</script>

{#if content}
{#each content as entry}
<div id={entry.fields.id}>
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
  {:else if entry.sys.contentType.sys.id === 'chart'}
  <Chart {entry} />
  {/if}
</div>
{/each}
{/if}
