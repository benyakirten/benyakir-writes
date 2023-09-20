export function findAttrInElTree(
  el: HTMLElement,
  attr: string,
  val: string | boolean
): boolean {
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

export function downloadFile(href: string, name: string) {
  const link = document.createElement('a')
  link.href = href
  link.download = name

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
