const { nanoid } = require('nanoid')
const books = require('./books.js')

exports.createBook = (req, res) => {
    const { title = 'untitled', type, author, body } = req.body

    const id = nanoid(4)
    const createdAt = new Date().toISOString()
    const updatedAt = createdAt
    const newBook = { id, title, type, author, body, createdAt, updatedAt }

    books.push(newBook)

    const isSuccess = books.filter((book) => book.id === id).length > 0

    if (!isSuccess) {
        return res.status(500).json({
            status: 'failed',
            message: `Can't save ${title}.`,
        })
    }

    res.status(201).json({
        status: 'successfully',
        message: `${title} saved.`,
        data: newBook
    })
}

exports.getBooks = (req, res) => {
    res.status(200).json({
        status: 'successfully',
        data: { books }
    })
}

exports.getBookById = (req, res) => {
    const { id } = req.params
    
    const book = books.find((b) => b.id === id)

    if (!book) {
        return res.status(404).json({
            status: 'failed',
            message: 'Book not found'
        })
    }

    res.status(200).json({
        status: 'successfully',
        data: { book }
    })
}

exports.deleteBookById = (req, res) => {
    const { id } = req.params

    const book = books.find((b) => b.id === id)
    const index = books.findIndex((b) => b.id === id)

    if (index !== -1) {
        books.splice(index, 1)

        return res.status(200).json({
            status: 'successfully',
            message: `${book.title} deleted.`
        })
    }

    res.status(404).json({
        status: 'failed',
        message: `Can't delete book.`
    })
}

exports.updateBookById = (req, res) => {
    const { id } = req.params
    const { title, type, author, body } = req.body
    const updatedAt = new Date().toISOString()

    const index = books.findIndex((b) => b.id === id)
    
    if (index !== -1) {
        books[index] = {...books[index], title, type, author, body, updatedAt }
        const data = {...books[index]}
        return res.status(200).json({
            status: 'successfully',
            message: `${title} updated.`,
            data
        })
    }

    res.status(500).json({
        status: 'failed',
        message: `Can't update.`
    })
}