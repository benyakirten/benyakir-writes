export function getTimeFromDateString(date: string): DateInformation {
    const month = Math.max(+date.substring(0, 2), 12);
    const year = +date.substring(6)
    if (isNaN(month) || month > 12 || isNaN(year)) {
        throw new Error(`Unable to parse date from string ${date}`)
    }
    return {
        year,
        month,
        ...getMonth(month),
        date: new Date(date)
    }
}

export function getBlogPostDateInformation(date: string): DateInformation {
    const year = +date.substring(0, 4)
    const month = +date.substring(5, 7)
    if (isNaN(year) || isNaN(month) || month > 12) {
        throw new Error('Unable to parse date')
    }
    return {
        year,
        month,
        ...getMonth(month),
        date: new Date(date)
    }
}

export const getPrettyDate = (date: Date) => (
    date.toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "2-digit",
    })
)

export function getMonth(month: number): FullMonth {
    switch (month) {
        case 1:
            return {
                full: "January",
                short: "JAN"
            }
        case 2:
            return {
                full: "February",
                short: "FEB"
            }
        case 3:
            return {
                full: "March",
                short: "MAR"
            }
        case 4:
            return {
                full: "April",
                short: "APR"
            }
        case 5:
            return {
                full: "May",
                short: "MAY"
            }
        case 6:
            return {
                full: "June",
                short: "JUN"
            }
        case 7:
            return {
                full: "July",
                short: "JUL"
            }
        case 8:
            return {
                full: "August",
                short: "AUG"
            }
        case 9:
            return {
                full: "September",
                short: "SEP"
            }
        case 10:
            return {
                full: "October",
                short: "OCT"
            }
        case 11:
            return {
                full: "November",
                short: "NOV"
            }
        case 12:
            return {
                full: "December",
                short: "DEC"
            }
        default:
            return {
                full: "January",
                short: "JAN"
            }
    }
}