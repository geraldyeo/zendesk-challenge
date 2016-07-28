/**
 * Write a function `compress(str)`, which shortens strings by reducing
 * consecutive character repetitions.
 */
export default function compress(str = '') {
	if (!str) {
		return str;
	}
	const arr = str.split('');
	const max = arr.length - 1;
	let count = 1;
	let output = '';

	arr.reduce((prev, curr, i) => {
		if (prev === curr) {
			count += 1;
		} else {
			output += prev + count;
			count = 1;
		}
		if (i === max) {
			output += curr + count;
		}
		return curr;
	});

	return output;
}
