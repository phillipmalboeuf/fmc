<script context="module" lang="ts">
  import type { Asset, Entry, RichTextContent } from 'contentful'


  export interface ArticleDocument {
    title: string
    id: string
    description?: RichTextContent
    tags: string[]
    image: Asset
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

  import { getContext, onMount, setContext } from 'svelte'
  import Content from './Content.svelte'
  import Document from './document/Document.svelte'
  import type { Lien } from './Link.svelte'
  import Link from './Link.svelte'
  import Picture from './Picture.svelte'
  import Tags from './Tags.svelte'

	export let article: Entry<ArticleDocument>
  export let color: string
</script>



{#key article.fields.id}
<section style="--decoration-color: {vars.colors[color]}; --header-color: {{
    'pink': vars.colors.white,
    'green': vars.colors.white,
    'blue': vars.colors.black,
    'cyan': vars.colors.black
  }[color]}">
  <header class="{grid({ columns: 2 })}" style="background: {{
    'pink': vars.colors.coral,
    'green': vars.colors.yellow,
    'blue': vars.colors.marin,
    'cyan': vars.colors.moss
  }[color]}; color: {{
    'pink': vars.colors.black,
    'green': vars.colors.black,
    'blue': vars.colors.white,
    'cyan': vars.colors.white
  }[color]}">
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
    <div style={article.fields.description && "grid-column-start: 1; grid-row-start: 3"}>
      <Tags tags={article.fields.tags} />
    </div>
    {/if}

    {#if article.fields.contributors}
    <div class="{grid({ columns: 2, gap: 'tight' })} {col({ span: 2 })}">
      <h3 class="{col({ span: 2 })}">Contributors</h3>
      {#each article.fields.contributors as contributor}
      <div class="contributor {box({ padding: 'tight' })} {grid({ columns: 2, gap: 'tight' })}">
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
</section>
{/key}

<style>
  header {
    margin: calc(-2vw - 1px) calc(-2vw - 1px) 2vw;
    padding: 2vw;
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
  }

  .contributor a {
    position: absolute;
    bottom: 0.5rem;
    text-decoration-color: var(--decoration-color);
  }
</style>