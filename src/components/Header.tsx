"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all ${
        isScrolled ? "border-b border-[#525c5c]" : ""
      }`}
    >
      <div className="bg-transparent backdrop-blur hover:backdrop-blur-md p-4">
        <Link href="/">
          <h1 className="text-xl font-bold">FeBlog</h1>
        </Link>
      </div>
    </header>
  );
};

export default Header;
