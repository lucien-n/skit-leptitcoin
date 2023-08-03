
export const GET = async ({
    params,
    locals: { supabase, getSession }
}) => {
    const listing_uid = params.listing_uid;
    if (!listing_uid) return new Response(null, { status: 422, statusText: 'Missing listing_uid' });

    const user_uid = (await getSession())?.user.id
    if (!user_uid) return new Response(null, { status: 401, statusText: 'Unauthorized' });

    try {
        const { error: err } = await supabase
            .from('likes')
            .delete()
            .match({
                user_uid,
                listing_uid
            })
        if (err) return new Response(null, { status: 400, statusText: JSON.stringify(err) });
        else return new Response(JSON.stringify(true), { status: 200, statusText: 'Success' });
    } catch (e) {
        console.warn(e);
        return new Response(null, { status: 500, statusText: 'Internal Server Error' });
    }
};
