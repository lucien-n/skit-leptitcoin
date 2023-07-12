export type SupaUser = {
	uid: string;
	username: string;
	rating: number;
	rating_count: number;
	picture: string;
	createdAt: number;
	role: number;
};

export type SupaListing = {
	uid: string;
	author_uid: string;
	title: string;
	description: string;
	price: number;
	picture: string;
	category: string;
	condition: number;
	author?: SupaUser;
	createdAt?: Date;
	isValidated?: boolean;
	validatedAt?: number;
	validatedBy?: string;
};

export type Settings = {
	high_contrast: boolean;
};

export type SearchParams = {
	search?: string;
	category?: string;
	price_min?: number;
	price_max?: number;
};
