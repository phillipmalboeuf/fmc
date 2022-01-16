
<script lang="ts">
  import type { Entry } from 'contentful'
  import type { PageDocument } from './Page.svelte'

  import { page } from '$app/stores'
  import Document from './document/Document.svelte'
  import Expander from './Expander.svelte'
  import Tags from './Tags.svelte'
  import Article, { ArticleDocument } from './Article.svelte'
  import { slideIn } from '$lib/animations'
  
	export let articles: {
    article: Entry<ArticleDocument>,
    page: Entry<PageDocument>
  }[]
</script>

{#if articles}
{#each articles as a}
<Expander href="{($page.params.locale === 'fr' ? "/fr" : "")}/{a.page.fields.id}/{a.article.fields.id}" back="/{a.page.fields.id}" color={a.page.fields.color.toLowerCase()} bold>
  <div use:slideIn slot="label">
    <Tags tags={[a.article.fields.type]} />
    <h3>{a.article.fields.title}</h3>
    <h5>Learn More +</h5>
  </div>

  <Article article={a.article} color={a.page.fields.color.toLowerCase()} others={a.page.fields.articles} />
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