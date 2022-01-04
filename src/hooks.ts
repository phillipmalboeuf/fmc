/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ request, resolve }) {

	const response = await resolve(request)

	return {
		...response,
		headers: {
			...response.headers,
			'Link': '</fonts/Trim-Regular.otf>; rel="preload"; as="font"; type="font/opentype"; crossorigin="anonymous",</fonts/TrimPoster-Lean.otf>; rel="preload"; as="font"; type="font/opentype"; crossorigin="anonymous"',
			'Cache-Control': 's-maxage=1, stale-while-revalidate'
		}
	};
}