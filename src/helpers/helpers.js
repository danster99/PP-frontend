/**
 *
 * @param {string} string to capitalize
 * @returns the string with the first letter capitalized
 */
export const capitalizeFirst = (string) => {
  if (!string) return "";
  return string.at(0).toUpperCase() + string.slice(1);
};
