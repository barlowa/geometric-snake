import React, { useState } from 'react';
import './App.css';
import GeometricSnake from './GeometricSnake.js';

function App() {
	const array1 = [
		{ skewAmount: 10, fill: '#384b60', label: 'one' },
		{ skewAmount: 22, fill: '#5c93c4', label: 'two' },
		{ skewAmount: 34, fill: '#bedafa', label: 'three' },
		{ skewAmount: 40, fill: '#f8f7f2', label: 'four' },
		{ skewAmount: 50, fill: '#a83e6c', label: 'five' }
	];
	const array2 = [
		{ skewAmount: 10, fill: '#384b60', label: 'one' },
		{ skewAmount: 20, fill: '#5c93c4', label: 'two' },
		{ skewAmount: 30, fill: '#bedafa', label: 'three' }
	];

	const [switcheroo, setSwitcheroo] = useState(array1);

	return (
		<div className="App">
			<header className="App-header">
				<button onClick={array => setSwitcheroo(array.length === 3 ? array1 : array2)}>
					Do the old switcheroo
				</button>
				<GeometricSnake elements={switcheroo} />
				<GeometricSnake
					showDescriptionLine={true}
					elements={[
						{ skewAmount: 10, fill: '#384b60' },
						{ skewAmount: 22, fill: '#5c93c4' },
						{ skewAmount: 34, fill: '#bedafa' },
						{ skewAmount: 40, fill: '#f8f7f2' },
						{ skewAmount: 50, fill: '#a83e6c' }
					]}
				/>
				<br />
			</header>
		</div>
	);
}

export default App;
