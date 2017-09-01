import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Book from './Book'

class BookShelf extends Component {

  handleBookShelfChange = (book, shelf) => {
    if (typeof this.props.onBookShelfChange === 'function' && this.props.onBookShelfChange != null) {
      this.props.onBookShelfChange(book, shelf);
    }
  }

  render() {
    const { shelf, title } = this.props;
    const styleClasses = ['bookshelf-title-marker', `bookshelf-title-marker-${shelf}`]
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title"><span className={styleClasses.join(' ')}></span> {title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.map((book) => (
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
    )
  }

}

BookShelf.propTypes = {
  title: PropTypes.string.isRequired,
  shelf: PropTypes.string.isRequired,
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
  onBookShelfChange: PropTypes.func
};

export default BookShelf;