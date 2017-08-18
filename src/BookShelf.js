import React, { Component } from 'react'
import Book from './Book'

class BookShelf extends Component {

  handleBookShelfChange = (book, shelf) => {
    if (typeof this.props.onBookShelfChange === 'function' && this.props.onBookShelfChange != null) {
      this.props.onBookShelfChange(book, shelf);
    }
  }

  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
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

export default BookShelf