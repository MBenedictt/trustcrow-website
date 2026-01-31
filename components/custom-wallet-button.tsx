'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function CustomWalletButton() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <ConnectButton.Custom>
            {({ account, chain, openAccountModal, openConnectModal }) => {
                const connected = account && chain;

                return connected ? (
                    <button
                        onClick={openAccountModal}
                        className="cursor-pointer p-1 rounded-lg text-sm font-medium bg-gray-100 border border-gray-200 text-black hover:opacity-90 transition hover:scale-103 flex items-center gap-2"
                    >
                        <div className="flex items-center gap-2 px-2 py-1">
                            <div className="w-4 h-4 bg-green-400/10 rounded-full flex justify-center items-center">
                                <div className="w-2 h-2 bg-green-400 rounded-full" />
                            </div>
                            <span className="text-sm font-semibold text-black">
                                {account.displayName}
                            </span>
                            <span className="hidden md:inline text-xs text-black/60">
                                ({account.displayBalance})
                            </span>
                        </div>
                    </button>
                ) : (
                    <button
                        onClick={openConnectModal}
                        className="cursor-pointer px-4 py-2 text-white rounded-lg text-sm font-medium bg-[#2ABE9E] text-slate-800 hover:bg-[#28A88C] transition hover:scale-103"
                    >
                        Connect
                    </button>
                );
            }}
        </ConnectButton.Custom>
    );
}