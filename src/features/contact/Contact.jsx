import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, X } from 'lucide-react';
import { FaLinkedin, FaGithub, FaInstagram, FaEnvelope } from 'react-icons/fa';
import { staggerContainer, staggerItem } from '@/lib/motion';
import emailjs from '@emailjs/browser';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showEmailCopied, setShowEmailCopied] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });

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

    if (formData.phone.trim()) {
      const phoneDigits = formData.phone.replace(/[\s\-\(\)]/g, '');
      const phoneLength = phoneDigits.length;

      // Basic validation - phone should be between 7-15 digits
      if (phoneLength < 7 || phoneLength > 15) {
        newErrors.phone = 'Please enter a valid phone number';
      }
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Copy email function
  const copyEmail = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Get cursor position for popup
    const rect = e.target.getBoundingClientRect();
    setPopupPosition({
      x: rect.left + rect.width / 2,
      y: rect.top - 10,
    });

    const email = 'richiekosasihdev@gmail.com';

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(email);
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = email;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
      }

      // Show success popup
      setShowEmailCopied(true);
      setTimeout(() => setShowEmailCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
      // Still show popup even if copy failed
      setShowEmailCopied(true);
      setTimeout(() => setShowEmailCopied(false), 2000);
    }
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
    try {
      // Get EmailJS configuration from environment variables
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      // Check if all required environment variables are present
      if (!serviceId || !templateId || !publicKey) {
        throw new Error(
          'EmailJS configuration is missing. Please check your environment variables.'
        );
      }

      console.log('=== EMAILJS DEBUG ===');
      console.log('Service ID:', serviceId);
      console.log('Template ID:', templateId);
      console.log('Public Key:', publicKey);
      console.log('Form Data:', formData);
      console.log('All env vars:', import.meta.env);
      console.log('==================');

      console.log('Sending email with:', {
        serviceId,
        templateId,
        publicKey,
        templateParams: {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone || '',
          message: formData.message,
        },
      });

      const result = await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone || '',
          message: formData.message,
        },
        {
          publicKey,
        }
      );

      console.log('EmailJS Result:', result);

      setShowSuccess(true);

      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
    } catch (error) {
      console.error('EmailJS Error:', error);
      setErrors((prev) => ({
        ...prev,
        submit: `Failed to send message: ${
          error.message || 'Please try again later.'
        }`,
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    {
      icon: FaEnvelope,
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
                Thank you for reaching out! I will get back to you soon.
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
                <div className='bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 max-w-2xl lg:max-w-xl mx-auto'>
                  <div className='text-center mb-8'>
                    <h3 className='text-3xl font-black font-mono uppercase tracking-wider mb-2'>
                      DROP ME A LINE
                    </h3>
                    <div className='w-20 h-1 bg-amber-600 dark:bg-amber-400 mx-auto rounded-full'></div>
                  </div>

                  <form onSubmit={handleSubmit} className='space-y-6'>
                    {/* Name Field */}
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

                    {/* Email Field */}
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

                    {/* Phone Number */}
                    <div>
                      <label className='block text-sm font-mono uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2'>
                        PHONE NUMBER
                      </label>
                      <PhoneInput
                        country={'au'}
                        onlyCountries={[
                          'au',
                          'id',
                          'us',
                          'gb',
                          'jp',
                          'cn',
                          'in',
                          'de',
                          'fr',
                          'it',
                          'es',
                          'ru',
                          'br',
                          'mx',
                          'kr',
                          'sg',
                          'my',
                          'th',
                          'vn',
                          'ph',
                        ]}
                        enableSearch={true}
                        value={formData.phone}
                        onChange={(phone) =>
                          setFormData((prev) => ({ ...prev, phone }))
                        }
                        inputStyle={{
                          width: '100%',
                          height: '56px',
                          paddingLeft: '60px',
                          fontSize: '16px',
                          fontFamily: 'monospace',
                          backgroundColor: '#f9fafb',
                          border: '2px solid #d1d5db',
                          borderRadius: '8px',
                          color: '#111827',
                        }}
                        buttonStyle={{
                          backgroundColor: '#f9fafb',
                          border: '2px solid #d1d5db',
                          borderRadius: '8px 0 0 8px',
                          height: '56px',
                        }}
                        containerStyle={{
                          width: '100%',
                        }}
                        placeholder='Enter phone number'
                        disableCountryCode={false}
                        disableDropdown={false}
                        countryCodeEditable={false}
                        format='+... ... ... ... ...'
                        masks={{
                          au: '... ... ....', // +61 450 966 2120
                          id: '.... .... ....', // +62 8121 7657 430
                          us: '... ... ....', // +1 555 123 4567
                          gb: '.... .... ....', // +44 7700 9001 23
                          jp: '.. .... ....', // +81 90 1234 5678
                          cn: '... .... ....', // +86 138 0013 8000
                          in: '.... .... ....', // +91 9876 5432 10
                          de: '... ... ...', // +49 123 456 789
                          fr: '.. .. .. .. ..', // +33 01 23 45 67 89
                          it: '... ... ....', // +39 123 456 7890
                          es: '... ... ...', // +34 123 456 789
                          ru: '... ... .. ..', // +7 123 456 78 90
                          br: '.. ..... ....', // +55 11 99999 9999
                          mx: '... ... ....', // +52 123 456 7890
                          kr: '... .... ....', // +82 123 4567 8901
                          sg: '.... ....', // +65 1234 5678
                          my: '... ... ....', // +60 123 456 7890
                          th: '... ... ...', // +66 123 456 789
                          vn: '... ... ....', // +84 123 456 7890
                          ph: '... ... ....', // +63 123 456 7890
                        }}
                      />
                      <p className='text-xs text-gray-500 dark:text-gray-400 font-mono mt-2'>
                        Optional — include if you prefer a call or WhatsApp.
                      </p>
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
                      <p className='text-xs text-gray-500 dark:text-gray-400 font-mono mt-2'>
                        Helpful details: goals, timeline, budget range, and
                        links.
                      </p>
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
                    {errors.submit && (
                      <p className='text-red-500 text-sm font-mono mt-3 text-center'>
                        {errors.submit}
                      </p>
                    )}
                  </form>
                </div>
              </motion.div>
            </div>

            {/* Footer Note */}
            <div className='mt-16 pt-8 border-t border-gray-300 dark:border-gray-800'>
              <p className='text-gray-600 dark:text-gray-400 text-sm max-w-4xl mx-auto text-center font-mono'>
                I'm available to help with any queries about projects,
                collaborations, or opportunities. You can reach me directly at{' '}
                <span
                  onClick={copyEmail}
                  className='hover:text-gray-900 dark:hover:text-gray-100 transition-colors cursor-pointer underline decoration-dotted underline-offset-2 inline-block'
                  style={{ pointerEvents: 'auto', userSelect: 'none' }}
                >
                  richiekosasihdev@gmail.com
                </span>{' '}
                or through the form above.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Email Copied Popup - appears near cursor */}
      <AnimatePresence>
        {showEmailCopied && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -5, scale: 0.9 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className='fixed z-[9999] pointer-events-none'
            style={{
              left: popupPosition.x,
              top: popupPosition.y,
              transform: 'translate(-50%, -100%)',
            }}
          >
            <div className='bg-black border border-[#f5f5dc] rounded-lg px-3 py-2 shadow-lg'>
              <p className='text-[#f5f5dc] font-semibold text-sm whitespace-nowrap'>
                Email Copied
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Contact;
