import * as author from '@Utils/author'

import { BookType, FlattenedBook } from '@Types/posts'

describe('author', () => {
    const dummyQueryBooks: BookType[] = [
        {
            title: 'Test book title A',
            content: 'Test book content A',
            book: {
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
                relatedProjectDesc: 'test project desc A',
                purchaseLinks: 'https://www.c.com, https://www.d.com',
                purchaseLinksNames: 'C, D',
                publishedOn: '10/15/2019',
                cover: {
                    localFile: {
                        childImageSharp: {
                            gatsbyImageData: {test: 'test'} as any
                        }
                    }
                },
                relatedStories: [
                    {
                        title: 'test story A',
                        slug: 'teststorysluga'
                    }
                ],
                relatedProject: {
                    slug: 'testprojectAslug',
                    title: 'test project name A'
                }
            },
            slug: 'testslug',

        },
    ]

    const formattedBooks: FlattenedBook[] = [
        {
            content: "Test book content A",
            "cover": null,
            meta: "2019 sep september test book content a test book title a ",
            "project": null,
            "published": {
                date: new Date('2019/09/15'),
                full: "September",
                month: 9,
                short: "SEP",
                year: 2019
            },
            purchaseLinks: [
                {
                    link: "https://www.a.com",
                    name: "A"
                },
                {
                    link: "https://www.b.com",
                    name: "B"
                }
            ],
            slug: undefined,
            stories: null,
            title: "Test book title A"
        },
        {
            content: "Test book content B",
            cover: {test: 'test'} as any,
            meta: "2019 oct october test book content b test book title b ",
            project: {
                description: 'test project desc A',
                title: 'test project name A',
                slug: 'testprojectAslug'
            },
            published: {
                date: new Date('2019/10/15'),
                full: "October",
                month: 10,
                short: "OCT",
                year: 2019
            },
            purchaseLinks: [
                {
                    link: "https://www.c.com",
                    name: "C"
                },
                {
                    link: "https://www.d.com",
                    name: "D"
                }
            ],
            slug: 'testslug',
            stories: [
                {
                    title: 'test story A',
                    slug: 'teststorysluga'
                }
            ],
            title: "Test book title B"
        }
    ]
    describe('formatAllBooks', () => {
        it('should should give known results for known inputs and organize them by the most recent date', () => {
            const results = author.formatAllBooks(dummyQueryBooks)
            expect(results[0]).toEqual(formattedBooks[1])
            expect(results[1]).toEqual(formattedBooks[0])
        })
    })

    describe('formatBooks', () => {
        it('should process the book in a particular way', () => {
            const book = dummyQueryBooks[1]
            const result = author.formatBook(book)
            expect(result.content).toEqual(book.content)
            expect(result.title).toEqual(book.title)
            expect(result.published).toEqual({
                date: new Date("2019/10/15"),
                full: "October",
                short: "OCT",
                year: 2019,
                month: 10
            })
            expect(result.cover).toEqual(book.book.cover?.localFile.childImageSharp.gatsbyImageData)
            expect(result.slug).toEqual(book.slug)

            const names = book.book.purchaseLinksNames.split(" ")
            const links = book.book.purchaseLinks.split(" ")
            const purchaseLinks = links.map((l, idx) => ({
                link: l,
                names: names && names.length > idx ? names[idx] : l
            }))
            expect(result.purchaseLinks).toEqual(purchaseLinks)
            expect(result.project).toEqual({
                title: book.book.relatedProject?.title,
                slug: book.book.relatedProject?.slug,
                description: book.book.relatedProjectDesc
            })

            const bookTwo = dummyQueryBooks[0]
            const resultTwo = author.formatBook(bookTwo)

        })
        it('should give known results for known inputs', () => {
            const resultOne = author.formatBook(dummyQueryBooks[0])
            const resultTwo = author.formatBook(dummyQueryBooks[1])

            expect(resultOne).toEqual(formattedBooks[0])
            expect(resultTwo).toEqual(formattedBooks[1])
        })
    })
})