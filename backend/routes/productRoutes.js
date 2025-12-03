const express = require('express');
const router = express.Router();
const prisma = require('../config/prisma');
const { protect, admin } = require('../middleware/authMiddleware');

// @desc    Get all products with search, filter, sort, pagination
// @route   GET /api/products
// @access  Public
router.get('/', async (req, res, next) => {
    try {
        const { search, category, sort, page = 1, limit = 10 } = req.query;

        let where = {};

        // Search by name
        if (search) {
            where.name = { contains: search, mode: 'insensitive' };
        }

        // Filter by category
        if (category && category !== 'All') {
            where.category = category;
        }

        // Sorting
        let orderBy = {};
        if (sort === 'price_asc') {
            orderBy.price = 'asc';
        } else if (sort === 'price_desc') {
            orderBy.price = 'desc';
        } else {
            orderBy.createdAt = 'desc'; // Default new to old
        }

        // Pagination
        const pageNum = Number(page);
        const limitNum = Number(limit);
        const skip = (pageNum - 1) * limitNum;

        const products = await prisma.product.findMany({
            where,
            orderBy,
            take: limitNum,
            skip,
        });

        const total = await prisma.product.count({ where });

        res.json({
            products,
            page: pageNum,
            pages: Math.ceil(total / limitNum),
            total,
        });
    } catch (error) {
        next(error);
    }
});

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
router.get('/:id', async (req, res, next) => {
    try {
        const product = await prisma.product.findUnique({
            where: { id: req.params.id },
        });
        if (product) {
            res.json(product);
        } else {
            res.status(404);
            throw new Error('Product not found');
        }
    } catch (error) {
        next(error);
    }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
router.post('/', protect, admin, async (req, res, next) => {
    try {
        const { name, description, price, category, imageUrl } = req.body;

        const createdProduct = await prisma.product.create({
            data: {
                name,
                description,
                price: Number(price),
                category,
                imageUrl,
            },
        });
        res.status(201).json(createdProduct);
    } catch (error) {
        next(error);
    }
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
router.put('/:id', protect, admin, async (req, res, next) => {
    try {
        const { name, description, price, category, imageUrl } = req.body;

        const product = await prisma.product.findUnique({
            where: { id: req.params.id },
        });

        if (product) {
            const updatedProduct = await prisma.product.update({
                where: { id: req.params.id },
                data: {
                    name: name || product.name,
                    description: description || product.description,
                    price: price ? Number(price) : product.price,
                    category: category || product.category,
                    imageUrl: imageUrl || product.imageUrl,
                },
            });
            res.json(updatedProduct);
        } else {
            res.status(404);
            throw new Error('Product not found');
        }
    } catch (error) {
        next(error);
    }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res, next) => {
    try {
        const product = await prisma.product.findUnique({
            where: { id: req.params.id },
        });

        if (product) {
            await prisma.product.delete({
                where: { id: req.params.id },
            });
            res.json({ message: 'Product removed' });
        } else {
            res.status(404);
            throw new Error('Product not found');
        }
    } catch (error) {
        next(error);
    }
});

module.exports = router;
