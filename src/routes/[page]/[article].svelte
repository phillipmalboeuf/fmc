<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit'
  import { respond } from '$lib/responses'
  
  export const load: Load = async ({ params, fetch, session, stuff }) => {
		return respond(fetch, `/${params.page}/${params.article}.json`, params.locale)
	}
</script>

<script lang="ts">
  import type { Entry, EntryCollection } from 'contentful'
  import { col, grid } from '$lib/styles/grid.css'
  import { box } from '$lib/styles/box.css'
  import type { PageDocument } from '$lib/components/Page.svelte'
  // import Page from '$lib/components/Page.svelte'
  import Article, { ArticleDocument } from '$lib/components/Article.svelte'
  import Navigation from '$lib/components/Navigation.svelte'

	export let article: Entry<ArticleDocument>
  export let page: Entry<PageDocument>
  
  let offsetHeight: number
</script>

<section class={grid({ columns: 4 })}>
  <Navigation contentHeight={offsetHeight} />
  <section bind:offsetHeight class="content {col({ span: 3 })} {box({ color: 'muted' })}">
    <Article {article} color={page.fields.color.toLowerCase()} />
  </section>
</section>