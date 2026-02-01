import { Link } from 'react-router-dom';
import { PlusIcon } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Brand */}
        <Link
          to="/"
          className="text-lg font-semibold tracking-tight text-black"
        >
          ThinkBoard
        </Link>

        {/* Action */}
        <Link
          to="/create"
          className="inline-flex items-center gap-2
                     px-3 py-2 text-sm font-medium
                     bg-black text-white hover:bg-gray-900"
        >
          <PlusIcon size={16} />
          New note
        </Link>

      </div>
    </header>
  );
};

export default Navbar;
