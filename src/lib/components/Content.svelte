<script lang="ts">
  import type { Asset, Entry } from 'contentful'

  import Document from './document/Document.svelte'
  import Expander from './Expander.svelte'
  import PageArticles from './PageArticles.svelte'
  import PageIntro from './PageIntro.svelte'
  import Text from './Text.svelte'
  import Columns from './Columns.svelte'
  import Chart from './Chart.svelte'
  import Media from './Media.svelte'
  import Picture from './Picture.svelte'
  import Slider from './Slider.svelte'

  import { box } from '$lib/styles/box.css'
  import { vars } from '$lib/styles/styles.css'
  import { backs, texts } from '$lib/formatters'
  import { page } from '$app/stores'
  import { slideIn } from '$lib/animations'
  import NewsletterForm from './NewsletterForm.svelte'
  
  import { onMount } from 'svelte'

  export let content: Entry<any>[]
  export let path: string = undefined
  export let color: string = undefined
  export let media: Asset = undefined
  export let index: boolean = false
  export let landing: boolean = false

  let hero: HTMLDivElement
  let scrollY: number = 0

  onMount(() => {
    // if (color && hero && window.innerWidth > 888) {
    //   const observer = new IntersectionObserver(
    //     (entries) => {
    //       entries.forEach(node => {
    //         document.body.classList.toggle(`hero--${texts(backs(color))}`, node.isIntersecting)
    //       })
    //     },
    //     {
    //       rootMargin: '-49%'
    //     }
    //   )

    //   observer.observe(hero)

    //   return () => {
    //     observer.disconnect()
    //   }
    // }
  })
</script>

<svelte:window bind:scrollY />

{#if content}
{#each content as entry, i}
{#if !landing && media && i === 0}
<figure style="background-color: {vars.colors[backs(color)]}; transform: translate3d(0, -{scrollY*1.1}px, 0)">
  <Picture {media} eager />
</figure>

<div bind:this={hero} class:hero={!!media && i === 0} id={entry.fields.id} style={`padding-bottom: ${media.fields.file.details.image.height / media.fields.file.details.image.width * 90}%; --back: ${vars.colors[backs(color)]}; --text: ${vars.colors[texts(backs(color))]}`}>

  <div>
    {#if entry.sys.contentType.sys.id === 'text'}
    <Text {entry} {color} />
    {:else if entry.sys.contentType.sys.id === 'columns'}
    <Columns {entry} color={index ? color : undefined} />
    {:else if entry.sys.contentType.sys.id === 'media'}
    <Media {entry} />
    {:else if entry.sys.contentType.sys.id === 'chart'}
    <Chart {entry} />
    {:else if entry.sys.contentType.sys.id === 'newsletterForm'}
    <NewsletterForm {entry} {color} />
    {:else if entry.sys.contentType.sys.id === 'slider'}
    <Slider {entry} {color} />
    {/if}
  </div>
</div>
{:else}
<div id={entry.fields.id}>
  <div>
    {#if entry.sys.contentType.sys.id === 'page'}
    <Expander closeButtons expanded={path === `/${entry.fields.id}`} onOpen={() => path = `/${entry.fields.id}`} color={entry.fields.color.toLowerCase()} href="{($page.params.locale === 'fr' ? "/fr" : "")}/{entry.fields.id}">
      <span slot="label">{entry.fields.title}</span>

      <PageIntro page={entry} />

      <svelte:self content={entry.fields.content} />

      {#if entry.fields.articles}
      <PageArticles articles={entry.fields.articles.map(article => ({ article, page: entry }))} />
      {/if}
    </Expander>
    {:else if entry.sys.contentType.sys.id === 'subSection'}
    <Expander arrows {color}>
      <span slot="label">{entry.fields.title}</span>

      <svelte:self content={entry.fields.content} />
    </Expander>
    {:else if entry.sys.contentType.sys.id === 'text'}
    <Text {entry} {color} />
    {:else if entry.sys.contentType.sys.id === 'columns'}
    <Columns {entry} color={index ? color : undefined} />
    {:else if entry.sys.contentType.sys.id === 'media'}
    <Media {entry} />
    {:else if entry.sys.contentType.sys.id === 'chart'}
    <Chart {entry} />
    {:else if entry.sys.contentType.sys.id === 'newsletterForm'}
    <NewsletterForm {entry} {color} {landing} />
    {:else if entry.sys.contentType.sys.id === 'slider'}
    <Slider {entry} {color} />
    {/if}
  </div>
</div>
{/if}
{/each}
{/if}

<style>
  figure {
    position: fixed;
    top: -20vw;
    left: 0;
    z-index: 0;
    width: 100vw;
    z-index: 0;
    /* padding-top: 20vh; */
    background-color: var(--back);
  }

  .hero {
    position: relative;
    padding: 8rem 0 2vw 0;
    /* margin-left: -10vw; */
    
    /* margin: -2vw 0 2rem calc(-8rem - 21vw);
    padding: 9.5rem 20vw 2vw calc(8rem + 21vw); */
    /* width: 100vw; */

    color: var(--text);
    /* background-color: var(--back); */
  }

  @media print {
    .hero {
      padding-right: 8rem;
    }
  }

  .hero > div {
    position: relative;
    z-index: 1;
  }

  @media (max-width: 888px) {
    .hero {
      padding: 0 0 2vh;
      margin-left: 0;
    }

    figure {
      top: 0;
      height: 110vh;
      overflow-x: hidden;
    }

    figure :global(img) {
      position: absolute;
      top: 0;
      left: 0;
      width: 160% !important;
      max-width: 160% !important;
    }

    span {
      /* font-size: 2rem; */
    }
  }

  @media print {
    figure {
      display: none;
    }
  }
</style>