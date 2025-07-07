// src/pages/AuthPage.tsx

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Dumbbell, Lock, User, Phone } from "lucide-react";

export default function AuthPage() {
  const { user, loading, login, register } = useAuth();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    no_hp: "",
  });

  useEffect(() => {
    if (!loading && user) {
      navigate(user.role === "admin" ? "/admin/dashboard" : "/dashboard", { replace: true });
    }
  }, [user, loading, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        await register(formData);
        setIsLogin(true);
      }
    } catch {}
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950 p-4">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-neutral-900 rounded-xl shadow-2xl overflow-hidden"
      >
        <div className="p-6 flex flex-col items-center text-center">
          <motion.div
            initial={{ rotate: -15 }}
            animate={{ rotate: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="bg-green-500 rounded-full p-3 mb-4"
          >
            <Dumbbell className="w-8 h-8 text-black" />
          </motion.div>
          <h2 className="text-2xl font-bold text-white mb-2">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="text-neutral-400 mb-4 text-sm">
            {isLogin ? "Login to your membership account" : "Register to join our gym membership"}
          </p>
          <form onSubmit={handleSubmit} className="space-y-3 w-full">
            {!isLogin && (
              <>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 w-5 h-5 text-neutral-400" />
                  <input
                    name="username"
                    placeholder="Username"
                    onChange={handleChange}
                    className="pl-10 p-2 w-full rounded bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div className="relative">
                  <Phone className="absolute left-3 top-2.5 w-5 h-5 text-neutral-400" />
                  <input
                    name="no_hp"
                    placeholder="Phone Number"
                    onChange={handleChange}
                    className="pl-10 p-2 w-full rounded bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </>
            )}
            <div className="relative">
              <User className="absolute left-3 top-2.5 w-5 h-5 text-neutral-400" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                className="pl-10 p-2 w-full rounded bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 w-5 h-5 text-neutral-400" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                className="pl-10 p-2 w-full rounded bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 transition text-black font-semibold py-2 rounded mt-2"
            >
              {isLogin ? "Login" : "Register"}
            </button>
          </form>
          <p className="text-neutral-400 mt-4 text-sm">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-green-400 hover:underline transition"
            >
              {isLogin ? "Register" : "Login"}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
