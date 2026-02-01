import { Edit2Icon, Trash2Icon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../lib/axios';

const NoteCard = ({ note, setNotes }) => {
  const navigate = useNavigate();

  const handleDelete = async (e) => {
    e.stopPropagation();

    if (!confirm('Delete this note?')) return;

    try {
      await api.delete(`/notes/${note._id}`);
      setNotes(prev => prev.filter(n => n._id !== note._id));
      toast.success('Note deleted');
    } catch {
      toast.error('Failed to delete note');
    }
  };

  return (
    <div
      onClick={() => navigate(`/note/${note._id}`)}
      className="group cursor-pointer border border-gray-200 rounded-lg p-4
                 hover:border-gray-400 transition"
    >
      {/* Title */}
      <h2 className="text-sm font-medium text-black mb-1 line-clamp-1">
        {note.title || 'Untitled'}
      </h2>

      {/* Content */}
      <p className="text-sm text-gray-600 line-clamp-3 mb-3">
        {note.content}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-gray-400">
        <span>
          {new Date(note.createdAt).toLocaleDateString()}
        </span>

        <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition">
          <button
            onClick={handleDelete}
            className="hover:text-black"
            aria-label="Delete note"
          >
            <Trash2Icon size={14} />
          </button>

          <Link
            to={`/note/${note._id}`}
            onClick={(e) => e.stopPropagation()}
            className="hover:text-black"
            aria-label="Edit note"
          >
            <Edit2Icon size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
