const express = require('express');

const recursoRouter = require('./products');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        msg: 'Server is listening!'
    });
})

router.use('/products', recursoRouter);

module.exports = router;