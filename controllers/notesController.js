const Note = require('../models/Note');
const { validateNote } = require('../utils/validators');

exports.createNote = async (req, res) => {
  try {
    const errors = validateNote(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const note = new Note({
      ...req.body,
      userId: req.user.userId
    });

    await note.save();
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getNotes = async (req, res) => {
  try {
    const { q, tags } = req.query;
    let query = { userId: req.user.userId };

    if (q) {
      query.$or = [
        { title: { $regex: q, $options: 'i' } },
        { content: { $regex: q, $options: 'i' } }
      ];
    }

    if (tags) {
      const tagArray = tags.split(',').map(tag => tag.trim());
      query.tags = { $in: tagArray };
    }

    const notes = await Note.find(query).sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getNoteById = async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, userId: req.user.userId });
    if (!note) return res.status(404).json({ error: 'Note not found' });
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateNote = async (req, res) => {
  try {
    const errors = validateNote(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      req.body,
      { new: true }
    );

    if (!note) return res.status(404).json({ error: 'Note not found' });
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
    if (!note) return res.status(404).json({ error: 'Note not found' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
