import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Command, CheckCircle2 } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import AestheticBackground from "../theme/AestheticBackground";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login, isLogin } = useAuthStore();

  function handleSubmit(e) {
    e.preventDefault();
    login(formData);
  }

  return (
    <div className="h-screen w-full bg-[#080808] flex justify-center items-center overflow-hidden relative font-sans">
      <AestheticBackground />
      
      <div className="z-10 h-[85vh] w-[95vw] max-w-7xl bg-white/[0.01] backdrop-blur-3xl border border-white/10 rounded-[3rem] flex overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)]">
        
        {/* LEFT SIDE: Visual Showcase (Redesigned with Bento Style) */}
        <div className="hidden lg:flex h-full w-[55%] bg-gradient-to-br from-blue-600/10 to-transparent relative p-12 flex-col justify-between border-r border-white/5">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-xl">
              <Command className="text-white" size={24} />
            </div>
            <span className="text-white font-bold text-xl tracking-tight">HAMA</span>
          </div>

          <div className="relative">
            {/* Image Bento Grid */}
            <div className="grid grid-cols-6 grid-rows-2 gap-4 h-[400px]">
              <div className="col-span-3 row-span-2 rounded-3xl overflow-hidden border border-white/10">
                <img src="https://picsum.photos/seed/67/600/800" className="w-full h-full object-cover opacity-80 hover:scale-110 transition-transform duration-700" alt="UI" />
              </div>
              <div className="col-span-3 row-span-1 rounded-3xl overflow-hidden border border-white/10">
                <img src="https://picsum.photos/seed/88/600/400" className="w-full h-full object-cover opacity-60" alt="UI" />
              </div>
              <div className="col-span-3 row-span-1 rounded-3xl overflow-hidden border border-white/10">
                <img src="https://picsum.photos/seed/42/600/400" className="w-full h-full object-cover opacity-60" alt="UI" />
              </div>
            </div>

            {/* Floating Achievement Card */}
            <div className="absolute -bottom-6 -right-6 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl flex items-center gap-3 shadow-2xl animate-bounce-slow">
              <div className="bg-green-500/20 p-2 rounded-full">
                <CheckCircle2 className="text-green-500" size={20} />
              </div>
              <div>
                <p className="text-white text-xs font-bold">1.2k+ Online Now</p>
                <p className="text-gray-400 text-[10px]">Real-time synchronization</p>
              </div>
            </div>
          </div>

          <div className="max-w-md">
            <h2 className="text-4xl font-bold text-white leading-tight mb-4">
              Securely sign in to your <span className="text-blue-500">Workspace.</span>
            </h2>
            <p className="text-gray-500 text-sm">
              Your messages, files, and collaborators are just one secure step away.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE: Login Form */}
        <div className="h-full w-full lg:w-[45%] flex flex-col justify-center px-8 md:px-20 bg-black/40">
          <div className="mb-12">
            <h3 className="text-3xl font-bold text-white mb-2">Welcome Back</h3>
            <p className="text-gray-400">Please enter your details to continue.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm text-gray-400 ml-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter your email"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-sm text-gray-400">Password</label>
                <button type="button" className="text-xs text-blue-500 hover:text-blue-400">Forgot Password?</button>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLogin}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2 group mt-4"
            >
              {isLogin ? "Processing..." : "Log In"}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-12 text-center">
            <p className="text-gray-500 text-sm">
              New to the platform?{" "}
              <Link to="/signup" className="text-blue-400 hover:text-blue-300 font-bold underline underline-offset-8">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;