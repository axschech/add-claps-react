import React from 'react';
import ReactDOM from 'react-dom';

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
	const url = props.url,
		item = props.item,
		reply = props.reply || false,
		baseUrl = url + item,
		fullUrl = reply ? baseUrl + reply : baseUrl;

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

export default TwitterComponent;