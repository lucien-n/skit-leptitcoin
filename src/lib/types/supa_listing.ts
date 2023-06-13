export type SupaListing = {
    id: string,
    author_uid: string,
    author_username: string,
    title: string,
    description: string,
    price: number,
    images?: string[],
    category: string,
    created_at: number,
}