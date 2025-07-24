const Product = require('../models/Productmodel.js');
const cloudinary = require('cloudinary').v2;

// ✅ Get all products
const getProducts = async (req, res) => {
  try {
    
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get a single product
const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Create a new product
const createProduct = async (req, res) => {
  try {
    const { name, price, size, productcode, category,subcategory, description, inStock } = req.body;
    const image = req.file?.path;
    const imagePublicId = req.file?.filename;

    const product = await Product.create({
      name,
      price,
      size,
      productcode,
      category,
      subcategory,
      description,
      inStock,
      image,
      imagePublicId
    });

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Update a product with optional image replacement
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Find the existing product
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // 2. Build updated data from body
    const updatedData = { ...req.body };

    // 3. If new image is uploaded
    if (req.file) {
      // a. Delete old image from Cloudinary
      if (product.imagePublicId) {
        await cloudinary.uploader.destroy(product.imagePublicId);
      }

      // b. Set new image data
      updatedData.image = req.file.path;
      updatedData.imagePublicId = req.file.filename;
    }

    // 4. Update product
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { $set: updatedData },
      { new: true }
    );

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Delete a product and its image
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Delete image from Cloudinary
    if (product.imagePublicId) {
      await cloudinary.uploader.destroy(product.imagePublicId);
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Export all
module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
};
