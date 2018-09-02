import React from 'react';
import ReactDOM from 'react-dom';
import InputForm from '../input/input.jsx';
import SelectContent from '../select-text.jsx';
import TwitterComponent from '../twitter/twitter.jsx';

console.log(SelectContent);

class ListItem extends React.Component {
	constructor(props) {
		super(props);

		this.string = props.string;
		this.key = props.id;
		this.listItemElement = React.createRef();

		this.state = {
			showEdit: false,
			replyID: ''
		};

		this.handleTweetReplyClick = this.handleTweetReplyClick.bind(this);
		this.handleTweetReplyChange = this.handleTweetReplyChange.bind(this);
		this.handleTweetReplySubmit = this.handleTweetReplySubmit.bind(this);
	}

	handleTweetReplyClick() {
		this.setState({
			showEdit: true
		});
	}

	handleTweetReplyChange(value) {
		this.setState({
			replyID: value
		});
	}

	handleTweetReplySubmit() {
		this.setState({
			showEdit: false
		});
	}

	render() {
		const showEdit = this.state.showEdit;
		
		return (
			<div>
				<div ref={this.listItemElement}>
					{this.string} <SelectContent rawElement={this.listItemElement} /> | <TwitterComponent 
						item={this.string}
						handleChange={this.handleTweetReplyChange}
						handleSubmit={this.handleTweetReplySubmit}
						handleClick={this.handleTweetReplyClick}
						showEdit={showEdit} />
				</div>
				<InputForm
					show={showEdit}
					submitText={'Reply'} 
					placeholder={'Put the tweet url here'}
					onSubmit={this.handleTweetReplySubmit} 
					onChange={this.handleTweetReplyChange} />
			</div>
		);
	}
}

function ListItems(props) {
	let globalIDCounter = 0;

	const list = props.list,
		listItems = list.map((string) => 
		<ListItem string={string} key={globalIDCounter++} />
	);

	return (
		<div className="clapText">
			{listItems}
		</div>
	);
}

export default ListItems;