import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSignup } from "../hooks/useSignup";
import { toast } from "react-toastify";
import type { Role } from "../interfaces/index";

export default function SignupPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("MEMBER");

  const { signup, isLoading, isError, error, reset } = useSignup();

  useEffect(() => {
    if (isError) {
      const message =
        (error as any)?.response?.data?.message ??
        "Signup failed. Please try again.";
      toast.error(message);
    }
  }, [isError, error]);

  const handleSubmit = () => {
    if (!name || !email || !password) return;
    reset();
    signup({ name, email, password, role });
  };

  return (
    <div className="flex w-full min-h-screen">
      <div className="w-[45%] flex flex-col items-center justify-center bg-[#e8566c]">
        <div className="text-center px-10">
          <h2 className="text-4xl font-extrabold text-white mb-4 leading-tight">
            Welcome back!
          </h2>
          <p className="text-white/80 text-sm mb-8">Already have an account?</p>
          <button
            onClick={() => navigate("/login")}
            className="px-10 py-3 rounded-full border-2 border-white text-white font-bold text-sm hover:bg-white hover:text-[#e8566c] transition-all"
          >
            Sign In
          </button>
        </div>
      </div>

      <div className="flex-1 bg-white flex flex-col justify-center px-16 py-12">
        <div className="max-w-sm w-full mx-auto">
          <h1 className="text-3xl font-light text-gray-400 tracking-wide mb-10">
            Sign Up
          </h1>
          <div className="mb-5">
            <label className="block text-xs font-bold tracking-widest text-gray-500 mb-2 uppercase">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isLoading}
              className="w-full px-5 py-3.5 rounded-full bg-gray-100 text-gray-600
                         placeholder-gray-400 text-sm outline-none
                         focus:ring-2 focus:ring-[#e8566c]/30 transition-all disabled:opacity-50"
            />
          </div>

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
                         focus:ring-2 focus:ring-[#e8566c]/30 transition-all disabled:opacity-50"
            />
          </div>

          <div className="mb-5">
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
                         focus:ring-2 focus:ring-[#e8566c]/30 transition-all disabled:opacity-50"
            />
          </div>

          <div className="mb-6">
            <label className="block text-xs font-bold tracking-widest text-gray-500 mb-2 uppercase">
              Role
            </label>
            <div className="flex gap-3">
              {(["MEMBER", "ADMIN"] as Role[]).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  disabled={isLoading}
                  className={`flex-1 py-2.5 rounded-full text-sm font-bold border-2 transition-all disabled:opacity-50
                    ${
                      role === r
                        ? "bg-[#e8566c] border-[#e8566c] text-white"
                        : "border-gray-200 text-gray-400 hover:border-[#e8566c] hover:text-[#e8566c]"
                    }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={isLoading || !name || !email || !password}
            className="w-full py-3.5 rounded-full bg-[#e8566c] text-white font-bold
                       text-sm tracking-wide hover:opacity-90 active:scale-[0.99]
                       transition-all mb-5 shadow-md shadow-[#e8566c]/30
                       disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? "Creating account…" : "Sign Up"}
          </button>

          <p className="text-center text-xs text-gray-400">
            By signing up, you agree to our{" "}
            <a
              href="#"
              className="text-[#e8566c] font-semibold hover:underline"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="text-[#e8566c] font-semibold hover:underline"
            >
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
