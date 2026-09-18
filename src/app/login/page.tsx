'use client'
import { FaLock } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { useState, useRef } from "react";

const LoginPage = () => {

  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const checkInputsHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const emailInput = emailRef.current?.value;
    const passwordInput = passwordRef.current?.value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailInput || !emailRegex.test(emailInput)) {
      setEmailError('Please enter a valid email ID')
    }

    if (!passwordInput) {
      setPasswordError('Please enter the password')
    }

    if (emailInput && emailRegex.test(emailInput)) {
      setEmailError(null)
    }

    if (passwordInput) {
      setPasswordError(null)
    }

    if (!emailInput || !emailRegex.test(emailInput) || !passwordInput) {
      return
    }
  }

  return (
    <div className='flex items-center justify-center'>
      <form className='flex flex-col mt-20 border-2 border-solid border-zinc-200 px-8 py-10 rounded-3xl gap-7 lg:w-1/3 w-96'>
        <h1 className='text-2xl font-bold self-center'>Welcome Back</h1>
        <div>
          <div className='flex gap-2 items-center border-2 border-solid border-zinc-200 rounded-md px-2 focus-within:border-gray-300 transition-colors'>
            <FaUserAlt size={'1.2rem'} className="text-zinc-300" />
            <input type="text" ref={emailRef} className='py-1 w-full border-none focus:outline-none' placeholder='Email' />
          </div>
          {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
        </div>
        <div>
          <div className='flex gap-2 items-center border-2 border-solid border-zinc-200 rounded-md px-2 focus-within:border-gray-300 transition-colors'>
            <FaLock size={'1rem'} className="text-zinc-300" />
            <input type="password" ref={passwordRef} className='py-1 w-full border-none focus:outline-none' placeholder='Password' />
          </div>
          {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
        </div>
        <button onClick={checkInputsHandler} className='bg-black text-white py-2 rounded-md'>Sign in</button>
        <div className="text-center">Dont have an account? Click <span className="underline hover:cursor-pointer">here</span> to sign up</div>
      </form>
    </div>
  )
}

export default LoginPage