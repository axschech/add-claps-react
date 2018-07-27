import React from 'react';
import ReactDOM from 'react-dom'; 

// this is bad
var globalIDCounter = 1; 

const EMOTE = '👏';

class AddClapsApp extends React.Component {
	constructor(props) {
		super(props);

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

		this.state = {
			list: [],
			value: ''
		};
	}

	handleChange(value) {
		this.setState({
			value: value
		})
	}

	handleSubmit() {
		if (!this.state.value) {
			return;
		}
		this.setState(prev => {
			let string = this.state.value.trim() + ' ',
         		strippedValue = string.replace(new RegExp('[' + ' ' + ']', 'g'), ' ' + EMOTE + ' ');

			return {
				list: [...prev.list, strippedValue],
				value: ''
			}
		});
	}

	render() {
		const value = this.state.value;
		const list = this.state.list;

		return (
			<div className="container">
				<InputForm
					value={value}
					onChange={this.handleChange} 
					onSubmit={this.handleSubmit} />
				<ListItems list={list} />
			</div>
		);
	}
}

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
};

class ListItem extends React.Component {
	constructor(props) {
		super(props);

		this.string = props.string;
		this.key = props.id;
		this.listItemElement = React.createRef();
	}

	render() {
		return (
			<p ref={this.listItemElement}>
				{this.string} <SelectContent rawElement={this.listItemElement} />
			</p>
		);
	}
}

function ListItems(props) {
	const list = props.list;
	const listItems = list.map((string) => 
		<ListItem string={string} key={globalIDCounter++} />
	);

	return (
		<div className="clapText">
			{listItems}
		</div>
	);
}

class InputForm extends React.Component {
	constructor(props) {
		super(props);

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
		this.props.onChange(e.target.value);
	}

	handleSubmit(e) {
		this.props.onSubmit();
		e.preventDefault();
	}

	render() {
		const value = this.props.value;
		return (
			<div>
				<h1>Add Claps</h1>
				<form onSubmit={this.handleSubmit}>
					<div className="form-group">
						<div className="row">
							<div className="col-sm-10">
								<input value={value}
								   autoFocus
							       placeholder="type stuff here to add claps"
					               onChange={this.handleChange}
					               className="form-control input-lg" />
							</div>
							<div className="col-sm-2">
								<button type="submit" 
					        		className="form-control input-lg"
					        		onSubmit={this.handleSubmit}>{EMOTE}
						        </button>
							</div>
				        </div>
				    </div>
		       </form>
	       </div>
		)
	}
}

ReactDOM.render(
  <AddClapsApp />,
  document.getElementById('root')
);