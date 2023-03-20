import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "@/context/AuthContext";
import LoginFailedAlert from "@/components/Alerts/LoginFailedAlert";
import { useRouter } from "next/router";

export default function Login() {
  const [loginUser, setLoginUser] = useState(true);
  const router = useRouter();
  const [registerUser, setRegisterUser] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const { login, signup } = useAuth();
  async function handleLogin(data) {
    try {
      setLoading(true);
      const resp = await login(data.email, data.password);
      if (resp) {
        router.push("/dashboard");
      }
    } catch (error) {
      setLoading(false);
      if (error.message == "Firebase: Error (auth/wrong-password).") {
        setErrorMessage("Password entered was incorrect!");
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 5000);
      } else if (
        error.message ==
        "Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests)."
      ) {
        setErrorMessage(
          "Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later."
        );
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 5000);
      } else if (error.message == "Firebase: Error (auth/user-not-found).") {
        setErrorMessage("Account does not exist! Please register.");
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 5000);
      }
    }
  }

  async function handleRegister(data) {
    if (data.password === data.confirm_password) {
      try {
        setLoading(true);
        const resp = await signup(
          data.email,
          data.password,
          data.teamName,
          data.teamLeaderName,
          data.mobileNumber
        );
        if (resp) {
          router.push("/dashboard");
        }
      } catch (error) {
        setLoading(false);
        if (error.message == "Firebase: Error (auth/email-already-in-use).") {
          setErrorMessage("Account already exists please login!");
          setError(true);
          setTimeout(() => {
            setError(false);
          }, 5000);
        } else if (
          error.message ==
          "Firebase: Password should be at least 6 characters (auth/weak-password)."
        ) {
          setErrorMessage("Password should be at least 6 characters");
          setError(true);
          setTimeout(() => {
            setError(false);
          }, 5000);
        }
        console.log(error.message);
      }
    } else {
      setErrorMessage("Password and confirm password do not match!");
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 5000);
    }
  }

  return (
    <>
      <div className="min-h-screen flex">
        <div className="bg-violet-200 flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          {error && (
            <div className="flex justify-center -translate-y-12">
              <LoginFailedAlert message={errorMessage} />
            </div>
          )}

          {loginUser && !loading && (
            <div className="mx-auto w-full max-w-sm lg:w-96">
              <div>
                <img
                  className="h-12 w-auto"
                  src="/safl_logo.png"
                  alt="Workflow"
                />
                <h2 className="mt-6 text-3xl font-extrabold text-violet-900">
                  Sign in to your account
                </h2>
                <p className="mt-2 text-sm text-violet-600">
                  Or{" "}
                  <a
                    onClick={() => {
                      setLoginUser(false);
                      setRegisterUser(true);
                    }}
                    className="font-medium text-violet-600 hover:text-violet-500"
                  >
                    click here to register
                  </a>
                </p>
              </div>

              <div className="mt-8">
                <div className="mt-6">
                  <form
                    onSubmit={handleSubmit(handleLogin)}
                    className="space-y-6"
                  >
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-violet-700"
                      >
                        Email address
                      </label>
                      <div className="mt-1">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          {...register("email")}
                          className="appearance-none block w-full px-3 py-2 border border-violet-300 rounded-md shadow-sm placeholder-violet-400 focus:outline-none focus:ring-violet-500 focus:border-violet-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-violet-700"
                      >
                        Password
                      </label>
                      <div className="mt-1">
                        <input
                          id="password"
                          name="password"
                          type="password"
                          autoComplete="current-password"
                          required
                          {...register("password")}
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
                        <label
                          htmlFor="remember-me"
                          className="ml-2 block text-sm text-violet-900"
                        >
                          Remember me
                        </label>
                      </div>

                      <div className="text-sm">
                        <a
                          href="#"
                          className="font-medium text-violet-600 hover:text-violet-500"
                        >
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
          )}
          {registerUser && !loading && (
            <div className="mx-auto w-full max-w-sm lg:w-96">
              <div>
                <img
                  className="h-12 w-auto"
                  src="/safl_logo.png"
                  alt="Workflow"
                />
                <h2 className="mt-6 text-3xl font-extrabold text-violet-900">
                  Register your account
                </h2>
                <p className="mt-2 text-sm text-violet-600">
                  Or{" "}
                  <a
                    onClick={() => {
                      setLoginUser(true);
                      setRegisterUser(false);
                    }}
                    className="font-medium text-violet-600 hover:text-violet-500"
                  >
                    click here to login
                  </a>
                </p>
              </div>

              <div className="mt-8">
                <div className="mt-6">
                  <form
                    onSubmit={handleSubmit(handleRegister)}
                    className="space-y-6"
                  >
                    <div>
                      <label
                        htmlFor="teamName"
                        className="block text-sm font-medium text-violet-700"
                      >
                        Team Name*
                      </label>
                      <div className="mt-1">
                        <input
                          id="teamName"
                          name="teamName"
                          type="text"
                          required
                          {...register("teamName")}
                          className="appearance-none block w-full px-3 py-2 border border-violet-300 rounded-md shadow-sm placeholder-violet-400 focus:outline-none focus:ring-violet-500 focus:border-violet-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="teamLeaderName"
                        className="block text-sm font-medium text-violet-700"
                      >
                        Team Leader Name*
                      </label>
                      <div className="mt-1">
                        <input
                          id="teamLeaderName"
                          name="teamLeaderName"
                          type="text"
                          required
                          {...register("teamLeaderName")}
                          className="appearance-none block w-full px-3 py-2 border border-violet-300 rounded-md shadow-sm placeholder-violet-400 focus:outline-none focus:ring-violet-500 focus:border-violet-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="mobileNumber"
                        className="block text-sm font-medium text-violet-700"
                      >
                        Mobile Number
                      </label>
                      <div className="mt-1">
                        <input
                          id="mobileNumber"
                          name="mobileNumber"
                          type="tel"
                          required
                          {...register("mobileNumber")}
                          className="appearance-none block w-full px-3 py-2 border border-violet-300 rounded-md shadow-sm placeholder-violet-400 focus:outline-none focus:ring-violet-500 focus:border-violet-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-violet-700"
                      >
                        Email address
                      </label>
                      <div className="mt-1">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          {...register("email")}
                          className="appearance-none block w-full px-3 py-2 border border-violet-300 rounded-md shadow-sm placeholder-violet-400 focus:outline-none focus:ring-violet-500 focus:border-violet-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-violet-700"
                      >
                        Password
                      </label>
                      <div className="mt-1">
                        <input
                          id="password"
                          name="password"
                          type="password"
                          autoComplete="current-password"
                          required
                          {...register("password")}
                          className="appearance-none block w-full px-3 py-2 border border-violet-300 rounded-md shadow-sm placeholder-violet-400 focus:outline-none focus:ring-violet-500 focus:border-violet-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label
                        htmlFor="confirm_password"
                        className="block text-sm font-medium text-violet-700"
                      >
                        Confirm Password
                      </label>
                      <div className="mt-1">
                        <input
                          id="confirm_password"
                          name="confirm_password"
                          type="password"
                          autoComplete="current-password"
                          required
                          {...register("confirm_password")}
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
          )}
          {loading && (
            <div className="flex justify-center items-center mx-auto w-full max-w-sm lg:w-96">
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="inline w-8 h-8 mr-2 text-gray-200 animate-spin fill-purple-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          )}
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
  );
}
