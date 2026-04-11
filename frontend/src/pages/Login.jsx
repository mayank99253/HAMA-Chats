import React, { useState } from "react";
import { Link } from 'react-router-dom'
import { User, Mail, Lock, ArrowRight } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import AestheticBackground from "../theme/AestheticBackground";
const Login = () => {

  const [formData, setFormData] = useState({ email: "", password: "" })
  const { login, isLogin} = useAuthStore()

  function handleSubmit(e) {
    e.preventDefault();
    login(formData)
  }
  return (
    <div className="h-screen w-full bg-[#0a0a0a] flex justify-center items-center overflow-hidden relative font-sans">
      {/* Aesthetic Background Elements */}
     <AestheticBackground />
      <div className="z-10 h-[90vh] w-[90vw] max-w-6xl bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[2.5rem] flex overflow-hidden shadow-2xl">

        {/* Left Side: Login/Signup Form */}
        <div className="h-full w-full lg:w-[40%] flex flex-col justify-center px-8 md:px-16 border-r border-white/5 bg-black/20">
          <div className="mb-10 flex flex-col gap-1">
            <p className="text-white font-sans pl-1">Welcome to</p>
            <h1 className="text-4xl font-bold text-white tracking-tight">
              HAMA <span className="text-blue-500">Chats</span>
            </h1>
            <p className="text-gray-400 mt-2 text-sm leading-relaxed">
              Experience the next generation of connecting with the world.
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">

                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors" size={18} />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => { setFormData({ ...formData, email: e.target.value }) }}
                    placeholder="Email Address"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:border-blue-500/50 focus:bg-white/[0.08] transition-all"
                  />
                </div>

                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors" size={18} />
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => { setFormData({ ...formData, password: e.target.value }) }}
                    placeholder="Password"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:border-blue-500/50 focus:bg-white/[0.08] transition-all"
                  />
                </div>

                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-4 rounded-2xl shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2 group">
                  Logged In
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>


            <p className="text-center text-gray-500 text-sm">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-400 hover:text-blue-300 font-medium underline-offset-4 hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>

        {/* Right Side: Visual Showcase */}
        <div className="hidden lg:flex h-full w-[60%] bg-[#080808] relative items-center justify-center overflow-hidden p-12">
          {/* Animated Image Grid inspired by modern landing pages */}
          <div className="grid grid-cols-3 gap-4 rotate-[12deg] scale-110 opacity-40">
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className={`h-48 w-48 rounded-3xl bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10 shadow-2xl overflow-hidden ${i % 2 === 0 ? 'translate-y-12' : ''}`}
              >
                <img
                  src={`https://picsum.photos/seed/${i + 40}/400/400`}
                  alt="community"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
            ))}
          </div>

          {/* Overlay Content */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex flex-col justify-end p-16">
            <h2 className="text-4xl font-bold text-white mb-4">Connect with developers <br /> and creators.</h2>
            <p className="text-gray-400 max-w-md">
              Join a community of over 10,000+ users sharing their thoughts and building the future of the web together.
            </p>
          </div>
        </div>
      </div>
    </div >
  );
};

export default Login;