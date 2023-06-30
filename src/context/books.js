import { createContext, useState } from "react";
import axios from "axios";

const BooksContext = createContext();

function Provider({ children }) {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    const response = await axios.get("http://localhost:3001/books");
    setBooks(response.data);
  };

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

  const valueToShare = {
    books,
    deleteBookById,
    editBookById,
    createBook,
    fetchBooks,
  };

  return (
    <BooksContext.Provider value={valueToShare}>
      {children}
    </BooksContext.Provider>
  );
}

export { Provider };
export default BooksContext;
