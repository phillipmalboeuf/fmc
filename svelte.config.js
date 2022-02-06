import node from '@sveltejs/adapter-node';
import vercel from '@sveltejs/adapter-vercel'
import preprocess from 'svelte-preprocess';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

export default {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: vercel(),

		vite: {
			optimizeDeps: {
				include: ['lodash.get', 'lodash.isequal', 'lodash.clonedeep']
			},
			plugins: [vanillaExtractPlugin()],
			...process.env.NODE_ENV !== 'development' && {
				ssr: {
					noExternal: ['contentful']
				}
			}
		}
	}
};
