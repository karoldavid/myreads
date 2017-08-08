import React from 'react'
import * as BooksAPI from './BooksAPI'
import BooksList from './BooksList'
import Bookshelf from './Bookshelf'
import './App.css'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
   // showSearchPage: true,
    showSearchPage: false,
    books: []
  }
  searchBooks(query) {
    if (query) {
      BooksAPI.search(query, 10).then((books) => {
        console.log(books)
        if (!books.error) {
          this.setState({books: books})
        } else {
          this.setState({books: []})
        }
      })
    } else {
      this.setState({books: []})
    }
  }
  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <BooksList
            onSearchBooks={(query) => {
              this.searchBooks(query)}
            }
            books={this.state.books}
          />
        ) : (
        <Bookshelf/>

        )
      }
      </div>
    )
  }
}

export default BooksApp
