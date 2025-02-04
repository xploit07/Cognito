import React from 'react';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';


const Hero = () => {
  return (
    <div className="grid md:grid-cols-2 min-h-screen pt-[76px] font-outfit">
      <div className="bg-emerald-400 p-8 md:p-16 flex flex-col justify-center">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
        Your Complete Learning Companion
        </h1>
        <p className="text-lg mb-8 opacity-90">
        Manage courses, track attendance, and ace exams—all in one place. 
        Designed exclusively for our college students to simplify and enhance 
        your learning experience.
        </p>
        <div className="relative max-w-xl">
          <input
            type="text"
            placeholder="Search any course"
            className="w-full px-6 py-3.5 pr-32 rounded-full bg-white text-gray-800 border-2 border-black"
          />
          <Link 
            to="/login" 
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-yellow-300 px-6 py-2 rounded-full font-medium hover:bg-yellow-400 transition-colors border-2 border-black"
          >
            <Search size={24} strokeWidth={3} className="inline-block -mt-1 mr-2" />
            Search Now
          </Link>
        </div>
      </div>

      <div className="bg-violet-400 relative md:block">
        <img
          
          src="./src/assets/hero-pg-photo.png"
          alt="Student with books"
          className="relative inset-0 w-full h-full object-fit"
        />
      </div>
    </div>
  );
};

export default Hero;
