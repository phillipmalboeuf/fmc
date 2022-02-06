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
  import { createCurve, createColumns, csvToChartData, createPyramide, createTarte, csvToMatrix } from '$lib/charts'
  
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

  const { fields: { title, description, type, alignment, data, min, max, axeTitle, stacked } } = entry

  let arrow: boolean

  const dataSource = type === 'Table' ? csvToMatrix(data) : csvToChartData(data)

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
    if (element) {
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
    }
  })

  onDestroy(() => {
    observer?.disconnect()
    root?.dispose()
  })
</script>

<section class="{grid({ columns: 2 })}">
  {#if title}<h3 use:slideIn>{title}</h3>{/if}
  {#if description}<aside use:slideIn><Document body={description} /></aside>{/if}
  {#if type !== 'Table'}
  <figure class:arrow use:slideIn class="{col({ span: 2 })}" bind:this={element}></figure>
  {:else}
  <figure class="table {col({ span: 2 })}">
    <div>
      <table use:slideIn>
        {#each dataSource as row, ri}
        <tr class:highlight={row[1] === ""}>
          {#each row as col, ci}
          {#if ri === 0 || ci === 0}
          <th>{col}</th>
          {:else}
          <td>{col}</td>
          {/if}
          {/each}
        </tr>
        {/each}
      </table>
    </div>
  </figure>
  {/if}
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

  figure.table {
    padding-bottom: 0;
  }

  figure.arrow:after,
  figure.table:after {
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
      width: 85vw;
    }
  }

  figure.table > div {
    width: 100%;
    overflow-x: scroll;
  }

  table {
    border-collapse: collapse;
    width: 200%;
  }

  tr.highlight {
    background-color: var(--color);
  }

  th {
    width: 10rem;
    text-align: left;
  }

  th, td {
    padding: 0.5em;
    border-top: 1px solid;
    border-bottom: 1px solid;
  }
</style>