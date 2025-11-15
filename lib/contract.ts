
import QuotationFactoryAbi from '../frontend-abis/QuotationFactory.json';
import QuotationAbi from '../frontend-abis/Quotation.json';
import { createPublicClient, createWalletClient, custom, EIP1193Provider, http } from 'viem';
import { sepolia } from 'wagmi/chains';

// Your deployed factory address
export const factoryAddress = '0xE221fC6F3c8E660772E8D089E0F6C8827F9A8228';

// Infura key from environtment variables
// const infuraKey = process.env.NEXT_PUBLIC_INFURA_API_KEY;

// Public client (read-only)
export const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(),
    // transport: http(`https://sepolia.infura.io/v3/${infuraKey}`),
});

// Wallet client (write, requires user to connect wallet)
export const walletClient = typeof window !== 'undefined' && (window as { ethereum?: EIP1193Provider }).ethereum
    ? createWalletClient({
        chain: sepolia,
        transport: custom((window as { ethereum: EIP1193Provider }).ethereum),
    })
    : null;

export const quotationFactoryAbi = QuotationFactoryAbi.abi;
export const quotationAbi = QuotationAbi.abi;