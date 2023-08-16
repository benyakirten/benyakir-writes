import React from 'react'

import { cleanup, render, screen, fireEvent, act } from '@TestUtils'
import { AuthorFilter } from '@Posts'

import { createLookupMeta } from '@Utils/posts'
import { cover } from '@TestProps'
import { FlattenedBookCard, FlattenedStoryCard } from '@Types/posts'

describe('AuthorFilter component', () => {
  const testBooks = [
    {
      title: 'Test book A',
      content: 'Test book A content',
      slug: 'test-book-a',
      cover: null,
      meta: createLookupMeta(
        '2019 sep september test book content a test book a'
      ),
      project: null,
      published: {
        date: new Date('2019/09/15'),
        full: 'September',
        month: 9,
        short: 'SEP',
        year: 2019,
      },
      purchaseLinks: [
        {
          link: 'https://www.a.com',
          name: 'A',
        },
        {
          link: 'https://www.b.com',
          name: 'B',
        },
      ],
      stories: null,
    },
    {
      title: 'Test book B',
      content: 'test book B content',
      slug: 'test-book-b',
      cover,
      meta: createLookupMeta(
        'test story a test project desc a test project name a 2019 oct october test book content b test book b'
      ),
      project: {
        description: 'test project desc A',
        title: 'test project name A',
        slug: 'testprojectAslug',
      },
      published: {
        date: new Date('2019/10/15'),
        full: 'October',
        month: 10,
        short: 'OCT',
        year: 2019,
      },
      purchaseLinks: [
        {
          link: 'https://www.c.com',
          name: 'C',
        },
        {
          link: 'https://www.d.com',
          name: 'D',
        },
      ],
      stories: [
        {
          title: 'test story A',
          slug: 'teststorysluga',
        },
      ],
    },
  ].sort(
    (a, b) => b.published.date.getTime() - a.published.date.getTime()
  ) as FlattenedBookCard[]

  const testStories = [
    {
      title: 'story A',
      content: 'story A content',
      slug: 'story-a',
      published: {
        date: new Date('09/15/2020'),
        short: 'SEP',
        full: 'September',
        month: 9,
        year: 2020,
      },
      book: null,
      meta: createLookupMeta(
        '2020 sep september story A content a story A title'
      ),
    },
    {
      title: 'story B',
      content: 'story B content',
      slug: 'story-b',
      published: {
        date: new Date('10/15/2020'),
        short: 'OCT',
        full: 'October',
        month: 10,
        year: 2020,
      },
      book: {
        title: 'Test book A',
        slug: 'book-a',
        content: 'book A content',
        relationship: 'Preamble',
        cover: null,
      },
      meta: createLookupMeta(
        'test story b test project desc b test project name b 2020 oct october test book content b test book title b'
      ),
    },
    {
      title: 'story C',
      content: 'story C',
      slug: 'story-c',
      published: {
        date: new Date('11/15/2020'),
        short: 'NOV',
        full: 'November',
        month: 11,
        year: 2020,
      },
      book: {
        title: 'Test book B',
        slug: 'book-b',
        content: 'book B content',
        relationship: 'Forestory',
        cover,
      },
      meta: createLookupMeta(
        'test story b test project desc b test project name b 2020 nov november test book content b test book title b'
      ),
    },
  ].sort(
    (a, b) => b.published.date.getTime() - a.published.date.getTime()
  ) as FlattenedStoryCard[]

  const filterSpy = jest.fn()

  const props = {
    allBooks: testBooks,
    allStories: testStories,
    onFilter: filterSpy,
  }

  beforeEach(() => {
    jest.useFakeTimers()
    filterSpy.mockClear()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
    cleanup()
  })

  it('should render correctly', () => {
    expect(() => render(<AuthorFilter {...props} />)).not.toThrow()
  })

  it('should render a text element and two foldouts that contain means of filtering the elements', async () => {
    render(<AuthorFilter {...props} />)
    const text = await screen.findByRole('textbox')
    expect(text).toBeTruthy()

    const buttons = await screen.findAllByRole('button')
    expect(buttons.length).toEqual(3)

    fireEvent.click(buttons[1])
    const datePickerOne = (await screen.findByText('Published before'))
      .nextElementSibling! as HTMLInputElement
    expect(datePickerOne).toBeTruthy()
    expect(datePickerOne.value).toEqual('2020-11-15')
    const datePickerTwo = (await screen.findByText('Published after'))
      .nextElementSibling! as HTMLInputElement
    expect(datePickerTwo).toBeTruthy()
    expect(datePickerTwo.value).toEqual('2019-09-15')

    fireEvent.click(buttons[2])
    const mcTitle = await screen.findByText('Filter by book')
    expect(mcTitle).toBeTruthy()
    const choices =
      mcTitle.parentElement!.nextElementSibling!.firstElementChild!.children
    expect(choices.length).toEqual(2)
    expect(choices[0].textContent).toEqual('Test book B')
    expect(choices[1].textContent).toEqual('Test book A')
  })

  it('should filter the elements based on their meta values if the text input has its value changed', async () => {
    render(<AuthorFilter {...props} />)
    const text = await screen.findByRole('textbox')

    await act(async () => {
      fireEvent.change(text, { target: { value: 'september' } })
      jest.runAllTimers()

      expect(filterSpy).toHaveBeenCalledTimes(2)
      const itemsFiltered = filterSpy.mock.calls[1]
      expect(itemsFiltered[0].length).toEqual(1)
      expect(itemsFiltered[1].length).toEqual(1)
      expect(itemsFiltered[0][0]).toEqual(testBooks[1])
      expect(itemsFiltered[1][0]).toEqual(testStories[2])
    })

    await act(async () => {
      fireEvent.change(text, { target: { value: 'october' } })
      jest.runAllTimers()

      expect(filterSpy).toHaveBeenCalledTimes(3)
      const itemsFiltered = filterSpy.mock.calls[2]
      expect(itemsFiltered[0].length).toEqual(1)
      expect(itemsFiltered[1].length).toEqual(1)
      expect(itemsFiltered[0][0]).toEqual(testBooks[0])
      expect(itemsFiltered[1][0]).toEqual(testStories[1])
    })
  })

  it('should filter the elements based on their date of publication if the date pickers have their values changed', async () => {
    render(<AuthorFilter {...props} />)
    const datePickerBefore = (await screen.findByText('Published before'))
      .nextElementSibling! as HTMLInputElement
    const datePickerAfter = (await screen.findByText('Published after'))
      .nextElementSibling! as HTMLInputElement

    await act(async () => {
      fireEvent.change(datePickerAfter, {
        target: { value: '2019-11-15' },
      })
      jest.runAllTimers()

      expect(filterSpy).toHaveBeenCalledTimes(2)
      const itemsFiltered = filterSpy.mock.calls[1]
      expect(itemsFiltered[0].length).toEqual(0)
      expect(itemsFiltered[1].length).toEqual(3)
    })

    await act(async () => {
      fireEvent.change(datePickerBefore, {
        target: { value: '2020-10-30' },
      })
      jest.runAllTimers()

      expect(filterSpy).toHaveBeenCalledTimes(3)
      const itemsFiltered = filterSpy.mock.calls[2]
      expect(itemsFiltered[0].length).toEqual(0)
      expect(itemsFiltered[1].length).toEqual(2)
    })
  })

  it('should filter the elements by relationship to a book if any of the books is selected', async () => {
    render(<AuthorFilter {...props} />)
    const buttons = await screen.findAllByRole('button')
    fireEvent.click(buttons[2])
    const multipleChoiceBookOne = await screen.findByText('Test book A')
    const multipleChoiceBookTwo = await screen.findByText('Test book B')

    await act(async () => {
      fireEvent.click(multipleChoiceBookOne)
      jest.runAllTimers()

      expect(filterSpy).toHaveBeenCalledTimes(2)
      const itemsFiltered = filterSpy.mock.calls[1]
      expect(itemsFiltered[0].length).toEqual(1)
      expect(itemsFiltered[0]).toEqual([testBooks[1]])
      expect(itemsFiltered[1].length).toEqual(1)
      expect(itemsFiltered[1]).toEqual([testStories[1]])
    })

    await act(async () => {
      fireEvent.click(multipleChoiceBookOne)
      jest.runAllTimers()

      expect(filterSpy).toHaveBeenCalledTimes(3)
      const itemsFiltered = filterSpy.mock.calls[2]
      expect(itemsFiltered[0].length).toEqual(2)
      expect(itemsFiltered[1].length).toEqual(3)
    })

    await act(async () => {
      fireEvent.click(multipleChoiceBookTwo)
      jest.runAllTimers()

      expect(filterSpy).toHaveBeenCalledTimes(4)
      const itemsFiltered = filterSpy.mock.calls[3]
      expect(itemsFiltered[0].length).toEqual(1)
      expect(itemsFiltered[0]).toEqual([testBooks[0]])
      expect(itemsFiltered[1].length).toEqual(1)
      expect(itemsFiltered[0]).toEqual([testBooks[0]])
    })
  })

  it('should be able to filter the elements in multiple ways at the same time', async () => {
    render(<AuthorFilter {...props} />)
    const buttons = await screen.findAllByRole('button')
    const datePickerAfter = (await screen.findByText('Published after'))
      .nextElementSibling! as HTMLInputElement

    await act(async () => {
      fireEvent.change(datePickerAfter, {
        target: { value: '2019-11-15' },
      })
      jest.runAllTimers()

      expect(filterSpy).toHaveBeenCalledTimes(2)
      const itemsFiltered = filterSpy.mock.calls[1]
      expect(itemsFiltered[0].length).toEqual(0)
      expect(itemsFiltered[1].length).toEqual(3)
    })

    fireEvent.click(buttons[2])
    const bookOne = await screen.findByText('Test book A')

    await act(async () => {
      fireEvent.click(bookOne)
      jest.runAllTimers()

      expect(filterSpy).toHaveBeenCalledTimes(3)
      const itemsFiltered = filterSpy.mock.calls[2]
      expect(itemsFiltered[0].length).toEqual(0)
      expect(itemsFiltered[1].length).toEqual(1)
      expect(itemsFiltered[1]).toEqual([testStories[1]])
    })
  })
})
