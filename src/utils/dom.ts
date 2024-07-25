export function findAttrInElTree(
	el: HTMLElement,
	attr: string,
	val: string | boolean,
): boolean {
	const hasAttr = el.hasAttribute(attr);

	if (hasAttr) {
		return el.getAttribute(attr) === val;
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
