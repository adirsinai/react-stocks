export const formatPrice = (number) =>{

  const newNumber = Intl.NumberFormat("en-GB", {
    style: "decimal",
    signDisplay: "always",
  }).format(number);

  return newNumber;
}