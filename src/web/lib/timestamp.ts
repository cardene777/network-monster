import dayjs from "dayjs";

function getRandomSeed(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export const generateImgURI = (): string => {
  const timestamp = dayjs().valueOf();
  const randomValue = getRandomSeed(timestamp);
  const number = Math.floor(randomValue * 20) + 1;
  return `https://res.cloudinary.com/dxqgqsi0r/network-monster/${number}.png`;
};