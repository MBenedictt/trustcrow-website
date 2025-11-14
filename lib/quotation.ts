import { publicClient, factoryAddress, quotationFactoryAbi, quotationAbi } from "./contract";
import { Address, Abi } from "viem";

// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────

export type HydratedMilestone = {
    percentBP: bigint;
    amount: bigint;
    status: number;
    submittedAt: bigint;
    revisions: number;
    deadlineAt: bigint;
    note: string;
    buyerCancelConfirm: boolean;
    sellerCancelConfirm: boolean;
};

export type HydratedQuotation = {
    address: Address;
    seller: Address;
    buyer: Address;
    totalAmount: bigint;
    paidAt: bigint;
    createdAt: bigint;
    status: number;
    clientWindow: bigint;
    currentMilestone: bigint;
    maxRevisions: number;
    milestones: HydratedMilestone[];

    // NEW FIELDS
    sellerStakeAmount: bigint;
    stakeReleased: boolean;
};

// ─────────────────────────────────────────────────────────────
// MULTICALL HELPERS
// ─────────────────────────────────────────────────────────────

// getOrder() returns full order info
function getQuotationOrderMulticall(address: Address) {
    return [
        { address, abi: quotationAbi as Abi, functionName: "getOrder" },
        { address, abi: quotationAbi as Abi, functionName: "milestoneCount" },

        // NEW — read stake fields
        { address, abi: quotationAbi as Abi, functionName: "sellerStakeAmount" },
        { address, abi: quotationAbi as Abi, functionName: "stakeReleased" },
    ];
}

// For each milestone
function getMilestoneMulticall(address: Address, idx: number) {
    return [
        { address, abi: quotationAbi as Abi, functionName: "getMilestone", args: [idx] },
    ];
}

// ─────────────────────────────────────────────────────────────
// HYDRATION
// ─────────────────────────────────────────────────────────────

export async function hydrateQuotation(address: Address): Promise<HydratedQuotation> {
    const results = await publicClient.multicall({
        contracts: getQuotationOrderMulticall(address),
    });

    const [
        orderResult,
        milestoneCountResult,
        sellerStakeAmountResult,
        stakeReleasedResult
    ] = results.map(r => r.result);

    const [
        seller,
        buyer,
        totalAmount,
        paidAt,
        createdAt,
        status,
        clientWindow,
        currentMilestone,
        maxRevisions
    ] = orderResult as any[];

    const milestoneCount = Number(milestoneCountResult);

    // fetch milestones
    let milestoneCalls: any[] = [];
    for (let i = 0; i < milestoneCount; i++) {
        milestoneCalls.push(...getMilestoneMulticall(address, i));
    }

    let milestoneResults = milestoneCalls.length
        ? (await publicClient.multicall({ contracts: milestoneCalls })).map(r => r.result)
        : [];

    const milestones: HydratedMilestone[] = [];

    for (let i = 0; i < milestoneResults.length; i++) {
        const [
            percentBP,
            amount,
            mStatus,
            submittedAt,
            revisions,
            deadlineAt,
            note,
            buyerCancelConfirm,
            sellerCancelConfirm
        ] = milestoneResults[i] as any[];

        milestones.push({
            percentBP,
            amount,
            status: Number(mStatus),
            submittedAt,
            revisions: Number(revisions),
            deadlineAt,
            note,
            buyerCancelConfirm,
            sellerCancelConfirm,
        });
    }

    return {
        address,
        seller,
        buyer,
        totalAmount,
        paidAt,
        createdAt,
        status: Number(status),
        clientWindow,
        currentMilestone,
        maxRevisions: Number(maxRevisions),
        milestones,

        // NEW FIELDS
        sellerStakeAmount: sellerStakeAmountResult as bigint,
        stakeReleased: Boolean(stakeReleasedResult),
    };
}

// ─────────────────────────────────────────────────────────────
// FACTORY API
// ─────────────────────────────────────────────────────────────

export async function getUserQuotations(user: Address): Promise<HydratedQuotation[]> {
    const quotationAddresses = await publicClient.readContract({
        address: factoryAddress,
        abi: quotationFactoryAbi,
        functionName: "getUserQuotations",
        args: [user]
    }) as Address[];

    return Promise.all(quotationAddresses.map(addr => hydrateQuotation(addr)));
}

export async function getBuyerQuotations(user: Address): Promise<HydratedQuotation[]> {
    const quotationAddresses = await publicClient.readContract({
        address: factoryAddress,
        abi: quotationFactoryAbi,
        functionName: "getBuyerQuotations",
        args: [user]
    }) as Address[];

    return Promise.all(quotationAddresses.map(addr => hydrateQuotation(addr)));
}

export async function fetchQuotationByAddress(address: Address): Promise<HydratedQuotation | null> {
    try {
        return await hydrateQuotation(address);
    } catch (err) {
        console.error("Failed to fetch quotation:", err);
        return null;
    }
}
