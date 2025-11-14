"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import CustomWalletButton from "./custom-wallet-button";

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);

    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show when scrolling up, hide when scrolling down
      setShowNavbar(currentScrollY <= lastScrollY || currentScrollY <= 50);

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navbarHeight = hydrated && !showNavbar ? "h-0" : "h-[70px]";
  const navbarOpacity = hydrated && !showNavbar ? "opacity-0" : "opacity-100";

  return (
    <div
      className={`fixed top-0 left-0 w-full bg-white z-50 border-b border-gray-200 transition-all duration-300 ease-in-out overflow-hidden ${navbarHeight}`}
    >
      <div
        className={`flex justify-between items-center px-10 max-md:px-5 transition-all duration-300 ease-in-out ${navbarOpacity} h-full`}
      >
        {/* Logo / Brand */}
        <Link href="/" className="text-2xl font-bold text-[#180D39]">
          TrustCrow
        </Link>

        {/* Wallet Button */}
        <CustomWalletButton />
      </div>
    </div>
  );
};

export default Navbar;
