import { contentful, entry } from '$lib/clients/contentful'
import json from 'json-complete'

export async function get({ params }) {
  const locale = params.locale

	const [page] = await Promise.all([
    entry('78kI7VnA9XhcSdo6nYACIV', locale, {}, 4)
  ])


  return {
    body: json.encode({
      page
    })
  }
}