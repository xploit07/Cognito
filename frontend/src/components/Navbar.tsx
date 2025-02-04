import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "../lib/utils";
import { GraduationCap, Menu, X , AlignRight } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white z-50 h-[76px] border-b-black ">
      <div className="max-w-[1400px] mx-auto h-full px-6 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <GraduationCap
              strokeWidth={2.25}
              size={40}
              className="mr-1 text-2xl font-semibold text-emerald-500"
            />
            <h1 className="text-3xl font-bold text-black">Cog</h1>
            <h1 className="text-3xl font-bold text-emerald-600 ml">Nito</h1>
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-10">
          <Link
            to="/about"
            className={cn(
              "transition-colors",
              isActive("/about")
                ? "text-emerald-600"
                : "text-gray-600 hover:text-emerald-600"
            )}
          >
            About
          </Link>
          <Link
            to="/contact"
            className={cn(
              "transition-colors",
              isActive("/contact")
                ? "text-emerald-600"
                : "text-gray-600 hover:text-emerald-600"
            )}
          >
            Contact
          </Link>
          <Link
            to="/login"
            className="bg-yellow-300 px-6 py-2.5 rounded-full font-medium hover:bg-yellow-400 transition-colors border-2 border-black"
          >
            Register Now
          </Link>
        </div>

        <div className="md:hidden flex items-center">
          <button
            className="text-gray-600 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <X className="w-7.5 h-7.5 cursor-pointer hover:text-emerald-500 transition ease-in delay-500 duration-300 hover:-translate-y-1 hover:scale-110" />
            ) : (
              <AlignRight className="w-7.5 h-7.5 cursor-pointer hover:text-emerald-500 transition delay-250 duration-300 hover:-translate-y-1 hover:scale-110" />
                
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-6 py-4 space-y-4">
            <Link
              to="/about"
              className={cn(
                "block transition-colors",
                isActive("/about")
                  ? "text-emerald-600"
                  : "text-gray-600 hover:text-emerald-600"
              )}
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={cn(
                "block transition-colors",
                isActive("/contact")
                  ? "text-emerald-600"
                  : "text-gray-600 hover:text-emerald-600"
              )}
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              to="/login"
              className="block bg-yellow-300 px-6 py-2.5 rounded-full font-medium hover:bg-yellow-400 transition-colors border-2 border-black"
              onClick={() => setMenuOpen(false)}
            >
              Register Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
