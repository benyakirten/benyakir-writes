import { CSS_MEASUREMENT_REGEX } from "@Constants";

export function titleToKebab(title: string): string {
    const _title = title.toLowerCase().replace(/'/g, '').split(' ');
    return _title.join('-');
}

export function firstWords(sentence: string, length: number) {
    if (length > sentence.length) return sentence;
    const sub = sentence.substring(0, length)
    return sub.replace(/\s\S*$/, '...')
}

export function multiplyCSSNumber(prop: string, amt: number) {
    const match = prop.match(CSS_MEASUREMENT_REGEX)
    if (!match) return prop;
    const remainder = match[2]
    const measure = remainder ? +match[1] + (+remainder / (10 ** remainder.length)) : +match[1]
    const unit = match[3]
    return (measure * amt).toFixed(1) + unit
}