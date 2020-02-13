function beRandom(min = 0, max = 50) {
	const randomNumber = Math.random() * (max - min) + min;
	return Math.floor(randomNumber);
}
export default beRandom;
