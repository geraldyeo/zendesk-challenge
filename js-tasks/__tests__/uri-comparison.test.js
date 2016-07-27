import test from 'ava';
import checkURIs from '../uri-comparison';

test('checkURIs: encodings', t => {
	const a = 'http://abc.com/~smith/home.html';
	const b = 'http://abc.com/%7Esmith/home.html';
	const expected = true;
	const value = checkURIs(a, b);
	t.is(value, expected, `output: ${expected}`);
});

test('checkURIs: port 80', t => {
	const a = 'http://abc.com:80/~smith/home.html';
	const b = 'http://abc.com/~smith/home.html';
	const expected = true;
	const value = checkURIs(a, b);
	t.is(value, expected, `output: ${expected}`);
});

test('checkURIs: case-insensitive scheme and host', t => {
	const a = 'http://abc.com/~smith/home.html';
	const b = 'hTTp://ABC.com/~smith/home.html';
	const expected = true;
	const value = checkURIs(a, b);
	t.is(value, expected, `output: ${expected}`);
});

test('checkURIs: case-sensitive path', t => {
	const a = 'http://abc.com/~smith/Drilldown/home.html';
	const b = 'http://abc.com/~smith/drilldown/home.html';
	const expected = false;
	const value = checkURIs(a, b);
	t.is(value, expected, `output: ${expected}`);
});

test('checkURIs: traversal tokens', t => {
	const a = 'http://abc.com/drill/down/foo.html';
	const b = 'http://abc.com/drill/further/../down/./foo.html';
	const expected = true;
	const value = checkURIs(a, b);
	t.is(value, expected, `output: ${expected}`);
});

test('checkURIs: search 1', t => {
	const a = 'http://abc.com/foo.html?a=1&b=2';
	const b = 'http://abc.com/foo.html?b=2&a=1';
	const expected = true;
	const value = checkURIs(a, b);
	t.is(value, expected, `output: ${expected}`);
});

test('checkURIs: search 2', t => {
	const a = 'http://abc.com/foo.html?a=1&b=2&a=3';
	const b = 'http://abc.com/foo.html?a=3&a=1&b=2';
	const expected = false;
	const value = checkURIs(a, b);
	t.is(value, expected, `output: ${expected}`);
});
