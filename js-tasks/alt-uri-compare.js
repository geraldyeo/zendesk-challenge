/**
 * Write a function `checkURIs(uri1, uri2)` that can check if 2 URIs are
 * equivalent. The function should return true if match, and false otherwise
 */

export default function checkURIs(a, b) {
}

// https://tools.ietf.org/html/rfc3986#appendix-B
export function getUrlHash(url) {
	const re = new RegExp(/^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/);
	const parts = url.match(re);
	const protocol = parts[1];
	const authority = parts[4];
	const path = parts[5];
	const query = parts[7];
	const fragment = parts[9];
	const {
		host,
		hostname,
		port,
		username,
		password
	} = parseAuthority(authority);

	return {
		href: url,
		protocol,
		host,
		hostname,
		port,
		username,
		password,
		path,
		resolvedPath: resolvePath(path),
		search: `?${query}`,
		queryParams: parseSearch(query),
		hash: fragment
	};
}

function parseAuthority(authority) {
	let auth = authority.split('@');
	const host = parseHost(auth.pop());
	auth = parseAuth(auth.pop());

	return {
		host: host.port ? `${host.hostname}:${host.port}` : host.hostname,
		hostname: host.hostname,
		port: host.port,
		username: auth.username,
		password: auth.password
	};
}

function parseAuth(auth = '') {
	const parts = auth.split(':');
	return {username: parts[0] || null, password: parts[1] || null};
}

function parseHost(host = '') {
	const parts = host.split(':');
	return {hostname: parts[0], port: parts[1] || null};
}

// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
function parseSearch(search = '') {
	const ret = {};
	search = search.trim().replace(/^(\?|#|&)/, '');
	search.split('&').forEach(param => {
		const parts = param.replace(/\+/g, ' ').split('=');
		const key = decodeURIComponent(parts.shift());
		let val = parts.shift();
		val = val === undefined ? null : decodeURIComponent(val);

		if (ret[key] === undefined) {
			ret[key] = val;
		} else if (Array.isArray(ret[key])) {
			ret[key].push(val);
		} else {
			ret[key] = [ret[key], val];
		}
	});
	return ret;
}

function resolvePath(path = '') {
	const reDot = new RegExp(/(\/\.?\/)/);
	const reDotDot = new RegExp(/\/(?!\.\.)[^\/]+\/\.\.\//);
	// replace `// or /./`
	while (path.match(reDot)) {
		path = path.replace(reDot, '/');
	}
	// replace `/../`
	while (path.match(reDotDot)) {
		path = path.replace(reDotDot, '/');
	}
	return path;
}

console.log(getUrlHash('https://www.google.com/sp?type=123&type2=456#hash'))
