import { contentful, entries, entry } from '$lib/clients/contentful'
import type { RequestHandler } from '@sveltejs/kit'

export const get: RequestHandler = async ({ params, url }) => {
  const from = params.locale
  const to = url.searchParams.get('l')
  let path = url.searchParams.get('path')

  let href = ''

  if (to === 'fr') {
    href += '/fr'
  }

  if (from === 'fr') {
    path = path === '/fr' ? '/' : path.replace('/fr', '')
  }

  const [pages, altPages, articles, altArticles] = await Promise.all([
    entries<{ id: string }>('page', from, { select: 'fields.id'}, 1),
    entries<{ id: string }>('page', to, { select: 'fields.id'}, 1),
    entries<{ id: string }>('article', from, { select: 'fields.id'}, 1),
    entries<{ id: string }>('article', to, { select: 'fields.id'}, 1)
  ])

  pages.items.forEach((item, index) => path = path.replace(item.fields.id, altPages.items[index].fields.id))
  articles.items.forEach((item, index) => path = path.replace(item.fields.id, altArticles.items[index].fields.id))

  href += path

  return {
    body: {
      href
    }
  }
}