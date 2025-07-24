const express = require("express");
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../Controllers/Productcontroller.js');

const upload = require('../middleware/cloudinary');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// ✅ Public routes
router.get('/', getProducts);
router.get("/:id", getProduct);

// ✅ Admin-protected routes
router.post("/", protect, admin, upload.single("image"), createProduct);
router.put('/:id', protect, admin, upload.single("image"), updateProduct);
router.patch('/:id', protect, admin, upload.single("image"), updateProduct);
router.delete('/:id', protect, admin, deleteProduct);

module.exports = router;
