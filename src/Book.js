import React, { Component } from 'react'
import DropDownSelect from './DropDownSelect'

class Book extends Component {

	changeCategory(shelf, id) {
		this.props.onChangeCategory(shelf, id)
	}

	render() {

		const { read, index } = this.props
		const hasImageLinks = read.imageLinks ? read.imageLinks : ""

		return (

			 <li key={index}>
	                        <div className="book">
	                          <div className="book-top">
	                          { hasImageLinks &&
	                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${read.imageLinks.smallThumbnail}` }}></div>
	                          }
	                            <DropDownSelect category={read.shelf} id={read.id} onChangeCategory={(shelf, id) => {
	        						this.changeCategory(shelf, id)
	        					}}/>
	                          </div>
	                          <div className="book-title">{read.title}</div>
	                          <div className="book-authors">{read.authors && read.authors.join(', ')}</div>
	                        </div>
	                      </li>
         )
	}

};

export default Book