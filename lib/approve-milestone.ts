"use client";

import { walletClient, quotationAbi } from "./contract";
import { Address } from "viem";

interface ApproveMilestoneParams {
    quotationAddress: Address;
    milestoneIndex: bigint; // idx
}

export async function approveMilestone({
    quotationAddress,
    milestoneIndex,
}: ApproveMilestoneParams) {
    try {
        if (!walletClient) {
            throw new Error("Please connect your wallet.");
        }

        // connected account (must be buyer)
        const [account] = await walletClient.getAddresses();
        if (!account) throw new Error("Wallet not connected");

        const txHash = await walletClient.writeContract({
            address: quotationAddress,
            abi: quotationAbi,
            functionName: "approveMilestone",
            args: [milestoneIndex],
            account,
        });

        return txHash;

    } catch (error) {
        console.error("Error approving milestone:", error);
        throw error;
    }
}
