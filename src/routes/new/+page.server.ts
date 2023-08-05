import { error, fail, redirect, type Actions } from '@sveltejs/kit';
import { v4 as uuid } from 'uuid';

export const actions: Actions = {
	new: async ({ request, locals: { supabase, getSession }, fetch }) => {
		const session = await getSession();
		if (!session) throw error(401, { message: 'Unauthorized' });

		const form_data = await request.formData();
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
				message: `Description length must be ${description.length < 3
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

		// Inserting listing
		const listing_uuid = uuid();

		const listing = {
			uid: listing_uuid,
			author_uid: author_uid,
			title: title,
			description: description,
			price: price,
			category: category,
			condition: condition
		} as SupaListing;

		try {
			const { status, statusText } = await fetch('/api/listing/create', {
				method: 'POST',
				body: JSON.stringify(listing),
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				}
			});
		} catch (e) {
			console.warn(e);
		}

		throw redirect(303, '/new/success');
	}
};
