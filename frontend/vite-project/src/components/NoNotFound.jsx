import React from 'react';
import { Link } from 'react-router-dom'; // ✅ Corrected import
import { PlusIcon } from 'lucide-react'; // ✅ Import icon from lucide-react

const NoNotFound = () => {
  return (
    <div>
      <div className='text-black bg-green-200 h-20 from-neutral-900'>
        is it working
      </div>

      <Link to="/create" className='btn btn-primary'>
        <PlusIcon className='size-5' />
        <span>New Note</span>
      </Link>
    </div>
  );
};

export default NoNotFound;
