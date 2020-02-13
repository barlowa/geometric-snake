import styled from 'styled-components';

const Button = styled.button`
	background-color: ${({ colours: { backgroundColour } }) => backgroundColour};
	color: ${({ colours: { textColour } }) => textColour};
	font-size: 30px;
	padding: 30px;
	width: 400px;
	border-radius: 5px;
	border: 0;
	font-weight: bold;
	&:focus {
		outline: none;
	}
`;
export default Button;
