import React from 'react';
import ReactDOM from 'react-dom'; 

// this is bad
var globalIDCounter = 1; 

const EMOTE = '👏';

function ListItems(props) {
	const list = props.list;
	const listItems = list.map((string) => 
		<li key={globalIDCounter++}>
			{string}
		</li>
	);

	return (
		<ul>
			{listItems}
		</ul>
	);
}

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
		this.setState(function (prev) {
			let string = this.state.value.trim() + ' ',
         		strippedValue = string.replace(new RegExp('[' + ' ' + ']', 'g'), EMOTE);

			return {
				list: [...prev.list, strippedValue],
				value: ''
			}
		});
		console.log(this.state.list, 'handleSubmit');
	}

	render() {
		const value = this.state.value;
		const list = this.state.list;

		return (
			<div>
				<InputForm
					value={value}
					list={list}
					onChange={this.handleChange} 
					onSubmit={this.handleSubmit} />

			</div>
		);
	}
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
		const list = this.props.list;
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<fieldset>
				        <legend>Claps:</legend>
				        <input value={value}
				               onChange={this.handleChange} />
				        <input type="submit" 
				        		onSubmit={this.handleSubmit} />
			       </fieldset>
		       </form>
		       <ListItems list={list} />
	       </div>
		)
	}
}

ReactDOM.render(
  <AddClapsApp />,
  document.getElementById('root')
);