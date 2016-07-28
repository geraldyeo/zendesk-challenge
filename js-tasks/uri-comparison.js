/**
 * Write a function `checkURIs(uri1, uri2)` that can check if 2 URIs are
 * equivalent. The function should return true if match, and false otherwise
 */
import assert from 'assert';
import url from 'url';

export default function checkURIs(a, b) {
	// decode uri first
	const _a = parseURI(a);
	const _b = parseURI(b);
	const isSame = {
		protocol: _a.protocol === _b.protocol,
		auth: _a.auth === _b.auth,
		hostname: _a.hostname === _b.hostname,
		port: _a.port === _b.port,
		pathname: _a.pathname === _b.pathname,
		hash: _a.hash === _b.hash,
		query: checkQuery(_a, _b)
	};
	// check
	let prop;
	for (prop in isSame) {
		if (!isSame[prop]) {
			return false;
		}
	}
	return true;
}

// use node's `url` module
// compare: protocol, auth, hostname, port, hash, query, pathname
// case-insensitive: protocol, hostname
// remove port 80
// resolve traversal tokens
function parseURI(uri) {
	uri = url.parse(decodeURI(uri), true, true);
	uri.protocol = uri.protocol.toLowerCase();
	uri.hostname = uri.hostname.toLowerCase();
	uri.port = uri.port === '80' ? null : uri.port;
	uri.pathname = url.resolve('/', uri.pathname);
	return uri;
}

function checkQuery(a, b) {
	try {
		assert.deepEqual(a.query, b.query);
		return true;
	} catch (e) {
		return false;
	}
}
