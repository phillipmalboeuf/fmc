
<script lang="ts">
  import type { Entry } from 'contentful'
  import type { PageDocument } from './Page.svelte'

  import { page } from '$app/stores'
  import Document from './document/Document.svelte'
  import Expander from './Expander.svelte'
  import Tags from './Tags.svelte'
  import Article, { ArticleDocument } from './Article.svelte'
  import { slideIn } from '$lib/animations'
  import { pills, pill } from '$lib/styles/pill.css'
  import { types } from '$lib/formatters'
  
	export let articles: {
    article: Entry<ArticleDocument>,
    page: Entry<PageDocument>
  }[]
</script>

{#if articles}
{#each articles.filter(a => a.article?.fields && a.page?.fields) as a}
<Expander href="{($page.params.locale === 'fr' ? "/fr" : "")}/{a.page.fields.id}/{a.article.fields.id}" back="{($page.params.locale === 'fr' ? "/fr" : "")}/{a.page.fields.id}" color={a.page.fields.color.toLowerCase()} bold>
  <div use:slideIn slot="label">
    {#if a.article.fields.type === 'Scenario'}<span class="{pill()}">{types(a.article.fields.type, $page.params.locale)}</span><br><br>{/if}
    <h3>{a.article.fields.title}</h3>
    <h5>{$page.params.locale === 'fr' ? 'En apprendre plus' : 'Learn More'} +</h5>
  </div>

  <Article article={a.article} color={a.page.fields.color.toLowerCase()} />
</Expander>
{/each}
{/if}

<style>
  div {
    text-align: left;
  }

  div > span {
    display: inline-block;
  }

  h3 {
    max-width: 42rem;
  }

  h5 {
    margin-bottom: 0;
  }
</style>