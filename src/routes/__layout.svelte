<script context="module" lang="ts">
  import { respond } from '$lib/responses'

  export async function load({ page, fetch, session, context }) {
		return respond(fetch, `/layout.json`, page.params.locale)
	}
</script>

<script lang="ts">
  import type { Entry } from 'contentful'
  import type { Lien } from '$lib/components/Link.svelte'
  import { setContext } from 'svelte'

  export let main: Entry<{ links: Entry<Lien>[] }>
  export let secondary: Entry<{ links: Entry<Lien>[] }>
  export let social: Entry<{ links: Entry<Lien>[] }>
  export let tertiary: Entry<{ links: Entry<Lien>[] }>
  setContext('navigation', {
    main, secondary, social, tertiary
  })
</script>

<main>
  <slot {main}></slot>
</main>