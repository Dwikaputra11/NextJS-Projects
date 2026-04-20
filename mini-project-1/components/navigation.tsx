import React from 'react';
import Link from "next/link";

const Navigation = () => {
  return (
    <nav className={"bg-white shadow-sm border-b border-gray-200"}>
      <div className={"max-w-6xl mx-auto px-4"}>
        <div className={"flex justify-between items-center h-16"}>
          {/* Logo */}
          <div className={"shrink-0"}>
            <Link href={"/"} className={"text-xl font-bold text-gray-800"}>
              MyWebsite
            </Link>
          </div>

        {/* Navigation Links*/}
          <div className={"hidden md:block"}>
            <div className="ml-10 flex items-baseline space-x-8">
              <Link href={"/"} className={"text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"}>
                Home
              </Link>

              <Link href={"/about"} className={"text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"}>
                About
              </Link>

              <Link href={"/contact"} className={"text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"}>
                Contact
              </Link>
            </div>
          </div>
          <div className="md:hidden">
            <button className="text-gray-600 hover:text-gray-900 p-2">
              <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
              >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link href={"/"} className={"text-gray-600 hover:text-gray-900 px-3 py-2 text-base font-medium transition-colors"}>
                Home
              </Link>

              <Link href={"/about"} className={"text-gray-600 hover:text-gray-900 px-3 py-2 text-base font-medium transition-colors"}>
                About
              </Link>

              <Link href={"/contact"} className={"text-gray-600 hover:text-gray-900 px-3 py-2 text-base font-medium transition-colors"}>
                Contact
              </Link>
            </div>
          </div>
          
        </div>
      </div>
    </nav>
  );
};

export default Navigation;