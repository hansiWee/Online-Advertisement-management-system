const jwt = require('jsonwebtoken');
const { create, getUser, getAllCategories } = require('./user.servise');
const secretKey = process.env.ACCESS_TOKEN_SECRET; // Retrieve the secret key from an environment variable

// Function to generate JWT token
function generateToken(user) {
  const payload = {
    userId: user.id,
    email: user.email
  };

  const options = {
    expiresIn: '1h' // Token expiration time
  };

  return jwt.sign(payload, secretKey, options);
}

module.exports = {
  createUser: (req, res) => {
    const body = req.body;
    const photoPath = req.file.path; // Get the path of the uploaded photo

    create(body, photoPath, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          success: 0,
          message: 'Database connection error'
        });
      }
      return res.status(200).json({
        success: 1,
        data: results
      });
    });
  },

  loginUser: (req, res) => {
    const { email, password } = req.body;
    getUser(email, password, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          success: 0,
          message: 'Internal server error'
        });
      }
      if (results.length === 0) {
        return res.status(401).json({
          success: 0,
          message: 'Invalid email or password. Please try again.'
        });
      }

      const user = results[0]; // Assuming only one user is returned

      // Generate JWT token
      const token = generateToken(user);

      // Separate the logo and company name into a separate JSON object
      const sellerInfo = {
        companyName: user.companyName,
        logoUrl: `http://localhost:3000/${user.logo}`,
        token: token
      };

      return res.status(200).json({
        success: 1,
        sellerInfo
      });
    });
  },

  getAllCategories: (req, res) => {
    getAllCategories((error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          success: 0,
          message: 'Internal server error'
        });
      }

      const categories = results.map((category) => ({
        category: category.category,
        categoryId: category.categoryId
      }));

      return res.status(200).json({
        success: 1,
        categories
      });
    });
  }
};
