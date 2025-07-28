import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '../lib/axios';
import toast from 'react-hot-toast';
import { LoaderIcon, ArrowLeftIcon } from 'lucide-react';

const NoteDetailPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setTitle(res.data.title);
        setContent(res.data.content);
      } catch (error) {
        toast.error("Failed to fetch the note");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put(`/notes/${id}`, { title, content });
      toast.success("Note updated successfully!");
      navigate('/'); // redirect to home or notes page
    } catch (error) {
      toast.error("Failed to update the note");
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoaderIcon className="animate-spin" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-200 to-green-500 flex items-center justify-center p-4">
      <div className="bg-white bg-opacity-80 rounded-2xl shadow-lg p-8 w-full max-w-lg">
        <Link to="/" className="flex items-center text-yellow-600 hover:text-yellow-800 mb-4">
          <ArrowLeftIcon className="size-5 mr-2" />
          <span className="font-semibold">Back to notes</span>
        </Link>

        <h2 className="text-2xl font-bold text-center text-green-800 mb-6">
          Edit Note
        </h2>

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
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NoteDetailPage;
