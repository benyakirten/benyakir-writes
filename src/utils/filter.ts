export const createLookupFromChoices = (choices: PotentialChoice[]): BooleanLookup => (
    choices
        .filter(c => c.selected)
        .reduce((acc, next) => ({ ...acc, [next.value]: true }), {})
)

export const getValuesForSelected = (choices: PotentialChoice[]): string[] => (
    choices
        .filter(c => c.selected)
        .map(c => c.value)
)

export const getMultipleChoiceHeight = (choices: PotentialChoice[]) => {
    return choices.length < 5
        ? '5.4rem'
        : (Math.ceil(choices.length / 4) * 6.4) + 'rem'
}