import { contentful, entries } from '$lib/clients/contentful'
import type { RequestHandler } from '@sveltejs/kit'
import type { Entry } from 'contentful'
import json from 'json-complete'

// @ts-ignore
export const get: RequestHandler = async ({ params }) => {
  const locale = params.locale
  const tags = await entries<{ id: string }>('tag', locale, { 'fields.id': params.tag })
  if (tags.items.length) {
    const [articles, pages] = await Promise.all([
      entries<{ id: string }>('article', locale, { 'fields.tagsList.sys.id': tags.items[0].sys.id }, 5),
      entries<{
        articles: Entry<{
          id: string
        }>[]
      }>('page', locale)
    ])

    if (articles.items.length) {
      return {
        body: json.encode({
          tag: tags.items[0],
          articles: articles.items.filter(article => article.fields).map(article => ({
            article,
            page: pages.items.find(page => page.fields.articles?.filter(a => a.fields).find(a => a.fields.id === article.fields.id))
          }))
        })
      }
    }
  }
}