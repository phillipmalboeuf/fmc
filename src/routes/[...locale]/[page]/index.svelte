<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit'
  import { respond } from '$lib/responses'
  
  export const load: Load = async ({ params, fetch, session, stuff }) => {
    if (params.page === 'fr' || params.page === 'en') { return }
		return respond(fetch, `/${params.page}/page.json`, params.locale)
	}
</script>

<script lang="ts">
  import type { Entry, EntryCollection } from 'contentful'
  import type { PageDocument } from '$lib/components/Page.svelte'
  import Page from '$lib/components/Page.svelte'

	export let page: Entry<PageDocument>
</script>

<Page {page} />