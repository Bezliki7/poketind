export const getRandomInt = (max: number, min: number = 1) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
