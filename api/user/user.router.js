const { createUser, loginUser, getAllCategories } = require('./user.controller');
const router = require('express').Router();
const multer = require('multer');

// Define the storage configuration for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Set the destination folder for uploaded photos
  },
  filename: function (req, file, cb) {
    // Generate a unique filename for the uploaded photo
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.png');
  }
});

const upload = multer({ storage: storage });

router.post('/', upload.single('logo'), createUser);
router.post('/login', loginUser);
router.get('/c', getAllCategories);

module.exports = router;
