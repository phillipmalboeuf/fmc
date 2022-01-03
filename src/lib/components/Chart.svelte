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
    minimum: number
    maximum: number
    axeTitle: string
  }

</script>

<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import { page } from '$app/stores'

  import { col, grid } from '$lib/styles/grid.css'
  import { createCurve, createColumns, csvToChartData } from '$lib/charts'
  import type { Chart } from '@amcharts/amcharts5/.internal/core/render/Chart'
  import Document from './document/Document.svelte'
  // import { Exporting, ExportingMenu } from '@amcharts/amcharts5/plugins/exporting'


  let chart: Chart
  let element: HTMLElement
  let observer: IntersectionObserver

  // export let exporting: Exporting

  export let entry: Entry<ChartDocument>
  export let small: boolean = false

  const { fields: { title, description, type, alignment, data, minimum, maximum, axeTitle, stacked } } = entry

  const dataSource = csvToChartData(data)


  function createChart() {
    observer?.disconnect()

    switch (type) {
      case 'Columns':
        chart = createColumns(element, dataSource, alignment !== 'Horizontal', stacked, minimum, maximum, axeTitle, '#2BFFF5', '#044554', $page.params.locale)
        chart.appear(1000, 100)
        break

      case 'Curve':
        chart = createCurve(element, dataSource, alignment !== 'Horizontal', stacked, minimum, maximum, axeTitle, '#2BFFF5', '#044554', $page.params.locale)
        chart.appear(1000, 100)
        break
    
      default:
        break
    }

    // if (chart) {
    //   exporting = Exporting.new(chart._root, {
    //     filePrefix: id,
    //     dataSource
    //     // menu: ExportingMenu.new(chart._root, {})
    //   })
    // }
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
    chart?._root.dispose()
  })
</script>

<section class="{grid({ columns: 2 })}">
  {#if title}<h3>{title}</h3>{/if}
  {#if description}<aside><Document body={description} /></aside>{/if}
  <figure class:small class="{col({ span: 2 })}" bind:this={element}></figure>
</section>

<style>
  figure {
    width: 100%;
    padding-bottom: 42%;
    margin-bottom: 5rem;
  }
</style>