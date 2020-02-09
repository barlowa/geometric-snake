import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/*
Geometric snake - Driven by an array with a bottom line width and a custom colour

- Top line of the first element is the largest
- Bottom line needs to be given a smaller line than the top line
- Each top line of every element is the same width as bottom line of every element before it. Except the first element which is the viewbox width.
- Text label needs to be centred in the middle 
*/

const Segment = styled.svg`
	width: 400px;
	animation: hideshow 0.5s ease;
	transition: all 2s linear 1s;

	text {
		font-size: 10px;
		fill: white;
		text-anchor: middle;
	}
	.descriptionline {
		stroke-width: 0.5px;
		stroke: black;
	}
	@keyframes hideshow {
		0% {
			position: relative;
			transform: scale(1.15);
			bottom: 25px;
			opacity: 0.5;
			transform-origin: bottom;
		}
		100% {
			position: relative;
			transform: scale(1);
			bottom: 0px;
			opacity: 1;
			transform-origin: bottom;
		}
	}
`;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	transition: all 2s linear 1s;
`;

const GeometricSnake = ({ elements, elementHeight, viewBoxWidth, showDescriptionLine }) => {
	// console.log(document.getElementsByClassName('skewedSegment'));
	return (
		<Wrapper>
			{elements.map(({ skewAmount, fill, label }, index) => {
				const isFirstElement = index === 0;

				const calculateBottomLineWidth = skewParameter => viewBoxWidth - skewParameter;

				//skewAmount of previous element
				const previousElementSkewAmount = !isFirstElement && elements[index - 1].skewAmount;

				//find previous width of bottom line for this elements top line
				const previousBottomLineWidth = !isFirstElement && calculateBottomLineWidth(previousElementSkewAmount);

				//work out starting x and y co-ordinates
				const startCoordinates = [isFirstElement ? 0 : previousElementSkewAmount, 0];

				//first element is full width. all other top lines are the width of the previous bottom line
				const widthOfTopLine = isFirstElement ? viewBoxWidth : previousBottomLineWidth;

				return (
					<Segment className="segment" key={index} viewBox={`0 0 ${viewBoxWidth} ${elementHeight}`}>
						{showDescriptionLine && (
							<path
								data-testid="descriptionLine"
								className="descriptionline"
								d={`M 0,0
                        	H ${startCoordinates}`}
							/>
						)}
						<path
							data-testid="skewedSegment"
							className="skewedSegment"
							fill={fill}
							d={`M ${startCoordinates} H ${widthOfTopLine} L ${calculateBottomLineWidth(
								skewAmount
							)}, ${elementHeight} H ${skewAmount} Z ${startCoordinates} M ${startCoordinates}`}
						/>
						{label && (
							<text data-testid="label" y="17" x="50%">
								{label}
							</text>
						)}
					</Segment>
				);
			})}
		</Wrapper>
	);
};

GeometricSnake.propTypes = {
	elementHeight: PropTypes.number,
	elements: PropTypes.arrayOf(
		PropTypes.shape({
			skewAmount: PropTypes.number.isRequired,
			fill: PropTypes.string.isRequired,
			label: PropTypes.string
		}).isRequired
	).isRequired,
	viewBoxWidth: PropTypes.number,
	showDescriptionLine: PropTypes.bool
};

GeometricSnake.defaultProps = {
	viewBoxWidth: 100,
	elementHeight: 25,
	elements: [{ skewAmount: 10, fill: 'blue', stroke: 'black', label: '' }],
	showDescriptionLine: false
};
export default GeometricSnake;
