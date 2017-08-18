import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'

class ListBooks extends Component {

  handleBookShelfChange = (book, shelf) => {
    if (typeof this.props.onBookShelfChange === 'function' && this.props.onBookShelfChange != null) {
      this.props.onBookShelfChange(book, shelf);
    }
  }

  render() {
    var books = this.props.books;

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf
              title="Currently Reading"
              books={books.filter(book => book.shelf === "currentlyReading")}
              onBookShelfChange={this.handleBookShelfChange}
            />
            <BookShelf
              title="Want to Read"
              books={books.filter(book => book.shelf === "wantToRead")}
              onBookShelfChange={this.handleBookShelfChange}
            />
            <BookShelf
              title="Read"
              books={books.filter(book => book.shelf === "read")}
              onBookShelfChange={this.handleBookShelfChange}
            />
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default ListBooks