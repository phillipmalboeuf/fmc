import { contentful, entries } from '$lib/clients/contentful'
import type { RequestHandler } from '@sveltejs/kit'
import type { Entry } from 'contentful'
import json from 'json-complete'

// @ts-ignore
export const get: RequestHandler = async ({ params, locals }) => {
  const locale = params.locale
	const [articles, pages] = await Promise.all([
    entries('article', locale, { 'fields.id': params.article }, locals.host === 'fmc-preview.votre.best'),
    entries('page', locale, { 'fields.id': params.page }, locals.host === 'fmc-preview.votre.best')
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