import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'

class BooksApp extends React.Component {

  state = {
    books: [],
    searchResult: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  searchBooks(query) {
    BooksAPI.search(query, 10).then((response) => {
      if (response.error) {
        // TODO: Display error message to end-user
        console.log("Search returned error: ", response.error);
      } else {
        if (this.state.books && this.state.books.length) {
          for (let resultBook of response) {
            let book = this.state.books.find(b => b.id === resultBook.id);
            if (book) {
              resultBook.shelf = book.shelf;
            }
          }
        }
        this.setState({ searchResult: response })
      }
    })
  }

  updateBooks(books, updatedBook, shelf) {
    let newState = [];
    books.forEach(book => {
      if (book.id === updatedBook.id) {
        newState.push({
          ...book,
          shelf
        });
      } else {
        newState.push(book);
      }
    });
    return newState;
  }

  updateBookShelf(book, shelf) {
    BooksAPI.update(book, shelf).then((response) => {
      let newState = {
        books: this.updateBooks(this.state.books, book, shelf),
        searchResult: this.updateBooks(this.state.searchResult, book, shelf)
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
    })
  }

  render() {
    return (
      <div className="app" >
        <Route path="/search" render={({ history }) => (
          <SearchBooks
            books={this.state.searchResult}
            onSearch={(query) => {
              this.searchBooks(query)
            }}
            onBookShelfChange={(book, shelf) => {
              this.updateBookShelf(book, shelf);
            }}
          />
        )} />
        <Route exact path="/" render={({ history }) => {
          this.setState({ searchResult: [] });
          return (
            <ListBooks
              books={this.state.books}
              onBookShelfChange={(book, shelf) => {
                this.updateBookShelf(book, shelf)
              }}
            />
          )
        }} />
      </div>
    )
  }
}

export default BooksApp;
