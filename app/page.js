import Link from 'next/link';
import Header from './components/header';

async function getPosts() {
  const posts = await fetch('http://localhost:3000/api/blog', {
    next: { revalidate: 10 },
  });
  return posts.json();
}

export default async function Home() {
  const { posts } = await getPosts();
  return (
    <>
      <Header />
      <div className="flex justify-center">
        <Link className="bg-slate-200 p-2 px-10 rounded" href="/blog/new">
          Add new Blog 🚀
        </Link>
      </div>
      <div className="flex flex-col gap-4 items-center">
        {posts.map((post) => (
          <div
            key={post.id}
            className="flex flex-col bg-slate-200 rounded p-4 w-3/4 mt-2"
          >
            <div className='flex justify-between'>
              <h1>{post.title}</h1>
              <Link
                href={`/blog/edit/${post.id}`}
                className="bg-slate-700 text-white rounded-md py-1 px-2"
              >
                Edit
              </Link>
            </div>
            <h1 className='mb-2'>{new Date(post.date).toDateString()}</h1>
            <h1>{post.description}</h1>
          </div>
        ))}
      </div>
    </>
  );
}
