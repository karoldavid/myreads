import React, { Component} from 'react'
import { Link } from 'react-router-dom'
import DropDownSelect from './DropDownSelect'

class BooksList extends Component {
	state = {
		query: ''
	}

  	updateQuery = (query) => {
  		this.setState({query: query})
	    this.props.onSearchBooks(query)
	}

	addToReads(category, id) {
		this.props.onAddToReads(category, id)
	}

	render() {

		const { books } = this.props
		const { query } = this.state

		return (<div className="search-books">
	        <div className="search-books-bar">
	        	<Link className="close-search" to="/">Close</Link>
	        	<div className="search-books-input-wrapper">
		       		<input type="text" placeholder="Search by title or author"
		       			value={query}
		       			onChange={(event) => this.updateQuery(event.target.value)}
		       		/>    
	        	</div>
	        </div>
	        <div className="search-books-results">
	            <ol className="books-grid">
	        	    { books.map((book, index) => (
	                    <li key={index}>
	                        <div className="book">
	                          <div className="book-top">
	                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
	                            <DropDownSelect category={"none"} id={book.id} onAddToReads={(category, id) => {
        							this.addToReads(category, id)
        						}}/>
	                          </div>
	                          <div className="book-title">{book.title}</div>
	                          <div className="book-authors">{book.authors}</div>
	                        </div>
	                    </li>
	                ))}
	              </ol>
	            </div>
	        </div>
		)
	}
}

export default BooksList