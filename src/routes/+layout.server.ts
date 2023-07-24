import { pagesVisitedStore } from '$lib/store.js';

export const load = async ({ locals: { getSession }, url: { href } }) => {
	pagesVisitedStore.update((pages) => {
		console.log(pages)
		return [...pages, href]
	})
	return {
		session: await getSession()
	};
};
