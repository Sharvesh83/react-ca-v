import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/BookStore.css';

function BookStore() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('https://reactnd-books-api.udacity.com/books', {
      headers: { 'Authorization': 'whatever-you-want' }
    })
    .then(response => response.json())
    .then(data => setBooks(data.books))
    .catch(error => console.error('Error fetching books:', error));
  }, []);

  const filterBooks = (book) => {
    return book.title.toLowerCase().includes(searchTerm.toLowerCase());
  };

  const handleSearch = (event) => {
    const searchValue = event.target.value;
    setSearchTerm(searchValue);
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-left">
          <h1>
            Kalvium Books
          </h1>
        </div>
        <div className="navbar-center">
          <input
            type="text"
            placeholder="Search Books"
            onChange={handleSearch}
          />
        </div>
        <div className="navbar-right">
          <Link to="/register" className="register-button">
            Register
          </Link>
        </div>
      </nav>

      <div className="book-list">
        {books.filter(filterBooks).map(book => (
          <div key={book.id} className="book-item">
            <div className="book-image">
              <img src={book.imageLinks.thumbnail} alt={book.title} />
            </div>
            <span className="book-title">{book.title}</span>
            <div className="book-price">
              <span className="discounted-price">Free</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookStore;
