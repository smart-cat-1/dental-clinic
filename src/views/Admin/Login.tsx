import Footer from "../../components/Footer";
import Header from "../../components/Header";

export default function Login() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <Header />
      <main className="flex-1 flex justify-center items-center px-4">
        <div className="w-full max-w-md my-16 backdrop-blur-xl bg-white/80 border border-white/40 shadow-2xl rounded-3xl p-10 transition-all duration-300 hover:scale-[1.01]">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-800">
              Welcome Back
            </h2>
            <p className="text-gray-500 mt-2">
              Sign in to access admin dashboard
            </p>
          </div>
          <form className="space-y-5">
            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Username
              </label>

              <input
                type="text"
                id="username"
                placeholder="Enter your username"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Password
              </label>

              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all"
              />
            </div>

            {/* Remember me */}
            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center gap-2 text-gray-600">
                <input type="checkbox" className="rounded" />
                Remember me
              </label>

              <a
                href="#"
                className="text-blue-500 hover:text-blue-700 font-medium"
              >
                Forgot Password?
              </a>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
            >
              Login
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}