'use client';

import { walletClient, quotationFactoryAbi, factoryAddress } from "./contract";
import { Address } from "viem";

export interface CreateQuotationParams {
    buyer: Address;
    totalAmount: bigint;

    milestonePercentsBP: bigint[];
    milestoneDeadlines: bigint[];
    milestoneTitles: string[];
    milestoneDescriptions: string[];

    projectTitle: string;
    projectDescription: string;

    clientWindowSeconds: bigint;
    maxRevisions: number;

    sellerStakeAmount: bigint;
}

export async function createQuotation({
    buyer,
    totalAmount,
    projectTitle,
    projectDescription,

    milestonePercentsBP,
    milestoneDeadlines,
    milestoneTitles,
    milestoneDescriptions,

    clientWindowSeconds,
    maxRevisions,
    sellerStakeAmount
}: CreateQuotationParams) {
    try {
        if (!walletClient) {
            throw new Error("Please connect your wallet.");
        }

        const [account] = await walletClient.getAddresses();

        const txHash = await walletClient.writeContract({
            address: factoryAddress,
            abi: quotationFactoryAbi,
            functionName: "createQuotation",
            args: [
                buyer,
                totalAmount,
                milestonePercentsBP,
                milestoneDeadlines,
                clientWindowSeconds,
                maxRevisions,
                projectTitle,
                projectDescription,
                milestoneTitles,
                milestoneDescriptions
            ],
            account,
            value: sellerStakeAmount
        });

        return txHash;

    } catch (error) {
        console.error("Error creating quotation:", error);
        throw error;
    }
}

