'use client';
import { useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

async function getPostById(id) {
  const res = await fetch(`http://localhost:3000/api/blog/${id}`);
  const data = await res.json();
  return data.post;
}

async function editPost({ title, description, id }) {
  const res = await fetch(`http://localhost:3000/api/blog/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ title, description }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await res.json();
}

async function deletePost(id) {
  const res = await fetch(`http://localhost:3000/api/blog/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await res.json();
}

export default function EditPage({ params: { id } }) {
  const titleRef = useRef();
  const descriptionRef = useRef();
  const router = useRouter()

  useEffect(() => {
    getPostById(id)
      .then((data) => {
        titleRef.current.value = data.title;
        descriptionRef.current.value = data.description;
        toast.success('Fetching Complete');
      })
      .catch((err) => {
        console.log(err);
        toast.error('Error Fetching');
      });
  }, []);

  async function submitHandler(e) {
    e.preventDefault();
    toast.loading('Loading ...')
    if (titleRef.current && titleRef.current) {
      await editPost({
        title: titleRef.current.value,
        description: descriptionRef.current.value,
        id,
      });
      router.push('/')
    }
  }

  async function deleteHandler() {
    toast.loading('Loading ...')
    await deletePost(id);
    router.push('/')
  }

  return (
    <div className="flex flex-col items-center h-screen">
      <ToastContainer position="bottom-center" limit={1} />
      <p className="text-2xl text-slate-200 m-4 font-bold font-[verdana]">
        Edit Post
      </p>
      <form className="flex flex-col gap-3 w-1/3" onSubmit={submitHandler}>
        <input
          type="text"
          className="rounded-md bg-slate-100 p-2"
          placeholder="Enter title"
          ref={titleRef}
        />
        <textarea
          className="rounded-md bg-slate-100 p-2"
          placeholder="Enter description"
          ref={descriptionRef}
        ></textarea>
        <div className="flex justify-around ">
          <button type="submit" className="rounded-md bg-slate-200 px-4 py-2">
            Update
          </button>
          <button
            onClick={deleteHandler}
            className="rounded-md bg-red-500 px-4 py-2"
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
}
