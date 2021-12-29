import * as strings from '@Utils/strings'

describe('strings util', () => {
  describe('titleToKebab', () => {
    it('should return known results from known inputs', () => {
      const expectations = [
        {
          title: 'title',
          kebab: 'title'
        },
        {
          title: 'Title Two',
          kebab: 'title-two'
        },
        {
          title: 'Bob\'s BIG BURGER\'s big STAND\'s burger craze',
          kebab: 'bobs-big-burgers-big-stands-burger-craze'
        },
        {
          title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
          kebab: 'dr-strangelove-or-how-i-learned-to-stop-worrying-and-love-the-bomb'
        },
        {
          title: 'tIItle  three',
          kebab: 'tiitle-three'
        },
        {
          title: 'tIItle        four',
          kebab: 'tiitle-four'
        },
        {
          title: '     tIItle  five    ',
          kebab: 'tiitle-five'
        }
      ]
      for (let expectation of expectations) {
        expect(strings.titleToKebab(expectation.title)).toEqual(expectation.kebab)
      }
    })

    it('should throw exceptions for bad inputs', () => {
      const badInput = [
        '      ',
        '\'\'\'\'\'',
        '     \'   \'    \' ',
        ':  ! @ #  ***'
      ]
      for (let input of badInput) {
        expect(() => strings.titleToKebab(input)).toThrow()
      }
    })
  })
  describe('firstWords', () => {
    it('should give known results for known inputs', () => {
      const expectations = [
        {
          input: {
            sentence: 'a long sentence that goes on and on',
            cutoff: 18
          },
          result: 'a long sentence...'
        },
        {
          input: {
            sentence: 'An abstract base class serves as the model for the converters',
            cutoff: 14
          },
          result: 'An abstract...'
        },
        {
          input: {
            sentence: 'a bb ccc dddd',
            cutoff: 5
          },
          result: 'a bb...'
        },
      ]
      for (let expectation of expectations) {
        expect(strings.firstWords(expectation.input.sentence, expectation.input.cutoff)).toEqual(expectation.result)
      }
    })

    it('should return the same sentence if the cutoff is >= the sentence length', () => {
      const expectations = [
        {
          sentence: 'abcdef',
          cutoff: 6
        },
        {
          sentence: 'abc defg',
          cutoff: 8
        },
        {
          sentence: 'a b c d',
          cutoff: 200
        }
      ]
      for (let expectation of expectations) {
        expect(strings.firstWords(expectation.sentence, expectation.cutoff)).toEqual(expectation.sentence)
      }
    })

    it('should throw an error if the substring is only spaces or has a length of 0', () => {
      const badInputs = [
        '               e',
        '               ',
      ]
      for (let input of badInputs) {
        expect(() => strings.firstWords(input, 8)).toThrow()
      }
    })
  })

  describe('multiplyCSSNumber', () => {
    it('should give known results for known inputs', () => {
      const expectations = [
        {
          input: '10rem',
          result: '15rem'
        },
        {
          input: '1.5%',
          result: '2.3%'
        },
        {
          input: '11.8px',
          result: '17.7px'
        }
      ]

      for (let expectation of expectations) {
        expect(strings.multiplyCSSNumber(expectation.input, 1.5)).toEqual(expectation.result)
      }
    })

    it('should return the prop if it doesn\'t match the regex', () => {
      const badInputs = [
        'badstring',
        'rem10',
      ]
      for (let input of badInputs) {
        expect(strings.multiplyCSSNumber(input, 1)).toEqual(input)
      }
    })
  })

  describe('capitalize', () => {
    it('should return the first letter of a string capitalized', () => {
      let expectations: { input: string, result: string }[] = [
        {
          input: 'hello',
          result: 'Hello'
        },
        {
          input: '  hi',
          result: '  hi'
        },
        {
          input: 'hi  ',
          result: 'Hi  '
        }
      ]
      for (let expectation of expectations) {
        expect(strings.capitalize(expectation.input)).toEqual(expectation.result)
      }
    })
  })
})