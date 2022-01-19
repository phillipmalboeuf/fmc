<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit'
  import { respond } from '$lib/responses'
  
  export const load: Load = async ({ params, fetch, session, stuff }) => {
		return respond(fetch, `/tags/${params.tag}.json`, params.locale)
	}
</script>

<script lang="ts">
  import type { Entry, EntryCollection } from 'contentful'
  import { col, grid } from '$lib/styles/grid.css'
  import { box } from '$lib/styles/box.css'
  import type { PageDocument } from '$lib/components/Page.svelte'
  import Page from '$lib/components/Page.svelte'
  import type { ArticleDocument } from '$lib/components/Article.svelte'
  import Navigation from '$lib/components/Navigation.svelte'
  import PageArticles from '$lib/components/PageArticles.svelte'
  import Tags from '$lib/components/Tags.svelte'
  import { page } from '$app/stores'

  export let tag: string
	export let articles: {
    article: Entry<ArticleDocument>,
    page: Entry<PageDocument>
  }[]
  let offsetHeight: number
</script>

<section class="container {grid({ columns: 4 })} {box({ color: 'white' })}">
  <Navigation contentHeight={offsetHeight} black />
  <section bind:offsetHeight class="content {col({ span: 3 })}">
    <a class="close" href={($page.params.locale === 'fr' ? "/fr" : "/")}>CLOSE ×</a>

    <Tags tags={[tag]} />
    <br><br>
    {#if articles}
    <PageArticles {articles} />
    {/if}
  </section>
</section>


<style>
  .container {
    margin: -2vw;
  }
  .content {
    min-height: 100vh;
    padding: 4vw;
    padding-left: 0;
  }

  .close {
    position: absolute;
    top: 0.5em;
    right: 0.5em;
    text-decoration: none;
    font-size: 1.5em;
  }
</style>