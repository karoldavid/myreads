import React, { Component} from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'

class BooksList extends Component {
	state = {
		query: ''
	}

  	updateQuery = (query) => {
  		this.setState({query: query})
	    this.props.onSearchBooks(query)
	}

	addToReads(shelf, id) {
		this.props.onAddToReads(shelf, id)
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
	        	    	<Book
                     		key={index}
                     		read={book}
                     		index={index}
                     		onChangeCategory={(shelf, id) => {
              					this.addToReads(shelf, id)
              				}}
                     	/>
	                ))}
	              </ol>
	            </div>
	        </div>
		)
	}
}

export default BooksList