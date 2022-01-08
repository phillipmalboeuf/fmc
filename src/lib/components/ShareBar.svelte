<script lang="ts">
  import type { Entry } from 'contentful'
  import type { ArticleDocument } from './Article.svelte'

  import { col, grid } from '$lib/styles/grid.css'
  import { box } from '$lib/styles/box.css'
  import { vars } from '$lib/styles/styles.css'
  import { pill, pills } from '$lib/styles/pill.css'

  import { getContext, onMount, setContext } from 'svelte'
  import type { Lien } from './Link.svelte'
  import { page } from '$app/stores'

	export let article: Entry<ArticleDocument>
  export let onBack: svelte.JSX.MouseEventHandler<HTMLAnchorElement>

  const url = `https://fmc.votre.best/articles/${article.fields.id}`
</script>

<nav class="{pills()} {col({ span: 2 })}">
  <div class="{pill({ corner: 'thick' })}">
    <h4>Share</h4>

    <hr>
    
    <ul>
      <li><a href="mailto:?subject={article.fields.title}&body={url}" target="_blank">Email</a></li>
      <li><a href="https://www.facebook.com/sharer.php?u={url}" target="_blank">Facebook</a></li>
      <li><a href="https://www.linkedin.com/shareArticle?url={url}&title={article.fields.title}" target="_blank">LinkedIn</a></li>
      <li><a href="https://twitter.com/intent/tweet?url={url}&text={`${article.fields.title} – ${article.fields.type}`}" target="_blank">Twitter</a></li>
      <!-- <li class="url">
        <label for="url">URL</label>
        <input type='url' id="url" readonly on:click={e => e.currentTarget.setSelectionRange(0, e.currentTarget.value.length)} 
          value={url} />
      </li> -->
    </ul>
  </div>

  <button class="{pill({ corner: 'thick', clickable: true })}" on:click={() => window.print()}><h4>PRINT ↓</h4></button>

  <a class="back" href="/{$page.params.page}" on:click={onBack}><h4>BACK ↩</h4></a>
</nav>

<style>
  h4 {
    margin-bottom: 0;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    gap: 0.5em;
  }

    li {
      text-transform: lowercase;
    }

  div {
    display: flex;
    align-items: center;
    gap: 0.5em;
    overflow: hidden;
    padding-left: 1em;
    padding-right: 1em;
  }

  hr {
    border: none;
    height: 3.66em;
    width: 1px;
    background-color: currentColor;
    margin: -2em 0.5em;
  }

  a {
    text-decoration: none;
  }

  a:hover,
  a:focus {
    color: var(--color);
  }

  a.back {
    flex: 1;
    text-align: right;
  }

  button {
    background: transparent;
    padding-left: 1em;
    padding-right: 1em;
  }
</style>