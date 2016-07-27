/**
 * String Compression
 *
 * Write a function `compress(str)`, which shortens strings by reducing
 * consecutive character repetitions:
 * e.g.
 * ```
 * input: aaaabbaaaababbbcccccccccccc
 * return value: a4b2a4b1a1b3c12
 * ```
 * Note: input string will only contain `[a-z]+`
 *
 * @param  {string} str - string to compress
 * @return {string} compressed string
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
		if (prev !== curr) {
			output += prev + count;
			count = 1;
		} else {
			count += 1;
		}
		if (i === max) {
			output += curr + count;
		}
		return curr;
	});

	return output;
}
