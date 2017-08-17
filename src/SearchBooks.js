import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import serializeForm from 'form-serialize'
import Book from './Book'

class SearchBooks extends Component {

  static NO_COVER_URL = ''

  handleSubmit = (e) => {
    e.preventDefault();
    const values = serializeForm(e.target, { hash: true })
    if (this.props.onSearch && values.query) {
      this.props.onSearch(values.query)
    }
  }

  getCoverThumbnail(images) {
    if (!images) {
      return SearchBooks.NO_COVER_URL
    }
    return images["smallThumbnail"] || images["thumnnail"] || SearchBooks.NO_COVER_URL
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
            <input type="text" name="query" placeholder="Search by title or author" />

          </form>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
          {this.props.books.map((book) => (
              <li key={book.id}>
                <Book
                  coverWidth={128}
                  coverHeight={193}
                  coverURL={this.getCoverThumbnail(book.imageLinks)}
                  title={book.title}
                  authors={book.authors}
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