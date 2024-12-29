import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Homepage() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center bg-green-100 p-8">
     <header className="w-full flex justify-between items-center p-4 bg-green-700 text-white shadow-lg">
        <h1 className="text-2xl font-bold">Parknership Cafe</h1>
        <nav className="hidden md:flex gap-4">
          <Link href="/" legacyBehavior>
            <a className="px-4 py-2 rounded hover:bg-green-600 transition duration-300">Home</a>
          </Link>
          <Link href="/menu" legacyBehavior>
            <a className="px-4 py-2 rounded hover:bg-green-600 transition duration-300">Menu</a>
          </Link>
          <Link href="/cart" legacyBehavior>
            <a className="px-4 py-2 rounded hover:bg-green-600 transition duration-300">Cart</a>
          </Link>
        </nav>
        <button
          className="md:hidden w-8 h-8 flex flex-col justify-center items-center bg-green-600 text-white rounded"
          onClick={() => setIsNavOpen(true)}
        >
          ☰
        </button>
      </header>

      {/* Sidebar */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-10 transition-transform transform ${
          isNavOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={() => setIsNavOpen(false)} // Close sidebar when clicking outside
      >
        <nav
          className="fixed right-0 top-0 h-full w-64 bg-green-700 text-white shadow-lg flex flex-col items-center justify-center transition-transform transform ${
            isNavOpen ? 'translate-x-0' : 'translate-x-full'
          }"
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the sidebar
        >
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full"
            onClick={() => setIsNavOpen(false)}
          >
            ✖
          </button>
          <Link href="/" legacyBehavior>
            <a
              className="px-4 py-2 rounded hover:bg-white hover:text-black transition duration-300 mb-4"
              onClick={() => setIsNavOpen(false)} // Close sidebar on navigation
            >
              Home
            </a>
          </Link>
          <Link href="/menu" legacyBehavior>
            <a
              className="px-4 py-2 rounded hover:bg-white hover:text-black transition duration-300 mb-4"
              onClick={() => setIsNavOpen(false)} // Close sidebar on navigation
            >
              Menu
            </a>
          </Link>
          <Link href="/cart" legacyBehavior>
            <a
              className="px-4 py-2 rounded hover:bg-white hover:text-black transition duration-300"
              onClick={() => setIsNavOpen(false)} // Close sidebar on navigation
            >
              Cart
            </a>
          </Link>
        </nav>
      </div>

      <main className="flex flex-col items-center mt-8 w-full">
        <h2 className="text-4xl font-bold text-green-800 mb-4">Welcome to Parknership Cafe</h2>
        <p className="text-lg text-green-700 mb-8 text-center">
          Enjoy our selection of freshly brewed coffee and tea. We offer a variety of beverages to suit your taste.
        </p>
        <Image src="/Logo.png" alt="Cafe" width={600} height={400} className="rounded-lg shadow-lg mb-8" />
        <Link href="/menu" legacyBehavior>
          <a className="px-6 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 transition duration-300">
            View Menu
          </a>
        </Link>
      </main>

      <footer className="mt-12 text-center text-green-600">
        <p className="text-sm">© 2023 Parknership. All rights reserved.</p>
      </footer>
    </div>
  );
}