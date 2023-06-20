import { error, redirect } from "@sveltejs/kit";

export const GET = async ({ params, locals: { supabase, getSession } }) => {
    const ratingStr = params.rating;
    if (Number.isNaN(parseFloat(ratingStr))) throw error(422, { message: 'nan' })
    const rating = parseInt(ratingStr)
    if (rating > 5 || rating < 0) throw error(422, { message: 'out-of-bounds' })

    const user = (await getSession())?.user
    if (!user)
        throw error(401, { message: 'Unauthorized' })

    const ratedUserUid = params.user_uid;
    const { data: [{ rating: userRating }] } = await supabase.from('profiles').select('rating').eq('uid', ratedUserUid)
    if (!userRating) throw error(404, { message: 'user-not-found' })


    console.log(rating)
    try {
        const res = await supabase.from('ratings').upsert({ rated: ratedUserUid, rater: user.id, value: rating })
        console.log(res)
    } catch (e) {
        console.warn(e)
        throw error(500, { message: 'internal-error' })
    }

    throw redirect(303, '/');
};