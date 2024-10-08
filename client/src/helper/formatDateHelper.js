export const formatDate = (date) => {
  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  const formattedDate = new Intl.DateTimeFormat("id-ID", options).format(date);
  return `${formattedDate}`;
};
