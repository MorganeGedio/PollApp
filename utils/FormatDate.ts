export function formatDate(publicationDate: string) {
  const date = new Date(publicationDate);
  const options = { year: "numeric", month: "numeric", day: "numeric" };
  return date.toLocaleDateString([], options);
}
