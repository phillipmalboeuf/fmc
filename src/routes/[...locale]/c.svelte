<script lang="ts">
  import { onMount } from 'svelte'
  import type { init, FieldExtensionSDK } from '@contentful/app-sdk'
  import Chart, { type ChartDocument } from '$lib/components/Chart.svelte'
  import type { Entry } from 'contentful'
  import type Handsontable from 'handsontable'

  import 'handsontable/dist/handsontable.full.css'

  // import { saveAs } from 'file-saver'
  // import { toSvg, toPng } from 'html-to-image'
  import { csvToMatrix, matrixToCSV, wait } from '$lib/formatters'
  import { btn } from '$lib/styles/button.css'

  let entry: Entry<ChartDocument> = { fields: {} } as any
  let sdk: FieldExtensionSDK

  let container: HTMLElement
  let table: HTMLElement
  let hot: Handsontable

  onMount(async () => {
    // @ts-ignore
    (window.contentfulApp.init as typeof init)<FieldExtensionSDK>(async (_sdk) => {
      sdk = _sdk

      Object.values(sdk.entry.fields).forEach(field => {
        // entry = {
        //   fields: {
        //     ...entry.fields,
        //     [field.id]: field.getValue(sdk.field.locale)
        //   }
        // } as any

        field.onValueChanged({
          title: sdk.field.locale,
          id: sdk.field.locale,
          description: sdk.field.locale,
          axeTitle: sdk.field.locale,
          data: sdk.field.locale,
        }[field.id], value => {
          entry = {
            fields: {
              ...entry.fields,
              [field.id]: value
            }
          } as any
        })
      })

      const Handsontable = await import('handsontable')

      hot = new Handsontable.default(table, {
        data: sdk.field.getValue() ? csvToMatrix(sdk.field.getValue()) : [['Category'], ['']],
        contextMenu: true,
        allowInsertRow: true,
        allowInsertColumn: true,
        width: "auto",
        height: "auto",
        licenseKey: 'non-commercial-and-evaluation',
        afterChange: async () => {
          const value = matrixToCSV(hot.getData())
          sdk.field.setValue(value)
          await wait(500)
          await sdk.entry.save()
        }
      })

      sdk.window.startAutoResizer()
    })
  })
</script>

<svelte:head>
  <meta name="viewport" content="width=1400, initial-scale=1" />
</svelte:head>

{@html '<script src="https://unpkg.com/@contentful/app-sdk@4"></script>'}

<div bind:this={table}></div>

{#key entry}
<div style="--color: #2BFFF5;" class="container" bind:this={container}>
  {#if entry && entry.fields.type && entry.fields.data}
  <Chart {entry} noMargin />
  {/if}
</div>
{/key}

<!-- <button on:click={async () => {
  const blob = await toPng(container, { cacheBust: true, backgroundColor: '#F6F7F6', skipAutoScale: false })
  saveAs(blob, (sdk.entry.fields.id.getValue() || 'chart')+'.png')
}} class="{btn({ hover: 'cyan' })}">Export</button> -->

<style>
  :global(main) {
    padding: 0 !important;
    min-height: 0 !important;
  }

  :global(body) {
    color: black !important;
    background: #F6F7F6 !important;
  }

  .container {
    padding: 2rem;
  }

  /* button {
    background: transparent;
    margin: 0 2rem 2rem;
  } */
</style>