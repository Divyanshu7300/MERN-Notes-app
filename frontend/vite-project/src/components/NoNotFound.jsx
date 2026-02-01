import { PlusIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const NoNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">

      <h3 className="text-sm font-medium text-black">
        No notes yet
      </h3>

      <p className="text-sm text-gray-500 mt-1">
        Create your first note to get started.
      </p>

      <Link
        to="/create"
        className="inline-flex items-center gap-2 mt-6
                   px-4 py-2 text-sm font-medium
                   bg-black text-white hover:bg-gray-900"
      >
        <PlusIcon size={16} />
        New note
      </Link>

    </div>
  );
};

export default NoNotFound;
