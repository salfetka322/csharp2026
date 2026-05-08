const formatDateFromParts = (day, month, year) => {
  const d = String(day).padStart(2, '0');
  const m = String(month).padStart(2, '0');

  return `${year}-${m}-${d}`;
};

export default formatDateFromParts;
