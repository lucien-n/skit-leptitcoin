import type { SupaListing } from "$lib/types/supa_listing";
import { error, redirect, type Actions, fail } from "@sveltejs/kit";
import { v4 as uuid } from "uuid";

export const actions: Actions = {
  new: async ({ request, locals: { supabase, getSession } }) => {
    const session = await getSession();
    if (!session) throw error(401, { message: "Unauthorized" });

    const formData = await request.formData();

    const uid = uuid();
    const author_uid = session.user.id;
    const title = formData.get("title")?.toString() || "";
    const description = formData.get("description")?.toString() || "";
    const price = parseFloat(formData.get("price")?.toString() || "0");
    const category = formData.get("category")?.toString() || "misc";
    const picture = `https://placehold.co/300x200/black/white?text=${title.split(" ")[0]
      }`;
    const condition =
      parseInt(formData.get("listing_condition")?.toString() || "2") || 2;

    if (title.length < 3 || title.length > 80) {
      return fail(400, {
        title,
        description,
        price,
        category,
        picture,
        condition,
        message: "Invalid title",
        subject: "title",
      });
    }

    if (description.length < 3 || description.length > 512) {
      return fail(400, {
        title,
        description,
        price,
        category,
        picture,
        condition,
        message: `Description length must be ${description.length < 3
          ? "greater than 3"
          : description.length > 512
            ? "lesser than 512"
            : ""
          }`,
        subject: "description",
      });
    }

    if (price <= 0) {
      return fail(400, {
        title,
        description,
        price,
        category,
        picture,
        condition,
        message: "Price must be greater than zero",
        subject: "price",
      });
    }

    const listing = {
      uid: uid,
      author_uid: author_uid,
      title: title,
      description: description,
      price: price,
      category: category,
      picture: picture,
      condition: condition,
    } satisfies SupaListing;

    try {
      const { error } = await supabase.from("listings").insert(listing);
      if (error) return fail(400, { title, description, price, category, condition, picture, message: error.message, subject: '' })
    } catch (e) {
      console.error(e);
    }

    throw redirect(303, "/new/success");
  },
};
