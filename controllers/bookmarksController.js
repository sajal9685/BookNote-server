const Bookmark = require('../models/Bookmark');
const { validateBookmark } = require('../utils/validators');
const fetchPageTitle = require('../utils/fetchPageTitle');

exports.createBookmark = async (req, res) => {
  try {
    const errors = validateBookmark(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    let { title, url, description, tags, isFavorite } = req.body;

    // Auto-fetch title if not provided
    if (!title?.trim()) {
      title = await fetchPageTitle(url);
    }

    const bookmark = new Bookmark({
      title,
      url,
      description: description || '',
      tags: tags || [],
      isFavorite: isFavorite || false,
      userId: req.user.userId
    });

    await bookmark.save();
    res.status(201).json(bookmark);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getBookmarks = async (req, res) => {
  try {
    const { q, tags } = req.query;
    let query = { userId: req.user.userId };

    if (q) {
      query.$or = [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { url: { $regex: q, $options: 'i' } }
      ];
    }

    if (tags) {
      const tagArray = tags.split(',').map(tag => tag.trim());
      query.tags = { $in: tagArray };
    }

    const bookmarks = await Bookmark.find(query).sort({ createdAt: -1 });
    res.json(bookmarks);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getBookmarkById = async (req, res) => {
  try {
    const bookmark = await Bookmark.findOne({ _id: req.params.id, userId: req.user.userId });
    if (!bookmark) return res.status(404).json({ error: 'Bookmark not found' });
    res.json(bookmark);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateBookmark = async (req, res) => {
  try {
    const errors = validateBookmark(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const bookmark = await Bookmark.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      req.body,
      { new: true }
    );

    if (!bookmark) return res.status(404).json({ error: 'Bookmark not found' });
    res.json(bookmark);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.deleteBookmark = async (req, res) => {
  try {
    const bookmark = await Bookmark.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
    if (!bookmark) return res.status(404).json({ error: 'Bookmark not found' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
