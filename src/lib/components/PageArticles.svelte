
<script lang="ts">
  import type { Entry } from 'contentful'
  import type { PageDocument } from './Page.svelte'

  import Document from './document/Document.svelte'
  import Expander from './Expander.svelte'
  import Tags from './Tags.svelte'
  import Article from './Article.svelte'
  
	export let page: Entry<PageDocument>
</script>

{#if page.fields.articles}
{#each page.fields.articles as article}
<Expander color={page.fields.color.toLowerCase()} bold>
  <div slot="label">
    <Tags tags={article.fields.tags} />
    <h3>{article.fields.title}</h3>
    <h5>Learn More +</h5>
  </div>

  <Article {article} color={page.fields.color.toLowerCase()} />
</Expander>
{/each}
{/if}

<style>
  div {
    text-align: left;
  }

  h5 {
    margin-bottom: 0;
  }
</style>