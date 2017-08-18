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
        this.setState({ searchResult: response })
      }
    })
  }

  updateBookShelf(book, shelf) {
    BooksAPI.update(book, shelf).then((response) => {
      // TODO: Update the state according to response
    })
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" render={({ history }) => (
          <SearchBooks 
            books={this.state.searchResult}
            onSearch={(query) => {
              this.searchBooks(query)
            }}
            onBookShelfChange={(book, shelf) => {
              this.updateBookShelf(book, shelf)
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
    )
  }
}

export default BooksApp
