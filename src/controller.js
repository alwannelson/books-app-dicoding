const { nanoid } = require('nanoid')
const books = require('./books.js')

exports.createBook = (req, res) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = req.body

    const id = nanoid(16)
    const bookId = id
    const insertedAt = new Date().toISOString()
    const updatedAt = insertedAt
    let finished = false

    if (pageCount === readPage) {
        finished = true
    }

    if (!name) {
        return res.status(400).json({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku'
        })
    }

    if (readPage > pageCount) {
        return res.status(400).json({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
        })
    }

    const newBook = { id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt }
    books.push(newBook)

    res.status(201).json({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: { bookId }
    })
}

exports.getBooks = (req, res) => {
    const data = books.map(({ id, name, publisher }) => ({ id, name, publisher }))
    res.status(200).json({
        status: 'success',
        data
    })
}

exports.getBookById = (req, res) => {
    const { bookId } = req.params

    const book = books.find((b) => b.id === bookId)

    if (!book) {
        return res.status(404).json({
            status: 'fail',
            message: 'Buku tidak ditemukan'
        })
    }

    res.status(200).json({
        status: 'success',
        data: { book }
    })
}

exports.deleteBookById = (req, res) => {
    const { bookId } = req.params

    const book = books.find((b) => b.id === bookId)
    const index = books.findIndex((b) => b.id === bookId)

    if (index !== -1) {
        books.splice(index, 1)

        return res.status(200).json({
            status: 'success',
            message: `Buku berhasil dihapus`
        })
    }

    res.status(404).json({
        status: 'fail',
        message: `Buku gagal dihapus. Id tidak ditemukan`
    })
}

exports.updateBookById = (req, res) => {
    const { bookId } = req.params
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = req.body
    const updatedAt = new Date().toISOString()

    if (!name) {
        return res.status(400).json({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku'
        })
    }

    if (readPage > pageCount) {
        return res.status(400).json({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
        })
    }

    // if (!id) {
    //     return res.status(404).json({
    //         status: 'fail',
    //         message: 'Gagal memperbarui buku. Id tidak ditemukan'
    //     })
    // }

    const index = books.findIndex((b) => b.id === bookId)

    if (index !== -1) {
        books[index] = { ...books[index], name, year, author, summary, publisher, pageCount, readPage, reading, updatedAt }
        const data = { ...books[index] }
        return res.status(200).json({
            status: 'success',
            message: `Buku berhasil diperbarui`,
            data
        })
    }

    res.status(404).json({
        status: 'fail',
        message: `Id tidak ditemukan`
    })
}