import compress from './string-compression';
import checkURIs from './uri-comparison';

// iife
(win => {
	let input;
	let input2;
	let output;
	// 1
	input = 'aaaabbaaaababbbcccccccccccc';
	output = compress(input);
	console.log(`%cTask 1 input: ${input}`, 'color: aqua; font-size: large;');
	console.log(`%cTask 1 output: ${output}`, 'color: aqua; font-size: large;');

	// 2
	input = 'http://abc.com/~smith/home.html';
	input2 = 'http://abc.com/%7Esmith/home.html';
	output = checkURIs(input, input2)
	console.log(`%cTask 2 input: ${input}, ${input2}`, 'color: aqua; font-size: large;');
	console.log(`%cTask 2 output: ${output}`, 'color: aqua; font-size: large;');
})(window);
