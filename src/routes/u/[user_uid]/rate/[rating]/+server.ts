import { error, redirect } from "@sveltejs/kit";

export const GET = async ({ params, locals: { supabase, getSession } }) => {
  const rating_str = params.rating;
  if (Number.isNaN(parseFloat(rating_str))) throw error(422, { message: "nan" });
  const rating = parseInt(rating_str);
  if (rating > 5 || rating < 0) throw error(422, { message: "out-of-bounds" });

  const user = (await getSession())?.user;
  if (!user) throw error(401, { message: "Unauthorized" });

  const rated_user_uid = params.user_uid;
  if (rated_user_uid === user.id) throw error(401, { message: "not-allowed" });

  const {
    data: [{ uid: user_uid }],
  } = await supabase.from("profiles").select("uid").eq("uid", rated_user_uid);
  if (user_uid !== rated_user_uid) throw error(404, { message: "user-not-found" });

  try {
    const { status, statusText: status_text } = await supabase
      .from("ratings")
      .upsert({ rated: rated_user_uid, rater: user.id, value: rating });
    console.log(status === 201 ? "Successfuly rated" : status_text);
  } catch (e) {
    console.warn(e);
    throw error(500, { message: "internal-error" });
  }

  return new Response();
};
