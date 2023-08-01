import { getListing } from '$supa/supabase';

import { error, fail, redirect, type Actions } from '@sveltejs/kit';

export const load = async ({ locals: { supabase }, params }) => {
	const listing_uid = params.listing_uid;

	const listing = await getListing({ sb: supabase, match: { uid: listing_uid } });

	return {
		listing: listing
	};
};

export const actions: Actions = {
	edit: async ({ request, locals: { supabase, getSession }, fetch }) => {
		const session = await getSession();
		if (!session) throw error(401, { message: 'Unauthorized' });

		const form_data = await request.formData();

		const listing_uid = form_data.get('uid')?.toString() || '';
		const author_uid = session.user.id;
		const title = form_data.get('title')?.toString() || '';
		const description = form_data.get('description')?.toString() || '';
		const price = parseFloat(form_data.get('price')?.toString() || '0');
		const category = form_data.get('category')?.toString() || 'misc';
		const condition = parseInt(form_data.get('listing_condition')?.toString() || '2') || 2;

		const entries = {
			title,
			description,
			price,
			category,
			condition
		};

		if (!listing_uid) {
			return fail(400, {
				...entries,
				message: 'An error occured',
				subject: ''
			});
		}

		if (title.length < 3 || title.length > 80) {
			return fail(400, {
				...entries,
				message: 'Invalid title',
				subject: 'title'
			});
		}

		if (description.length < 3 || description.length > 512) {
			return fail(400, {
				...entries,
				message: `Description length must be ${
					description.length < 3
						? 'greater than 3'
						: description.length > 512
						? 'lesser than 512'
						: ''
				}`,
				subject: 'description'
			});
		}

		if (price <= 0) {
			return fail(400, {
				...entries,
				message: 'Price must be greater than zero',
				subject: 'price'
			});
		}

		const listing = {
			uid: listing_uid,
			author_uid: author_uid,
			title: title,
			description: description,
			price: price,
			category: category,
			condition: condition,
			validated_by: null,
			validated_at: null,
			is_validated: false
		} as SupaListing;

		try {
			const { status, statusText } = await fetch('/api/listing/update', {
				method: 'PUT',
				body: JSON.stringify(listing),
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				}
			});
			if (status !== 200)
				return fail(400, {
					...entries,
					message: 'An error occured',
					subject: ''
				});
			else console.log(status, statusText);
		} catch (e) {
			console.warn(e);
		}

		throw redirect(303, '/edit/success');
	}
};
