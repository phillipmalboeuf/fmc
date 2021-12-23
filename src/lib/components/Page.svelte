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
  import { col, grid } from '$lib/styles/grid.css'

  import { getContext, onMount, setContext } from 'svelte'
  import Content from './Content.svelte'
  import type { Lien } from './Link.svelte'
  import Link from './Link.svelte'

	export let page: Entry<PageDocument>
  export let index = false
  const { main } = getContext<{ main: Entry<{ links: Entry<Lien>[] }> }>('navigation')

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


<section class={grid({ columns: 3 })}>
  <nav>
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
  </nav>

  <section class={col({ span: 2 })}>

    {#key page.fields.id}

    {#if !index}
    <center>
      <h1>{page.fields.title}</h1>
      {#if page.fields.description}<p>{page.fields.description}</p>{/if}
    </center>
    {/if}

    <Content content={page.fields.content} {path} />
    {/key}
  </section>
</section>

<style>
  nav {
    position: sticky;
    position: -webkit-sticky;
    top: 1vh;
    left: 0;
    align-self: flex-start;
  }
</style>