<script lang="ts">
  import type { Entry } from 'contentful'
  import Expander from './Expander.svelte'
  import Text from './Text.svelte'

  export let content: Entry<any>[]
  export let path: string = undefined
</script>

{#if content}
{#each content as entry}
<div id={entry.fields.id}>
  {#if entry.sys.contentType.sys.id === 'page'}
  <Expander expanded={path === `/${entry.fields.id}`} label={entry.fields.title} color={entry.fields.color.toLowerCase()} href="/{entry.fields.id}">
    <center>
      <h2>{entry.fields.title}</h2>
      {#if entry.fields.description}<p>{entry.fields.description}</p>{/if}
    </center>

    <svelte:self content={entry.fields.content} />
  </Expander>
  {:else if entry.sys.contentType.sys.id === 'text'}
  <Text {entry} />
  {/if}
</div>
{/each}
{/if}
