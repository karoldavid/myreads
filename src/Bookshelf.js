import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import DropDownSelect from './DropDownSelect'

class Bookshelf extends Component {

	changeCategory(category, title) {
		this.props.onChangeCategory(category, title)
	}

	render() {

		const { reads, shelves } = this.props
	
		return (

		   <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
            	{ shelves.map((shelf, index) => (
              <div key={index}>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">{Object.values(shelf)[0]}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    { reads.filter(read => read.shelf === Object.keys(shelf)[0]).map((read, index) => (
                      <li key={index}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${read.backgroundImage}` }}></div>
                            <DropDownSelect category={read.shelf} title={read.title} onChangeCategory={(category, title) => {
        						this.changeCategory(category, title)
        					}}/>
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
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )
	}
}

export default Bookshelf