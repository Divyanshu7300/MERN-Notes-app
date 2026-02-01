import { ZapIcon } from 'lucide-react';

const RateLimitedUI = () => {
  return (
    <div className="max-w-3xl mx-auto py-12 px-6">
      <div className="border border-gray-200 rounded-lg p-6 bg-white">

        <div className="flex items-start gap-4">
          <ZapIcon className="w-6 h-6 text-gray-500 mt-1" />

          <div>
            <h3 className="text-sm font-medium text-black">
              Too many requests
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              You’ve made too many requests in a short period of time.
            </p>

            <p className="text-sm text-gray-500 mt-2">
              Please wait a moment and try again.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default RateLimitedUI;
