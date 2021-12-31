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
  import { col, grid } from '$lib/styles/grid.css'

  import { getContext, onMount, setContext } from 'svelte'
  import Content from './Content.svelte'
  import Document from './document/Document.svelte'
  import Expander from './Expander.svelte'
  import type { Lien } from './Link.svelte'
  import Link from './Link.svelte'
  import PageArticles from './PageArticles.svelte'
  import PageIntro from './PageIntro.svelte'

	export let page: Entry<PageDocument>
  export let index = false
  const { main } = getContext<{ main: Entry<{ links: Entry<Lien>[] }> }>('navigation')

  let scrollY: number
  let offsetHeight: number
  let innerHeight: number
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

<svelte:window bind:scrollY bind:innerHeight />


<section class={grid({ columns: 4 })}>
  <nav>
    <h5>Canada Media Fund</h5>

    {#if main}
    {#each main.fields.links as link}
    <Link {link} on:click={e => {
      if (index && !link.fields.path.startsWith('/#')) {
        e.preventDefault()
        history.pushState({}, null, link.fields.path)
        window.scrollTo({ top: document.getElementById(link.fields.path.replace('/', '')).offsetTop, behavior: 'smooth' })
        path = link.fields.path
      }
    }} /><br>
    {/each}
    {:else}
    {#if page.fields.content}
    {#each page.fields.content.filter(c => c.fields.id) as entry}
    <a href="#{entry.fields.id}">{entry.fields.title}</a><br>
    {/each}
    {/if}
    {/if}

    {#if scrollY !== undefined}
    <!-- <progress value={scrollY + 1} max={Math.max(offsetHeight - innerHeight, 1)} /> -->
    <progress value={scrollY + innerHeight} max={Math.max(offsetHeight, innerHeight)} />
    {/if}
  </nav>

  <section bind:offsetHeight class={col({ span: 3 })}>

    {#key page.fields.id}

    {#if !index}
    <PageIntro {page} />
    {/if}

    <Content content={page.fields.content} {path} />

    <PageArticles {page} />
    {/key}
  </section>
</section>

<style>
  nav {
    position: sticky;
    position: -webkit-sticky;
    top: 2vh;
    left: 0;
    width: 8rem;
    align-self: flex-start;
  }

  nav :global(a:not(.logo)) {
    text-decoration: none;
    display: inline-block;
    padding: 0.33em;
    margin-bottom: 0.33em;
    border-radius: 6px;
  }

  nav :global(a:not(.logo):hover),
  nav :global(a:not(.logo):focus) {
    color: black;
    background-color: white;
  }

  progress {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: none;

    transform: translateX(0.66em) rotate(90deg);
    transform-origin: top left;
    width: 50vh;
  }

  progress[value]::-webkit-progress-bar {
    background: white;
    border-radius: 2px;
    height: 2px;
  }

  progress[value]::progress-bar {
    background: white;
    border-radius: 2px;
    height: 2px;
  }

  progress[value]::-webkit-progress-value {
    background: white;
    border-radius: 6px;
    height: 4px;
    position: relative;
    bottom: 1px;
  }

  progress[value]::progress-value {
    background: white;
    border-radius: 6px;
    height: 4px;
    position: relative;
    bottom: 1px;
  }
</style>