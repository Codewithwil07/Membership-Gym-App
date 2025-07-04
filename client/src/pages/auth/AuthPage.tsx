import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: '', password: '', username: '' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => { e.preventDefault(); console.log(formData); };

  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-2 bg-black">
      <div className="hidden md:block">
          <img src="https://images.unsplash.com/photo-1558611848-73f7eb4001a1?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Music Vibe" className="h-full w-full object-cover" />
        </div>
      <div className="flex items-center justify-center p-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md rounded-2xl bg-neutral-900 p-8 shadow-lg">
          <h1 className="mb-6 text-center text-3xl font-bold text-green-500">{isLogin ? 'Welcome Back!' : 'Register Now!'}</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} className="w-full rounded-lg border border-neutral-700 bg-neutral-800 p-3 text-white placeholder-neutral-500 focus:border-green-500 focus:outline-none" />}
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full rounded-lg border border-neutral-700 bg-neutral-800 p-3 text-white placeholder-neutral-500 focus:border-green-500 focus:outline-none" />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full rounded-lg border border-neutral-700 bg-neutral-800 p-3 text-white placeholder-neutral-500 focus:border-green-500 focus:outline-none" />
            <button type="submit" className="w-full rounded-lg bg-green-500 p-3 font-semibold text-black hover:bg-green-400 transition">{isLogin ? 'Login' : 'Register'}</button>
          </form>
          <p className="mt-4 text-center text-neutral-400">{isLogin ? "Don't have an account?" : "Already have an account?"} <button onClick={() => setIsLogin(!isLogin)} className="font-semibold text-green-500 hover:underline">{isLogin ? 'Register' : 'Login'}</button></p>
        </motion.div>
      </div>
    </div>
  );
}
