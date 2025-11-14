"use client";

import { walletClient, quotationAbi } from "./contract";
import { Address } from "viem";

export async function payQuotation(
    quotationAddress: Address,
    totalAmount: bigint
) {
    try {
        if (!walletClient) {
            throw new Error("Please connect your wallet.");
        }

        // get connected wallet address
        const [account] = await walletClient.getAddresses();
        if (!account) throw new Error("Wallet not connected");

        const txHash = await walletClient.writeContract({
            address: quotationAddress,
            abi: quotationAbi,
            functionName: "pay",
            args: [],
            account,
            value: totalAmount, // payable ETH sent
        });

        return txHash;

    } catch (error) {
        console.error("Error calling pay():", error);
        throw error;
    }
}
