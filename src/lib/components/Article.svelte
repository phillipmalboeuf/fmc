<script context="module" lang="ts">
  import type { Asset, Entry, RichTextContent } from 'contentful'


  export interface ArticleDocument {
    title: string
    id: string
    description?: RichTextContent
    type: string
    tags: string[]
    image: Asset
    recommended: Entry<ArticleDocument>[]
    deeperNavigation: Entry<{
      name: string
      links: Entry<Lien>[]
    }>[]
    contributors: Entry<{
      title: string
      id: string
      job: string
      description?: string
      contactLink?: string
      image: Asset
    }>[]
    content: Entry<any>[]
  }

</script>


<script lang="ts">
  import { col, grid } from '$lib/styles/grid.css'
  import { box } from '$lib/styles/box.css'
  import { vars } from '$lib/styles/styles.css'
  import { pill } from '$lib/styles/pill.css'
  import { backs, texts } from '$lib/formatters'

  import { getContext, onMount, setContext } from 'svelte'
  import { page } from '$app/stores'

  import Content from './Content.svelte'
  import Document from './document/Document.svelte'
  import type { Lien } from './Link.svelte'
  import Link from './Link.svelte'
  import Picture from './Picture.svelte'
  import Tags from './Tags.svelte'
  import ShareBar from './ShareBar.svelte'
  import Title from './Title.svelte'

	export let article: Entry<ArticleDocument>
  export let others: Entry<ArticleDocument>[] = undefined
  export let color: string
  
  let onBack: svelte.JSX.MouseEventHandler<HTMLAnchorElement> = getContext('close')
</script>

<svelte:head>
  <title>{article.fields.title} – Canada Media Fund</title>
  <meta property="og:title" content="{article.fields.title} – Canada Media Fund" />
  <meta name="twitter:title" content="{article.fields.title} – Canada Media Fund">

  {#if article.fields.title}
  <meta name="description" content={article.fields.title}>
  <meta property="og:description" content={article.fields.title} />
  <meta name="twitter:description" content={article.fields.title}>
  {/if}

  {#if article.fields.image}
  <meta property="og:image" content="https:{article.fields.image.fields.file.url}?w=1200&h=630" />
  <meta name="twitter:image" content="https:{article.fields.image.fields.file.url}?w=600&h=314" />
  <meta name="twitter:card" value="summary_large_image">
  {:else}
  <meta name="twitter:card" value="summary">
  {/if}
</svelte:head>

{#key article.fields.id}
<section style="--color: {vars.colors[color]}; --text-color: {vars.colors[texts(color)]}">
  <header class="{grid({ columns: 2 })}" style="background: {vars.colors[backs(color)]}; color: {vars.colors[texts(backs(color))]}">
    <ShareBar {article} {onBack} />

    {#if article.fields.image}
    <figure class="{col({ span: 2 })}">
      <Picture media={article.fields.image} />
    </figure>
    {/if}

    <h1 class="h3">
      {article.fields.title}
    </h1>

    {#if article.fields.description}
    <Document body={article.fields.description} />
    {/if}

    {#if article.fields.tags}
    <div style={article.fields.description && "grid-column-start: 1; grid-row-start: 4"}>
      <Tags tags={[article.fields.type, ...article.fields.tags]} />
    </div>
    {/if}

    {#if article.fields.contributors}
    <div class="{grid({ columns: 2, gap: 'tight' })} {col({ span: 2 })}">
      <h3 class="{col({ span: 2 })}">Contributors</h3>
      {#each article.fields.contributors as contributor}
      <div class="contributor {box({ padding: 'tight' })} {grid({ columns: 2, gap: 'tight' })}" style="grid-template-columns: 1fr 1fr !important">
        <figure class="">
          <Picture media={contributor.fields.image} small ar={1} />
        </figure>

        <div>
          <p>{contributor.fields.job}</p>
          <h2>{contributor.fields.title}</h2>
          <p>{contributor.fields.description}</p>

          {#if contributor.fields.contactLink}
          <a href={contributor.fields.contactLink} target="_blank" rel="external">Contact {contributor.fields.title} →</a>
          {/if}
        </div>
      </div>
      {/each}
    </div>
    {/if}
  </header>

  <Content content={article.fields.content} />

  <footer class="{grid({ columns: 2 })}" style="background: {vars.colors[backs(color)]}; color: {vars.colors[texts(backs(color))]}">
    {#if article.fields.recommended}
    <Title title={'Dive Deeper'} />
    
    <nav>
      <h2>Recommended Articles</h2>

      {#each article.fields.recommended as rec}
      <a href="/{rec.fields.id}">{rec.fields.title}</a>
      {/each}
    </nav>

    {#each article.fields.deeperNavigation as navigation, i}
    <nav class="{i === 0 && col({ start: 1 })}">
      <h2>{navigation.fields.name}</h2>

      {#each navigation.fields.links as link}
      <Link {link} /><br>
      {/each}
    </nav>
    {/each}
    {/if}

    {#if others}
    {#each others as other}
    <a href="/{$page.params.page}/{other.fields.id}" class="{box({ color })} other">
      <h4>Next Article</h4>
      <h2>{other.fields.title}</h2>
      <small>Learn more +</small>
    </a>
    {/each}
    {/if}

    <center class="{col({ span: 2 })}">
      <a class="back" href="/{$page.params.page}" on:click={onBack}><h4>BACK ↩</h4></a>
    </center>
  </footer>
</section>
{/key}

<style>
  header,
  footer {
    margin: calc(-2vw - 1px) calc(-2vw - 1px) 2vw;
    padding: 2vw;
  }

  footer {
    margin: 2vw calc(-2vw - 1px);
  }

  footer :global(a:not(.back):not(.other)) {
    display: inline-block;
    font-size: 1.5em;
    margin-bottom: 1em;
  }

  footer :global(a:not(.other):hover),
  footer :global(a:not(.other):focus) {
    color: var(--color);
  }

  a.back,
  a.other {
    text-decoration: none;
  }

  @media (max-width: 888px) {
    header,
    footer {
      margin: calc(-2vh - 1px) calc(-2vh - 1px) 2vh;
      padding: 2vh;
    }

    footer {
      margin: 2vh calc(-2vh - 1px);
    }
  }


  figure {
    padding: 4rem;
    margin: 0;
  }

  .contributor p,
  .contributor h2 {
    margin-bottom: 0;
  }

  .contributor figure {
    display: block;
    padding: 0;
    margin: -1rem;
    /* margin-right: 0; */
  }

  .contributor a {
    position: absolute;
    bottom: 0.5rem;
    text-decoration-color: var(--color);
  }

  @media (max-width: 888px) {
    .contributor figure {
      margin-right: 0;
    }
  }
</style>