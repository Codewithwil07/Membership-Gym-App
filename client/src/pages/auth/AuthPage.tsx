import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

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
    <div className="flex min-h-screen items-center justify-center bg-neutral-900">
      <div className="w-full max-w-md bg-neutral-800 p-8 rounded-xl">
        <h2 className="text-center text-2xl font-bold mb-4 text-white">
          {isLogin ? "Login" : "Register"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <input
                name="username"
                placeholder="Username"
                onChange={handleChange}
                className="w-full p-2 rounded bg-neutral-700 text-white"
              />
              <input
                name="no_hp"
                placeholder="No HP"
                onChange={handleChange}
                className="w-full p-2 rounded bg-neutral-700 text-white"
              />
            </>
          )}
          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full p-2 rounded bg-neutral-700 text-white"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full p-2 rounded bg-neutral-700 text-white"
          />
          <button
            type="submit"
            className="w-full p-2 rounded bg-green-500 text-black font-bold"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>
        <p className="text-center mt-4 text-neutral-400">
          {isLogin ? "Belum punya akun?" : "Sudah punya akun?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-green-400 underline"
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}
