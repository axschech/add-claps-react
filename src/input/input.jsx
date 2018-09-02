import React from 'react';
import ReactDOM from 'react-dom';

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

export default InputForm;