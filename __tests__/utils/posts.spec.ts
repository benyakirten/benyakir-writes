import * as posts from '@Utils/posts'

describe('posts util', () => {
  describe('formatWpText', () => {
    it('should produce known results for known inputs', () => {
      const expectations: { input: string; result: string }[] = [
        {
          input: '<p>Hello</p>',
          result: 'Hello',
        },
        {
          input: '<p>&#rarr;Hello</p>',
          result: 'Hello',
        },
        {
          input: '<p>&#rarr;Hello[]</p>',
          result: 'Hello',
        },
        {
          input: '<p>&#rarr;Hel\n\nlo[]</p>',
          result: 'Hello',
        },
      ]

      for (let expectation of expectations) {
        expect(posts.formatWpText(expectation.input)).toEqual(
          expectation.result
        )
      }
    })
  })

  describe('rigorousTextFormat', () => {
    it('should produce known results for known inputs', () => {
      const expectations: { input: string; result: string }[] = [
        {
          input: '<p>Hello</p>',
          result: 'Hello',
        },
        {
          input: '<p>&#rarr;Hello</p>',
          result: 'Hello',
        },
        {
          input: '<p>&#rarr;Hello[]</p>',
          result: 'Hello',
        },
        {
          input: '<p>&#rarr;Hel\n\nlo[]</p>',
          result: 'Hello',
        },
        {
          input: `<p>&#rarr;H,,""''el\n\nlo[]</p>`,
          result: 'Hello',
        },
        {
          input: `<p>&#rarr;H,,""''el\n\nl().!?o[]</p>`,
          result: 'Hello',
        },
      ]

      for (let expectation of expectations) {
        expect(posts.rigorousTextFormat(expectation.input)).toEqual(
          expectation.result
        )
      }
    })
  })

  describe('createSearchableString', () => {
    it('should produce known results for known inputs', () => {
      const expectations: {
        input: (string | number | undefined)[]
        result: string
      }[] = [
        {
          input: ['a', 0, undefined, 'b'],
          result: 'b 0 a',
        },
        {
          input: [1, 2, 3, 0, undefined, 'b', 'e', 'c', 'a'],
          result: 'a c e b 0 3 2 1',
        },
      ]

      for (let expectation of expectations) {
        expect(posts.createSearchableString(expectation.input)).toEqual(
          expectation.result
        )
      }
    })
  })

  describe('createMetaForObject', () => {
    it('should produce known results for known inputs', () => {
      const expectations: { input: object; result: string }[] = [
        {
          input: {
            test: 'value',
            item: 2,
          },
          result: '2 value',
        },
        {
          input: {
            test: 'value',
            test2: 'value',
            test3: 'value',
            test4: 'value',
            item: 2,
          },
          result: '2 value value value value',
        },
        {
          input: {
            test: '  ',
            item: 2,
          },
          result: '2',
        },
      ]

      for (let expectation of expectations) {
        expect(posts.createMetaForObject(expectation.input)).toEqual(
          expectation.result
        )
      }
    })
  })

  describe('createLookupMeta', () => {
    it('should produce known results for known inputs', () => {
      const expectations: { input: string; result: object }[] = [
        {
          input: 'a b c d e f',
          result: {
            a: true,
            b: true,
            c: true,
            d: true,
            e: true,
            f: true,
          },
        },
        {
          input: '1 1 1 1 1 2 3',
          result: {
            1: true,
            2: true,
            3: true,
          },
        },
        {
          input: 'a        b c d e f',
          result: {
            a: true,
            b: true,
            c: true,
            d: true,
            e: true,
            f: true,
          },
        },

        {
          input: 'all-one-item',
          result: {
            all: true,
            one: true,
            item: true,
          },
        },
      ]
      for (let expectation of expectations) {
        expect(posts.createLookupMeta(expectation.input)).toEqual(
          expectation.result
        )
      }
    })
  })
})
