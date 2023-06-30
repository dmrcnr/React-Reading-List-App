import { useState, useEffect } from "react";
import BookCreate from "./components/BookCreate";
import BookList from "./components/BookList";
import axios from "axios";

function App() {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    const response = await axios.get("http://localhost:3001/books");
    setBooks(response.data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const editBookById = async (id, newTitle) => {
    const response = await axios.put(`http://localhost:3001/books/${id}`, {
      title: newTitle,
    });
    if (response.status === 200) {
      const updatedBooks = books.map((book) => {
        if (id === book.id) {
          return { ...book, ...response.data };
        }
        return book;
      });
      setBooks(updatedBooks);
    }
  };

  const deleteBookById = async (id) => {
    const response = await axios.delete(`http://localhost:3001/books/${id}`);
    if (response.status === 200) {
      const updatedBooks = books.filter((book) => {
        return book.id !== id;
      });

      setBooks(updatedBooks);
    }
  };

  const createBook = async (title) => {
    const response = await axios.post("http://localhost:3001/books", {
      title,
    });
    if (response.status === 201) {
      setBooks([...books, response.data]);
    }
  };

  return (
    <div className="app">
      <h1>Reading List</h1>
      <BookList books={books} onDelete={deleteBookById} onEdit={editBookById} />
      <BookCreate onCreate={createBook} />
    </div>
  );
}

export default App;
