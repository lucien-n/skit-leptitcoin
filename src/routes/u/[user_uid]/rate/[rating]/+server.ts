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
    if (ratedUserUid === user.id) throw error(401, { message: "not-allowed" })

    const { data: [{ uid: userUid }] } = await supabase.from('profiles').select('uid').eq('uid', ratedUserUid)
    if (userUid !== ratedUserUid) throw error(404, { message: 'user-not-found' })

    try {
        await supabase.from('ratings').upsert({ rated: ratedUserUid, rater: user.id, value: rating })
    } catch (e) {
        console.warn(e)
        throw error(500, { message: 'internal-error' })
    }

    return new Response()
}