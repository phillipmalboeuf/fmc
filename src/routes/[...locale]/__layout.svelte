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
  import { page } from '$app/stores'

  export let main: Entry<{ links: Entry<Lien>[] }>
  export let secondary: Entry<{ links: Entry<Lien>[] }>
  export let social: Entry<{ links: Entry<Lien>[] }>
  export let tertiary: Entry<{ links: Entry<Lien>[] }>
  setContext('navigation', {
    main, secondary, social, tertiary
  })

  const ga = 'G-CGCHR59LH1'

  if (typeof window !== "undefined") {
		// @ts-ignore
		window.dataLayer = window.dataLayer || []
		// @ts-ignore
		window.gtag = function gtag() {
			// @ts-ignore
			window.dataLayer.push(arguments)
		}
		// @ts-ignore
		window.gtag("js", new Date())
		// @ts-ignore
		window.gtag("config", ga, { 'send_page_view': false })
	}
	$: {
		// @ts-ignore
		if (typeof gtag !== "undefined"){
			// @ts-ignore
			window.gtag("config", ga, {
				page_path: $page.url.pathname,
			})
		}
	}
</script>

<svelte:head>
  <script async src="https://www.googletagmanager.com/gtag/js?id={ga}"></script>
</svelte:head>

<main>
  <slot {main} />
</main>