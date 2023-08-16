'use client';
import { useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';

export default function NewPage() {
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const router = useRouter()

  async function addPost({ title, description }) {
    const res = await fetch('http://localhost:3000/api/blog', {
      method: 'POST',
      body: JSON.stringify({ title, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await res.json();
  }

  async function submitHandler(e) {
    e.preventDefault();
    toast.loading('Loading ...')
    if (titleRef.current && titleRef.current) {
      await addPost({
        title: titleRef.current.value,
        description: descriptionRef.current.value,
      });
      router.push('/')
    }
  }

  return (
    <div className="w-full m-auto flex my-4">
    <ToastContainer position="bottom-center" limit={1}/>
      <div className="flex flex-col justify-center items-center m-auto">
        <p className="text-2xl text-slate-200 font-bold p-3">Add Blog 🚀</p>
        <form onSubmit={submitHandler} className="flex flex-col">
          <input
            type="text"
            placeholder="Enter Title"
            className="rounded-md px-4 py-2 my-2"
            ref={titleRef}
          />
          <textarea
            placeholder="Enter Description"
            className="rounded-md px-4 py-2 my-2"
            ref={descriptionRef}
          ></textarea>
          <button
            className="font-bold rounded-md px-4 py-1 my-2 bg-slate-200"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
