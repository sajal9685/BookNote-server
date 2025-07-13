const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const {
  createBookmark, getBookmarks, getBookmarkById, updateBookmark, deleteBookmark
} = require('../controllers/bookmarksController');

router.use(auth);

router.post('/', createBookmark);
router.get('/', getBookmarks);
router.get('/:id', getBookmarkById);
router.put('/:id', updateBookmark);
router.delete('/:id', deleteBookmark);

module.exports = router;
