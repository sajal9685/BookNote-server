const axios = require('axios');
const cheerio = require('cheerio');

const fetchPageTitle = async (url) => {
  try {
    const response = await axios.get(url, {
      timeout: 5000,
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    });
    const $ = cheerio.load(response.data);
    return $('title').text().trim() || 'Untitled';
  } catch {
    return 'Untitled';
  }
};

module.exports = fetchPageTitle;
