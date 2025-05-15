const User = require('../models/User.js');
const dotenv = require('dotenv');

dotenv.config();

const createAdminUser = async () => {
  try {
    // Check if admin user already exists
    const adminExists = await User.findOne({ role: 'admin' });
    
    if (!adminExists) {
      // Admin credentials from environment variables or default values
      const adminEmail = process.env.ADMIN_EMAIL || 'admin@musicify.com';
      const adminPassword = process.env.ADMIN_PASSWORD || 'admin123456';
      const adminName = process.env.ADMIN_NAME || 'Admin User';
            
      // Create admin user
      const admin = await User.create({
        name: adminName,
        email: adminEmail,
        password: adminPassword,
        role: 'admin'
      });
      
      console.log('Admin user created:', admin.email);
    } else {
      console.log('Admin user already exists');
    }
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
};

module.exports = createAdminUser;