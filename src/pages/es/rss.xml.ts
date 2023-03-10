import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE } from "@config";
import slugify from "@utils/slugify";
import i18next, { t, changeLanguage } from "i18next";
import { localizePath } from "astro-i18next";

changeLanguage("es");

export async function get() {
  const posts = await getCollection(
    "blog",
    ({ id, data }) => id.startsWith(`${i18next.language}/`) && !data.draft
  );
  return rss({
    title: SITE.title,
    description: SITE.desc,
    site: SITE.website,
    items: posts.map(({ data }) => ({
      link: localizePath(`/posts/${slugify(data)}`, i18next.language),
      title: data.title,
      description: data.description,
      pubDate: new Date(data.published),
    })),
  });
}
