const express = require('express');
const app = express();
const PORT = 3000;
const data = require('./data');

app.use(express.json());

// Tambahkan buku baru
app.post('/api/books', (req, res) => {
  const newBook = {
    id: req.body.id,
    title: req.body.title,
    author: req.body.author
    
  };

  data.books.push(newBook);
  res.status(201).json(newBook);
});

// Dapatkan daftar buku
app.get('/api/books', (req, res) => {
  const allBooks = [];

  data.books.forEach(book => {
    allBooks.push({
      id: book.id,
      title: book.title,
      author: book.author,
      
    });
  });

  res.json(allBooks);
});

// Edit buku berdasarkan ID
app.put('/api/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = data.books.find(book => book.id === bookId);

  if (!book) {
    return res.status(404).send('Buku tidak ditemukan');
  }

  book.title = req.body.title || book.title;
  book.author = req.body.author || book.author;
  

  res.send(`Info buku telah diperbarui: ${book.title} oleh ${book.author}`);
});

// Hapus buku berdasarkan ID
app.delete('/api/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    
    // Penggunaan for untuk melakukan perulangan pada data.books
    for (let i = 0; i < data.books.length; i++) {
      if (data.books[i].id === bookId) {
        const deletedBook = data.books[i];
        data.books.splice(i, 1);
        return res.send(`Buku berhasil dihapus: ${deletedBook.title} oleh ${deletedBook.author}`);
      }
    }
  
    // Jika buku tidak ditemukan
    res.status(404).send('Buku tidak ditemukan');
  });
  
// Tambahkan buku baru dengan menggunakan endpoint /addBook
app.post('/addBook', (req, res) => {
    const newBook = {
      id: data.books.length + 1,
      title: req.body.title,
      author: req.body.author
     
    };
  
    data.books.push(newBook);
    res.status(201).json(newBook);
  });
  
app.listen(PORT, () => {
  console.log(`Server berjalan pada http://localhost:${PORT}`);
});
