const random = (min: number, max: number) =>
  min + Math.round(Math.random() * (max - min));

export default random;
