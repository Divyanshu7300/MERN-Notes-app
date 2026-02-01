import { ArrowLeftIcon } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../lib/axios';

const CreatePage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post('/notes', { title, content });
      toast.success('Note created');
      navigate('/');
    } catch (err) {
      if (err?.response?.status === 429) {
        toast.error('Too many requests. Try again later.');
      } else {
        toast.error('Failed to create note');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white text-black">
      <section className="max-w-3xl mx-auto px-6 py-12">

        {/* Back */}
        <Link
          to="/"
          className="inline-flex items-center text-sm text-gray-500 hover:text-black mb-8"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back
        </Link>

        {/* Header */}
        <header className="mb-8">
          <h1 className="text-2xl font-semibold">New note</h1>
          <p className="text-sm text-gray-500 mt-1">
            Write something worth keeping.
          </p>
        </header>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="block text-sm font-medium mb-1">
              Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Untitled"
              className="w-full border border-gray-300 px-3 py-2 text-sm
                         focus:outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Content
            </label>
            <textarea
              required
              rows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Start writing..."
              className="w-full border border-gray-300 px-3 py-2 text-sm
                         focus:outline-none focus:border-black resize-none"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center px-4 py-2 text-sm font-medium
                         bg-black text-white hover:bg-gray-900 disabled:opacity-50"
            >
              {loading ? 'Saving…' : 'Save note'}
            </button>
          </div>

        </form>
      </section>
    </main>
  );
};

export default CreatePage;
