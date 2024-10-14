export default function Index() {
  return (
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col items-center">
          <header className="flex items-center gap-9 mb-16">
            <div className="h-[150px] w-[150px]">
              <img
                  src="/binarizer-logo-dark.png"
                  alt="Binarizer"
                  className="w-full dark:block"
              />
            </div>
            <h1 className="leading text-7xl font-bold text-transparent bg-clip-text bg-title-gradient shadow-lg">
              Binarizer: A binary <br/> dataset creator
            </h1>
          </header>

          <div className="mt-8"/>

          <div className="flex flex-col items-center gap-4 mt-4">
            <div className="flex flex-col w-96">
              <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500">
                Welcome Back!
              </h2>

              <p className="text-lg text-gray-600 dark:text-gray-300 mt-1 font-thin opacity-80">
                Please enter your username and password
              </p>

              <div className="mt-8"/>
            </div>
          </div>

          <form className="flex flex-col items-center gap-4 mt-4">
            <div className="flex flex-col w-96">
              <label htmlFor="username" className="text-gray-700 text-lg dark:text-gray-300">
                Username
              </label>
              <input
                  type="text"
                  id="username"
                  className="mt-1 p-2 border font-thin rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                  placeholder="Enter your username"
                  required
              />
            </div>
            <div className="flex flex-col w-96">
              <label htmlFor="password" className="text-gray-700 text-lg dark:text-gray-300">
                Password
              </label>
              <input
                  type="password"
                  id="password"
                  className="mt-1 p-2 border font-thin rounded-md shadow-sm focus:outline-none focus:ring focus:ring-purple-400 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                  placeholder="Enter your password"
                  required
              />
            </div>
            <button
                type="submit"
                className="mt-4 w-96 p-2 button-gradient text-white text-xl rounded-md hover:button-animate focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              Login
            </button>
          </form>
        </div>
      </div>
);
}
