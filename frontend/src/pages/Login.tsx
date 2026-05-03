import { useState, useEffect } from "react";
import { useLogin } from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);

  const { login, isLoading, isError, error, reset } = useLogin();

  useEffect(() => {
    if (isError) {
      const message =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message ?? "Invalid credentials. Please try again.";
      toast.error(message);
    }
  }, [isError, error]);

  const handleSubmit = () => {
    if (!email || !password) return;
    reset();
    login({ email, password, remember });
  };

  return (
    <div className="flex w-full min-h-screen">
      <div className="flex-1 bg-white flex flex-col justify-center px-16 py-12">
        <div className="max-w-sm w-full mx-auto">
          <h1 className="text-3xl font-light text-gray-400 tracking-wide mb-10">
            Sign In
          </h1>
          <div className="mb-5">
            <label className="block text-xs font-bold tracking-widest text-gray-500 mb-2 uppercase">
              Email
            </label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="w-full px-5 py-3.5 rounded-full bg-gray-100 text-gray-600
                         placeholder-gray-400 text-sm outline-none
                         focus:ring-2 focus:ring-[#e8566c]/30 transition-all
                         disabled:opacity-50"
            />
          </div>

          <div className="mb-6">
            <label className="block text-xs font-bold tracking-widest text-gray-500 mb-2 uppercase">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              disabled={isLoading}
              className="w-full px-5 py-3.5 rounded-full bg-gray-100 text-gray-600
                         placeholder-gray-400 text-sm outline-none
                         focus:ring-2 focus:ring-[#e8566c]/30 transition-all
                         disabled:opacity-50"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={isLoading || !email || !password}
            className="w-full py-3.5 rounded-full bg-[#e8566c] text-white font-bold
                       text-sm tracking-wide hover:opacity-90 active:scale-[0.99]
                       transition-all mb-5 shadow-md shadow-[#e8566c]/30
                       disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? "Signing in…" : "Sign In"}
          </button>

          <div className="flex items-center justify-between">
            <label
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setRemember(!remember)}
            >
              <div
                className={`w-5 h-5 rounded flex items-center justify-center transition-colors
                              ${remember ? "bg-[#e8566c]" : "border-2 border-gray-300"}`}
              >
                {remember && (
                  <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                    <path
                      d="M1 4L4 7.5L10 1"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
              <span className="text-sm text-[#e8566c] font-semibold">
                Remember Me
              </span>
            </label>
            <a
              href="#"
              className="text-sm text-gray-400 hover:text-[#e8566c] transition-colors"
            >
              Forgot Password
            </a>
          </div>
        </div>
      </div>

      <div className="w-[45%] flex flex-col items-center justify-center bg-[#e8566c]">
        <div className="text-center px-10">
          <h2 className="text-4xl font-extrabold text-white mb-4 leading-tight">
            Welcome to login
          </h2>
          <p className="text-white/80 text-sm mb-8">Don't have an account?</p>
          <button
            onClick={() => navigate("/signup")}
            className="px-10 py-3 rounded-full border-2 border-white text-white font-bold
                       text-sm hover:bg-white hover:text-[#e8566c] transition-all"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
