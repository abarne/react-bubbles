import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from './utils/axiosWithAuth';

import Bubbles from './Bubbles';
import ColorList from './ColorList';

const BubblePage = () => {
	const [ colorList, setColorList ] = useState([]);
	// fetch your colors data from the server when the component mounts
	// set that data to the colorList state property

	useEffect(() => {
		axiosWithAuth()
			.get(`/api/colors`)
			.then((response) => {
				console.log('bubbles GET response, ', response);
				setColorList(response.data);
			})
			.catch((err) => console.log(err.response));
	}, []);

	return (
		<div>
			<ColorList colors={colorList} updateColors={setColorList} />
			<Bubbles colors={colorList} />
		</div>
	);
};

export default BubblePage;
