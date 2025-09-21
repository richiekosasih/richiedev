import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MessageCircle, CheckCircle, X, Mail } from 'lucide-react';
import { FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';
import { staggerContainer, staggerItem } from '@/lib/motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!formData.email.includes('@')) {
      newErrors.email = 'Email must contain @';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (
      !/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/[\s\-\(\)]/g, ''))
    ) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Create mailto link with the form data
    const subject = encodeURIComponent(formData.subject || 'Portfolio Contact');
    const body = encodeURIComponent(
      `Hi Richie,\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}\n\nBest regards,\n${formData.name}`
    );

    // Show success popup
    setShowSuccess(true);

    // Open email client
    window.location.href = `mailto:richiekosasih@gmail.com?subject=${subject}&body=${body}`;

    // Reset form after a delay
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
      setIsSubmitting(false);
    }, 2000);
  };

  const socialLinks = [
    {
      icon: Mail,
      label: 'Email',
      href: 'mailto:richiekosasihdev@gmail.com',
    },
    {
      icon: FaGithub,
      label: 'GitHub',
      href: 'https://github.com/richiekosasih',
    },
    {
      icon: FaLinkedin,
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/richiekosasih',
    },
    {
      icon: FaInstagram,
      label: 'Instagram',
      href: 'https://instagram.com/richie_kosasih',
    },
  ];

  return (
    <>
      {/* Success Popup */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'
            onClick={() => setShowSuccess(false)}
          >
            <motion.div
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              exit={{ y: 50 }}
              className='bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl max-w-md mx-4 text-center'
              onClick={(e) => e.stopPropagation()}
            >
              <CheckCircle className='w-16 h-16 text-green-500 mx-auto mb-4' />
              <h3 className='text-xl font-black font-mono text-gray-900 dark:text-white mb-2'>
                MESSAGE SENT!
              </h3>
              <p className='text-gray-600 dark:text-gray-400 font-mono mb-4'>
                Your email client should open shortly. Thank you for reaching
                out!
              </p>
              <button
                onClick={() => setShowSuccess(false)}
                className='px-6 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-mono rounded-lg hover:bg-gray-700 dark:hover:bg-gray-200 transition-colors'
              >
                CLOSE
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        id='contact'
        className='min-h-screen bg-amber-50 dark:bg-beige
    -900 text-gray-900 dark:text-white relative'
      >
        {/* Diagonal grid background */}
        <div
          className='absolute inset-0 opacity-20 dark:opacity-10'
          style={{
            backgroundImage: `linear-gradient(45deg, rgba(0,0,0,0.1) 1px, transparent 1px), 
                           linear-gradient(-45deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
            backgroundSize: '30px 30px',
          }}
        />

        <motion.div
          variants={staggerContainer}
          initial='initial'
          whileInView='animate'
          viewport={{ once: true }}
          className='relative z-10'
        >
          <div className='max-w-7xl mx-auto px-8 py-16'>
            {/* Main Content */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16'>
              {/* Left Side - Contact Header & Social Icons */}
              <motion.div
                variants={staggerItem}
                className='text-center lg:text-left'
              >
                <h1 className='text-6xl lg:text-8xl font-black font-mono uppercase tracking-wider leading-tight mb-12'>
                  CONTACT
                </h1>

                {/* Social Media Icons */}
                <div className='flex items-center justify-center lg:justify-start space-x-6'>
                  {/* Decorative lines */}
                  <div className='w-12 h-px bg-amber-600 dark:bg-amber-400'></div>

                  {/* Social Icons */}
                  <div className='flex items-center space-x-4'>
                    {socialLinks.map((social, index) => {
                      const Icon = social.icon;
                      return (
                        <motion.a
                          key={social.label}
                          href={social.href}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='w-12 h-12 bg-gray-900 dark:bg-white rounded-full flex items-center justify-center hover:bg-amber-600 dark:hover:bg-amber-400 transition-colors group'
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          whileTap={{ scale: 0.95 }}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Icon className='w-6 h-6 text-white dark:text-gray-900 group-hover:text-white dark:group-hover:text-white' />
                        </motion.a>
                      );
                    })}
                  </div>

                  {/* Decorative lines */}
                  <div className='w-12 h-px bg-amber-600 dark:bg-amber-400'></div>
                </div>
              </motion.div>

              {/* Right Side - Contact Form */}
              <motion.div variants={staggerItem} className='w-full'>
                <div className='bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700'>
                  <div className='text-center mb-8'>
                    <h3 className='text-3xl font-black font-mono uppercase tracking-wider mb-2'>
                      DROP ME A LINE
                    </h3>
                    <div className='w-20 h-1 bg-amber-600 dark:bg-amber-400 mx-auto rounded-full'></div>
                  </div>

                  <form onSubmit={handleSubmit} className='space-y-6'>
                    {/* Name and Email Row */}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                      <div>
                        <label className='block text-sm font-mono uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2'>
                          FULL NAME *
                        </label>
                        <input
                          type='text'
                          name='name'
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder='Enter your full name'
                          required
                          className={`w-full px-4 py-4 bg-gray-50 dark:bg-gray-700 border-2 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none transition-all duration-300 font-mono ${
                            errors.name
                              ? 'border-red-500 bg-red-50 dark:bg-red-900/20 focus:border-red-500'
                              : 'border-gray-300 dark:border-gray-600 focus:border-amber-500 dark:focus:border-amber-400'
                          }`}
                        />
                        {errors.name && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className='text-red-500 text-sm font-mono mt-2 flex items-center'
                          >
                            <X className='w-4 h-4 mr-1' />
                            {errors.name}
                          </motion.p>
                        )}
                      </div>

                      <div>
                        <label className='block text-sm font-mono uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2'>
                          EMAIL ADDRESS *
                        </label>
                        <input
                          type='email'
                          name='email'
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder='Enter your email address'
                          required
                          className={`w-full px-4 py-4 bg-gray-50 dark:bg-gray-700 border-2 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none transition-all duration-300 font-mono ${
                            errors.email
                              ? 'border-red-500 bg-red-50 dark:bg-red-900/20 focus:border-red-500'
                              : 'border-gray-300 dark:border-gray-600 focus:border-amber-500 dark:focus:border-amber-400'
                          }`}
                        />
                        {errors.email && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className='text-red-500 text-sm font-mono mt-2 flex items-center'
                          >
                            <X className='w-4 h-4 mr-1' />
                            {errors.email}
                          </motion.p>
                        )}
                      </div>
                    </div>

                    {/* Phone and Subject Row */}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                      <div>
                        <label className='block text-sm font-mono uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2'>
                          PHONE NUMBER *
                        </label>
                        <input
                          type='tel'
                          name='phone'
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder='Enter your phone number'
                          required
                          className={`w-full px-4 py-4 bg-gray-50 dark:bg-gray-700 border-2 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none transition-all duration-300 font-mono ${
                            errors.phone
                              ? 'border-red-500 bg-red-50 dark:bg-red-900/20 focus:border-red-500'
                              : 'border-gray-300 dark:border-gray-600 focus:border-amber-500 dark:focus:border-amber-400'
                          }`}
                        />
                        {errors.phone && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className='text-red-500 text-sm font-mono mt-2 flex items-center'
                          >
                            <X className='w-4 h-4 mr-1' />
                            {errors.phone}
                          </motion.p>
                        )}
                      </div>

                      <div>
                        <label className='block text-sm font-mono uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2'>
                          SUBJECT *
                        </label>
                        <input
                          type='text'
                          name='subject'
                          value={formData.subject}
                          onChange={handleInputChange}
                          placeholder='What is this about?'
                          required
                          className={`w-full px-4 py-4 bg-gray-50 dark:bg-gray-700 border-2 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none transition-all duration-300 font-mono ${
                            errors.subject
                              ? 'border-red-500 bg-red-50 dark:bg-red-900/20 focus:border-red-500'
                              : 'border-gray-300 dark:border-gray-600 focus:border-amber-500 dark:focus:border-amber-400'
                          }`}
                        />
                        {errors.subject && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className='text-red-500 text-sm font-mono mt-2 flex items-center'
                          >
                            <X className='w-4 h-4 mr-1' />
                            {errors.subject}
                          </motion.p>
                        )}
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className='block text-sm font-mono uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2'>
                        MESSAGE *
                      </label>
                      <textarea
                        name='message'
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={6}
                        placeholder='Tell me about your project or idea...'
                        required
                        className={`w-full px-4 py-4 bg-gray-50 dark:bg-gray-700 border-2 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none transition-all duration-300 resize-none font-mono ${
                          errors.message
                            ? 'border-red-500 bg-red-50 dark:bg-red-900/20 focus:border-red-500'
                            : 'border-gray-300 dark:border-gray-600 focus:border-amber-500 dark:focus:border-amber-400'
                        }`}
                      />
                      {errors.message && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className='text-red-500 text-sm font-mono mt-2 flex items-center'
                        >
                          <X className='w-4 h-4 mr-1' />
                          {errors.message}
                        </motion.p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type='submit'
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-black font-mono uppercase tracking-wider rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl ${
                        isSubmitting ? 'animate-pulse' : ''
                      }`}
                    >
                      <div className='flex items-center justify-center space-x-2'>
                        {isSubmitting ? (
                          <>
                            <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                            <span>SENDING MESSAGE...</span>
                          </>
                        ) : (
                          <>
                            <Send className='w-5 h-5' />
                            <span>SEND MESSAGE</span>
                          </>
                        )}
                      </div>
                    </motion.button>
                  </form>
                </div>
              </motion.div>
            </div>

            {/* Footer Note */}
            <div className='mt-16 pt-8 border-t border-gray-300 dark:border-gray-800'>
              <p className='text-gray-600 dark:text-gray-400 text-sm max-w-4xl mx-auto text-center font-mono'>
                I'm available to help with any queries about projects,
                collaborations, or opportunities. You can reach me directly at
                richiekosasih@gmail.com or through the form above. I guarantee a
                response within 24 hours during business days.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Contact;
