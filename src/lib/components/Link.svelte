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
  export let active = false
  export let arrow = false
  export let external = false
</script>

{#if link.fields.path}
<a class:active href={((!link.fields.external && $page.params.locale === 'fr') ? "/fr" : "") + link.fields.path} target={link.fields.external && '_blank'} rel={(link.fields.external || external) && "external"} on:click>{link.fields.title}{link.fields.external && arrow ? ' ↗' : ''}</a>
{:else}
<small>{link.fields.title}</small>
{/if}