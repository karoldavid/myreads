import React, { Component } from 'react'


class DropDownSelect extends Component {

	state = {
		value: 'currentlyReading'
	}

	handleChange(event) {
		this.setState({value: event.target.value});
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