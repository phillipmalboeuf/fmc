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
  import BackIcon from './BackIcon.svelte'
import { types } from '$lib/formatters';

	export let article: Entry<ArticleDocument>
  export let onBack: svelte.JSX.MouseEventHandler<HTMLAnchorElement>

  let url: string

  onMount(() => {
    url = `https://fmc.votre.best${window.location.pathname}`
  })
</script>

<nav class="{pills()} {col({ span: 2 })}">
  <div class="{pill({ corner: 'thick' })}">
    <h4 on:click={() => !!navigator.share && navigator.share({
      url,
      text: `${article.fields.title} – ${types(article.fields.type, $page.params.locales)}`
    })}>{$page.params.locale === 'fr' ? 'Partager' : 'Share'}</h4>

    <hr>
    
    <ul>
      <li><a href="mailto:?subject={article.fields.title}&body={url}" target="_blank">Email</a></li>
      <li><a href="https://www.facebook.com/sharer.php?u={url}" target="_blank">Facebook</a></li>
      <li><a href="https://www.linkedin.com/sharing/share-offsite/?url={url}&title={article.fields.title}" target="_blank">LinkedIn</a></li>
      <li><a href="https://twitter.com/intent/tweet?url={url}&text={`${article.fields.title} – ${types(article.fields.type, $page.params.locales)}`}" target="_blank">Twitter</a></li>
      <!-- <li class="url">
        <label for="url">URL</label>
        <input type='url' id="url" readonly on:click={e => e.currentTarget.setSelectionRange(0, e.currentTarget.value.length)} 
          value={url} />
      </li> -->
    </ul>
  </div>

  <button class="{pill({ corner: 'thick', clickable: true })}" on:click={() => window.print()}><h4>{$page.params.locale === 'fr' ? 'IMPRIMER' : 'PRINT'}&nbsp;&nbsp;&nbsp;&nbsp;↓</h4></button>

  <a class="back" href="{($page.params.locale === 'fr' ? "/fr" : "")}/{$page.params.page}" on:click={onBack}><h4>{$page.params.locale === 'fr' ? 'RETOUR' : 'BACK'}&nbsp;&nbsp;<BackIcon /></h4></a>
</nav>

<style>
  nav {
    /* position: -webkit-sticky;
    position: sticky;
    top: 0; */
    
    color: var(--back-text-color);
    background-color: var(--back-color);
    margin-bottom: 2rem;
    /* border-radius: 12px; */

    /* padding: max(1vw, 1vh); */
    /* z-index: 10; */
    /* margin: calc((max(2vw, 2vh) * -1)) calc((max(2vw, 2vh) * -1)) 1vw;
    width: calc(100% + (max(2vw, 2vh) * 2)); */
  }

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

  div:hover {
    color: var(--text-color);
    background-color: var(--color);
  }

  div:hover a:hover,
  div:hover a:focus {
    color: var(--text-color);
    text-decoration: underline;
  }

  hr {
    border: none;
    height: 3.66em;
    width: 1px;
    background-color: currentColor;
    margin: -2em 0.5em;
  }

  @media (max-width: 888px) {
    hr,
    ul {
      display: none;
    }

    button {
      display: none;
    }
  }

  a {
    text-decoration: none;
  }

  a.back:hover,
  a.back:focus {
    text-decoration: underline;
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

  button:hover,
  button:focus {
    background-color: var(--color);
  }
</style>