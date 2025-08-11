import React, { useState, useEffect } from 'react';
import RateLimitedUI from '../components/RateLimitedUI';
import Navbar from '../components/Navbar';
import axios from 'axios';
import toast from 'react-hot-toast';
import NoteCard from '../components/NoteCard';
import api from '../lib/axios.js';
import NoNotFound from '../components/NoNotFound.jsx';

const Homepage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        console.log(res.data);
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.error(error);
        console.log("Error fetching notes");
        if (error.response && error.response.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Error fetching notes");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className='min-h-screen bg-base-200'>
      <div className='max-w-7xl mx-auto p-4 mt-6'>
        <h1 className='text-4xl font-bold text-primary mb-4 text-center'>Divyanshu's Notes</h1>

        {isRateLimited && <RateLimitedUI />}

        {loading && (
          <div className='text-center text-primary py-10'>Loading notes...</div>
        )}
        {notes.length > 0 && !isRateLimited && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {notes.map((note) => (
              <NoteCard key={note.id} note={note} setNotes={setNotes}/>
            
            ))}
          </div>
        )}
        {notes.length === 0 && !loading && !isRateLimited && <NoNotFound/>}
      </div>
    </div>
  );
};

export default Homepage;
