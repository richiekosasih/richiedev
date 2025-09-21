import React from 'react';
import Hero from '@/features/hero/Hero';
import About from '@/features/about/About';
import Projects from '@/features/projects/Projects';
import Experience from '@/features/experience/Experience';
import Contact from '@/features/contact/Contact';

const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Contact />
    </>
  );
};

export default Home;
