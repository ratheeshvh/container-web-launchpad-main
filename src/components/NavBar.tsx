
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-slate-900 text-white py-4 px-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 5.5C13 4.94772 12.5523 4.5 12 4.5C11.4477 4.5 11 4.94772 11 5.5V11.5C11 12.0523 11.4477 12.5 12 12.5C12.5523 12.5 13 12.0523 13 11.5V5.5Z" fill="currentColor" />
            <path d="M10 7.5C10 6.94772 9.55228 6.5 9 6.5C8.44772 6.5 8 6.94772 8 7.5V11.5C8 12.0523 8.44772 12.5 9 12.5C9.55228 12.5 10 12.0523 10 11.5V7.5Z" fill="currentColor" />
            <path d="M7 9.5C7 8.94772 6.55228 8.5 6 8.5C5.44772 8.5 5 8.94772 5 9.5V11.5C5 12.0523 5.44772 12.5 6 12.5C6.55228 12.5 7 12.0523 7 11.5V9.5Z" fill="currentColor" />
            <path d="M16 7.5C16 6.94772 15.5523 6.5 15 6.5C14.4477 6.5 14 6.94772 14 7.5V11.5C14 12.0523 14.4477 12.5 15 12.5C15.5523 12.5 16 12.0523 16 11.5V7.5Z" fill="currentColor" />
            <path d="M19 9.5C19 8.94772 18.5523 8.5 18 8.5C17.4477 8.5 17 8.94772 17 9.5V11.5C17 12.0523 17.4477 12.5 18 12.5C18.5523 12.5 19 12.0523 19 11.5V9.5Z" fill="currentColor" />
            <path fillRule="evenodd" clipRule="evenodd" d="M3 6C3 4.34315 4.34315 3 6 3H18C19.6569 3 21 4.34315 21 6V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V6ZM6 5C5.44772 5 5 5.44772 5 6V18C5 18.5523 5.44772 19 6 19H18C18.5523 19 19 18.5523 19 18V6C19 5.44772 18.5523 5 18 5H6Z" fill="currentColor" />
          </svg>
          <span className="text-xl font-bold">Docker Web App</span>
        </div>
        
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-blue-300 transition-colors">Home</Link>
          <Link to="/dashboard" className="hover:text-blue-300 transition-colors">Dashboard</Link>
          <Link to="/volumes" className="hover:text-blue-300 transition-colors">Volumes</Link>
          <Link to="/logs" className="hover:text-blue-300 transition-colors">Logs</Link>
        </div>
        
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white hover:bg-slate-800"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 bg-slate-800 rounded-md p-4 absolute right-6 left-6 z-10">
          <div className="flex flex-col space-y-3">
            <Link 
              to="/" 
              className="px-4 py-2 hover:bg-slate-700 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/dashboard" 
              className="px-4 py-2 hover:bg-slate-700 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link 
              to="/volumes" 
              className="px-4 py-2 hover:bg-slate-700 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Volumes
            </Link>
            <Link 
              to="/logs" 
              className="px-4 py-2 hover:bg-slate-700 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Logs
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
