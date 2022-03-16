<script context="module" lang="ts">
  import type { Asset, Entry, RichTextContent } from 'contentful'

  export interface ChartDocument {
    title?: string
    id?: string
    description?: RichTextContent
    data?: string
    type?: string
    alignment?: string
    stacked?: boolean
    min?: number
    max?: number
    axeTitle?: string
    tableColumnSpan?: number
  }

</script>

<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import { page } from '$app/stores'

  import { col, grid } from '$lib/styles/grid.css'
  import { slideIn } from '$lib/animations'
  import { csvToChartData, csvToMatrix } from '$lib/formatters'
  
  import { color, Color, Root } from '@amcharts/amcharts5'
  import type { Exporting } from '@amcharts/amcharts5/plugins/exporting'
  
  import Document from './document/Document.svelte'
  import Icon from './Icon.svelte'
  
  let root: Root
  let element: HTMLElement
  let observer: IntersectionObserver
  let container: HTMLElement


  export let entry: Entry<ChartDocument>
  export let noMargin = false
  let exporting: Exporting

  const { fields: { title, description, type, alignment, data, min, max, axeTitle, stacked, tableColumnSpan } } = entry

  let arrow: boolean

  const dataSource = (type === 'Table' || type === 'Icons' || type === 'Labels')
    ? csvToMatrix(data)
    : csvToChartData(data)
  

  onMount(async () => {
    const { createCurve, createColumns, createPyramide, createTarte } = await import('$lib/charts')
    const { Exporting } = await import('@amcharts/amcharts5/plugins/exporting')

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

        // exporting = Exporting.new(root, {
        //   filePrefix: entry.fields.id,
        //   dataSource
        // })
      }
    }

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

<section class:noMargin>
  <div class="{grid({ columns: 2 })}" bind:this={container}>
  {#if title}<h3 use:slideIn>{title}</h3>{/if}
  {#if description}<aside use:slideIn><Document body={description} /></aside>{/if}
  {#if type === 'Table'}
  <figure class:wide={dataSource[0].length > 4} class="table {col({ span: 2 })}">
    <div>
      <table use:slideIn>
        {#each dataSource as row, ri}
        <tr class:highlight={row[1] === ""}>
          {#each row as col, ci}
          {#if ri === 0 || ci === 0}
          {#if tableColumnSpan}
          {#if ci === 0}
          <th>{col.replace(' (%', '\n(%')}</th>
          {:else}
          {#if col !== ''}
          <th class="bordered" colspan={tableColumnSpan}>{col.replace(' (%', '\n(%')}</th>
          {/if}
          {/if}
          {:else}
          <th>{col.replace(' (%', '\n(%')}</th>
          {/if}
          {:else}
          <td class="{tableColumnSpan ? ci % tableColumnSpan  === 0 ? 'bordered' : '' : ''}">{col}</td>
          {/if}
          {/each}
        </tr>
        {/each}
      </table>
    </div>
  </figure>
  {:else if type === 'Icons'}
  <figure class="icons {col({ span: 2 })} {grid({ columns: 3 })}">
    {#each dataSource as row, ri}
    {#if ri > 0}
    <table class="icon_table" use:slideIn>
      <tr>
        <th colspan="2">{row[0]} <Icon title={row[0]} /></th>
      </tr>
      {#each row as col, ci}
      {#if ci > 0}
      <tr style="background-color: {Color.interpolate((row.length - ci) / (row.length - 1), color('#044554'), color('#2BFFF5'))};">
        <td>{dataSource[0][ci]}</td>
        <td>{col}</td>
      </tr>
      {/if}
      {/each}
    </table>
    {/if}
    {/each}
  </figure>
  {:else if type === 'Labels'}
  <figure class="icons {col({ span: 2 })} {grid({ columns: 3, center: true })}">
    {#each dataSource as row, ri}
    {#if ri > 0}
    <center use:slideIn>
      <p>{row[0]}<br>
      {#each row.filter((r, i) => i).map(r => axeTitle ? r+axeTitle : r) as t, index}
      {#if index > 0}&nbsp;|&nbsp;{/if}<strong style="color: {Color.interpolate((row.length - index - 1) / (row.length), color('#044554'), color('#2BFFF5'))};">{t}</strong>
      {/each}
      </p>
    </center>
    {:else}
    <center use:slideIn class="{col({ span: 3 })}">
      {#each row.filter((r, i) => i).map(r => r.replace(' (%, rounded)','').replace(' (%, arrondis)','')) as t, index}
      {#if index > 0}&nbsp;|&nbsp;{/if}<strong style="color: {Color.interpolate((row.length - index - 1) / (row.length), color('#044554'), color('#2BFFF5'))};">{t}</strong>
      {/each}
    </center>
    {/if}
    {/each}
  </figure>
  {:else}
  <figure class:pie={type === 'Pie'} use:slideIn class="{col({ span: 2 })}" bind:this={element}></figure>
  {/if}
  </div>

  {#if container}
  <button on:click={async () => {
    const { saveAs } = await import('file-saver')
    const { toPng } = await import('html-to-image')
    container.classList.add('export')
    const blob = await toPng(container, { cacheBust: true, backgroundColor: '#F6F7F6', skipFonts: false, skipAutoScale: false })
    container.classList.remove('export')
    saveAs(blob, (entry.fields.id || 'chart')+'.png')
  }}>Export&nbsp;&nbsp;↓</button>
  {/if}
</section>

<style>
  section {
    position: relative;
    margin: 5rem 0 6rem;
  }

  section.noMargin {
    margin: 0;
  }

  aside {
    margin-top: 0.5rem;
  }

  aside :global(small) {
    font-size: 0.75em;
    vertical-align: top;
  }

  figure {
    position: relative;
    width: 100%;
    padding-bottom: 42%;
  }

  figure.table,
  figure.icons {
    padding-bottom: 0;
  }

  figure.arrow:after,
  figure.table.wide:after {
    pointer-events: none;

    content: "→";
    font-family: "Trim";
    height: 100%;
    width: 6rem;
    background: linear-gradient(90deg, rgba(246,247,246,0) 0%, rgba(246,247,246,1) 100%);

    position: absolute;
    top: 0;
    right: 0;

    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: 2rem;
  }

  section:not(.noMargin) button {
    position: absolute;
    top: calc(100% + 1rem);
    right: 0;
    border: none;
    background: transparent;
  }

  @media (max-width: 888px) {
    figure {
      padding-bottom: 100%;
      /* width: 85vw; */
    }

    figure.pie {
      padding-bottom: 166%;
    }

    figure.table,
    figure.icons {
      padding-bottom: 0;
    }

    figure.icons {
      grid-template-columns: 1fr 1fr;
    }
  }

  figure.table.wide {
    width: 100%;
    overflow-x: scroll;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  figure.wide table {
    width: 200%;
  }

  .export {
    padding: 1rem;
  }

  .export figure.table.wide {
    width: auto;
    overflow-x: visible;
  }

  .export figure.table.wide table {
    width: 100%;
  }

  .export figure.table.wide:after {
    display: none;
  }

  tr.highlight {
    background-color: var(--color);
  }

  th {
    width: 10rem;
    text-align: left;
  }

  th, td {
    padding: 0.5rem;
    border-top: 1px solid;
    border-bottom: 1px solid;
    white-space: pre-line;
  }

  th.bordered, td.bordered {
    border-right: 1px solid;
  }

  table.icon_table {
    width: 100%;
    border-radius: 12px;
    overflow: hidden;
    background: white;
  }

  table.icon_table th {
    font-size: 1.25rem;
    font-weight: normal;
  }

  table.icon_table th,
  table.icon_table td {
    border: none;
    padding: 1rem 1rem 1.5rem;
  }

  table.icon_table td:last-child {
    font-size: 1.25rem;
  }
</style>