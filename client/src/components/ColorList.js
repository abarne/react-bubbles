import React, { useState } from 'react';
import { axiosWithAuth } from './utils/axiosWithAuth';
import NewBubbleForm from './NewBubbleForm';

const initialColor = {
	color: '',
	code: { hex: '' }
};

const ColorList = ({ colors, updateColors }) => {
	console.log('colors ', colors);
	const [ editing, setEditing ] = useState(false);
	const [ colorToEdit, setColorToEdit ] = useState(initialColor);

	const editColor = (color) => {
		setEditing(true);
		setColorToEdit(color);
	};

	const saveEdit = (e) => {
		e.preventDefault();
		// Make a put request to save your updated color
		// think about where will you get the id from...
		// where is is saved right now?
		axiosWithAuth()
			.put(`api/colors/${colorToEdit.id}`, colorToEdit)
			.then((response) => {
				console.log('put request respone ', response);
				updateList();
			})
			.catch((err) => console.log(err.response));
	};

	const updateList = () => {
		// axiosWithAuth()
		// 	.get(`/api/colors`)
		// 	.then((response) => {
		// 		console.log('bubbles GET response, ', response);
		// 		updateColors(response.data);
		// 	})
		// 	.catch((err) => console.log(err.response));
		window.location.reload(false);
	};

	const deleteColor = (color) => {
		// make a delete request to delete this color
		axiosWithAuth()
			.delete(`/api/colors/${colorToEdit.id}`)
			.then((response) => {
				console.log('delete request, ', response);
				updateList();
			})
			.catch((err) => console.log(err.response));
	};

	return (
		<div className="colors-wrap">
			<p>colors</p>
			<ul>
				{colors.map((color) => (
					<li key={color.color} onClick={() => editColor(color)}>
						<span>
							<span className="delete" onClick={() => deleteColor(color)}>
								x
							</span>{' '}
							{color.color}
						</span>
						<div className="color-box" style={{ backgroundColor: color.code.hex }} />
					</li>
				))}
			</ul>
			{editing && (
				<form onSubmit={saveEdit}>
					<legend>edit color</legend>
					<label>
						color name:
						<input
							onChange={(e) => setColorToEdit({ ...colorToEdit, color: e.target.value })}
							value={colorToEdit.color}
						/>
					</label>
					<label>
						hex code:
						<input
							onChange={(e) =>
								setColorToEdit({
									...colorToEdit,
									code: { hex: e.target.value }
								})}
							value={colorToEdit.code.hex}
						/>
					</label>
					<div className="button-row">
						<button type="submit">save</button>
						<button onClick={() => setEditing(false)}>cancel</button>
					</div>
				</form>
			)}
			<div className="spacer" />
			{/* stretch - build another form here to add a color */}
			<NewBubbleForm />
		</div>
	);
};

export default ColorList;
