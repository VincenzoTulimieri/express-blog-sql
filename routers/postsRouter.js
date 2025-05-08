// express router
const express = require('express');
const router = express.Router();

// importo del controller
const postsController = require('../controllers/postsController.js')

// index
router.get('/', postsController.index);

// show
router.get('/:id', postsController.show);

// store
router.post('/', postsController.store);

// update
router.put('/:id', postsController.update);

// modify
router.patch('/:id', postsController.modify)

// destroy
router.delete('/:id', postsController.destroy)



// esportazione router
module.exports = router