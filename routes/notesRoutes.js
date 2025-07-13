const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const {
  createNote, getNotes, getNoteById, updateNote, deleteNote
} = require('../controllers/notesController');

router.use(auth);

router.post('/', createNote);
router.get('/', getNotes);
router.get('/:id', getNoteById);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);

module.exports = router;
