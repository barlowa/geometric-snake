import React from 'react';
import { render } from '@testing-library/react';
import GeometricSnake from './GeometricSnake';

/*
Geometric snake - Driven by an array with a bottom line width and a custom colour

- Top line of the first element is the largest
- Bottom line needs to be given a smaller line than the top line
- Each top line of every element is the same width as bottom line of every element before it. Except the first element which is the viewbox width.
- Text label needs to be centred in the middle 
*/

const props = {
	showDescriptionLine: true,
	elements: [
		{ skewAmount: 10, fill: '#384b60', label: 'one' },
		{ skewAmount: 20, fill: '#5c93c4', label: 'two' },
		{ skewAmount: 30, fill: '#bedafa' }
	],
	viewBoxWidth: 100,
	elementHeight: 25
};

describe('The geometric snake', () => {
	const { getAllByTestId } = render(<GeometricSnake {...props} />);

	const allSegments = getAllByTestId('skewedSegment');
	const descriptionLine = getAllByTestId('descriptionLine');
	const label = getAllByTestId('label');

	const { elements, elementHeight, viewBoxWidth } = props;

	it('renders all of the SVG elements', () => {
		expect(allSegments.length).toBe(elements.length);
	});

	it('renders the correct fill colours', () => {
		allSegments.forEach((segment, index) => expect(segment).toHaveAttribute('fill', elements[index].fill));
	});

	it('renders the description line', () => {
		expect(descriptionLine.length).toBe(elements.length);
	});

	it('renders the label, if there is one', () => {
		let labelProps = [];
		props.elements.forEach(({ label }) => {
			if (label) {
				labelProps = [...labelProps, label];
			}
		});
		expect(label.length).toBe(labelProps.length);
	});

	it('renders the first elements top line as the full viewbox width', () => {
		const firstElementAttributes = allSegments[0].getAttribute('d');
		expect(firstElementAttributes.includes(`M 0,0 H ${viewBoxWidth}`)).toBeTruthy();
	});

	it('renders the second elements top line the same width as the bottom line of the previous element', () => {
		allSegments.forEach((element, index) => {
			if (index > 0) {
				const topLineWidth = viewBoxWidth - elements[index - 1].skewAmount;
				const startingPosition = elements[index - 1].skewAmount;
				const currentPathAttribute = element.getAttribute('d');
				expect(currentPathAttribute.includes(`M ${startingPosition},0 H ${topLineWidth}`)).toBeTruthy();
			}
		});
	});

	it('renders the correct width for each bottom line', () => {
		allSegments.forEach((element, index) => {
			const currentPathAttribute = element.getAttribute('d');
			const { skewAmount } = elements[index];
			const bottomLineWidth = viewBoxWidth - skewAmount;
			expect(currentPathAttribute.includes(`L ${bottomLineWidth}, `)).toBeTruthy();
		});
	});

	it('renders the correct skew amount on each bottom line', () => {
		allSegments.forEach((element, index) => {
			const currentPathAttribute = element.getAttribute('d');
			const { skewAmount } = elements[index];
			expect(currentPathAttribute.includes(`, ${elementHeight} H ${skewAmount}`)).toBeTruthy();
		});
	});
});
