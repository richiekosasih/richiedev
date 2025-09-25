import React, { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import SiteLayout from './layouts/SiteLayout';
import { Skeleton } from '@/components/ui/Skeleton';

// Lazy load pages
const Home = lazy(() => import('@/pages/Home'));
const Projects = lazy(() => import('@/pages/Projects'));
const Contact = lazy(() => import('@/pages/Contact'));
const NotFound = lazy(() => import('@/pages/NotFound'));

// Loading fallback component
const PageLoader = () => (
  <div className='min-h-screen flex items-center justify-center'>
    <div className='w-full max-w-4xl mx-auto px-4 space-y-8'>
      <div className='text-center space-y-4'>
        <Skeleton className='h-12 w-64 mx-auto' />
        <Skeleton className='h-6 w-96 mx-auto' />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {[...Array(6)].map((_, i) => (
          <div key={i} className='space-y-4'>
            <Skeleton className='h-48 w-full' />
            <Skeleton className='h-4 w-3/4' />
            <Skeleton className='h-4 w-1/2' />
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <SiteLayout />,
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<PageLoader />}>
              <Home />
            </Suspense>
          ),
        },
        {
          path: 'projects',
          element: (
            <Suspense fallback={<PageLoader />}>
              <Projects />
            </Suspense>
          ),
        },
        {
          path: 'contact',
          element: (
            <Suspense fallback={<PageLoader />}>
              <Contact />
            </Suspense>
          ),
        },
        {
          path: '*',
          element: (
            <Suspense fallback={<PageLoader />}>
              <NotFound />
            </Suspense>
          ),
        },
      ],
    },
  ],
  {
    future: {
      v7_startTransition: true,
    },
  }
);
