export const load = async ({ locals: { getSession }, url: { href } }) => {
	return {
		session: await getSession()
	};
};
