import { pagesVisitedStore } from '$lib/store.js';

export const load = async ({ locals: { getSession }, url: { href } }) => {
	pagesVisitedStore.update((pages) => {
		if (pages.length > 15) pages.slice(0, 5);
		return [...pages, href];
	});
	return {
		session: await getSession()
	};
};
