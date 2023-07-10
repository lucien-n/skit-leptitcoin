import { createClient } from '@supabase/supabase-js';
import type { SupaListing } from './types/supa_listing';
import type { SupaUser } from './types/supa_user';

export const supabase = createClient(
	'https://zcxdsoyihrxxudqdnvwu.supabase.co',
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpjeGRzb3lpaHJ4eHVkcWRudnd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY1MDE1MjksImV4cCI6MjAwMjA3NzUyOX0.MkivgwBMLXu1kMDDGTOeDjHPtIFT3J2XyZG89libt8k'
);

export async function getListings(limit = 10, offset = 0, match: any = { is_validated: true }) {
	try {
		const supa_listings: SupaListing[] = [];
		const { data: listings } = await supabase
			.from('listings')
			.select('*')
			.range(offset, limit)
			.match(match)
			.order('created_at');

		if (!listings) return supa_listings;

		return await parseListings(listings);
	} catch (e) {
		console.warn(e);
	}
}
export async function getUserListings(user_uid: string, limit = 10) {
	try {
		const user_listings: SupaListing[] = [];

		const { data: listings } = await supabase
			.from('listings')
			.select('*')
			.eq('author_uid', user_uid)
			.limit(limit);

		if (!listings) return user_listings;

		return await parseListings(listings);
	} catch (e) {
		console.warn(e);
	}
}

export async function getListing(listing_uid: string): Promise<SupaListing | undefined> {
	try {
		const {
			data: [listing]
		} = await supabase.from('listings').select('*').eq('uid', listing_uid);
		if (!listing) return;

		const parsed_listing = await parseListing(listing);

		return parsed_listing;
	} catch (e) {
		console.warn(e);
	}
	return;
}

export async function getSupaUser(user_uid: string) {
	try {
		const {
			data: [user]
		} = await supabase.from('profiles').select('*').eq('uid', user_uid);
		if (!user) return null;

		const parsed_user = await parseSupaUser(user);

		return parsed_user;
	} catch (e) {
		console.warn(e);
	}
}

export async function getSupaUsers(match?: { limit?: number }) {
	try {
		const { data: users } = await supabase
			.from('profiles')
			.select('*')
			.match(match || {});
		return await parseSupaUsers(users);
	} catch (e) {
		console.warn(e);
	}
}

async function likeListing(listing_uid: string, user_uid: string) {
	try {
		await supabase.from('likes').insert({ user_uid: user_uid, listing_uid: listing_uid });
	} catch (e) {
		console.warn(e);
	}
}

async function dislikeListing(listing_uid: string, user_uid: string) {
	try {
		await supabase.from('likes').delete().match({ user_uid: user_uid, listing_uid: listing_uid });
	} catch (e) {
		console.warn(e);
	}
}

export async function isListingLikedByUser(listing_uid: string, user_uid: string) {
	try {
		const { data: res } = await supabase
			.from('likes')
			.select('id')
			.match({ user_uid: user_uid, listing_uid: listing_uid });
		return res?.length !== 0;
	} catch (e) {
		console.warn(e);
	}
}

export async function toggleListingLike(listing_uid: string, user_uid: string) {
	try {
		if (await isListingLikedByUser(listing_uid, user_uid))
			await dislikeListing(listing_uid, user_uid);
		else await likeListing(listing_uid, user_uid);
	} catch (e) {
		console.warn(e);
	}
}

async function parseListing(listing_data): Promise<SupaListing> {
	const author = await getSupaUser(listing_data.author_uid);
	const parsedListing = {
		uid: listing_data.uid,
		author_uid: listing_data.author_uid,
		title: listing_data.title,
		description: listing_data.description,
		price: listing_data.price,
		category: listing_data.category,
		picture: listing_data.picture,
		condition: listing_data.condition,
		createdAt: new Date(listing_data.created_at),
		author:
			author ||
			({
				username: 'unknown',
				uid: 'unknown',
				rating: 0.0,
				rating_count: 0,
				picture: 'unknown',
				createdAt: new Date().getTime(),
				role: -1
			} satisfies SupaUser),
		isValidated: listing_data.is_validated,
		validatedBy: listing_data.validated_by,
		validatedAt: listing_data.validated_at
	} satisfies SupaListing;
	return parsedListing;
}

async function parseListings(listings) {
	const parsed_listings: SupaListing[] = [];
	await Promise.all(
		listings?.map(async (listing) => {
			const parsed_listing = await parseListing(listing);
			parsed_listings.push(parsed_listing);
		})
	);
	return parsed_listings;
}

async function parseSupaUser(user_data) {
	return {
		uid: user_data.uid,
		username: user_data.username,
		picture: user_data.picture,
		rating: user_data.rating,
		rating_count: user_data.rating_count,
		createdAt: user_data.created_at,
		role: user_data.role
	} satisfies SupaUser;
}

async function parseSupaUsers(users) {
	const parsed_supa_users: SupaUser[] = [];
	await Promise.all(
		users?.map(async (user) => {
			const parsed_supa_user = await parseSupaUser(user);
			parsed_supa_users.push(parsed_supa_user);
		})
	);
	return parsed_supa_users;
}
