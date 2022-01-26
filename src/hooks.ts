/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ request, resolve }) {

	request.locals.host = request.headers.host
	const response = await resolve(request)

	return {
		...response,
		headers: {
			...response.headers,
			'Link': '</fonts/Trim-Regular.otf>; rel="preload"; as="font"; type="font/otf"; crossorigin="anonymous",</fonts/TrimPoster-Lean.otf>; rel="preload"; as="font"; type="font/otf"; crossorigin="anonymous"',
			'Cache-Control': 's-maxage=1, stale-while-revalidate'
		}
	};
}