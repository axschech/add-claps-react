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
				<h1>Add Claps</h1>
				<InputForm
					value={value}
					onChange={this.handleChange} 
					onSubmit={this.handleSubmit}
					placeholder={'type stuff here to add claps'}
					submitText={EMOTE} />
				<ListItems list={list} />
			</div>
		);
	}
}
class TwitterComponent extends React.Component {
	constructor(props) {
		super(props);

		this.item = props.item;
		this.url = 'https://twitter.com/intent/tweet?text=';
		this.handleChange = props.handleChange;
		this.handleSubmit = props.handleSubmit;
		this.handleClick = props.handleClick;
		this.showEdit = props.showEdit;
	}

	render() {
		return (
			<span>
				<TweetClap url={this.url} item={this.item} />
				<TweetReply show={this.showEdit}
							handleClick={this.handleClick}
							url={this.url}
							item={this.item} />
			</span>
		);
	}
}

function TweetClap(props) {
	const url = props.url;
	const item = props.item;
	const reply = props.reply || false;
	const baseUrl = url + item;
	const fullUrl = reply ? baseUrl + reply : baseUrl;

	return (
		<a href={fullUrl} target='_blank'>tweet</a>
	);
}

class TweetReply extends React.Component {
	constructor(props) {
		super(props);

		this.item = props.item;
		this.url = props.url;
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e) {
		this.props.handleClick();
		e.preventDefault()
	}

	render() {
		return (
			<a href="#" onClick={this.handleClick}>(reply)</a>
		)
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
}

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
		console.log(showEdit, 'ListItem');
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
		const value = this.props.value,
			  placeholder = this.props.placeholder,
			  submitText = this.props.submitText,
			  handleChange = this.handleChange,
			  handleSubmit = this.handleSubmit,
			  show = this.props.show;

		if (show === false) {
			return null;
		}

		return (
			<div>
				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<div className="row">
							<div className="col-sm-10">
								<input value={value}
								   autoFocus
							       placeholder={placeholder}
					               onChange={handleChange}
					               className="form-control input-lg" />
							</div>
							<div className="col-sm-2">
								<button type="submit" 
					        		className="form-control input-lg">
					        		{submitText}
						        </button>
							</div>
				        </div>
				    </div>
		       </form>
	       </div>
	);
	}
}

ReactDOM.render(
  <AddClapsApp />,
  document.getElementById('root')
);