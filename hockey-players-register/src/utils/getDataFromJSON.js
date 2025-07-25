/**
 * Najde obrázek podle libovolného JSONu a klíčů.
 *
 * @param {Array} jsonData - JSON data (např. flags, teams, icons...)
 * @param {string} matchKey - klíč, podle kterého hledáš záznam (např. "country")
 * @param {string} matchValue - hodnota, kterou hledáš (např. "CZE")
 * @param {string} imageKey - klíč, kde se nachází název souboru (např. "flag", "logo")
 * @param {string} folder - složka v assets, kde jsou obrázky (např. "icons", "team_logos")
 * @returns {string|null} - URL k obrázku nebo null
 */
export const getImageUrl = (
  jsonData,
  matchKey,
  matchValue,
  imageKey,
  folder
) => {
  const match = jsonData.find((entry) => entry[matchKey] === matchValue);

  if (!match) {
    console.warn(`No match for ${matchKey} = ${matchValue}`);
    return null;
  }

  const fileName = match[imageKey];

  if (!fileName) {
    console.warn(`No file name found at key '${imageKey}' in matched entry`);
    return null;
  }

  try {
    return new URL(`../assets/${folder}/${fileName}`, import.meta.url).href;
  } catch (error) {
    console.error(`Failed to resolve image path for file '${fileName}'`, error);
    return null;
  }
};
