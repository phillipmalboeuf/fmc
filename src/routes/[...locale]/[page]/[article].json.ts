import { contentful, entries } from '$lib/clients/contentful'
import type { RequestHandler } from '@sveltejs/kit'
import type { Entry } from 'contentful'
import json from 'json-complete'

// @ts-ignore
export const get: RequestHandler = async ({ params, locals }) => {
  const locale = params.locale
	const [articles, pages] = await Promise.all([
    entries('article', locale, { 'fields.id': params.article }),
    entries('page', locale, { 'fields.id': params.page })
  ])

  if (articles.items.length) {
    return {
      body: json.encode({
        article: articles.items[0],
        page: pages.items[0]
      })
    }
  }
}