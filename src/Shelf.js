import React, { Component } from 'react'
import Book from './Book'

class Shelf extends Component {

	changeCategory(shelf, id) {
		this.props.onChangeCategory(shelf, id)
	}

	render() {

		const {shelf, reads} = this.props

		return(

	        <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">{Object.values(shelf)[0]}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    { reads.filter(read => read.shelf === Object.keys(shelf)[0]).map((read, index) => (
                     	<Book
                     		key={index}
                     		read={read}
                     		index={index}
                     		onChangeCategory={(shelf, id) => {
              					this.changeCategory(shelf, id)
              				}}
                     	/>
                  	))}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
    )}

}

export default Shelf