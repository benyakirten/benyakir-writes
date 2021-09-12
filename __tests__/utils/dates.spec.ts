import * as date from '@Utils/dates'

describe('dates', () => {
    describe('getTimeFromDateString', () => {
        it('should parse the input according to certain criteria', () => {
            const result = date.getTimeFromDateString('09/15/2019')
            expect(result.date).toEqual(new Date('09/15/2019'))
            expect(result.full).toEqual('September')
            expect(result.short).toEqual('SEP')
            expect(result.month).toEqual(9)
            expect(result.year).toEqual(2019)
        })
    })
})