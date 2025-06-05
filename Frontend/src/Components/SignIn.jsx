import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaApple } from 'react-icons/fa';
import axios from 'axios';
import { USER_API_ENDPOINT } from '../Utils/constant.js'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUser } from '../Redux/userSlice.js';
function SignIn() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const signInSignUpHandler = () => {
    setIsLogin(!isLogin);
  }
  const submitHandler = async (e) => {
    e.preventDefault()
    if (isLogin) {
      // Handle login
      try {
        const res = await axios.post(`${USER_API_ENDPOINT}/login`, { email, password }, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        })
        dispatch(getUser(res?.data?.user))
        if (res.data.success) {
          navigate('/')
          toast.success(res.data.message)
        }
      } catch (error) {
        toast.error(error.response.data.message)
      }
    } else {
      // Handle sign up
      try {
        const res = await axios.post(`${USER_API_ENDPOINT}/register`, { name, username, email, password }, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        })
        if (res.data.success) {
          setIsLogin(true)
          toast.success(res.data.message)
        }
      } catch (error) {
        toast.error(error.response.data.message)
      }

    }

  }

  return (
    <div className="min-h-screen flex">
      {/* Left side - Twitter logo */}
      <div className="hidden md:flex md:w-1/2 bg-white border-r border-gray-200 items-center justify-center">
        <img width={400} className='m-2' src="https://img.freepik.com/free-vector/twitter-new-2023-x-logo-white-background-vector_1017-45422.jpg?ga=GA1.1.124665594.1745737047&semt=ais_hybrid&w=740" alt="X logo" />
      </div>
      {/* Right side - Sign in form */}
      <div className="w-full md:w-1/2 flex flex-col p-8 md:p-20">
        <div className="max-w-md mx-auto w-full">
          <img width={50} className='text-blue-400 text-4xl mb-10 md:hidden' src="https://img.freepik.com/free-vector/twitter-new-2023-x-logo-white-background-vector_1017-45422.jpg?ga=GA1.1.124665594.1745737047&semt=ais_hybrid&w=740" alt="X logo" />
          <h1 className="text-4xl font-bold mb-8">{isLogin ? 'Sign in to Twitter' : 'Create your account'}</h1>
          {/* Social login buttons */}
          <div className="flex flex-col gap-4 mb-8">
            <button className="flex items-center justify-center gap-2 border border-gray-300 rounded-full py-2 px-4 font-semibold hover:bg-gray-100 transition-colors">
              <FcGoogle size={20} />
              Sign in with Google
            </button>
            <button className="flex items-center justify-center gap-2 border border-gray-300 rounded-full py-2 px-4 font-semibold hover:bg-gray-100 transition-colors">
              <FaApple size={20} />
              Sign in with Apple
            </button>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="text-gray-500">or</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>
          </div>

          {/* Sign in form */}
          <form className="space-y-4" onSubmit={submitHandler}>
            {!isLogin && (<> <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
              required
            />
              <input
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                required
              /></>)}

            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
              required
            />

            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400 pr-12"
              required
            />
            <button
              type="submit"
              className="w-full bg-black text-white rounded-full py-3 font-bold hover:bg-gray-800 transition-colors"
            >
              {isLogin ? 'Sign in' : 'Sign up'}
            </button>
          </form>

          <div className="mt-4 text-center">
            <button className="text-blue-400 hover:underline text-sm">
              Forgot password?
            </button>
          </div>

          <div className="mt-8">
            <p className="text-gray-500 text-sm">
              {isLogin ? 'Don\'t have an account?' : 'Already have an account?'}
              <button onClick={signInSignUpHandler} className="text-blue-400 hover:underline">
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn; 