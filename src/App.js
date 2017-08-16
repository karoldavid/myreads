import React from 'react'
import { Route, Switch } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BooksList from './BooksList'
import Bookshelf from './Bookshelf'
import NoMatch from './NoMatch'
import './App.css'


class BooksApp extends React.Component {
  state = {
    reads: [],
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((reads) => {
      console.log(reads);
      this.setState({ reads: reads })
    })
  }

  searchBooks(query) {
    if (query) {
      BooksAPI.search(query, 20).then((books) => {
        if (!books.error) {
          const isInReads = books.filter((b) => {
            const match = this.state.reads.filter((r) => r.title === b.title);
            return match.length === 0;
          })
          this.setState({books: isInReads})
        } else {
          this.setState({books: []})
        }
      })
    } else {
      this.setState({books: []})
    }
  }

  updateReads(category, id) {
      this.state.reads.filter((r) => r.id === id).map((r) => r.shelf = category)
      const updated = this.state.reads.filter((r) => r.id === id)[0]
      BooksAPI.update(updated, category);
      const newReads = this.state.reads
      this.setState({ reads: newReads })
  }

  addToReads(category, id) {
    const isInReads = this.state.reads.filter((r) => r.id === id)

    if (isInReads.length === 0) {
      const selected = this.state.books.filter((r) => r.id === id)[0]

      selected.shelf = category;

      const newReads = this.state.reads.concat([ selected ])

      this.setState(state => ({
          reads: newReads
      }))

      BooksAPI.update(selected, category);

      const isNotInReads = this.state.books.filter((b) => {
        const match = newReads.filter((r) => r.id === b.id)
        return match.length === 0
      })

      this.setState({ books: isNotInReads })

    }
  }

  render() {
    return (
      <div className="app">
      <Switch>
        <Route exact path="/" render={() => (
          <Bookshelf
            shelves={this.state.shelves}
            reads={this.state.reads}
            onChangeCategory={(category, id) => {
              this.updateReads(category, id)
            }}
          />
        )}/>
        <Route component={NoMatch}/>
      </Switch>
        <Route path="/search" render={() => (
          <BooksList
            onSearchBooks={(query) => {
              this.searchBooks(query)
            }}
            books={this.state.books}
            onAddToReads={(category, id) => {
              this.addToReads(category, id)
            }}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp