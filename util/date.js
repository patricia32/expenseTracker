export function getFormattedDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Corrected and padded
    const day = String(date.getDate()).padStart(2, '0');        // Correct method and padded

    return `${year}-${month}-${day}`;
};

export function getDateMinusDays(date, days) {
  const newDate = new Date(date);
  newDate.setDate(date.getDate() - days);
  return newDate;
}
