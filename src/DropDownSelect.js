import React, { Component } from 'react'


class DropDownSelect extends Component {

	state = {
		value: this.props.category,
		title: this.props.title
	}

	handleChange(event) {
	//	this.setState({value: event.target.value});
		if (this.props.onChangeCategory)
			//this.props.read.shelf = event.target.value
			this.props.onChangeCategory(event.target.value, this.props.title)
		if (this.props.onAddToReads)
			this.props.onAddToReads(event.target.value, this.props.title)
	}

	render() {
		return  (<div className="book-shelf-changer">
        	<select value={this.state.value} onChange={(event) => this.handleChange(event)}>
            	<option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
            </select>
          </div>)
	}
}

export default DropDownSelect