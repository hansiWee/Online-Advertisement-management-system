const { createProduct, getProducts, deleteProduct, updateProduct } = require("./product.controller");
const router = require("express").Router();
const multer = require('multer');
const authenticateToken = require('../authMiddleware');

// Define the storage configuration for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Set the destination folder for uploaded photos
  },
  filename: function (req, file, cb) {
    // Generate a unique filename for the uploaded photo
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.png');
  }
});

const upload = multer({ storage: storage });

router.post("/", authenticateToken, upload.array('photos', 10), createProduct);
router.get("/", getProducts);
router.delete("/del", authenticateToken, deleteProduct);
router.put("/", authenticateToken, updateProduct);


module.exports = router;
