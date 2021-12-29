export function findAttrInElTree(el: HTMLElement, attr: string, val: string | boolean): boolean {
  const attrHasValue = el.getAttribute(attr) === val
  if (attrHasValue) {
    return true
  } else {
    if (el.parentElement && el.parentElement.tagName !== 'BODY') {
      return findAttrInElTree(el.parentElement, attr, val)
    } else {
      return false
    }
  }
}