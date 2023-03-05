import { useState } from "react"
import { useForm } from 'react-hook-form';
import { useAuth } from "@/context/AuthContext";
import LoginFailedAlert from "@/components/Alerts/LoginFailedAlert";
import { useRouter } from "next/router";

export default function Login() {
    const [loginUser,setLoginUser] = useState(true);
    const router = useRouter();
    const [registerUser,setRegisterUser] = useState(false);
    const [error,setError] = useState(false)
    const [errorMessage,setErrorMessage] = useState("")
    const {
        register,
        handleSubmit,        
      } = useForm();
    const {login,signup} = useAuth()
    async function handleLogin(data){
        try{
           const resp = await login(data.email,data.password)
           if(resp){
            router.push("/dashboard")

           }

        }
        catch(error){
            if(error.message == "Firebase: Error (auth/wrong-password)."){
                setErrorMessage("Password entered was incorrect!")
                setError(true)
                setTimeout(() => {
                    setError(false);
                    }, 5000);
            }
            else if(error.message == "Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests)."){
                setErrorMessage("Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.")
                setError(true)
                setTimeout(() => {
                    setError(false);
                    }, 5000);

            }
            else if(error.message == "Firebase: Error (auth/user-not-found)."){
                setErrorMessage("Account does not exist! Please register.")
                setError(true)
                setTimeout(() => {
                    setError(false);
                    }, 5000);
            }
        }
    }

    async function handleRegister(data){
        if(data.password === data.confirm_password){
            try{
               const resp =  await signup(data.email,data.password)
               if(resp){
                router.push("/dashboard")
               }
    
            }
            catch(error){
                if(error.message == "Firebase: Error (auth/email-already-in-use)."){
                    setErrorMessage("Account already exists please login!")
                    setError(true)
                    setTimeout(() => {
                        setError(false);
                        }, 5000);
                }
                console.log(error.message)
            }
        }
       else{
        setErrorMessage("Password and confirm password do not match!")
        setError(true)
        setTimeout(() => {
            setError(false);
            }, 5000);
       }
    }



    return (
      <>
        
        <div className="min-h-screen flex">
            
          <div className="bg-violet-200 flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          {error &&
          <div className="flex justify-center -translate-y-12">
          <LoginFailedAlert message={errorMessage}/>
            
          </div>
          }  
          

            {loginUser &&
            
            <div className="mx-auto w-full max-w-sm lg:w-96">
              <div>
                <img
                  className="h-12 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-mark-blue-600.svg"
                  alt="Workflow"
                />
                <h2 className="mt-6 text-3xl font-extrabold text-violet-900">Sign in to your account</h2>
                <p className="mt-2 text-sm text-violet-600">
                  Or{' '}
                  <a onClick={() => {
                    setLoginUser(false)
                    setRegisterUser(true)
                    
                    }} className="font-medium text-violet-600 hover:text-violet-500">
                    click here to register
                  </a>
                </p>
              </div>
  
              <div className="mt-8">
                
  
                <div className="mt-6">
                  <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-violet-700">
                        Email address
                      </label>
                      <div className="mt-1">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          {...register('email')}
                          className="appearance-none block w-full px-3 py-2 border border-violet-300 rounded-md shadow-sm placeholder-violet-400 focus:outline-none focus:ring-violet-500 focus:border-violet-500 sm:text-sm"
                        />
                      </div>
                    </div>
  
                    <div className="space-y-1">
                      <label htmlFor="password" className="block text-sm font-medium text-violet-700">
                        Password
                      </label>
                      <div className="mt-1">
                        <input
                          id="password"
                          name="password"
                          type="password"
                          autoComplete="current-password"
                          required
                          {...register('password')}
                          className="appearance-none block w-full px-3 py-2 border border-violet-300 rounded-md shadow-sm placeholder-violet-400 focus:outline-none focus:ring-violet-500 focus:border-violet-500 sm:text-sm"
                        />
                      </div>
                    </div>
  
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          id="remember-me"
                          name="remember-me"
                          type="checkbox"
                          className="h-4 w-4 text-violet-600 focus:ring-violet-500 border-violet-300 rounded"
                        />
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-violet-900">
                          Remember me
                        </label>
                      </div>
  
                      <div className="text-sm">
                        <a href="#" className="font-medium text-violet-600 hover:text-violet-500">
                          Forgot your password?
                        </a>
                      </div>
                    </div>
  
                    <div>
                      <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                      >
                        Sign in
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            }
            {registerUser &&
            
            <div className="mx-auto w-full max-w-sm lg:w-96">
              <div>
                <img
                  className="h-12 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-mark-blue-600.svg"
                  alt="Workflow"
                />
                <h2 className="mt-6 text-3xl font-extrabold text-violet-900">Register your account</h2>
                <p className="mt-2 text-sm text-violet-600">
                  Or{' '}
                  <a onClick={() => {
                    setLoginUser(true)
                    setRegisterUser(false)
                    
                    }} className="font-medium text-violet-600 hover:text-violet-500">
                    click here to login
                  </a>
                </p>
              </div>
  
              <div className="mt-8">
                
  
                <div className="mt-6">
                  <form onSubmit={handleSubmit(handleRegister)} className="space-y-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-violet-700">
                        Email address
                      </label>
                      <div className="mt-1">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          {...register('email')}
                          className="appearance-none block w-full px-3 py-2 border border-violet-300 rounded-md shadow-sm placeholder-violet-400 focus:outline-none focus:ring-violet-500 focus:border-violet-500 sm:text-sm"
                        />
                      </div>
                    </div>
  
                    <div className="space-y-1">
                      <label htmlFor="password" className="block text-sm font-medium text-violet-700">
                        Password
                      </label>
                      <div className="mt-1">
                        <input
                          id="password"
                          name="password"
                          type="password"
                          autoComplete="current-password"
                          required
                          {...register('password')}
                          className="appearance-none block w-full px-3 py-2 border border-violet-300 rounded-md shadow-sm placeholder-violet-400 focus:outline-none focus:ring-violet-500 focus:border-violet-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="confirm_password" className="block text-sm font-medium text-violet-700">
                        Confirm Password
                      </label>
                      <div className="mt-1">
                        <input
                          id="confirm_password"
                          name="confirm_password"
                          type="password"
                          autoComplete="current-password"
                          required
                          {...register('confirm_password')}
                          className="appearance-none block w-full px-3 py-2 border border-violet-300 rounded-md shadow-sm placeholder-violet-400 focus:outline-none focus:ring-violet-500 focus:border-violet-500 sm:text-sm"
                        />
                      </div>
                    </div>
  
                    
  
                    <div>
                      <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                      >
                        Register
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            }
            
          </div>
          
          <div className="hidden lg:block relative w-0 flex-1">
          
            <img
              className="absolute inset-0 h-full w-full object-cover"
              src="/login-bg.jpg"
              alt=""
            />
          </div>
        </div>
      </>
    )
  }