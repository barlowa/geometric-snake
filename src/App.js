import React, { useState } from 'react';
import './App.css';
import GeometricSnake from './GeometricSnake.js';

function App() {
	const array1 = [
		{ skewAmount: 10, fill: '#384b60' },
		{ skewAmount: 22, fill: '#5c93c4' },
		{ skewAmount: 34, fill: '#bedafa' },
		{ skewAmount: 40, fill: '#f8f7f2' },
		{ skewAmount: 48, fill: '#a83e6c' }
	];
	const array2 = [
		{ skewAmount: 10, fill: '#384b60', label: 'one' },
		{ skewAmount: 20, fill: '#5c93c4', label: 'two' },
		{ skewAmount: 30, fill: '#bedafa', label: 'three' }
	];

	const [switcheroo, setSwitcheroo] = useState(array1);

	return (
		<div className="App">
			<button onClick={array => setSwitcheroo(array.length === 3 ? array1 : array2)}>Do the old switcheroo</button>
			<header className="App-header">
				<GeometricSnake elements={switcheroo} />
				<GeometricSnake
					showDescriptionLine={true}
					elements={[
						{ skewAmount: 20, fill: '#324448', label: 'one' },
						{ skewAmount: 22, fill: '#6b8b8d', label: 'two' },
						{ skewAmount: 34, fill: '#b6cdb1', label: 'three' },
						{ skewAmount: 40, fill: '#f87c56', label: 'four' }
					]}
				/>
				<GeometricSnake
					elements={[
						{ skewAmount: 10, fill: '#3f5c6d' },
						{ skewAmount: 40, fill: '#b9efa3' },
						{ skewAmount: 43, fill: '#ffa2cb' },
						{ skewAmount: 48, fill: '#eff9f7' }
					]}
				/>
				<GeometricSnake
					viewBoxWidth={300}
					elementHeight={75}
					elements={[
						{ skewAmount: 5, fill: '#99dedf' },
						{ skewAmount: 20, fill: '#e45865' },
						{ skewAmount: 20, fill: '#fcd06b' },
						{ skewAmount: 37, fill: '#f7f6ee' }
					]}
				/>
				<br />
			</header>
		</div>
	);
}

export default App;
