const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db'); // Will be created in the next step

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// API routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);
// app.use('/api/users', require('./routes/userRoutes')); // Placeholder
// app.use('/api/tasks', require('./routes/taskRoutes')); // Placeholder
// app.use('/api/logs', require('./routes/activityLogRoutes')); // Placeholder


// Error Handling Middleware
const { notFound, errorHandler } = require('./middleware/errorHandler');
app.use(notFound);
app.use(errorHandler);

// Port setup
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
