import React, { Component } from 'react'

class Bookshelf extends Component {

	render() {

		const { reads, shelves } = this.props
		console.log(reads);
		console.log(shelves);

		return (

		   <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
            	{ shelves.map((shelf, index) => (
              <div key={index}>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">{shelf}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    { reads.filter(read => read.shelf === shelf).map((read, index) => (
                      <li key={index}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${read.backgroundImage}` }}></div>
                            <div className="book-shelf-changer">
                              <select>
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{read.title}</div>
                          <div className="book-authors">{read.authors}</div>
                        </div>
                      </li>
                  	))}
                    </ol>
                  </div>
                </div>
              </div>
              ))}
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )
	}
}

export default Bookshelf