import { useState } from "react";
import BookCreate from "./components/BookCreate";
import BookList from "./components/BookList";

function App() {
  const [books, setBooks] = useState([]);

  const createBook = (title) => {
    setBooks([
      ...books,
      {
        id: Math.round(Math.random() * 9999),
        title,
      },
    ]);
  };

  return (
    <div className="app">
      <BookCreate onCreate={createBook} />
      <BookList books={books} />
    </div>
  );
}

export default App;
