export default function NotLoggedIn() {
    return (
      <>
        
        <main className="grid min-h-screen place-items-center bg-violet-200 py-24 px-6 sm:py-32 lg:px-8">
          <div className="text-center">
            <p className="text-base font-semibold text-violet-600">401</p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Forbidden</h1>
            <p className="mt-6 text-base leading-7 text-gray-600">Sorry, you're not allowed to access this page. Please relogin !</p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/"
                className="rounded-md bg-violet-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
              >
                Login
              </a>
              
            </div>
          </div>
        </main>
      </>
    )
  }
  