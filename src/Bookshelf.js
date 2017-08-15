import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Shelf from './Shelf'

class Bookshelf extends Component {

	changeCategory(shelf, id) {
		this.props.onChangeCategory(shelf, id)
	}

	render() {

		const shelves = [
			{ "currentlyReading": "Currently Reading" },
			{ "wantToRead": "Want to Read" },
      		{ "read": "Read" }
    	];

		const { reads } = this.props

		return (

		   <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
              {shelves.map((shelf, index) => (
              	<Shelf
              		key={index}
              	 	shelf={shelf}
              		reads={reads.filter((r) => r.shelf === Object.keys(shelf)[0])}
              		onChangeCategory={(shelf, id) => {
              			this.changeCategory(shelf, id)
              		}}
              	/>
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