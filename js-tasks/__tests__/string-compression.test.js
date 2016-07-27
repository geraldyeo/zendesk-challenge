import test from 'ava';
import compressString from '../string-compression';

test('compressString("aaaabbaaaababbbcccccccccccc")', t => {
	const input = 'aaaabbaaaababbbcccccccccccc';
	const expected = 'a4b2a4b1a1b3c12';
	const value = compressString(input);
	t.is(value, expected, `output: ${expected}`);
});
