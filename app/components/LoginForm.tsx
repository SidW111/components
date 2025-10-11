export default function LoginForm() {
  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 min-h-screen flex items-center justify-center">
      <div className="bg-gray-800/70 w-full max-w-md p-8 backdrop-blur-lg text-white border border-white/10 rounded-2xl shadow-xl">
        <h2 className="text-3xl text-white text-center font-bold mb-4">
          Login
        </h2>
        <p className="text-center text-gray-300 text-sm mb-4">
          Enter your credentials to continue
        </p>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="username"
            id=""
            className="px-4 py-3 border border-gray-600 bg-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all "
          />
          <input
            type="password"
            placeholder="password"
            id=""
            className="px-4 py-3 border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder-gray-400 rounded-xl"
          />
          <button className="px-4 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-xl font-semibold border border-gray-600 text-center text-white ">
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
