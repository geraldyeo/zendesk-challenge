import test from 'ava';
import compress from '../string-compression';

test('compress(str)', t => {
	const input = 'aaaabbaaaababbbcccccccccccc';
	const expected = 'a4b2a4b1a1b3c12';
	const value = compress(input);
	t.is(value, expected, `output: ${expected}`);
});
