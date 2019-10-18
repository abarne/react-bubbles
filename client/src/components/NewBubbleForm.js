import React from 'react';
import { axiosWithAuth } from './utils/axiosWithAuth';

class NewBubbleForm extends React.Component {
	state = {
		id: 0,
		color: '',
		code: { hex: '' }
	};

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	handleHex = (e) => {
		this.setState({
			...this.state,
			code: {
				Hex: e.target.value
			}
		});
	};

	createBubble = (e) => {
		e.preventDefault();
		const newBubble = {
			id: Date.now(),
			color: this.state.color,
			code: this.state.code
		};
		console.log('newBubble, ', newBubble);
		this.addBubble(newBubble);
	};

	addBubble = (newBubble) => {
		axiosWithAuth()
			.post(`/api/colors`, newBubble)
			.then((response) => {
				console.log(response);
				this.refreshPage();
			})
			.catch((err) => console.log(err.response));
	};
	refreshPage = () => {
		window.location.reload(false);
	};

	render() {
		return (
			<div>
				<form onSubmit={this.createBubble}>
					Color Name:
					<input type="text" name="color" value={this.state.name} onChange={this.handleChange} />
					Hex Code:
					<input type="text" name="hex" value={this.state.hex} onChange={this.handleHex} />
					<button>Add bubble</button>
				</form>
			</div>
		);
	}
}

export default NewBubbleForm;
