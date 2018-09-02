import React from 'react';
import ReactDOM from 'react-dom';

class SelectContent extends React.Component {
	constructor(props) {
		super(props);

		this.selectItem = this.selectItem.bind(this);
		this.rawElement = this.props.rawElement;
	}

	selectItem(e) {
		let selection = window.getSelection(),
			range = document.createRange();

		e.preventDefault();
		range.selectNodeContents(this.rawElement.current.childNodes[0]);
		selection.removeAllRanges();
		selection.addRange(range);
		document.execCommand('copy');

	}
	render() {
		return (
			<a href="#" onClick={this.selectItem}>copy</a>
		);
	};
}

export default SelectContent;
