export function findAttrInElTree(
	el: HTMLElement,
	attr: string,
	val: string | boolean,
): boolean {
	const attrHasValue = el.getAttribute(attr) === val;

	if (!attrHasValue) {
		return false;
	}

	if (!el.parentElement || el.parentElement.tagName === "BODY") {
		return false;
	}

	return findAttrInElTree(el.parentElement, attr, val);
}

export function downloadFile(href: string, name: string) {
	const link = document.createElement("a");
	link.href = href;
	link.download = name;

	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}
