import * as filter from '@Utils/filter'

describe('filter util', () => {
  describe('createLookupFromChoices', () => {
    it('should exclude all items that are false', () => {
      const expectation: { choices: PotentialChoice[]; lookup: BooleanLookup } =
        {
          choices: [
            {
              value: 'a',
              selected: false,
            },
            {
              value: 'b',
              selected: false,
            },
            {
              value: 'c',
              selected: false,
            },
            {
              value: 'd',
              selected: false,
            },
            {
              value: 'e',
              selected: false,
            },
          ],
          lookup: {},
        }
      expect(filter.createLookupFromChoices(expectation.choices)).toEqual(
        expectation.lookup
      )
    })

    it('should give known results for known choices', () => {
      const expectations: {
        choices: PotentialChoice[]
        lookup: BooleanLookup
      }[] = [
        {
          choices: [
            {
              value: 'a',
              selected: true,
            },
            {
              value: 'b',
              selected: true,
            },
            {
              value: 'c',
              selected: false,
            },
            {
              value: 'd',
              selected: true,
            },
            {
              value: 'e',
              selected: false,
            },
          ],
          lookup: {
            a: true,
            b: true,
            d: true,
          },
        },
        {
          choices: [
            {
              value: '!@#',
              selected: true,
            },
            {
              value: '  ',
              selected: true,
            },
            {
              value: ' ! ',
              selected: true,
            },
          ],
          lookup: {
            '!@#': true,
            '  ': true,
            ' ! ': true,
          },
        },
      ]

      for (let expectation of expectations) {
        expect(filter.createLookupFromChoices(expectation.choices)).toEqual(
          expectation.lookup
        )
      }
    })
  })

  describe('getValuesForSelected', () => {
    it('should exclude all items that are false', () => {
      const expectation: { choices: PotentialChoice[]; result: string[] } = {
        choices: [
          {
            value: 'a',
            selected: false,
          },
          {
            value: 'b',
            selected: false,
          },
          {
            value: 'c',
            selected: false,
          },
          {
            value: 'd',
            selected: false,
          },
          {
            value: 'e',
            selected: false,
          },
        ],
        result: [],
      }
      expect(filter.getValuesForSelected(expectation.choices)).toEqual(
        expectation.result
      )
    })

    it('should give known results for known values', () => {
      const expectations: { choices: PotentialChoice[]; result: string[] }[] = [
        {
          choices: [
            {
              value: 'a',
              selected: true,
            },
            {
              value: 'b',
              selected: true,
            },
            {
              value: 'c',
              selected: false,
            },
            {
              value: 'd',
              selected: true,
            },
            {
              value: 'e',
              selected: false,
            },
          ],
          result: ['a', 'b', 'd'],
        },
        {
          choices: [
            {
              value: '!@#',
              selected: true,
            },
            {
              value: '  ',
              selected: true,
            },
            {
              value: ' ! ',
              selected: true,
            },
          ],
          result: ['!@#', '  ', ' ! '],
        },
      ]

      for (let expectation of expectations) {
        expect(filter.getValuesForSelected(expectation.choices)).toEqual(
          expectation.result
        )
      }
    })
  })

  describe('getMultipleChoiceHeight', () => {
    it('should give known results for known inputs', () => {
      const expectations: { choices: PotentialChoice[]; result: string }[] = [
        {
          choices: [
            {
              value: 'a',
              selected: true,
            },
            {
              value: 'b',
              selected: true,
            },
            {
              value: 'c',
              selected: false,
            },
          ],
          result: '5.4rem',
        },
        {
          choices: [
            {
              value: '1',
              selected: true,
            },
            {
              value: '2',
              selected: true,
            },
            {
              value: '3',
              selected: false,
            },
            {
              value: '4',
              selected: true,
            },
            {
              value: '5',
              selected: true,
            },
            {
              value: '6',
              selected: false,
            },
            {
              value: '7',
              selected: true,
            },
            {
              value: '8',
              selected: true,
            },
            {
              value: '9',
              selected: false,
            },
            {
              value: '10',
              selected: true,
            },
            {
              value: '11',
              selected: true,
            },
            {
              value: '12',
              selected: false,
            },
          ],
          result: '25.6rem',
        },
        {
          choices: [
            {
              value: '1',
              selected: true,
            },
            {
              value: '2',
              selected: true,
            },
            {
              value: '3',
              selected: false,
            },
            {
              value: '4',
              selected: true,
            },
            {
              value: '5',
              selected: true,
            },
            {
              value: '6',
              selected: false,
            },
          ],
          result: '12.8rem',
        },
      ]
    })
  })
})
