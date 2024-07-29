import { generateImgURI } from "./timestamp";

const getRandomValue = (): number => {
  return Math.floor(Math.random() * 10) + 1;
};

export const getMetadata = async (name: string) => {
  const imageUri = generateImgURI();
  const nftMetadata = {
    name: `Network Monster ${name}`,
    symbol: "NMNFT",
    description: "Network Monster NFT",
    image: imageUri,
    attributes: [
      {
        trait_type: "Level",
        value: 0,
      },
      {
        trait_type: "Point",
        value: 0,
      },
      {
        trait_type: "Attack",
        value: getRandomValue(),
      },
      {
        trait_type: "Defense",
        value: getRandomValue(),
      },
      {
        trait_type: "HP",
        value: getRandomValue(),
      },
    ],
  };

  const jsonString = JSON.stringify(nftMetadata, null, 2);
  return new Blob([jsonString], { type: "application/json" });
};
