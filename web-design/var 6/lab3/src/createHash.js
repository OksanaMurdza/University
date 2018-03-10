export function hashCode(str) {
	let hash = 0;
	let i = 0;
	let chr = '';
	if (str.length === 0) return hash;

	for (i = 0; i < str.length; i++) {
		chr = str.charCodeAt(i);
		hash = (hash << 5) - hash + chr;
		hash |= 0;
	}

	return hash;
}
