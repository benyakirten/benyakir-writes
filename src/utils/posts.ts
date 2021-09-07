export function createSearchableString(arr: (string | number | undefined)[]) {
    return arr.reduce((acc, next) => next ? `${next.toString().toLowerCase()} ${acc}` : `${acc}`, '') as string
}

export function formatWpText (text: string) {
    return text
        .replace("<p>", '')
        .replace("</p>", '')
        .replace(/&#?\w+;/g, '')
        .replace(/\[/g, '')
        .replace(/\]/g, '')
        .replace(/\n/g, '')
}

export const createMetaForObject = (item: object) => createSearchableString(Object.values(item).filter(v => !!v))