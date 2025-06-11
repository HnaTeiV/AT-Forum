'use client';

import Link from 'next/link';
import '../css/header.css';
import { FaSearch } from 'react-icons/fa';

export default function Header() {
  return (
    <header className="header fixed top-0 left-0 w-full z-50 bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo + Navigation */}
          <div className="flex items-center space-x-8">
            <div className="header-logo">AT-Forum</div>

            <nav className="hidden md:flex">
              <Link href="/" className="nav-link">Home</Link>
              <Link href="../page/project" className="nav-link">Project</Link>
              <Link href="/contact" className="nav-link">Contact</Link>
              <Link href="/more" className="nav-link">More</Link>
            </nav>
          </div>

          {/* Search + Button */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <FaSearch className="absolute left-3 top-2.5 text-gray-400 text-sm" />
              <input
                type="text"
                placeholder="Search"
                className="search-input"
              />
            </div>
            <button className="signup-btn">Sign up</button>
          </div>
        </div>
      </div>
    </header>
  );
}
