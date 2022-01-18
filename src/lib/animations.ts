import { browser } from '$app/env'

let observer: IntersectionObserver

function init() {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(node => {
        node.target.classList.toggle('observed', node.isIntersecting)
        // console.log(node.isIntersecting, node.target)
      })
    },
    {
      rootMargin: '50px'
    }
  )
}

export function slideIn(node: HTMLElement) {
  if (browser) {
    if (!observer) { init() }
    
    node.classList.add('slideIn')
    observer.observe(node)

    return {
      destroy() {
        observer.unobserve(node)
      }
    }
  }
}


