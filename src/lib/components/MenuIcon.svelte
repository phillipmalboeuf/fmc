<script lang="ts">
  export let open: boolean
</script>

<style>
  svg {
    width: 2rem;
    margin-bottom: -0.2rem;
  }

  svg.open {
    width: 1.5rem;
    margin-top: -0.75rem;
    margin-bottom: -0.75rem;
  }

    line {
      fill: currentColor;
    }
</style>

{#if open}
<svg class:open xmlns="http://www.w3.org/2000/svg" width="38.891" height="38.891" viewBox="0 0 38.891 38.891">
  <line x2="53" transform="translate(0.707 0.707) rotate(45)" fill="none" stroke="#0e0e0e" stroke-width="2"/>
  <line x2="53" transform="translate(38.184 0.707) rotate(135)" fill="none" stroke="#0e0e0e" stroke-width="2"/>
</svg>
{:else}
<svg class:open xmlns="http://www.w3.org/2000/svg" width="53" height="15" viewBox="0 0 53 15">
  <line x2="53" transform="translate(0 1)" fill="none" stroke="#0e0e0e" stroke-width="2"/>
  <line x2="53" transform="translate(0 14)" fill="none" stroke="#0e0e0e" stroke-width="2"/>
</svg>
{/if}