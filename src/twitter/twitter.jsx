import React from 'react';
import ReactDOM from 'react-dom';
import urlParser from 'url';


class TwitterComponent extends React.Component {
	constructor(props) {
		super(props);

		this.url = 'https://twitter.com/intent/tweet?text=';
		this.handleClick = props.handleClick;
	}

	render() {
		const reply = this.props.reply,
			  item = this.props.item,
			  show = this.props.show;
		return (
			<span>
				<TweetClap url={this.url} item={item} reply={reply} />
				<TweetReply handleClick={this.handleClick}
							url={this.url}
							reply={reply}
							show={show} />
			</span>
		);
	}
}

// TODO: parse URL 
function TweetClap(props) {
	
	const url = props.url,
		item = props.item,
		reply = props.reply || false,
		baseUrl = url + item,
		fullUrl = reply ? baseUrl + '&in_reply_to=' + reply : baseUrl;

	return (
		<a href={fullUrl} target='_blank'>tweet</a>
	);
}

class TweetReply extends React.Component {
	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e) {
		this.props.handleClick();
		e.preventDefault()
	}

	render() {
		const reply = this.props.reply,
			  show = reply && !this.props.show;

		return (
			 <a href="#" onClick={this.handleClick}>(reply){show && <span>| Replying to: {reply}</span>}</a>
		)
	}
}

export default TwitterComponent;