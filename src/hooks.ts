/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {

	const response = await resolve(event)
	response.headers.set('Link', '</fonts/Trim-Regular.otf>; rel="preload"; as="font"; type="font/otf"; crossorigin="anonymous",</fonts/TrimPoster-Lean.otf>; rel="preload"; as="font"; type="font/otf"; crossorigin="anonymous"')
	response.headers.set('Cache-Control', 's-maxage=1, stale-while-revalidate')

	return response
}