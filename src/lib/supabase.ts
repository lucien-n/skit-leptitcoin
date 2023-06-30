import { createClient } from "@supabase/supabase-js";
import type { SupaListing } from "./types/supa_listing";
import type { SupaUser } from "./types/supa_user";

export const supabase = createClient(
	"https://zcxdsoyihrxxudqdnvwu.supabase.co",
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpjeGRzb3lpaHJ4eHVkcWRudnd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY1MDE1MjksImV4cCI6MjAwMjA3NzUyOX0.MkivgwBMLXu1kMDDGTOeDjHPtIFT3J2XyZG89libt8k",
);

export async function getListings(limit = 10, offset = 0) {
	try {
		const supaListings: SupaListing[] = [];
		const { data: listings } = await supabase
			.from("listings")
			.select("*")
			.range(offset, limit);

		if (!listings) return supaListings;

		return await parseListings(listings);
	} catch (e) {
		console.warn(e);
	}
}

export async function getUserListings(user_uid: string, limit = 10) {
	try {
		const userListings: SupaListing[] = [];

		const { data: listings } = await supabase
			.from("listings")
			.select("*")
			.eq("author_uid", user_uid)
			.limit(limit);

		if (!listings) return userListings;

		return await parseListings(listings);
	} catch (e) {
		console.warn(e);
	}
}

export async function getListing(listing_uid: string) {
	try {
		const { data: listings } = await supabase
			.from("listings")
			.select("*")
			.eq("uid", listing_uid)
			.limit(1);
		if (!listings) return;

		const listing = await parseListing(listings[0]);

		return listing;
	} catch (e) {
		console.warn(e);
	}
}

export async function getSupaUser(user_uid: string) {
	try {
		const { data: user } = await supabase
			.from("profiles")
			.select("*")
			.eq("uid", user_uid);
		if (!user) return null;
		return await parseUser(user[0]);
	} catch (e) {
		console.warn(e);
	}
}

async function likeListing(listing_uid: string, user_uid: string) {
	try {
		await supabase
			.from("likes")
			.insert({ user_uid: user_uid, listing_uid: listing_uid });
	} catch (e) {
		console.warn(e);
	}
}

async function dislikeListing(listing_uid: string, user_uid: string) {
	try {
		await supabase
			.from("likes")
			.delete()
			.match({ user_uid: user_uid, listing_uid: listing_uid });
	} catch (e) {
		console.warn(e);
	}
}

export async function isListingLikedByUser(
	listing_uid: string,
	user_uid: string,
) {
	try {
		const { data: res } = await supabase
			.from("likes")
			.select("id")
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

async function parseListing(listingData) {
	const author = await getSupaUser(listingData.author_uid);
	return {
		uid: listingData.uid,
		author_uid: listingData.author_uid,
		title: listingData.title,
		description: listingData.description,
		price: listingData.price,
		category: listingData.category,
		picture: listingData.picture,
		condition: listingData.condition,
		createdAt: listingData.created_at,
		author:
			author ||
			({
				username: "unknown",
				uid: "unknown",
				rating: 0.0,
				ratingCount: 0,
				picture: "unknown",
				createdAt: new Date().getTime(),
				role: -1,
			} satisfies SupaUser),
	} satisfies SupaListing;
}

async function parseListings(listings) {
	const parsedListings: SupaListing[] = [];
	await Promise.all(
		listings?.map(async (listing) => {
			const parsedListing = await parseListing(listing);
			parsedListings.push(parsedListing);
		}),
	);
	return parsedListings;
}

async function parseUser(userData) {
	return {
		uid: userData.uid,
		username: userData.username,
		picture: userData.picture,
		rating: userData.rating,
		ratingCount: userData.rating_count,
		createdAt: userData.created_at,
		role: userData.role,
	} satisfies SupaUser;
}
