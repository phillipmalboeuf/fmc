<script context="module" lang="ts">
  import type { Asset, Entry, RichTextContent } from 'contentful'


  export interface PageDocument {
    title: string
    id: string
    description?: any
    body: RichTextContent
    photo: Asset
    content: Entry<any>[]
  }

</script>


<script lang="ts">
  import Content from './Content.svelte'

	export let page: Entry<PageDocument>
</script>

<svelte:head>
  <title>{page.fields.title} – Canada Media Funds</title>
  <meta property="og:title" content="{page.fields.title} – Canada Media Funds" />
  <meta name="twitter:title" content="{page.fields.title} – Canada Media Funds">

  {#if page.fields.description}
  <meta name="description" content={page.fields.description}>
  <meta property="og:description" content={page.fields.description} />
  <meta name="twitter:description" content={page.fields.description}>
  {/if}

  {#if page.fields.photo}
  <meta property="og:image" content="https:{page.fields.photo.fields.file.url}?w=1200&h=630" />
  <meta name="twitter:image" content="https:{page.fields.photo.fields.file.url}?w=600&h=314" />
  <meta name="twitter:card" value="summary_large_image">
  {:else}
  <meta name="twitter:card" value="summary">
  {/if}
</svelte:head>

{#key page.fields.id}
{#if page.fields.content}
<Content content={page.fields.content} />
{/if}
{/key}
