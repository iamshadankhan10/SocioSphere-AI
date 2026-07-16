import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import noticeRoutes from './routes/notices.js';
import eventRoutes from './routes/events.js';
import paymentRoutes from './routes/payments.js';
import complaintRoutes from './routes/complaints.js';
import visitorRoutes from './routes/visitors.js';
import dashboardRoutes from './routes/dashboard.js';
import User from './models/User.js';

// Load env vars
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/notices', noticeRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/visitors', visitorRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Base route
app.get('/', (req, res) => {
  res.send('SocioSphere AI API is running...');
});

// Database seeding: Ensure default admin user exists
const seedAdmin = async () => {
  try {
    const adminEmail = 'admin@sociosphere.ai';
    const adminExists = await User.findOne({ email: adminEmail });

    if (!adminExists) {
      console.log('Seeding default admin user...');
      await User.create({
        name: 'Shadan Khan',
        email: adminEmail,
        password: 'admin123',
        role: 'admin',
        phone: '+91 90000 12345'
      });
      console.log('Admin user successfully seeded!');
    }
  } catch (error) {
    console.error(`Admin seeding error: ${error.message}`);
  }
};

// Seed admin on start
seedAdmin();

// Error Handling Middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
