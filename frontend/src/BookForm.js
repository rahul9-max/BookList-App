import React, { useState, useEffect } from 'react';
import './BookForm.css';

function BookForm({ onAddBook, initialBook }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [yearPublished, setYearPublished] = useState('');
  const [isbn, setIsbn] = useState('');

  useEffect(() => {
    if (initialBook) {
      setTitle(initialBook.title);
      setAuthor(initialBook.author);
      setYearPublished(initialBook.yearPublished);
      setIsbn(initialBook.isbn);
    }
  }, [initialBook]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBook = { title, author, yearPublished, isbn };
    onAddBook(newBook);
    setTitle('');
    setAuthor('');
    setYearPublished('');
    setIsbn('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <br />
      <label>
        Author:
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </label>
      <br />
      <label>
        Year Published:
        <input
          type="text"
          value={yearPublished}
          onChange={(e) => setYearPublished(e.target.value)}
        />
      </label>
      <br />
      <label>
        ISBN:
        <input
          type="text"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">{initialBook ? 'update Book' : 'Add Book'}</button>
    </form>
  );
}

export default BookForm;
