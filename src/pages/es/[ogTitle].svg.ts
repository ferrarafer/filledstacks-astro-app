import { getCollection } from "astro:content";
import generateOgImage from "@utils/generateOgImage";
import type { APIRoute } from "astro";
import i18next, { changeLanguage } from "i18next";

changeLanguage("es");

export const get: APIRoute = async ({ params }) => ({
  body: await generateOgImage(params.ogTitle),
});

const postImportResult = await getCollection(
  "blog",
  ({ id, data }) => id.startsWith(`${i18next.language}/`) && !data.draft
);
const posts = Object.values(postImportResult);

export function getStaticPaths() {
  return posts
    .filter(({ data }) => !data.ogImage)
    .map(({ data }) => ({
      params: { ogTitle: data.title },
    }));
}
