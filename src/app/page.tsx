import Link from "next/link";
import { type SanityDocument } from "next-sanity";

import { client } from "../app/sanity/client";

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...23]{_id, title, slug, publishedAt}`;

const options = { next: { revalidate: 30 } };

export default async function IndexPage() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);

  return (
    <main className="">
      <h1 className="py-12 text-4xl font-bold outline outline-4 outline-gray-500 text-center text-purple-600 ">INVENTORY</h1>
     <br/><br/> <ul className="flex outline outline-8 outline-amber-800 flex-col gap-y-12 text-center">
        {posts.map((post) => (
          <li className="hover:underline " key={post._id}>
            <Link href={`/${post.slug.current}`}>
              <h2 className="text-xl p-8 font-semibold outline outline-8 outline-pink-950 text-pink-500 space-y-8">{post.title}</h2>
              <p className="p-4 outline outline-2 outline-amber-800 font-bold text-xs text-green-600">{new Date(post.publishedAt).toLocaleDateString()}</p><br/><hr/>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
