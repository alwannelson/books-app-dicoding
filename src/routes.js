const express = require('express')
const router = express.Router()
const controller = require('./controller.js')

router.post('/books', controller.createBook)
router.get('/books', controller.getBooks)
router.get('/books/:id', controller.getBookById)
router.delete('/books/:id', controller.deleteBookById)
router.put('/books/:id', controller.updateBookById)

module.exports = router