export function dateYYYYMMDDFormat(dayTo: number = 0): string {
  const dt = new Date();
  dt.setDate(dt.getDate() + dayTo);

  const date = String(dt.getDate()).padStart(2, '0');
  const month = String(dt.getMonth() + 1).padStart(2, '0');
  const year = dt.getFullYear();

  return `${year}-${month}-${date}`;
}