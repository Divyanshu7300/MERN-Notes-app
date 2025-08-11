import { Edit2Icon, Trash2Icon } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import api from '../lib/axios';
import toast from 'react-hot-toast';

  const NoteCard = ({ note,setNotes }) => {
     const handleDelete = async (e,id) => {

     e.preventDefault();//get rid of navigation behavier
     if(!window.confirm("are you want to delete for sure"))return;
     
     try{ 
      await api.delete(`/notes/${id}`);
      setNotes((prev)=>prev.filter((note)=>note._id!==id))
      toast.success("note deleted successfully")

     }catch(error) {
      console.log("error while deleting");
      toast.error("failed to Delete node");

     }
    };  

  return (
    <Link
      to={`/note/${note._id}`}
      className="block p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
    >
      <h2 className="text-xl font-semibold mb-2">{note.title}</h2>
      <p className="text-gray-700 mb-4">
        {note.content.slice(0, 100)}...
      </p>
      <span className="text-sm text-gray-500">
        Created on: {new Date(note.createdAt).toLocaleDateString()}
      </span>
      <div className="mt-2 flex gap-2">
        <button onClick={(e) => {handleDelete(e,note._id)}} >
          <Trash2Icon />
        </button>
        <button >
          <Edit2Icon />
        </button>
      </div>
    </Link>
  );
};

export default NoteCard;
