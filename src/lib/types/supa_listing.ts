import type { SupaUser } from './supa_user';

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
	createdAt?: number;
	isValidated: boolean;
	validatedAt: number;
	validatedBy: string;
};
