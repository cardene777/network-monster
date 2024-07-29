"use client";

import { Navigation } from "./Navigation";
import Image from "next/image";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletModalButton } from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";

export const Header = () => {
  const wallet: any = useWallet();
  return (
    <div className="w-full flex justify-between items-center">
      <Image src="/img/20.png" width={100} height={100} alt="logo" />
      <Navigation />
      <div>
        {!wallet ? (
          <p className="text-text-main">
            {wallet?.publicKey?.slice(0, 6)}...{wallet?.publicKey?.slice(-4)}
          </p>
        ) : (
          // <button
          //   onClick={() => connect()}
          //   className="text-btn-text bg-btn-bg rounded-md px-4 py-2"
          // >
          //   Connect
          // </button>
          // <WalletDisconnectButton />
          <WalletModalButton />
        )}
      </div>
    </div>
  );
};
