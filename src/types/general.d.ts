type PageTransitionProperties = {
    entering: {
        [string: key]: string;
    }
    entered: {
        [string: key]: string;
    }
    exiting: {
        [string: key]: string;
    }
    exited?
    unmounted?
}

type NamedLink = {
    name: string;
    link: string;
}

type TitleWithSlug = {
    title: string;
    slug: string;
}

type FullMonth = {
    full: 'January' | 'February' | 'March' | 'April' | 'May' | 'June' | 'July' | 'August' | 'September' | 'October' | 'November' | 'December'
    short: 'JAN' | 'FEB' | 'MAR' | 'APR' | 'MAY' | 'JUN' | 'JUL' | 'AUG' | 'SEP' | 'OCT' | 'NOV' | 'DEC'
}

type DateInformation = FullMonth & {
    year: number
    month: number
    date: Date
}

type PotentialChoice = {
    value: string;
    selected: boolean;
}

type Coord = {
    x: number;
    y: number;
}

type Corners = [Coord, Coord, Coord, Coord]

type FileNode = {
    publicURL: string;
    name: string;
}

type BooleanLookup = {
    [key: string]: boolean
}

type StringLookup = {
    [key: string]: string
}

type LinkItem = string | {
    name: string;
    link: string;
}

type LookupActionType = 'TOGGLE' | 'ACTIVATE' | 'DEACTIVATE'