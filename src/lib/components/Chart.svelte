<script context="module" lang="ts">
  import type { Asset, Entry, RichTextContent } from 'contentful'

  export interface ChartDocument {
    title: string
    id: string
    description: RichTextContent
    data: string
    type: string
    alignment: string
    stacked: boolean
    min: number
    max: number
    axeTitle: string
  }

</script>

<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import { page } from '$app/stores'

  import { col, grid } from '$lib/styles/grid.css'
  import { createCurve, createColumns, csvToChartData, createPyramide, createTarte } from '$lib/charts'
  
  import type { Root } from '@amcharts/amcharts5'
  import type { Chart } from '@amcharts/amcharts5/.internal/core/render/Chart'
  
  import Document from './document/Document.svelte'
  import { slideIn } from '$lib/animations'
  
  // import { Exporting, ExportingMenu } from '@amcharts/amcharts5/plugins/exporting'


  let root: Root
  let element: HTMLElement
  let observer: IntersectionObserver

  // export let exporting: Exporting

  export let entry: Entry<ChartDocument>
  export let small: boolean = false

  const { fields: { title, description, type, alignment, data, min, max, axeTitle, stacked } } = entry

  let arrow: boolean

  const dataSource = csvToChartData(data)


  function createChart() {
    observer?.disconnect()

    switch (type) {
      case 'Columns':
        root = createColumns(element, dataSource, alignment !== 'Horizontal', stacked, min, max, axeTitle, '#2BFFF5', '#044554', $page.params.locale)
        // chart.appear(1000, 100)
        break

      case 'Curve':
        root = createCurve(element, dataSource, alignment !== 'Horizontal', stacked, min, max, axeTitle, '#2BFFF5', '#044554', $page.params.locale)
        // chart.appear(1000, 100)
        break

      // case 'Big numbers':
      //   chart = createPyramide(element, dataSource, alignment !== 'Horizontal', stacked, min, max, axeTitle, '#2BFFF5', '#044554', $page.params.locale)
      //   chart.appear(1000, 100)
      //   break

      case 'Pie':
        root = createTarte(element, dataSource, alignment !== 'Horizontal', stacked, min, max, axeTitle, '#2BFFF5', '#044554', $page.params.locale)
        // chart.appear(1000, 100)
        break
    
      default:
        break
    }

    if (root) {
      if (alignment !== 'Horizontal' && window.innerWidth < 888) {
        arrow = true
      }
    }
  }
  

  onMount(() => {
    observer = new IntersectionObserver( 
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            createChart()
          }
        })
      },
      { threshold: [0] }
    )


    observer.observe(element)
  })

  onDestroy(() => {
    observer?.disconnect()
    root?.dispose()
  })
</script>

<section class="{grid({ columns: 2 })}">
  {#if title}<h3 use:slideIn>{title}</h3>{/if}
  {#if description}<aside use:slideIn><Document body={description} /></aside>{/if}
  <figure class:numbers={type === 'Big numbers'} class:arrow use:slideIn class:small class="{col({ span: 2 })}" bind:this={element}></figure>
</section>

<style>
  section {
    margin: 4rem 0 5rem;
  }

  figure {
    position: relative;
    width: 100%;
    padding-bottom: 42%;
  }

  figure.arrow:after {
    pointer-events: none;

    content: "→";
    font-family: "Trim";
    text-align: right;
    height: 100%;
    width: 6rem;
    background: linear-gradient(90deg, rgba(246,247,246,0) 0%, rgba(246,247,246,1) 100%);

    position: absolute;
    top: 0;
    right: 0;
  }

  @media (max-width: 888px) {
    figure {
      padding-bottom: 133%;
    }

    figure.numbers {
      padding-bottom: 88%;
    }
  }
</style>