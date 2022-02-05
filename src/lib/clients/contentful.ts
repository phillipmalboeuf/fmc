import { createClient } from 'contentful'

const preview = false

export const contentful = createClient({
  space: 'qmgotqwz3wgy',
  accessToken: preview ? 'oyU9lo5e7eX94FJYQupNQ9WPB5VAEXVYHal3xE4O6UA' : 'ErM-EnlSlznXnztNn_NRnMN0YejzhQSDRzHtDANKjpA',
  host: preview ? 'preview.contentful.com' : undefined
})

const limit = 12

export async function entry<T>(id: string, locale: string, query: {[key: string]: any}={}, include=2) {
  return (await contentful.getEntry<T>(id, { include, locale: {'fr': 'fr-CA'}[locale], ...query }))
}

export async function entries<T>(content_type: string, locale: string, query: {[key: string]: any}={}, include=2, page=0) {
  return await contentful.getEntries<T>({ content_type, include, locale: {'fr': 'fr-CA'}[locale], ...query, limit, skip: limit*page })
}