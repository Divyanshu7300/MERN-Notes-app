
import { ZapIcon } from 'lucide-react';

const RateLimitedUI = () => {
  
  //useEffect is used to fetch data or perform side effects in functional components.
  
  return (
    <div className='max-w-6xl mx-auto px-4 py-8'>
      <div className='flex flex-col md:flex-row items-center p-6'>
        <div className='flex-shrink-0 bg-primary/20 p-4 rounded-full mb-4 md:mb-0 md:mr-6'>
          <ZapIcon className='size-10 text-primary' />
       
        </div >
        <div className='flex-1 text-color md:text-left'>
          <h3 className='text-xl font-bold mb-2'>Rate Limit Reached</h3>
          <p className='text-base-content mb-1'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, qui quidem dolor aspernatur veritatis natus culpa modi explicabo magnam maiores!

          </p>
          <p className='text-sm text-base=content/70'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, natus.</p>

        </div>

      </div>
      
    </div>
  )
}

export default RateLimitedUI