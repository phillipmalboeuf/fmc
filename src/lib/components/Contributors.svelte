<script lang="ts">
  import { page } from '$app/stores'
  import { box } from '$lib/styles/box.css'

  import { col, grid } from '$lib/styles/grid.css'
  
  import type { Asset, Entry } from 'contentful'
  import Picture from './Picture.svelte'
  import { slideIn } from '$lib/animations'


  export let contributors: Entry<{
    title: string
    id: string
    job: string
    description?: string
    contactLink?: string
    image: Asset
  }>[]
</script>

<div use:slideIn class="contributors {grid({ columns: 2, gap: 'horizontal' })} {col({ span: 2 })}">
  <h3 class="{col({ span: 2 })}">{$page.params.locale === 'fr' ? contributors.length === 1 ? 'Contributeur' : 'Contributeur·trices' : contributors.length === 1 ? 'Contributor' : 'Contributors'}</h3>
  {#each contributors as contributor}
  <div class="contributor {box({ padding: 'tight' })} {grid({ columns: 2, gap: 'horizontal' })}">
    <figure class="">
      <Picture media={contributor.fields.image} small ar={1} />
    </figure>

    <div>
      {#if contributor.fields.job}<p>{contributor.fields.job}</p>{/if}
      <h3>{contributor.fields.title}</h3>
      {#if contributor.fields.description}<p>{contributor.fields.description}</p>{/if}

      {#if contributor.fields.contactLink}
      <a href={contributor.fields.contactLink} target="_blank" rel="external">{$page.params.locale === 'fr' ? 'À propos' : 'About'} →</a>
      {/if}
    </div>
  </div>
  {/each}
</div>

<style>
  .contributors {
    margin-top: 2rem;
  }

  .contributor {
    overflow: hidden;
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
    /* color: var(--color); */
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
    .contributor {
      display: block;
    }

    figure {
      padding: 0;
    }

    .contributor figure {
      height: 22vh;
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