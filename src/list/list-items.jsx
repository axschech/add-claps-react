import React from 'react';
import ReactDOM from 'react-dom';
import InputForm from '../input/input.jsx';
import SelectContent from '../select-text.jsx';
import TwitterComponent from '../twitter/twitter.jsx';

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
				<div>
					{this.string} <SelectContent rawElement={this.listItemElement} /> | <TwitterComponent 
						item={this.string}
						reply={this.state.replyID}
						handleClick={this.handleTweetReplyClick}
						show={showEdit} />
				</div>
				<InputForm
					show={showEdit}
					submitText={'Set'} 
					placeholder={'Put the tweet url here'}
					value={this.state.replyID}
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