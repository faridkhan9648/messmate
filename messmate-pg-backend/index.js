// index.js
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const sequelize = require('./config/db');

// Models
const { User } = require('./models');
const Mess = require('./models/Mess');

const app = express();

// ------------------ MIDDLEWARE ------------------
app.use(cors({
  origin: "https://messmate-taupe.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// ------------------ ROUTES ------------------

// Health check
app.get('/', (req, res) => {
  res.send('MessMate API is running 🚀');
});

// Mess routes
const messRoutes = require('./routes/messRoutes');
app.use('/messes', messRoutes);

// Auth routes
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

// ------------------ SERVER & DB ------------------
const PORT = process.env.PORT || 4000;

sequelize.authenticate()
  .then(() => {
    console.log('PostgreSQL connected');
    // Sync models without dropping existing data
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    console.log('Models synced successfully');
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Database connection error:', err.message);
  });






