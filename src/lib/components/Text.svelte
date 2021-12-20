<script lang="ts">
  import type { Entry, RichTextContent } from 'contentful'
  // import type { Lien } from '../Link.svelte'
  import Document from './document/Document.svelte'
  // import Link from '../Link.svelte'
  // import Logo from '../icons/Logo.svelte'

  export let entry: Entry<{
    title: string
    id: string
    subtitle: string
    body: RichTextContent
  }>
</script>


<h4>{entry.fields.subtitle}</h4>
<h2>{entry.fields.title}</h2>
<Document body={entry.fields.body} />