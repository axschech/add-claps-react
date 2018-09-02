import React from 'react';
import ReactDOM from 'react-dom'; 
import InputForm from './input/input.jsx';
import ListItems from './list/list-items.jsx';

import constants from './constants.jsx';

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
         		strippedValue = string.replace(
         			new RegExp('[' + ' ' + ']', 'g'), ' ' + constants.EMOTE + ' '
         		);

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
				<h1>Add Claps</h1>
				<InputForm
					value={value}
					onChange={this.handleChange} 
					onSubmit={this.handleSubmit}
					placeholder={'type stuff here to add claps'}
					submitText={constants.EMOTE} />
				<ListItems list={list} />
			</div>
		);
	}
}

ReactDOM.render(
  <AddClapsApp />,
  document.getElementById('root')
);