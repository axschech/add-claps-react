import React from 'react';
import ReactDOM from 'react-dom'; 

// this is bad
var globalIDCounter = 1; 

const EMOTE = '👏';

function ListItems(props) {
	const list = props.list;
	const listItems = list.map((string) => 
		<p key={globalIDCounter++}>
			{string}
		</p>
	);

	return (
		<div className="clapText">
			{listItems}
		</div>
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
			<div className="container">
				<h1>Add Claps</h1>
				<form onSubmit={this.handleSubmit}>
					<div className="form-group">
						<div className="row">
							<div className="col-sm-10">
								<input value={value}
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
		       <ListItems list={list} />
	       </div>
		)
	}
}

ReactDOM.render(
  <AddClapsApp />,
  document.getElementById('root')
);