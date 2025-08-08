export const formatBirthDate = (dateString) => {
  if (!dateString) return "Date is not available";
  let [year, month, day] = dateString.split("-");
  return `${parseInt(day)}. ${parseInt(month)}. ${parseInt(year)}`;
};
