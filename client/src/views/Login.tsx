import Footer from '../components/Footer';
import Header from '../components/Header';

import { useState } from 'react';
import { loginRequest } from '../api/loginApi';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await loginRequest(username, password);
      if (response.ok) {
        navigate('/management');
      } else {
        alert('Invalid username or password');
      }
    } catch (error) {
      console.error(error);
      alert('Unable to connect to the login server');
    }
  }

  return (
    <div>
      <Header />

      <main className="flex justify-center items-center bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400">
        <div className="w-full max-w-md my-16 bg-white shadow-2xl rounded-3xl p-10 text-black transition-all duration-300">

          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold">
              Welcome Back
            </h2>
            <p className="text-gray-500 mt-2">
              Sign in to check appointments
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block text-sm  font-semibold mb-2">
                Username
              </label>
              <input 
              type="text"
              id="username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)} 
              placeholder="Enter your username" 
              className="w-full px-4 py-3 rounded-xl border border-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all"/>
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-semibold mb-2">
                Password
              </label>
              <input 
              type="password" 
              id="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Enter your password" 
              className="w-full px-4 py-3 rounded-xl border border-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all"/>
            </div>

            <button 
            type="submit" 
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
              Login
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
