import * as author from '@Utils/author'
import { getTimeFromDateString } from '@Utils/dates'

import { BookType } from '@Types/posts'

describe('author', () => {
    const dummyQueryBooks: BookType[] = [
        {
            title: 'Test book title A',
            content: 'Test book content A',
            book: {
                relatedProjectDesc: 'Test Desc A',
                purchaseLinks: 'https://www.a.com, https://www.b.com',
                purchaseLinksNames: 'A, B',
                publishedOn: '09/15/2019',
                cover: null,
                relatedStories: null,
                relatedProject: null
            },
        },
        {
            title: 'Test book title B',
            content: 'Test book content B',
            book: {
                relatedProjectDesc: 'Test Desc B',
                purchaseLinks: 'https://www.c.com, https://www.d.com',
                purchaseLinksNames: 'C, D',
                publishedOn: '10/15/2019',
                cover: null,
                relatedStories: null,
                relatedProject: null
            },
        },
    ]
    describe('formatAllBooks', () => {
        it('should call map the input array by calling formatBook on each item then sorting them in descending order according to their dates', () => {
            const formatBook = jest.fn((book: BookType) => ({
                publishedDate: {
                    date: new Date(getTimeFromDateString(book.book.publishedOn).date)
                }
            }))

            author.formatAllBooks(dummyQueryBooks)
            expect(formatBook).toBeCalledTimes(2)
        })
    })
})