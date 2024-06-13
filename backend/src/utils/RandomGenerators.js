export const generateRandomIpAddress = () => {
  const getRandomNumber = () => Math.floor(Math.random() * 255) + 1;
  const ipAddress = Array.from({ length: 4 }, getRandomNumber).join(".");
  return ipAddress;
};
