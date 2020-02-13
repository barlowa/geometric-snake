import React, { useState, useMemo } from 'react';
import './App.css';
import GeometricSnake from './GeometricSnake';
import useSwitcheroo from './useSwitcheroo';
import beRandom from './beRandom';
import Button from './Button';

function App() {
	const coolColours = useMemo(
		() => [
			'#324448',
			'#6b8b8d',
			'#b6cdb1',
			'#f87c56',
			'#3f5c6d',
			'#b9efa3',
			'#ffa2cb',
			'#eff9f7',
			'#99dedf',
			'#e45865',
			'#fcd06b',
			'#f7f6ee'
		],
		[]
	);
	const [triggerSwitcheroo, theOldSwitcheroo] = useSwitcheroo(coolColours);

	const [triggerAnotherSwitcheroo, whatsThisTwoSwitcheroos] = useSwitcheroo(coolColours);

	const [currentLyric, setCurrentLyric] = useState(0);

	const bennyBennassi = ['Push me', 'And then just touch me', 'Till I can get my', 'Satisfaction'];

	const [buttonColours, setButtonColours] = useState({ backgroundColour: 'fff', textColour: '000' });

	function triggerSomeSwitcheroos() {
		triggerSwitcheroo();
		triggerAnotherSwitcheroo();
		setCurrentLyric(lastLyric => (bennyBennassi.length > lastLyric + 1 ? lastLyric + 1 : 0));
		setButtonColours(() => {
			let backgroundColourIndex = beRandom(0, coolColours.length);
			let textColourIndex = beRandom(0, coolColours.length);

			if (backgroundColourIndex === textColourIndex) {
				textColourIndex = beRandom(0, coolColours.length);
			}

			return { backgroundColour: coolColours[backgroundColourIndex], textColour: coolColours[textColourIndex] };
		});
	}

	return (
		<div className="App">
			<header className="App-header">
				<GeometricSnake elements={theOldSwitcheroo} />
				<GeometricSnake
					showDescriptionLine={true}
					elements={[
						{ skewAmount: 20, fill: '#324448', label: 'one' },
						{ skewAmount: 22, fill: '#6b8b8d', label: 'two' },
						{ skewAmount: 34, fill: '#b6cdb1', label: 'three' },
						{ skewAmount: 40, fill: '#f87c56', label: 'four' }
					]}
				/>
				<Button colours={buttonColours} onClick={triggerSomeSwitcheroos}>
					{bennyBennassi[currentLyric]}
				</Button>
				<GeometricSnake
					viewBoxWidth={300}
					elementHeight={100}
					elements={[
						{ skewAmount: 10, fill: '#3f5c6d' },
						{ skewAmount: 40, fill: '#b9efa3' },
						{ skewAmount: 43, fill: '#ffa2cb' },
						{ skewAmount: 48, fill: '#eff9f7' }
					]}
				/>
				<GeometricSnake elements={whatsThisTwoSwitcheroos} />
				<br />
			</header>
		</div>
	);
}

export default App;
