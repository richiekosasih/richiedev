import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { fadeIn, slideUp } from '@/lib/motion';

const NotFound = () => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-900/20'>
      <Container>
        <motion.div
          initial='initial'
          animate='animate'
          className='text-center max-w-2xl mx-auto'
        >
          {/* 404 Number */}
          <motion.div variants={fadeIn} className='mb-8'>
            <h1 className='text-9xl md:text-[12rem] font-bold text-gray-200 dark:text-gray-800 select-none'>
              404
            </h1>
          </motion.div>

          {/* Error Message */}
          <motion.div variants={slideUp} className='space-y-6'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 dark:text-white'>
              Page Not Found
            </h2>

            <p className='text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto'>
              Sorry, the page you are looking for doesn't exist or has been
              moved.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            variants={slideUp}
            className='flex flex-col sm:flex-row items-center justify-center gap-4 mt-8'
          >
            <Link to='/'>
              <Button size='lg' className='flex items-center space-x-2'>
                <Home className='w-5 h-5' />
                <span>Go Home</span>
              </Button>
            </Link>

            <Button
              variant='outline'
              size='lg'
              onClick={() => window.history.back()}
              className='flex items-center space-x-2'
            >
              <ArrowLeft className='w-5 h-5' />
              <span>Go Back</span>
            </Button>
          </motion.div>

          {/* Decorative Elements */}
          <motion.div
            variants={fadeIn}
            className='mt-16 text-gray-400 dark:text-gray-600'
          >
            <p className='text-sm'>
              Lost in space? Let's get you back on track.
            </p>
          </motion.div>
        </motion.div>
      </Container>
    </div>
  );
};

export default NotFound;
