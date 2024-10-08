export const formatRupiah = (amount) => {
  const numberString = amount.toString().replace(/\D/g, "");
  const formatted = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(numberString);

  return formatted;
};
