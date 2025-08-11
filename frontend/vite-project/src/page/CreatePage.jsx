import { ArrowLeftIcon } from 'lucide-react';

import React, { useState } from 'react';
import toast from 'react-hot-toast';
import api from '../lib/axios.js';
import { Link, useNavigate } from 'react-router-dom';

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/notes", { title, content });
      toast.success("Note Created Successfully");
        navigate("/");
    } catch (error) {
      if (error.response.status==429) {
        console.error("Server responded with status:", error.response.status);
        console.error("Server error data:", error.response.data);
        toast.error("Slow down you are going way too fast",{duration:4000,icon:"💀"}

        );
      } else if (error.request) {
        console.error("Request made but no response received:", error.request);
        toast.error("No response from server");
      } else {
        console.error("Axios error:", error.message);
        toast.error("Error in uploading");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-200 to-green-500 flex items-center justify-center p-4">
      <div className="bg-white bg-opacity-80 rounded-2xl shadow-lg p-8 w-full max-w-lg">
        <Link to="/" className="flex items-center text-yellow-600 hover:text-yellow-800 mb-4">
          <ArrowLeftIcon className="size-5 mr-2" />
          <span className="font-semibold">Back to notes</span>
        </Link>

        <h2 className="text-2xl font-bold text-center text-green-800 mb-6">Create New Note</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Note Title"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">
              Note Content
            </label>
            <textarea
              required
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Content"
              rows={4}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md shadow-md transition duration-300"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePage;
