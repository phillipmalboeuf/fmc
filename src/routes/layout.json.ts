import { contentful, entry } from '$lib/clients/contentful'
import json from 'json-complete'

export async function get({ params }) {
  const locale = params.locale

	const [main, secondary, social, tertiary] = await Promise.all([
    entry('2C42A1G6poQpna4Wo0qEuD', locale),
    entry('1oX2uJXyevxUOzI8xmWs6t', locale),
    entry('7xy8VBmh8QIsAEUCx5dLwY', locale),
    entry('woj0aFds7opmrHX42nKZ6', locale)
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