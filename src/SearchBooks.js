import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import serializeForm from 'form-serialize';
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI';
import Book from './Book';

class SearchBooks extends Component {

  state = {
    books: [],
    emptySearchResult: false
  }

  handleBookShelfChange = (book, shelf) => {
    if (typeof this.props.onBookShelfChange === 'function' && this.props.onBookShelfChange != null) {
      this.props.onBookShelfChange(book, shelf);
    }
    let books = [];
    for (let searchResult of this.state.books) {
      if (searchResult.id === book.id) {
        books.push({
          ...searchResult,
          shelf
        });
      } else {
        books.push(searchResult);
      }
    }
    this.setState({ books });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const values = serializeForm(e.target, { hash: true });
    this.searchBooks(values.query);
  }

  searchBooks(query) {
    if (query) {
      BooksAPI.search(query, 10).then((response) => {
        if (response.error) {
          this.setState({ books: [], emptySearchResult: true });
        } else {
          if (this.props.books && this.props.books.length) {
            for (let resultBook of response) {
              let book = this.props.books.find(b => b.id === resultBook.id);
              if (book) {
                resultBook.shelf = book.shelf;
              }
            }
          }
          this.setState({ books: response, emptySearchResult: false });
        }
      });
    } else {
      alert("Please enter a search query");
    }
  }

  focus() {
    this.queryInput.focus();
  }

  componentDidMount() {
    this.focus();
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <form onSubmit={this.handleSubmit} className="search-books-input-wrapper">
            {/* 
            NOTES: The search from BooksAPI is limited to a particular set of search terms.
            You can find these search terms here:
            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
            
            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
            you don't find a specific author or title. Every search is limited by search terms.
          */}
            <input
              type="text"
              name="query"
              placeholder="Search by title or author"
              ref={elem => { this.queryInput = elem; }}
            />
          </form>
        </div>
        <div className="search-books-results">
          {this.state.emptySearchResult && (
            <div className="search-books-empty-result">
              Your search did not return any results
            </div>
          )}
          <ol className="books-grid">
            {this.state.books.map((book) => (
              <li key={book.id}>
                <Book
                  book={book}
                  onShelfChange={this.handleBookShelfChange}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

SearchBooks.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object),
  onBookShelfChange: PropTypes.func
};

export default SearchBooks;