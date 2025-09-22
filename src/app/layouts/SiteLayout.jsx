import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@/components/nav/Header';
import Footer from '@/components/nav/Footer';
import SkipToContent from '@/components/accessibility/SkipToContent';

const SiteLayout = () => {
  return (
    <div className='min-h-screen bg-black text-white'>
      <SkipToContent />
      <Header />
      <main id='content' className='flex-1 pt-20 md:pt-24'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default SiteLayout;
