import React, { Component } from 'react'
import ShelfSelect from './ShelfSelect'

class Book extends Component {
  static NO_COVER_URL = '/images/no_cover_url.png';

  handleShelfChange = (shelf) => {
    if (typeof this.props.onShelfChange === 'function' && this.props.onShelfChange != null) {
      this.props.onShelfChange(this.props.book, shelf)
    }
  }

  render() {
    const book = this.props.book;
    const styles = {
      width: this.props.coverWidth,
      height: this.props.coverHeight,
      backgroundImage: `url(${this.getCoverURL(book)})`
    };

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={styles}></div>
          <ShelfSelect shelf={book.shelf || 'none'} onChange={this.handleShelfChange} />
        </div>
        <div className="book-title">{this.getTitle(book)}</div>
        <div className="book-authors">{this.getAuthors(book)}</div>
      </div>
    )
  }

  getTitle(book) {
    if (book) {
      return book.title
    }
    return '[MISSING TITLE]';
  }

  getAuthors(book) {
    if (book && book.authors && book.authors.length) {
      return book.authors.join(', ')
    }
    return 'Unknown authors';
  }

  getCoverURL(book) {
    if (book && book.imageLinks) {
      return book.imageLinks.smallThumbnail || book.imageLinks.thumbnail ||  Book.NO_COVER_URL
    }

    return Book.NO_COVER_URL;
  }
}

export default Book