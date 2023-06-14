export type SupaListing = {
    uid: string,
    author_uid: string,
    title: string,
    description: string,
    price: number,
    images?: string[],
    category: string,
}