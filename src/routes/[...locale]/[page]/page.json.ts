import { contentful, entries } from '$lib/clients/contentful'
import type { RequestHandler } from '@sveltejs/kit'
import type { Entry } from 'contentful'
import json from 'json-complete'

// @ts-ignore
export const get: RequestHandler = async ({ params, locals }) => {
  const locale = params.locale
	const [pages] = await Promise.all([
    entries('page', locale, { 'fields.id': params.page }, locals.host === 'fmc-preview.votre.best', 4),
    // entries('theme', locale)
  ])

  if (pages.items.length) {
    return {
      body: json.encode({
        page: pages.items[0]
      })
    }
  }
}