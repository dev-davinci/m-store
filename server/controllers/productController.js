import Product from "./../models/productModel.js";
import asyncHandler from "express-async-handler";

// Description: get all products
// Route: GET /api/products
// Access: Public

export const getAllProducts = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// Description: get specific product by id
// Route: GET /api/products/:id
// Access: Public

export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("There is no such product");
  }
});

// Description: create product
// Route: POST /api/products
// Access: Private, only admins can access

export const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Product",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "brand",
    category: "category",
    countInStock: 0,
    numReviews: 0,
    description: "description",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// Description: update product
// Route: PUT /api/products/:id
// Access: Private, only admins can access

export const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("There is no such product.");
  }
});

// Description: delete product
// Route: DELETE /api/products/:id
// Access: Private, only admins can access

export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("There is no such product.");
  }
});
