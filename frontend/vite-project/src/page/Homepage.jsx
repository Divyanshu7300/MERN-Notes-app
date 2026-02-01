import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../lib/axios';

import NoteCard from '../components/NoteCard';
import RateLimitedUI from '../components/RateLimitedUI';
import NoNotFound from '../components/NoNotFound';

const Homepage = () => {
  const [state, setState] = useState('loading'); // loading | rate-limited | ready
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const res = await api.get('/notes');
        setNotes(res.data);
        setState('ready');
      } catch (err) {
        if (err?.response?.status === 429) {
          setState('rate-limited');
        } else {
          toast.error('Something went wrong');
          setState('ready');
        }
      }
    };

    loadNotes();
  }, []);

  return (
    <main className="min-h-screen bg-white text-black">
      <section className="max-w-6xl mx-auto px-6 py-12">

        {/* Header */}
        <header className="mb-10">
          <h1 className="text-3xl font-semibold tracking-tight">
            Notes
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            A simple place to keep your thoughts.
          </p>
        </header>

        {/* States */}
        {state === 'rate-limited' && <RateLimitedUI />}

        {state === 'loading' && (
          <div className="space-y-4">
            <div className="h-24 bg-gray-100 rounded" />
            <div className="h-24 bg-gray-100 rounded" />
            <div className="h-24 bg-gray-100 rounded" />
          </div>
        )}

        {state === 'ready' && notes.length === 0 && (
          <NoNotFound />
        )}

        {state === 'ready' && notes.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {notes.map(note => (
              <NoteCard
                key={note.id}
                note={note}
                setNotes={setNotes}
              />
            ))}
          </div>
        )}

      </section>
    </main>
  );
};

export default Homepage;
