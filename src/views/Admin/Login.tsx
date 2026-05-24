import Footer from "../../components/Footer";
import Header from "../../components/Header";

export default function Login() {
  return (
    <div>
      <Header />
      <div className="flex justify-center items-center h-screen w-screen bg-gray-100">
        <div className="bg-white p-8 px-20 rounded shadow-md">
          <h2 className="text-3xl font-semibold mb-4 rounded">Admin Login</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700 font-semibold">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 font-semibold">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Login
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}