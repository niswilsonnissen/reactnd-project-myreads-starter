import React from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';
import * as BookUtil from './BookUtil';

class BooksApp extends React.Component {

  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
    });
  }

  updateBookShelf(book, shelf) {
    BooksAPI.update(book, shelf).then((response) => {
      let newState = {
        books: BookUtil.updateShelfStatus(this.state.books, book, shelf)
      };
      const bookIndex = newState.books.findIndex(b => b.id === book.id);
      if (bookIndex === -1 && shelf !== 'none') {
        newState.books.push({
          ...book,
          shelf
        });
      } else if (bookIndex !== -1 && shelf === 'none') {
        newState.books.splice(bookIndex, 1);
      }
      this.setState(newState);
    });
  }

  render() {
    return (
      <div className="app" >
        <Route path="/search" render={({ history }) => (
          <SearchBooks
            books={this.state.books}
            onBookShelfChange={(book, shelf) => {
              this.updateBookShelf(book, shelf);
            }}
          />
        )} />
        <Route exact path="/" render={({ history }) => (
          <ListBooks
            books={this.state.books}
            onBookShelfChange={(book, shelf) => {
              this.updateBookShelf(book, shelf)
            }}
          />
        )} />
      </div>
    );
  }
}

export default BooksApp;
