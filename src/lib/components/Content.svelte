<script lang="ts">
  import type { Entry } from 'contentful'
  import { onMount } from 'svelte'
import Text from './Text.svelte'

  export let content: Entry<any>[]
  let active: string
  let elements: {[key: string]: Element} = {}
  // let showMenu = false

  onMount(() => {
		const observer = new IntersectionObserver( 
			([e]) => {
        if (e.isIntersecting) {
          active = e.target.id
        }
      },
			{ threshold: 0, rootMargin: "-45%" }
		)

    Object.values(elements).reverse().forEach(element => observer?.observe(element))
    

    return () => observer.disconnect()
	})

  // function show(e: MouseEvent) {
  //   if (window.innerWidth < 888) {
  //     e.preventDefault()
  //     showMenu = true
  //   }
  // }

  // function hide(e: MouseEvent) {
  //   showMenu = false
  // }
</script>


<section>
  <nav>
    {#each content.filter(c => c.fields.id) as entry}
    <a href="#{entry.fields.id}" class:active={active === entry.fields.id}>{entry.fields.title}</a><br>
    {/each}

    <!-- {#if showMenu}
    <Tooltip visible light>
      <div class="submenu" slot="tool">
      {#each contenu.filter(c => c.fields.id) as entry}
      <a href="#{entry.fields.id}" on:click={hide}>{entry.fields.titre}</a>
      {/each}
      </div>
    </Tooltip>
    {/if} -->
  </nav>

  {#each content as entry}
  <div id={entry.fields.id} bind:this={elements[entry.fields.id]}>
  {#if entry.sys.contentType.sys.id === 'text'}
  <Text {entry} />
  {/if}
  </div>
  {/each}
</section>

<style>
  div {
    min-height: 55vh;
    /* padding-left: 33vw; */
    /* border: 1px solid; */
  }

  nav {
    position: sticky;
    top: 1vh;
  }

  a {
    display: inline-block;
    text-decoration: none;
  }

  a.active {
    border: 1px solid;
  }
</style>

