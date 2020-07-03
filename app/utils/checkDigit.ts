const checkDigit = (val: string) => {
  return /^\d*\.?\d*$/.test(val);
};

export default checkDigit;
