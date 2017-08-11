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

	addToReads(category, title) {
		this.props.onAddToReads(category, title)
	}

	render() {

		const { books } = this.props
		const { query } = this.state

		return (<div className="search-books">
	        <div className="search-books-bar">
	        	<Link className="close-search" to="/">Close</Link>
	        	<div className="search-books-input-wrapper">
			        {/* 
			         NOTES: The search from BooksAPI is limited to a particular set of search terms.
			         You can find these search terms here:
			         https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
			           
			         However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
			         you don't find a specific author or title. Every search is limited by search terms.
			        */}
			       
		       		<input type="text" placeholder="Search by title or author" value={query} onChange={(event) => this.updateQuery(event.target.value)}/>    
	        	</div>
	        </div>
	        <div className="search-books-results">
	            <ol className="books-grid">
	        	    { books.map((book, index) => (
	                    <li key={index}>
	                        <div className="book">
	                          <div className="book-top">
	                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
	                            <DropDownSelect category={"none"} title={book.title} onAddToReads={(category, title) => {
        							this.addToReads(category, title)
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