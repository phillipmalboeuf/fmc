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

<footer id="contact" use:slideIn class="{box({ color: 'grey' })}">
  <nav>
    <h2><Link link={secondary.fields.links[0]} /></h2>
  </nav>

  <div class="{grid({ columns: 5 })}">
    <nav class="{col({ align: 'bottom' })}">
      {#each secondary.fields.links as link, i}
      {#if i > 0}
      <Link {link} />
      {/if}
      {/each}
    </nav>

    <nav class="social {col({span:2})}">
      <strong>Connect with us</strong><br>
      {#each social.fields.links as link}
      <Link {link} />
      {/each}
    </nav>

    <nav class="tertiary {col({ span: 2, align: 'bottom' })}">
      {#each tertiary.fields.links as link}
      <Link {link} />
      {/each}
      <!-- <small>© 2021 Canada Media Fund all right reserved</small> -->
    </nav>
  </div>
</footer>

<style>
  footer {
    margin-top: 5rem;
    margin-bottom: 0;
  }
  
  footer :global(a),
  strong {
    display: inline-block;
    text-decoration: none;
    margin-right: 1em;
    font-size: 0.9em;
    margin-bottom: 0.5em;
  }


  strong {
    text-transform: uppercase;
    font-size: 1.1em;
  }

  footer nav :global(a:hover),
  footer nav :global(a:focus) {
    color: black;
  }

  footer nav:not(.social) :global(a:after) {
    content: " →";
    font-family: 'Trim';
    font-style: normal;
    font-weight: normal;
    /* font-size: 0.8em; */
    vertical-align: middle;
    margin-left: 0.5em;
  }

  .tertiary {
    text-align: right;
  }

  @media (max-width: 888px) {
    footer :global(a) {
      display: block;
    }

    footer nav :global(a:after) {
      content: " →";
      position: absolute;
      right: 1rem;
      font-size: 1rem;
    }

    .tertiary {
      text-align: center;
    }
    
    /* small {
      width: 100%;
      font-size: 0.8rem;
      text-align: center;
    } */
  }
</style>