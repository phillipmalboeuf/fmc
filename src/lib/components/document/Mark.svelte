<script>
  export let mark
</script>

<style>
  a {
    text-decoration: underline;
    text-decoration-color: var(--color);
  }

  a:hover,
  a:focus {
    /* color: var(--color); */
  }
</style>

{#if mark.nodeType === 'text'}
{#if mark.marks.length > 0}
  {#if mark.marks[0].type === 'italic'}
  <small><svelte:self mark={{ ...mark, marks: mark.marks.slice(1) }} /></small>
  {:else if mark.marks[0].type === 'underline'}
  <span class="underline"><svelte:self mark={{ ...mark, marks: mark.marks.slice(1) }} /></span>
  {:else if mark.marks[0].type === 'bold'}
  <strong><svelte:self mark={{ ...mark, marks: mark.marks.slice(1) }} /></strong>
  {:else if mark.marks[0].type === 'code'}
  {@html mark.value}
  {/if}
{:else}
{mark.value.replace(/ :/g, '\u00A0:').replace(/« /g, '«\u00A0').replace(/ »/g, '\u00A0»').replace(/ \?/g, '\u00A0?').replace(/ !/g, '\u00A0!')}
{/if}
{:else if mark.nodeType === 'hyperlink'}
<a href="{mark.data.uri}" target="{mark.data.uri.indexOf('http') === 0 ? '_blank' : '_self'}">
  {#each mark.content as mark}<svelte:self mark={mark} />{/each}
</a>
{:else if mark.nodeType === 'entry-hyperlink'}
<a href="{mark.data.target.sys.contentType.sys.id}s/{mark.data.target.fields.identifier}">
  {#each mark.content as mark}<svelte:self mark={mark} />{/each}
</a>
{:else if mark.nodeType === 'asset-hyperlink'}
<a href="{mark.data.target.fields.file.url}" target="_blank">
  {#each mark.content as mark}<svelte:self mark={mark} />{/each}
</a>
{/if}