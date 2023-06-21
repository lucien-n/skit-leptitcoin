import { error } from '@sveltejs/kit';

export const load = async ({ params, locals: { getSession, roles, getRole } }) => {
    const user = (await getSession())?.user
    if (!user) throw error(401, { message: "Unauthorized" })

    const userRole = await getRole(user.id)
    if (userRole < roles.ADMIN) throw error(401, { message: 'Unauthorized' })
};