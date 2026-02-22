const express = require('express')
const router = express.Router()
const controller = require('./controller.js')

router.post('/books', controller.createBook)
router.get('/books', controller.getBooks)
router.get('/books/:bookId', controller.getBookById)
router.delete('/books/:bookId', controller.deleteBookById)
router.put('/books/:bookId', controller.updateBookById)

module.exports = router