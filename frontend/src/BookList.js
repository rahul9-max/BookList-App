import React, { useState, useEffect } from 'react';
import BookForm from './BookForm';
import './BookList.css';

function BookList() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    const storedBooks = localStorage.getItem('books');
    if (storedBooks) {
      setBooks(JSON.parse(storedBooks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(books));
  }, [books]);

  const handleAddBook = (newBook) => {
    // Check if the new book already exists in the books array based on the ISBN
    const existingBook = books.find((book) => book.isbn === newBook.isbn);
    if (existingBook) {
      // If the new book already exists, create a new array of books where the existing book is replaced with the updated book
      const update = books.map((book) =>
        book.isbn === newBook.isbn ? newBook : book
      );
      // Update the books state with the updated array of books
      setBooks(update);
      // Set the selectedBook state to the new book so that it can be edited again later if desired
      setSelectedBook(newBook);
    } else {
      // If the new book does not exist, add it to the end of the books array
      setBooks([...books, newBook]);
    }
  };
  // const handleAddBook = (newBook) => {
  //   const updateBook = books.find((book) => book.isbn === newBook.isbn);
  //   if (updateBook) {
  //     const update = books.map((book) => {
  //       return book.isbn === newBook.isbn ? newBook : book;
  //     });
  //     setBooks(update);
  //     setSelectedBook(newBook);
  //   } else {
  //     setBooks([...books, newBook]);
  //   }
  // };
//   Define the handleUpdateBook function to update an existing book in the books state
  const handleUpdateBook = (updatedBook) => {
    // Use the map method to create a new array of books
    const items = books.map((book) => {
      // If the ISBN of the current book matches the ISBN of the updated book, return the updated book
      if (book.isbn === updatedBook.isbn) {
        return updatedBook;
      }
      // Otherwise, return the current book
      return book;
    });
    // Update the books state with the updated array of books
    setBooks(items);
    // Set the selectedBook state to the updated book so that it can be edited again later if desired
    setSelectedBook(updatedBook);
  };
//   const handleUpdateBook = (update) => {
//     const newBook = books.map((book) => {
//       if (book.isbn === update.isbn) {
//         return update;
//       }
//       return book;
//     });
//     setBooks(newBook);
//     setSelectedBook(update);
//   };

  const handleDeleteBook = (delBook) => {
    const del = books.filter((book) => book.isbn !== delBook.isbn);
    setBooks(del);
    setSelectedBook(null);
  };
  return (
    <div>
      <h1 style={{display:"flex", justifyContent:"center"}}>My Book List</h1>
      <BookForm onAddBook={handleAddBook} initialBook={selectedBook} />
      <h2>All Books</h2>
      <ul>
        {books.map((book, index) => (
          <li key={index}>
            <button onClick={() => handleUpdateBook(book)}>update</button>
            <button onClick={() => handleDeleteBook(book)}>delete</button>
            <strong>{book.title}</strong> by {book.author} ({book.yearPublished}
            ),ISBN:{book.isbn}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;
