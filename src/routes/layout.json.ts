import { contentful, entry } from '$lib/clients/contentful'
import json from 'json-complete'

export async function get({ params }) {
  const locale = params.locale

	const [main] = await Promise.all([
    entry('2C42A1G6poQpna4Wo0qEuD', locale)
  ])


  return {
    body: json.encode({
      main
    })
  }
}