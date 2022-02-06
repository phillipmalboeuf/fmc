<script lang="ts">
  import Picture from '../Picture.svelte'
  import Mark from './Mark.svelte'

  export let n
</script>

{#if n.nodeType === 'heading-1'}
  <h1>{#each n.content as mark}<Mark mark={mark} />{/each}</h1>
{:else if n.nodeType === 'heading-2'}
  <h2>{#each n.content as mark}<Mark mark={mark} />{/each}</h2>
{:else if n.nodeType === 'heading-3'}
  <h3>{#each n.content as mark}<Mark mark={mark} />{/each}</h3>
{:else if n.nodeType === 'heading-4'}
  <h4>{#each n.content as mark}<Mark mark={mark} />{/each}</h4>
{:else if n.nodeType === 'heading-5'}
  <h5>{#each n.content as mark}<Mark mark={mark} />{/each}</h5>
{:else if n.nodeType === 'heading-6'}
  <h6>{#each n.content as mark}<Mark mark={mark} />{/each}</h6>
{:else if n.nodeType === 'paragraph'}
  <p>{#each n.content as mark}<Mark mark={mark} />{/each}</p>
{:else if n.nodeType === 'hr'}
  <hr />

{:else if n.nodeType === 'unordered-list'}
  <ul>
    {#each n.content as item}<li>{#each item.content as n}<svelte:self {n} />{/each}</li>{/each}
  </ul>

{:else if n.nodeType === 'ordered-list'}
  <ol>
    {#each n.content as item}<li>{#each item.content as n}<svelte:self {n} />{/each}</li>{/each}
  </ol>

{:else if n.nodeType === 'blockquote'}
  <blockquote>{#each n.content as code}<svelte:self n={code} />{/each}</blockquote>

{:else if n.nodeType === 'embedded-asset-block'}
<figure><Picture media={n.data.target} noDescription small /></figure>
{/if}

<style>
  figure {
    margin-bottom: 2em;
  }
</style>