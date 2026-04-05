const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 3306,
    dialect: 'mysql',

    logging: process.env.NODE_ENV === 'development' ? console.log : false,

    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      },
      connectTimeout: 60000
    },

    pool: {
      max: 10,
      min: 0,
      acquire: 60000,
      idle: 10000
    },

    retry: {
      max: 5
    },

    define: {
      timestamps: true,
      underscored: false,
      freezeTableName: true
    }
  }
);

// Test connection with retry
const testConnection = async () => {
  let attempts = 5;

  while (attempts > 0) {
    try {
      await sequelize.authenticate();
      console.log('✅ Database connection established successfully.');
      return true;
    } catch (error) {
      attempts--;
      console.error(`❌ Database connection failed. Attempts left: ${attempts}`);
      console.error(error.message);

      if (attempts === 0) {
        console.error('❌ Failed to connect to database after multiple attempts.');
        return false;
      }

      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
};

module.exports = { sequelize, testConnection };
