<script context="module" lang="ts">
  import type { Asset, Entry, RichTextContent } from 'contentful'
  import type { TagDocument } from './Tags.svelte'


  export interface ArticleDocument {
    title: string
    id: string
    metaDescription: string
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
  import BackIcon from './BackIcon.svelte'

  import { slideIn } from '$lib/animations'

	export let article: Entry<ArticleDocument>
  // export let others: Entry<ArticleDocument>[] = undefined
  export let color: any
  
  let onBack: svelte.JSX.MouseEventHandler<HTMLAnchorElement> = getContext('close')
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
    <ShareBar {article} {onBack} />

    <div use:slideIn class="{grid({ columns: 2, gap: 'horizontal' })}">

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

      {#if article.fields.tagsList}
      <div style={article.fields.description && `grid-column-start: 1; grid-row-start: ${article.fields.image ? 3 : 2}`}>
        <Tags tags={[...article.fields.tagsList]} />
      </div>
      {/if}
    </div>

    {#if article.fields.contributors}
    <div use:slideIn class="contributors {grid({ columns: 2, gap: 'horizontal' })} {col({ span: 2 })}">
      <h3 class="{col({ span: 2 })}">{$page.params.locale === 'fr' ? 'Contributeurs' : 'Contributors'}</h3>
      {#each article.fields.contributors as contributor}
      <div class="contributor {box({ padding: 'tight' })} {grid({ columns: 2, gap: 'horizontal' })}">
        <figure class="">
          <Picture media={contributor.fields.image} small ar={1} />
        </figure>

        <div>
          <p>{contributor.fields.job}</p>
          <h3>{contributor.fields.title}</h3>
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

  <Content content={article.fields.content} {color} />

  <footer class="{grid({ columns: 2 })}" style="background: {vars.colors[backs(color)]}; color: {vars.colors[texts(backs(color))]}">
    {#if article.fields.recommended}
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

    {#if article.fields.recommended}
    <h2 class="{col({ span: 2 })}" use:slideIn>Recommended Articles</h2>
    {#each article.fields.recommended as rec}
    <a use:slideIn href="{($page.params.locale === 'fr' ? "/fr" : "")}/{$page.params.page}/{rec.fields.id}" class="{box({ color })} other">
      <h4>Next Article</h4>
      <h2>{rec.fields.title}</h2>
      <small>Learn more +</small>
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

    <center use:slideIn class="{col({ span: 2 })}">
      <a class="back" href="{($page.params.locale === 'fr' ? "/fr" : "")}/{$page.params.page}" on:click={onBack}><h4>BACK <BackIcon /></h4></a>
    </center>
  </footer>
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
    header,
    footer {
      margin: -2vh -2vh 2vh;
      padding: 2vh;
    }

    footer {
      margin: 2vh -2vh;
    }
  } */

  .contributor {
    overflow: hidden;
  }

  figure {
    padding: 4rem;
    margin: 0;
  }

  .contributor p:first-of-type,
  .contributor h3 {
    margin-bottom: 0.2em;
  }

  .contributor p:last-child {
    margin-bottom: 0;
  }

  .contributor figure {
    display: block;
    padding: 0;
    margin: -1rem;
    /* margin-right: 0; */
  }

  .contributor figure :global(img) {
    height: 100%;
    object-fit: cover;
  }

  .contributor a {
    position: absolute;
    bottom: 0.66rem;
    text-decoration-color: var(--color);
  }

  .contributor a:hover,
  .contributor a:hover {
    color: var(--color);
  }

  @media (max-width: 1200px) {
    .contributors {
      grid-template-columns: 1fr 1fr;
    }

    .contributors h3 {
      grid-column: span 2;
    }
  }

  @media (max-width: 888px) {
    .contributors {
      margin-top: 2rem;
    }

    figure {
      padding: 1rem;
    }

    .contributor figure {
      height: 25vh;
      overflow: hidden;
      margin-bottom: 1rem;
    }

    .contributor a {
      position: static;
      display: block;
      margin-top: 0.5rem;
    }
  }
</style>