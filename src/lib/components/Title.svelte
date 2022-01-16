<script lang="ts">
  import { col, grid } from '$lib/styles/grid.css'
  import { box } from '$lib/styles/box.css'
  import { slideIn } from '$lib/animations'

  export let title: string
</script>

<center use:slideIn class="{col({span: 2})} {box()} title"><h2>{title}</h2></center>

<style>
  .title {
    color: var(--text-color);
    background-color: var(--color);
  }

  .title h2 {
    margin-bottom: 0;
  }
</style>