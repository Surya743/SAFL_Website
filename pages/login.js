/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
export default function Example() {
    return (
      <>
        {/*
          This example requires updating your template:
  
          ```
          <html className="h-full bg-violet-200">
          <body className="h-full">
          ```
        */}
        <div className="min-h-screen flex">
          <div className="bg-violet-200 flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
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
                  <a href="#" className="font-medium text-violet-600 hover:text-violet-500">
                    start your 14-day free trial
                  </a>
                </p>
              </div>
  
              <div className="mt-8">
                
  
                <div className="mt-6">
                  <form action="#" method="POST" className="space-y-6">
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