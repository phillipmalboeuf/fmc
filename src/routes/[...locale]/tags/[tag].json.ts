import { contentful, entries } from '$lib/clients/contentful'
import type { RequestHandler } from '@sveltejs/kit'
import type { Entry } from 'contentful'
import json from 'json-complete'

// @ts-ignore
export const get: RequestHandler = async ({ params }) => {
  const locale = params.locale
	const [articles, articlesByType, pages] = await Promise.all([
    entries<{ id: string }>('article', locale, { 'fields.tags': params.tag }, 3),
    entries<{ id: string }>('article', locale, { 'fields.type': params.tag }, 3),
    entries<{
      articles: Entry<{
        id: string
      }>[]
    }>('page', locale)
  ])

  if (articles.items.length || articlesByType.items.length) {
    return {
      body: json.encode({
        tag: params.tag,
        articles: (articles.items.length ? articles.items : articlesByType.items).map(article => ({
          article,
          page: pages.items.find(page => page.fields.articles?.find(a => a.fields.id === article.fields.id))
        }))
      })
    }
  }
}