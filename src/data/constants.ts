import SyntaxHighlighter from "@Blocks/SyntaxHighlighter/SyntaxHighlighter.component"

// In milliseconds
export const SEARCH_TIMEOUT = 250

export const ICONS_TO_LINKS = {
    Twitter: "https://twitter.com/BenyakirTen",
    Github: "https://github.com/benyakirten",
    Blog: "https://benyakiredits.com"
}

export const ICONS_TO_COLORS = {
    Twitter: '#fff'
}

export const KNOWN_BLOCK_CLASSES: BlockComponents = {
    "benyakir-syntax-highlighter": SyntaxHighlighter
}

export const DATE_REGEX = /^\d{2}\/\d{2}\/\d{4}$/
export const CSS_MEASUREMENT_REGEX = /^(\d+(\.\d+)?)([%\w]+)$/
export const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const TRIANGLES_FOR_CORNER_INDEX = [
    'polygon(0 0, 100% 0, 0 100%)',
    'polygon(100% 0, 0 0, 100% 100%)',
    'polygon(100% 0, 0 100%, 100% 100%)',
    'polygon(0 0, 0 100%, 100% 100%)'
]

export const TRANSFORM_ORIGIN_FOR_CORNER_INDEX = [
    'top left',
    'top right',
    'bottom right',
    'bottom left'
]

export const CORNER_INDEX_TO_POSITIONING = [
    {
        top: 0,
        left: 0
    },
    {
        top: 0,
        right: 0
    },
    {
        bottom: 0,
        right: 0
    },
    {
        bottom: 0,
        left: 0
    }
]