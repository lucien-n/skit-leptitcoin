export type ListingProp = {
    id: string,
    author_id: string,
    author_name?: string,
    category: string,
    title: string,
    description?: string,
    images?: string[],
    price: number,
    created_at: number
}