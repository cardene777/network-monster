"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useWallet } from "@solana/wallet-adapter-react";
import WebIrys from "@irys/sdk/web";
import { END_POINT } from "@/utils/config";
import { getMetadata } from "@/lib/arweave";
import {
  createMetaplex,
  getNFTMetadata,
  updateAttributes,
} from "@/lib/metaplex";

export const Mint = () => {
  const wallet = useWallet();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [explorerURL, setExplorerURL] = useState<string>("");
  const [nftData, setNftData] = useState<any>(null);
  const [tokenID, setTokenID] = useState<string>("");

  const getIrys = async (): Promise<WebIrys> => {
    const webWallet = { rpcUrl: END_POINT, name: "solana", provider: wallet };
    const webIrys = new WebIrys({
      network: "devnet",
      token: "solana",
      wallet: webWallet,
    });
    await webIrys.ready();
    return webIrys;
  };

  const uploadMetadata = async (): Promise<string> => {
    const irys = await getIrys();
    const metadataBlob = await getMetadata(name);
    const timestamp = Date.now();
    const metadataFile = new File([metadataBlob], `${name}-${timestamp}.json`, {
      type: "application/json",
    });

    try {
      const response = await irys.uploadFile(metadataFile);
      console.log(
        `File uploaded ==> https://gateway.irys.xyz/mutable/${response.id}`
      );
      console.log(`response: ${JSON.stringify(response)}`);
      return `https://gateway.irys.xyz/mutable/${response.id}`;
    } catch (e) {
      console.log("Error uploading file ", e);
      return "";
    }
  };

  const createNFT = async () => {
    try {
      if (!wallet) {
        console.error("Wallet not connected");
        return;
      }

      setIsLoading(true);

      const metadataUrl = await uploadMetadata();

      const tokenID = await createMetaplex(wallet, metadataUrl);
      const url = `https://core.metaplex.com/explorer/${tokenID}?env=devnet`;
      setExplorerURL(url);
      setTokenID(tokenID);
    } catch (error) {
      console.error("Error saving JSON to Akord: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchNFTMetadata = async (tokenID: string) => {
    await new Promise((resolve) => setTimeout(resolve, 6000));
    console.log(`tokenID: ${tokenID}`);
    try {
      const metadata = await getNFTMetadata(tokenID);
      if (metadata && metadata.uri) {
        const response = await fetch(metadata.uri);
        const data = await response.json();
        setNftData(data);
        console.log(`nftData: ${JSON.stringify(data)}`);
      }
    } catch (error) {
      console.error("Error fetching NFT metadata: ", error);
    }
  };

  useEffect(() => {
    if (tokenID && tokenID.length > 0) {
      fetchNFTMetadata(tokenID);
    }
  }, [tokenID]);

  return (
    <div className="flex flex-col items-center justify-center">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border-2 border-gray-300 rounded-md p-2 outline-none"
        placeholder="NFT Name"
      />
      <button
        onClick={createNFT}
        className="bg-btn-bg text-btn-text rounded-md px-4 py-2 mt-8"
      >
        Mint
      </button>
      {isLoading && <p className="text-text-secondary mt-5">Loading...</p>}
      {explorerURL && (
        <div className="text-text-secondary mt-5">
          <p>Explorer URL</p>
          <Link
            href={explorerURL}
            target="_blank"
            className="text-action underline"
          >
            {explorerURL}
          </Link>
        </div>
      )}
      {nftData && (
        <>
          <div className="text-text-secondary mt-5">
            <h2>{nftData.name}</h2>
            <Image
              src={nftData.image}
              alt={nftData.name}
              className="w-64 h-64"
            />
            <p>{nftData.description}</p>
            <ul>
              {nftData.attributes.map((attr: any, index: number) => (
                <li key={index}>
                  {attr.trait_type}: {attr.value}
                </li>
              ))}
            </ul>
            <ul>
              {nftData.plugin.attributeList[0].map((attr: any, index: number) => (
                <li key={index}>
                  {attr.key}: {attr.value}
                </li>
              ))}
            </ul>
          </div>
          <button
            onClick={updateAttributes}
            className="bg-btn-bg text-btn-text rounded-md px-4 py-2 mt-8"
          >
            Update
          </button>
        </>
      )}
    </div>
  );
};
