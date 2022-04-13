const express = require('express');
const productModel = require('../models/products');

const router = express.Router();

products = [];
nextId = 0;

router.get('/', (req, res) => {
    res.json(productModel.getProducts());
})

router.get('/:id', (req, res) => {
    const queriedProduct = productModel.getProduct(req.params.id);
    if (queriedProduct != undefined) {
        res.json(queriedProduct);
    } else {
        res.json({
            error: "producto no encontrado"
        })
    }
})

router.post('/', (req, res) => {
    const newProduct = productModel.addProduct(req.body.title, req.body.price, req.body.thumbnail);
    res.json(newProduct);
})

router.put('/:id', (req, res) => {
    const updateSuccessful = productModel.updateProduct(req.params.id, req.body.title, req.body.price, req.body.thumbnail);
    if (updateSuccessful) {
        res.json(getProducts());
    } else {
        res.json({
            error: "producto no encontrado"
        })
    }
})

router.delete('/:id', (req, res) => {
    const deletionSuccessful = productModel.deleteProduct(req.params.id);
    if (deletionSuccessful) {
        res.json(products);
    } else {
        res.json({
            error: "producto no encontrado"
        })
    }
})

module.exports = router;