import { contentful, entry } from '$lib/clients/contentful'
import json from 'json-complete'

export async function get({ params, locals }) {
  const locale = params.locale

	const [main, secondary, social, tertiary] = await Promise.all([
    entry('2C42A1G6poQpna4Wo0qEuD', locale, {}, locals.host === 'fmc-preview.votre.best'),
    entry('1oX2uJXyevxUOzI8xmWs6t', locale, {}, locals.host === 'fmc-preview.votre.best'),
    entry('7xy8VBmh8QIsAEUCx5dLwY', locale, {}, locals.host === 'fmc-preview.votre.best'),
    entry('woj0aFds7opmrHX42nKZ6', locale, {}, locals.host === 'fmc-preview.votre.best')
  ])


  return {
    body: json.encode({
      main,
      secondary,
      social,
      tertiary
    })
  }
}