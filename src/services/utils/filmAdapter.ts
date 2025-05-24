/**
 * Adapter functions to handle both old and new film object structures
 */

/**
 * Ensures a URL is absolute by adding https: protocol if needed
 */
export const ensureAbsoluteUrl = (url: string | null): string | null => {
  if (!url) return null;
  
  // If the URL starts with '//', add 'https:' prefix
  if (url.startsWith("//")) {
    return `http:${url}/360`;
  }
  
  return url;
};

/**
 * Gets the poster URL from a film object, regardless of its structure
 */
export const getPosterUrl = (film: any): string | null => {
  let posterUrl = null;
  
  // New structure (posterUrl is inside gallery object)
  if (film?.gallery?.posterUrl) {
    posterUrl = film.gallery.posterUrl;
  }
  // Old structure (posterUrl is directly on the film)
  else if (film?.posterUrl) {
    posterUrl = film.posterUrl;
  }
  
  // Ensure the URL is absolute
  return ensureAbsoluteUrl(posterUrl);
};

/**
 * Converts a film from the new structure to the old structure for compatibility with Redux
 */
export const convertToOldStructure = (film: any): any => {
  if (!film) return null;
  
  // If it already has posterUrl, it might already be in the old format
  if (film.posterUrl) {
    return {
      ...film,
      posterUrl: ensureAbsoluteUrl(film.posterUrl),
    };
  }
  
  return {
    ...film,
    posterUrl: ensureAbsoluteUrl(film.gallery?.posterUrl) || null,
  };
};

/**
 * Converts a film from the old structure to the new structure
 */
export const convertToNewStructure = (film: any): any => {
  if (!film) return null;
  
  // If it already has gallery, it might already be in the new format
  if (film.gallery) {
    return {
      ...film,
      gallery: {
        ...film.gallery,
        posterUrl: ensureAbsoluteUrl(film.gallery.posterUrl) || null,
        coverUrl: ensureAbsoluteUrl(film.gallery.coverUrl) || null,
      },
    };
  }
  
  return {
    ...film,
    gallery: {
      posterUrl: ensureAbsoluteUrl(film.posterUrl) || null,
      coverUrl: null,
    },
  };
};