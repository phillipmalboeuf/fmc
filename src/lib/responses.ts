import type { LoadInput } from '@sveltejs/kit';
import json from 'json-complete'

export async function respond(fetch: LoadInput['fetch'], url: string) {
  const res = await fetch(url)

  if (res.ok) {
    return {
      props: json.decode(await res.text())
    }
  }

  return {
    status: res.status,
    error: new Error(`Could not load ${url}`)
  }
}