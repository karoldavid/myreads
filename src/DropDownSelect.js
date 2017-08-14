import React, { Component } from 'react'

class DropDownSelect extends Component {

	state = {
		value: this.props.category,
		title: this.props.id
	}

	handleChange(event) {
		if (this.props.onChangeCategory)
			this.props.onChangeCategory(event.target.value, this.props.id)
		if (this.props.onAddToReads)
			this.props.onAddToReads(event.target.value, this.props.id)
		this.setState( { value: event.target.value })
	}

	render() {
		return  (<div className="book-shelf-changer">
        	<select value={this.state.value} onChange={(event) => this.handleChange(event)}>
            	<option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
            </select>
    	</div>)
	}
}

export default DropDownSelect