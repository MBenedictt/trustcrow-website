"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import CustomWalletButton from "./custom-wallet-button";
import Image from "next/image";
import { SquareArrowOutUpRight } from "lucide-react";

const LandingNavbar = () => {
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
            className={`fixed top-0 left-0 w-full bg-white z-50 border-b border-gray-100 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300 ease-in-out overflow-hidden ${navbarHeight}`}
        >
            <div
                className={`flex justify-between items-center px-10 max-md:px-5 transition-all duration-300 ease-in-out ${navbarOpacity} h-full`}
            >
                <Link href="/" className="text-2xl font-extrabold text-[#286763] flex items-center gap-2">
                    <i>
                        <Image src="/trustcrow-icon.png" alt="TrustCrow Logo" width={28} height={28} />
                    </i>
                    TrustCrow
                </Link>

                <Link href="/dashboard" className="flex items-center gap-2 bg-primary/10 border border-primary/50 text-sm text-primary hover:text-primary-foreground hover:bg-primary/90 px-3 py-2 rounded-md transition">
                    Launch App <SquareArrowOutUpRight className="h-4 w-4" />
                </Link>
            </div>
        </div>
    );
};

export default LandingNavbar;
