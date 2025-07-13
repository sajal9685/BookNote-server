require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const rateLimiter = require('./middlewares/rateLimiter');

const authRoutes = require('./routes/authRoutes');
const notesRoutes = require('./routes/notesRoutes');
const bookmarksRoutes = require('./routes/bookmarksRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/', rateLimiter);

// Connect to DB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);
app.use('/api/bookmarks', bookmarksRoutes);

// Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
