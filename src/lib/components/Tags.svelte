<script context="module" lang="ts">
  import type { Asset, Entry, RichTextContent } from 'contentful'


  export interface TagDocument {
    title: string
    id: string
    description?: string
  }

</script>

<script lang="ts">
  import { page } from '$app/stores'
  import { pills, pill } from '$lib/styles/pill.css'
  export let tags: Entry<TagDocument>[]
</script>

<div class="{pills()}">
  {#each tags as tag}
  <a href="{$page.params.locale === 'fr' ? "/fr" : ""}/tags/{tag.fields.id}" class="{pill({ clickable: true })}">{tag.fields.title}</a>
  {/each}
</div>