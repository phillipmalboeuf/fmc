<script context="module" lang="ts">
  export interface Lien {
    title: string
    path: string
    external: boolean
    // sousLiens: Entry<Lien>[]
  }
</script>

<script lang="ts">
  import { page } from '$app/stores'
  import type { Entry } from 'contentful'
  // import I from './icons/I.svelte'
  
  export let link: Entry<Lien>
  export let arrow = false
</script>

<a href={((!link.fields.external && $page.params.locale === 'fr') ? "/fr" : "") + link.fields.path} target={link.fields.external && '_blank'} rel={link.fields.external && "external"} on:click>{link.fields.title}{link.fields.external && arrow ? ' ↗' : ''}</a>
