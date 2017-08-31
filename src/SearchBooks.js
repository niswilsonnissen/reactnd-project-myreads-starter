import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import serializeForm from 'form-serialize'
import Book from './Book'

class SearchBooks extends Component {

  handleBookShelfChange = (book, shelf) => {
    if (typeof this.props.onBookShelfChange === 'function' && this.props.onBookShelfChange != null) {
      this.props.onBookShelfChange(book, shelf)
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const values = serializeForm(e.target, { hash: true })
    if (this.props.onSearch && values.query) {
      this.props.onSearch(values.query)
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
          <ol className="books-grid">
          {this.props.books.map((book) => (
              <li key={book.id}>
                <Book
                  book={book}
                  coverWidth={128}
                  coverHeight={193}
                  onShelfChange={this.handleBookShelfChange}
                />
              </li>
          ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks