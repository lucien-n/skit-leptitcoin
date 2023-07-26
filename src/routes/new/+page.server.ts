import { error, fail, type Actions } from '@sveltejs/kit';
import { v4 as uuid } from 'uuid';

export const actions: Actions = {
	new: async ({ request, locals: { supabase, getSession } }) => {
		const session = await getSession();
		if (!session) throw error(401, { message: 'Unauthorized' });

		const form_data = await request.formData();

		const author_uid = session.user.id;
		const title = form_data.get('title')?.toString() || '';
		const description = form_data.get('description')?.toString() || '';
		const price = parseFloat(form_data.get('price')?.toString() || '0');
		const category = form_data.get('category')?.toString() || 'misc';
		const picture = form_data.get('picture');
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

		if (!picture) {
			return fail(400, {
				...entries,
				message: 'Picture required',
				subject: 'picture'
			});
		}

		console.log(picture);

		// Uploading picture
		const listing_uuid = uuid();
		try {
			const { data, error } = await supabase.storage
				.from('listing_pictures')
				.upload(`${author_uid}/${listing_uuid}`, picture as File);
			console.log(data);
			if (error)
				return fail(400, {
					...entries,
					message: error.message,
					subject: ''
				});
		} catch (e) {
			console.warn(e);
		}

		// // Inserting listing
		// const listing = {
		// 	uid: listing_uuid,
		// 	author_uid: author_uid,
		// 	title: title,
		// 	description: description,
		// 	price: price,
		// 	category: category,
		// 	picture: picture,
		// 	condition: condition
		// } as SupaListing;

		// try {
		// 	const { error } = await supabase.from('listings').insert(listing);
		// 	if (error)
		// 		return fail(400, {
		// 			...entries,
		// 			message: error.message,
		// 			subject: ''
		// 		});
		// } catch (e) {
		// 	console.error(e);
		// }

		// throw redirect(303, '/new/success');
	}
};
