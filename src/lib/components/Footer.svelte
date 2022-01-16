<script lang="ts">
  import type { Entry } from 'contentful'
  import type { Lien } from './Link.svelte'
  import Link from './Link.svelte'
  import { getContext } from 'svelte'

  import { col, grid } from '$lib/styles/grid.css'
  import { box } from '$lib/styles/box.css'
  import { slideIn } from '$lib/animations'

  const { secondary, social, tertiary } = getContext<{ secondary: Entry<{ links: Entry<Lien>[] }>, social: Entry<{ links: Entry<Lien>[] }>, tertiary: Entry<{ links: Entry<Lien>[] }> }>('navigation')
</script>

<footer use:slideIn class="{box({ color: 'grey' })}">
  <h5 class="logo">Canada<br>Media Fund</h5>

  <div class="{grid({ columns: 4 })}">
    <nav class="{col({ span: 3, align: 'top' })} {grid({ columns: 3 })}">
      {#each secondary.fields.links as link}
      <Link {link} />
      {/each}
    </nav>
    <div>
      <h5>Connect with us</h5>
      <nav class="social">
        {#each social.fields.links as link}
        <Link {link} />
        {/each}
      </nav>
      <br>
      <br>
      <br>
      <nav class="{grid({ columns: 1 })}">
        {#each tertiary.fields.links as link}
        <Link {link} />
        {/each}
        <small>© 2021 Canada Media Fund all right reserved</small>
      </nav>
    </div>
  </div>
</footer>

<style>
  footer {
    margin-top: 5rem;
  }
  
  footer nav :global(a) {
    text-decoration: none;
  }

  footer nav:not(.social) :global(a) {
    position: relative;
    margin-right: 2em;
  }

  footer nav.social :global(a) {
    margin-right: 0.66em;
  }

  footer nav:not(.social) :global(a:after) {
    content: "→";
    position: absolute;
    right: 0;
  }

  h5.logo {
    margin-bottom: 5rem;
  }

  h5:not(.logo) {
    font-size: 1rem;
    margin-bottom: 1.5em;
  }

  @media (max-width: 888px) {
    h5:not(.logo) {
      margin-top: 3rem;
    }
  }
</style>