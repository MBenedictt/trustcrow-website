"use client";

import { walletClient, quotationAbi } from "./contract";
import { Address } from "viem";

interface SubmitDeliverableParams {
    quotationAddress: Address;
    milestoneIndex: bigint; // idx
    note: string;
}

export async function submitDeliverable({
    quotationAddress,
    milestoneIndex,
    note,
}: SubmitDeliverableParams) {
    try {
        if (!walletClient) {
            throw new Error("Please connect your wallet.");
        }

        // connected wallet account
        const [account] = await walletClient.getAddresses();
        if (!account) throw new Error("Wallet not connected");

        const txHash = await walletClient.writeContract({
            address: quotationAddress,
            abi: quotationAbi,
            functionName: "submitDeliverable",
            args: [milestoneIndex, note],
            account,
        });

        return txHash;

    } catch (error) {
        console.error("Error submitting deliverable:", error);
        throw error;
    }
}
