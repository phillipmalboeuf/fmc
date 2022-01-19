<script context="module" lang="ts">
  import { respond } from '$lib/responses'
  import type { Load } from '@sveltejs/kit'

  export const load: Load = async ({ params, fetch, session }) => {
		return respond(fetch, `/layout.json`, params.locale)
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
  <slot {main} />
</main>