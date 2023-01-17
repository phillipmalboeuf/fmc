<script context="module" lang="ts">
  import type { Asset, Entry, RichTextContent } from 'contentful'
  import type { TagDocument } from './Tags.svelte'


  export interface ArticleDocument {
    title: string
    id: string
    metaDescription: string
    bigIntro?: boolean
    description?: RichTextContent
    type: string
    tagsList: Entry<TagDocument>[]
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
  import { backs, texts, types } from '$lib/formatters'

  import { getContext, onMount, setContext, tick } from 'svelte'
  import { page } from '$app/stores'

  import Content from './Content.svelte'
  import Document from './document/Document.svelte'
  import type { Lien } from './Link.svelte'
  import Link from './Link.svelte'
  import Picture from './Picture.svelte'
  import Tags from './Tags.svelte'
  import ShareBar from './ShareBar.svelte'
  import Title from './Title.svelte'
  import BackIcon from './BackIcon.svelte'

  import { slideIn } from '$lib/animations'
  import Contributors from './Contributors.svelte'
  import { goto } from '$app/navigation'

	export let article: Entry<ArticleDocument>
  // export let others: Entry<ArticleDocument>[] = undefined
  export let color: any
  
  let onBack: svelte.JSX.MouseEventHandler<HTMLAnchorElement> = getContext('close')

  async function onPrint() {
    await goto(window.location.pathname)
    window.print()
  }
</script>

<svelte:head>
  <title>{article.fields.title} – Canada Media Fund</title>
  <meta property="og:title" content="{article.fields.title} – Canada Media Fund" />
  <meta name="twitter:title" content="{article.fields.title} – Canada Media Fund">

  {#if article.fields.metaDescription}
  <meta name="description" content={article.fields.metaDescription}>
  <meta property="og:description" content={article.fields.metaDescription} />
  <meta name="twitter:description" content={article.fields.metaDescription}>
  {/if}

  {#if article.fields.image}
  <meta property="og:image" content="https:{article.fields.image.fields.file.url}?w=1200&h=630" />
  <meta name="twitter:image" content="https:{article.fields.image.fields.file.url}?w=600&h=314" />
  <meta name="twitter:card" value="summary_large_image">
  {:else}
  <meta name="twitter:card" value="summary">
  {/if}
</svelte:head>

<section style="--color: {vars.colors[color]}; --text-color: {vars.colors[texts(color)]}; --back-color: {vars.colors[backs(color)]}; --back-text-color: {vars.colors[texts(backs(color))]}">
  
  <header style="background: var(--back-color); color: var(--back-text-color)">
    <ShareBar {article} {onBack} {onPrint} />

    <div class:big={article.fields.bigIntro} use:slideIn class="{article.fields.bigIntro ? '' : grid({ columns: 1, gap: 'horizontal' })}">

      {#if article.fields.image}
      <figure class="banner">
        <Picture media={article.fields.image} />
      </figure>
      {/if}

      {#if article.fields.bigIntro}
      <aside>
        {types(article.fields.type, $page.params.locale).toUpperCase()}<br>
        {#if article.fields.contributors}
        {$page.params.locale === 'fr' ? 'par ' : 'by '}
        {#each article.fields.contributors as contributor}
        {contributor.fields.title}{#if contributor.fields.description}, {contributor.fields.description}{/if}
        {/each}
        {/if}
      </aside>
      {/if}

      <h1 class={article.fields.bigIntro ? "h1" : "h3"}>
        {article.fields.title}
      </h1>

      {#if article.fields.metaDescription}
      <h5>{article.fields.metaDescription}</h5>
      {/if}

      {#if article.fields.description}
      <div>
      <Document body={article.fields.description} />
      </div>
      {/if}

      <div class="tags">
        {#if article.fields.tagsList}<Tags tags={[...article.fields.tagsList]} />{/if}
      </div>      
    </div>
  </header>

  <Content content={article.fields.content} {color} />

  {#if article.fields.deeperNavigation || article.fields.recommended || article.fields.contributors}
  <footer class="{grid({ columns: 2 })}" style="background: {vars.colors[backs(color)]}; color: {vars.colors[texts(backs(color))]}">
    {#if article.fields.deeperNavigation}
    <Title title={'Dive Deeper'} />

    {#each article.fields.deeperNavigation as navigation, i}
    <nav use:slideIn class="{i === 0 && col({ start: 1 })}">
      <h2>{navigation.fields.name}</h2>

      {#each navigation.fields.links as link}
      <Link {link} /><br>
      {/each}
    </nav>
    {/each}
    {/if}

    {#if article.fields.contributors}
    <Contributors contributors={article.fields.contributors} />
    {/if}

    {#if article.fields.recommended}
    <h2 class="{col({ span: 2 })}" use:slideIn>Read more</h2>
    {#each article.fields.recommended as rec, i}
    <a use:slideIn href="{($page.params.locale === 'fr' ? "/fr" : "")}/{$page.params.page}/{rec.fields.id}" class="{box({ color })} other">
      <h4>{#if i === 0}Previous Article{:else}Next Article{/if}</h4>
      <h2>{rec.fields.title}</h2>
      <small>{$page.params.locale === 'fr' ? 'En apprendre plus' : 'Learn more'} +</small>
    </a>
    {/each}
    {/if}

    <!-- {#if others}
    {#each others as other}
    <a use:slideIn href="{($page.params.locale === 'fr' ? "/fr" : "")}/{$page.params.page}/{other.fields.id}" class="{box({ color })} other">
      <h4>Next Article</h4>
      <h2>{other.fields.title}</h2>
      <small>Learn more +</small>
    </a>
    {/each}
    {/if} -->
  </footer>
  {/if}
</section>

<style>
  header,
  footer {
    margin: min(-2vw, -2vh) min(-2vw, -2vh) max(2vw, 2vh);
    padding: max(2vw, 2vh);
  }

  header {
    border-radius: 12px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  header h5 {
    text-transform: none;
  }

  footer {
    margin-top: max(2vw, 2vh);
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

  footer > h2 {
    margin-bottom: 0;
  }

  div.big {
    text-align: center;
  }

  div.big > div,
  div.big > aside {
    max-width: 50rem;
    margin: 0 auto;
  }

  div.big > aside {
    margin-top: 3rem;
    margin-bottom: 2rem;
  }

  div.big > div :global(p) {
    font-size: 1.5em;
  }

  a.back,
  a.other {
    text-decoration: none;
    text-transform: uppercase;
  }

  a.other {
    border: 1px solid transparent;
  }

  a.other:hover,
  a.other:focus {
    background: transparent;
    color: var(--color);
    border: 1px solid;
  }

  /* @media (max-width: 888px) {
    section {
      margin-left: min(-2vw, -2vh);
      margin-right: min(-2vw, -2vh);
    }
  } */

  figure.banner {
    padding: 0;
    margin: 0 0 4rem;
    border-radius: 12px;
    overflow: hidden;
  }

  @media (max-width: 888px) {
    .tags {
      grid-row-start: auto !important;
    }

    figure {
      padding: 0;
    }
  }
</style>