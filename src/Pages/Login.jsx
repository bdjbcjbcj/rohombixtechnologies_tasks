import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.45, ease: 'easeOut' }
  }),
  exit: { opacity: 0, y: -12, transition: { duration: 0.25 } }
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } }
}

function Login() {
  const [currentState, setCurrentState] = useState('Login')

  const onSubmitHandler = async (event) => {
    event.preventDefault()
  }

  return (
    <motion.form
      onSubmit={onSubmitHandler}
      className='flex flex-col mt-14 items-center w-11/12 sm:w-96 m-auto gap-4 text-gray-600'
      variants={stagger}
      initial='hidden'
      animate='visible'
      key={currentState}
    >
      {/* Heading */}
      <motion.div
        className='inline-flex items-center gap-3 mt-35 mb-4'
        variants={fadeUp}
      >
        <motion.h1
          className='prata-regular text-5xl font-bold text-center bg-gradient-to-r from-blue-800 via-violet-500 to-orange-500 bg-clip-text text-transparent'
          key={currentState}
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          {currentState}
        </motion.h1>
        <hr className='border-none h-0.5 w-8 bg-gradient-to-r from-blue-800 via-violet-500 to-orange-500' />
      </motion.div>

      {/* Name field — only in SignUp */}
      <AnimatePresence>
        {currentState !== 'Login' && (
          <motion.input
            key='name-field'
            type='text'
            className='w-full px-3 py-2 border text-white border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition'
            placeholder='Name'
            required
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          />
        )}
      </AnimatePresence>

      {/* Email */}
      <motion.input
        type='email'
        className='w-full px-3 py-2 border text-white border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition'
        placeholder='Email'
        required
        variants={fadeUp}
      />

      {/* Password */}
      <motion.input
        type='password'
        className='w-full px-3 py-2 border text-white border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition'
        placeholder='Password'
        required
        variants={fadeUp}
      />

      {/* Links row */}
      <motion.div
        className='flex justify-between w-full -mt-2 text-sm'
        variants={fadeUp}
      >
        <p className='cursor-pointer text-white hover:text-blue-400 transition'>
          Forgot Your Password?
        </p>
        <AnimatePresence mode='wait'>
          {currentState === 'Login' ? (
            <motion.p
              key='create'
              onClick={() => setCurrentState('SignUp')}
              className='cursor-pointer text-white hover:text-blue-400 transition'
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.25 }}
            >
              Create Account
            </motion.p>
          ) : (
            <motion.p
              key='login'
              onClick={() => setCurrentState('Login')}
              className='cursor-pointer text-white hover:text-blue-400 transition'
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.25 }}
            >
              Login Here
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Submit Button */}
      <motion.button
        type='submit'
        className='bg-blue-500 hover:bg-blue-700 transition ease-in-out duration-300 text-white py-2 px-8 mt-4 font-medium cursor-pointer'
        variants={fadeUp}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
      >
        <AnimatePresence mode='wait'>
          <motion.span
            key={currentState}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </motion.form>
  )
}

export default Login