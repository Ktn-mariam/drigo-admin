'use client'
import { FaLock } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();

  const [loginSteps, setLoginSteps] = useState<number>(1);
  const [username, setUsername] = useState<string>('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [verificationError, setVerificationError] = useState<string | null>(null);

  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const checkInputsHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const usernameInput = usernameRef.current?.value;
    const passwordInput = passwordRef.current?.value;

    if (!usernameInput || !passwordInput) {
      setLoginError('Please enter both username and password')
    }

    if (usernameInput && passwordInput) {
      setLoginError(null)
      loginHandler(usernameInput, passwordInput)
    }
  }

  const loginHandler = async (username: string, password: string) => {
    try {
      const response = await fetch(`http://localhost:4000/api/admin/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      console.log("Login response:", data);

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      setUsername(username);
      setLoginSteps(2)
    } catch (error: any) {
      setLoginError(error.message || "An error occurred during login");
      console.error("Error during login:", error.message);
    }
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (
      e.key === "Backspace" &&
      !e.currentTarget.value &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const verifyOtpHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const otp = inputRefs.current.map((input) => input?.value).join("");
    console.log("Entered OTP:", otp);

    try {
      const response = await fetch(`http://localhost:4000/api/admin/auth/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, code: otp }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "OTP verification failed");
      }

      const me = await fetch(`http://localhost:4000/api/admin/permissions/my-permissions`, { credentials: "include" }).then(r => r.json());
      console.log("OTP verification successful. User data:", me);

      router.push("/");

    } catch (error: any) {
      setVerificationError(error.message || "An error occurred during OTP verification");
      console.log("Error during OTP verification:", error.message);
    }
  }

  return (
    <div className='flex items-center justify-center'>
      {loginSteps === 1 && (
        <form className='flex flex-col mt-20 border-2 border-solid border-zinc-200 px-8 py-10 rounded-3xl gap-7 lg:w-1/3 w-96'>
          <h1 className='text-2xl font-bold self-center'>Welcome Back</h1>
          <div className='flex gap-2 items-center border-2 border-solid border-zinc-200 rounded-md px-2 focus-within:border-gray-300 transition-colors'>
            <FaUserAlt size={'1.2rem'} className="text-zinc-300" />
            <input type="text" ref={usernameRef} className='py-1 w-full border-none focus:outline-none' placeholder='Username' />
          </div>
          <div className='flex gap-2 items-center border-2 border-solid border-zinc-200 rounded-md px-2 focus-within:border-gray-300 transition-colors'>
            <FaLock size={'1rem'} className="text-zinc-300" />
            <input type="password" ref={passwordRef} className='py-1 w-full border-none focus:outline-none' placeholder='Password' />
          </div>
          <div className='w-full'>
            {loginError && <p className='text-red-500 text-md mb-2'>{loginError}</p>}
            <button onClick={checkInputsHandler} className='bg-black text-white py-2 rounded-md w-full'>Log in</button>
          </div>
          <div className="text-center">Dont have an account? Click <span className="underline hover:cursor-pointer">here</span> to sign up</div>
        </form>)}
      {loginSteps === 2 && (
        <form className='flex flex-col mt-20 border-2 border-solid border-zinc-200 px-8 py-10 rounded-3xl gap-7 lg:w-1/3 w-96'>
          <div className='flex items-center flex-col gap-2'>
            <h1 className='text-2xl font-bold'>OTP Verification</h1>
            <p className='text-md'>Please enter the OTP sent to your email</p>
            <div className="flex gap-2 items-center justify-center mt-4">
              {Array.from({ length: 6 }).map((_, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  maxLength={1}
                  className="py-1 w-9 border-2 border-solid border-zinc-200 rounded-md px-3 focus:outline-none focus:border-zinc-400"
                  onChange={(e) => handleOnChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
              ))}
            </div>
            {verificationError && <p className='text-red-500 text-md mt-2'>Error: {verificationError}</p>}
            <button onClick={verifyOtpHandler} className='bg-black text-white py-2 rounded-md w-64 mt-3'>Verify OTP</button>
          </div>
        </form>
      )}
    </div>
  )
}

export default LoginPage