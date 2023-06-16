export type SupaListing = {
    uid: string,
    author_uid: string,
    title: string,
    description: string,
    price: number,
    picture: string,
    category: string,
    author?: string
    created_at?: number
}