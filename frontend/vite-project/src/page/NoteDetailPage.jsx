import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeftIcon, LoaderIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../lib/axios';

const NoteDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [state, setState] = useState('loading'); // loading | ready
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setTitle(res.data.title);
        setContent(res.data.content);
        setState('ready');
      } catch (err) {
        toast.error('Failed to load note');
        navigate('/');
      }
    };

    loadNote();
  }, [id, navigate]);

  if (state === 'loading') {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <LoaderIcon className="animate-spin text-gray-400" />
      </main>
    );
  }

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
          <h1 className="text-2xl font-semibold">Edit note</h1>
          <p className="text-sm text-gray-500 mt-1">
            Update your thoughts.
          </p>
        </header>

        {/* Form */}
        <form onSubmit={async (e) => {
          e.preventDefault();
          setSaving(true);

          try {
            await api.put(`/notes/${id}`, { title, content });
            toast.success('Note updated');
            navigate('/');
          } catch {
            toast.error('Failed to save changes');
          } finally {
            setSaving(false);
          }
        }} className="space-y-6">

          <div>
            <label className="block text-sm font-medium mb-1">
              Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 text-sm
                         focus:outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Content
            </label>
            <textarea
              rows={6}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 text-sm
                         focus:outline-none focus:border-black resize-none"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center px-4 py-2 text-sm font-medium
                         bg-black text-white hover:bg-gray-900
                         disabled:opacity-50"
            >
              {saving ? 'Saving…' : 'Save changes'}
            </button>
          </div>

        </form>
      </section>
    </main>
  );
};

export default NoteDetailPage;
