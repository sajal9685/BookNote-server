const isValidUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch {
    return false;
  }
};

const validateNote = ({ title, content }) => {
  const errors = [];
  if (!title?.trim()) errors.push('Title is required');
  if (!content?.trim()) errors.push('Content is required');
  return errors;
};

const validateBookmark = ({ url }) => {
  const errors = [];
  if (!url?.trim()) errors.push('URL is required');
  else if (!isValidUrl(url)) errors.push('Invalid URL format');
  return errors;
};

module.exports = { isValidUrl, validateNote, validateBookmark };
