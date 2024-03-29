import * as other from '@Utils/other'
import { defaultDayTheme } from '@Store/theme/theme.state'

describe('other utils', () => {
  describe('encode', () => {
    it('should give known ouputs for known inputs', () => {
      const expectations: {
        input: { [key: string]: string }
        result: string
      }[] = [
        {
          input: {
            key: 'value',
            key2: 'value2',
          },
          result: 'key=value&key2=value2',
        },
        {
          input: {
            'complex key': 'value',
            'complex key2': 'complex value2',
          },
          result: 'complex%20key=value&complex%20key2=complex%20value2',
        },
        {
          input: {
            'key! and! stuff!': 'value@é',
          },
          result: 'key!%20and!%20stuff!=value%40%C3%A9',
        },
      ]

      for (let expectation of expectations) {
        expect(other.encode(expectation.input)).toEqual(expectation.result)
      }
    })
  })

  describe('flattenTheme', () => {
    it('should return a string[][][] based on the properties of a BaseTheme object', () => {
      const theme: any = Object.keys(defaultDayTheme)
        .filter((key) => key !== 'name' && key !== 'id')
        .reduce(
          (acc, next) => ({
            ...acc,
            [next]: defaultDayTheme[next as keyof BaseTheme],
          }),
          {}
        )

      const res = other.flattenTheme(defaultDayTheme)
      expect(res.length).toEqual(Object.keys(theme).length)
    })

    it('should not encode either the ID or name prop of the theme', () => {
      const res = other.flattenTheme(defaultDayTheme)
      expect(Object.keys(res)).not.toContain('name')
      expect(Object.keys(res)).not.toContain('id')
    })
  })

  describe('getThemeProp', () => {
    it('should return a property on the theme if the accessors form a valid path', () => {
      const expected: { accessor: string[]; result: string }[] = [
        {
          accessor: ['base', 'background'],
          result: '#FFFFFF',
        },
        {
          accessor: ['button', 'disabled', 'background'],
          result: '#343a40',
        },
        {
          accessor: ['toggle', 'onColor'],
          result: '#FBD989',
        },
      ]

      for (let expectation of expected) {
        expect(
          other.getThemeProp(defaultDayTheme, expectation.accessor)
        ).toEqual(expectation.result)
      }
    })

    it("should return an empty string if the property doesn't exist on the theme", () => {
      const incorrectAccessors: string[][] = [
        ['base', 'button'],
        [''],
        ['iiii', 'aaaa', 'bbbb'],
        ['!!'],
      ]

      for (let accessor of incorrectAccessors) {
        expect(other.getThemeProp(defaultDayTheme, accessor)).toEqual('')
      }
    })
  })
})
