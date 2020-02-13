import { useState, useEffect } from 'react';
import beRandom from './beRandom';

function useSwitcheroo(coolColours) {
	const [isSwitched, setIsSwitched] = useState(false);
	const [theArray, setTheArray] = useState([]);

	function trigger() {
		setIsSwitched(value => !value);
	}

	useEffect(() => {
		let maxSkew = [];

		for (let index = 0; index < beRandom(5, 10); index++) {
			//minimum skew amount cannot be less than the last skew amount
			const theMinimum = index > 0 ? maxSkew[index - 1].skewAmount : 0;
			const theMaximum = index > 0 ? 50 : 10;
			let fill = coolColours[beRandom(0, coolColours.length)];

			setTheArray(maxSkew);
			maxSkew = [...maxSkew, { skewAmount: beRandom(theMinimum, theMaximum), fill }];
		}
	}, [isSwitched, coolColours]);

	return [trigger, theArray];
}

export default useSwitcheroo;
