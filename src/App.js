import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BooksList from './BooksList'
import Bookshelf from './Bookshelf'
import './App.css'

const myReads = [{
  "shelf": "currentlyReading",
  "backgroundImage": "http://books.google.com/books/content?id=Gv7oh_ukn3QC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
  "title": "A Tale for the Time Being",
  "authors": ["Michael Crichton"]
},{
  "shelf": "currentlyReading",
  "backgroundImage": "http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api",
  "title": "To Kill a Mockingbird",
  "authors": ["Harper Lee"]
},{
  "shelf": "currentlyReading",
  "backgroundImage": "http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api",
  "title": "Ender's Game",
  "authors": ["Orson Scott Card"]
},{
  "shelf": "wantToRead",
  "backgroundImage": "http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api",
  "title": "1776",
  "authors": ["David McCullough"]
},{
  "shelf": "wantToRead",
  "backgroundImage": "http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72G3gA5A-Ka8XjOZGDFLAoUeMQBqZ9y-LCspZ2dzJTugcOcJ4C7FP0tDA8s1h9f480ISXuvYhA_ZpdvRArUL-mZyD4WW7CHyEqHYq9D3kGnrZCNiqxSRhry8TiFDCMWP61ujflB&source=gbs_api",
  "title": "Harry Potter and the Sorcerer's Stone",
  "authors": ["J.K. Rowling!"]
},{
  "shelf": "read",
  "backgroundImage": "http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api",
  "title": "The Hobbit",
  "authors": ["J.R.R. Tolkien"]
},{
  "shelf": "read",
  "backgroundImage": "http://books.google.com/books/content?id=1q_xAwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE712CA0cBYP8VKbEcIVEuFJRdX1k30rjLM29Y-dw_qU1urEZ2cQ42La3Jkw6KmzMmXIoLTr50SWTpw6VOGq1leINsnTdLc_S5a5sn9Hao2t5YT7Ax1RqtQDiPNHIyXP46Rrw3aL8&source=gbs_api",
  "title": "Oh, the Places You'll Go!",
  "authors": ["JSeuss"]
},{
  "shelf": "read",
  "backgroundImage": "http://books.google.com/books/content?id=32haAAAAMAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72yckZ5f5bDFVIf7BGPbjA0KYYtlQ__nWB-hI_YZmZ-fScYwFy4O_fWOcPwf-pgv3pPQNJP_sT5J_xOUciD8WaKmevh1rUR-1jk7g1aCD_KeJaOpjVu0cm_11BBIUXdxbFkVMdi&source=gbs_api",
  "title": "The Adventures of Tom Sawyer",
  "authors": ["Mark Twain"]
}]

class BooksApp extends React.Component {
  state = {
    shelves: [
      { "currentlyReading": "Currently Reading" },
      { "wantToRead": "Want to Read" },
      { "read": "Read" }
    ],
    books: [],
    reads: []
  }

  componentDidMount() {
    if (!localStorage.reads) {
        localStorage.reads = JSON.stringify(myReads);
        this.setState({ reads: JSON.parse(localStorage.reads) });
    } else {
      this.setState({ reads: JSON.parse(localStorage.reads) });
    }
  }

  searchBooks(query) {
    if (query) {
      BooksAPI.search(query, 10).then((books) => {
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

  updateReads(category, title) {
    if (category !== 'none') {
      this.state.reads.filter((r) => r.title === title).map((r) => r.shelf = category)
      this.setState({ reads: this.state.reads })
      localStorage.reads = JSON.stringify(this.state.reads)
    } else { 
      const newReads = this.state.reads.filter((r) => r.title !== title)
      this.setState({
        reads: newReads
      })
      localStorage.reads = JSON.stringify(newReads)
    }
  }

  addToReads(category, title) {
    const isinReads = this.state.reads.filter((r) => r.title === title)
    if (isinReads.length === 0) {
      var selected = this.state.books.filter((r) => r.title === title)[0]

      var book = { "shelf": category, "title": selected.title, "authors" : selected.authors, "backgroundImage": selected.imageLinks.thumbnail} 

      const newReads = this.state.reads.concat([ book ])

      this.setState(state => ({
          reads: newReads
      }))

      const isInReads = this.state.books.filter((b) => {
        const match = newReads.filter((r) => r.title === b.title)
        return match.length === 0
      })

      this.setState({ books: isInReads })

      localStorage.reads = JSON.stringify(newReads)
    }
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <Bookshelf
            shelves={this.state.shelves}
            reads={this.state.reads}
            onChangeCategory={(category, title) => {
              this.updateReads(category, title)
            }}
          />
        )}/>
        <Route path="/search" render={() => (
          <BooksList
            onSearchBooks={(query) => {
              this.searchBooks(query)
            }}
            books={this.state.books}
            onAddToReads={(category, title) => {
              this.addToReads(category, title)
            }}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp