const isListingValid = (listing_data: any): any => {
	if (!(listing_data as SupaListing)) return [null, 'Invalid data'];

	const listing = listing_data as SupaListing;

	if (listing.title.length > 80) return [null, 'Title length is greater than 80'];
	if (listing.description.length > 320) return [null, 'Description length is greater than 80'];
	if (listing.price > 0 && listing.price <= 999999.99)
		return [null, 'Price must between 0.01 and 999999.99'];
	if (listing.category.length > 24) return [null, 'Invalid category'];
	if (listing.condition < 0 && listing.condition > 4) return [null, 'Invalid condition'];

	return [listing, null];
};

// ({is_valid, message}: {is_valid: boolean, message: string})
