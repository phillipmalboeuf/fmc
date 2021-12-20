<script context="module">
	import { respond } from '$lib/responses'
	export async function load({ page, fetch, session, context }) {
		return respond(fetch, `/index.json`)
	}
</script>

<script lang="ts">
  import type { Entry } from 'contentful'
  import type { PageDocument } from '$lib/components/Page.svelte'
  import Page from '$lib/components/Page.svelte'

  import { btn } from '$lib/styles/button.css'

  export let page: Entry<any>
</script>

<Page {page} />
