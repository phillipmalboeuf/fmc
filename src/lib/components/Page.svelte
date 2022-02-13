<script context="module" lang="ts">
  import type { Asset, Entry, RichTextContent } from 'contentful'
  import type { ArticleDocument } from './Article.svelte'

  export interface PageDocument {
    title: string
    id: string
    color: string
    description?: any
    body: RichTextContent
    image: Asset
    content: Entry<any>[]
    articles: Entry<ArticleDocument>[]
  }

</script>


<script lang="ts">
  import { page as p } from '$app/stores'
  import { col, grid } from '$lib/styles/grid.css'

  import Content from './Content.svelte'
  import Document from './document/Document.svelte'
  import Expander from './Expander.svelte'
  import Footer from './Footer.svelte'
  import Navigation from './Navigation.svelte'
  import PageArticles from './PageArticles.svelte'
  import PageIntro from './PageIntro.svelte'
  import BackIcon from './BackIcon.svelte'
  import { box } from '$lib/styles/box.css'

	export let page: Entry<PageDocument>
  export let index = false
  export let landing = false
  

  let offsetHeight: number
  let path: string
  // let elements: {[key: string]: Element} = {}
  
  // onMount(() => {
	// 	const observer = new IntersectionObserver( 
	// 		([e]) => {
  //       if (e.isIntersecting) {
  //         active = e.target.id
  //       }
  //     },
	// 		{ threshold: 0, rootMargin: "-45%" }
	// 	)

  //   Object.values(elements).reverse().forEach(element => observer?.observe(element))
    

  //   return () => observer.disconnect()
	// })
</script>

<svelte:head>
  <title>{page.fields.title} – Canada Media Fund</title>
  <meta property="og:title" content="{page.fields.title} – Canada Media Fund" />
  <meta name="twitter:title" content="{page.fields.title} – Canada Media Fund">

  {#if page.fields.description}
  <meta name="description" content={page.fields.description}>
  <meta property="og:description" content={page.fields.description} />
  <meta name="twitter:description" content={page.fields.description}>
  {/if}

  {#if page.fields.image}
  <meta property="og:image" content="https:{page.fields.image.fields.file.url}?w=1200&h=630" />
  <meta name="twitter:image" content="https:{page.fields.image.fields.file.url}?w=600&h=314" />
  <meta name="twitter:card" value="summary_large_image">
  {:else}
  <meta name="twitter:card" value="summary">
  {/if}
</svelte:head>



<section class:landing class={grid({ columns: 4, align: 'middle' })}>
  <Navigation contentHeight={offsetHeight} {index} {landing} bind:path />

  <section bind:offsetHeight class="content {col({ span: landing ? 4 : 3 })}{landing ? ' '+grid({ columns: 2, align: 'middle', gap: 'medium' }) : ''}{(!index && !landing) ? ' '+box({ color: 'white' }) : ''}">  

    {#if !index && !landing}
    <PageIntro {page} h1 />
    {/if}

    <Content content={page.fields.content} {index} {landing} {path} media={page.fields.image} color={page.fields.color?.toLowerCase()} />

    {#if page.fields.articles}
    <PageArticles articles={page.fields.articles.map(article => ({ article, page }))} />
    {/if}
    
    {#if !index && !landing}
    <a class="back" href="{($p.params.locale === 'fr' ? "/fr" : "")}/"><h4>{$p.params.locale === 'fr' ? 'FERMER' : 'CLOSE'} ×</h4></a>
    {/if}

    {#if !landing}
    <Footer />
    {/if}
  </section>
</section>

<style>
  section.landing {
    color: black;
    min-height: calc(100vh - 20rem);
  }

  section.landing .content {
    margin: -4vh 0;
  }

  a.back {
    display: block;
    margin-top: 2rem;
    text-align: center;
    text-decoration: none;
  }
</style>