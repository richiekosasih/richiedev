import { Link } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className='min-h-screen bg-[#f4f2e8] px-4 py-20 text-black sm:px-6 md:px-10'>
      <div className='mx-auto flex min-h-[70vh] max-w-[1500px] flex-col justify-center'>
        <p className='font-mono text-xs uppercase text-black/45'>404</p>
        <h1 className='mt-4 font-display text-[clamp(6rem,24vw,22rem)] uppercase leading-[0.78] tracking-normal'>
          Page
          <span className='block'>not found</span>
        </h1>
        <p className='mt-6 max-w-xl text-xl leading-8 text-black/65'>
          The page you are looking for does not exist or has moved.
        </p>
        <div className='mt-8 flex flex-wrap gap-3'>
          <Link
            to='/'
            className='inline-flex items-center gap-2 border border-black px-4 py-3 font-mono text-xs uppercase transition-colors hover:bg-black hover:text-[#f4f2e8]'
          >
            <Home className='h-4 w-4' />
            Go home
          </Link>
          <button
            type='button'
            onClick={() => window.history.back()}
            className='inline-flex items-center gap-2 border border-black px-4 py-3 font-mono text-xs uppercase transition-colors hover:bg-black hover:text-[#f4f2e8]'
          >
            <ArrowLeft className='h-4 w-4' />
            Go back
          </button>
        </div>
      </div>
    </div>
  );
}
