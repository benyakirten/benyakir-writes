import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'

import Post from '@/templates/Post.template'
import { WpPost } from "@Types/query"

describe('post template', () => {
    const firstPost: WpPost = {
        data: {
            wpPost: {
                title: 'Blog post A',
                slug: 'blog-post-a',
                date: '2019/09/15',
                excerpt: 'this is a blog post excerpt A',
                content: '<p>this is a blog post A, yo</p>',
                categories: {
                    nodes: [
                        {
                            name: 'cat A'
                        },
                        {
                            name: 'cat B'
                        },
                    ]
                },
                tags: {
                    nodes: [
                        {
                            name: 'tag A'
                        },
                        {
                            name: 'tag B'
                        },
                    ]
                }
            }
        }
    }

    const secondPost: WpPost = {
        data: {
            wpPost: {
                title: 'Blog post B',
                slug: 'blog-post-b',
                date: '2019/10/15',
                excerpt: 'this is a blog post excerpt B',
                content: '<p>this is a blog post B, yo</p><p>this is a second blog post for B, yo</p>',
                categories: {
                    nodes: [
                        {
                            name: 'cat A'
                        }
                    ]
                },
                tags: {
                    nodes: [
                        {
                            name: 'tag A'
                        }
                    ]
                }
            }
        }
    }

    const thirdPost: WpPost = {
        data: {
            wpPost: {
                title: 'Blog post C',
                slug: 'blog-post-c',
                date: '2019/11/15',
                excerpt: 'this is a blog post excerpt C',
                content: '<p>this is a blog post C, yo</p>',
                categories: {
                    nodes: null
                },
                tags: {
                    nodes: null
                }
            }
        }
    }

    afterEach(cleanup)

    it('should render correctly', () => {
        expect(() => render(<Post data={firstPost.data} />)).not.toThrow()
    })

    it('should render a LeadHeading with the post title', async () => {
        render(<Post data={firstPost.data} />)
        const leadHeading = await screen.getByText("Blog post A")
        expect(leadHeading).toBeDefined()
        expect(leadHeading.tagName).toEqual("H1")
    })

    it('should render a subheading that says category or categories if there is 1 or more categories with a paragraph afterwards', async () => {
        render(<Post data={firstPost.data} />)
        const subheadingOne = await screen.getByText("Categories")
        const siblingOne = subheadingOne.nextElementSibling!
        expect(subheadingOne).toBeDefined()
        expect(subheadingOne.tagName).toEqual('P')

        expect(siblingOne).toBeDefined()
        expect(siblingOne.tagName).toEqual('P')
        expect(siblingOne.textContent).toEqual('cat A, cat B')

        cleanup()

        render(<Post data={secondPost.data} />)
        const subheadingTwo = await screen.getByText("Category")
        const siblingTwo = subheadingTwo.nextElementSibling!

        expect(subheadingTwo).toBeDefined()
        expect(subheadingTwo.tagName).toEqual('P')

        expect(siblingTwo).toBeDefined()
        expect(siblingTwo.tagName).toEqual('P')
        expect(siblingTwo.textContent).toEqual('cat A')
    })

    it('should not render above subheading if there are no categories', () => {
        render(<Post data={thirdPost.data} />)
        expect(() => screen.getByText('Category')).toThrow()
        expect(() => screen.getByText('Categories')).toThrow()
    })

    it('should render a subheading that says tag or tags if there is 1 or more tags with a paragraph afterward', async () => {
        render(<Post data={firstPost.data} />)
        const subheadingOne = await screen.getByText("Tags")
        const siblingOne = subheadingOne.nextElementSibling!
        expect(subheadingOne).toBeDefined()
        expect(subheadingOne.tagName).toEqual('P')

        expect(siblingOne).toBeDefined()
        expect(siblingOne.tagName).toEqual('P')
        expect(siblingOne.textContent).toEqual('tag A, tag B')

        cleanup()

        render(<Post data={secondPost.data} />)
        const subheadingTwo = await screen.getByText("Tag")
        const siblingTwo = subheadingTwo.nextElementSibling!

        expect(subheadingTwo).toBeDefined()
        expect(subheadingTwo.tagName).toEqual('P')

        expect(siblingTwo).toBeDefined()
        expect(siblingTwo.tagName).toEqual('P')
        expect(siblingTwo.textContent).toEqual('tag A')
    })

    it('should not render above subheading if there are no tags', () => {
        render(<Post data={thirdPost.data} />)
        expect(() => screen.getByText('Tag')).toThrow()
        expect(() => screen.getByText('Tags')).toThrow()
    })

    it('should render a subheading that says posted with the post date in a specific format afterward', async () => {
        render(<Post data={firstPost.data} />)
        const postedOne = await screen.getByText('Posted')
        const siblingOne = postedOne.nextElementSibling

        expect(postedOne).toBeDefined()
        expect(siblingOne).toBeDefined()
        expect(siblingOne?.textContent).toEqual(new Date(firstPost.data.wpPost.date).toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "2-digit",
        }))

        cleanup()

        render(<Post data={secondPost.data} />)
        const postedTwo = await screen.getByText('Posted')
        const siblingTwo = postedTwo.nextElementSibling

        expect(postedTwo).toBeDefined()
        expect(siblingTwo).toBeDefined()
        expect(siblingTwo?.textContent).toEqual(new Date(secondPost.data.wpPost.date).toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "2-digit",
        }))

        cleanup()

        render(<Post data={thirdPost.data} />)
        const postedThree = await screen.getByText('Posted')
        const siblingThree = postedThree.nextElementSibling

        expect(postedThree).toBeDefined()
        expect(siblingThree).toBeDefined()
        expect(siblingThree?.textContent).toEqual(new Date(thirdPost.data.wpPost.date).toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "2-digit",
        }))
    })

    it('should render a section containing the identified blocks', async () => {
        render(<Post data={firstPost.data} />)
        const contentOne = await screen.getByText("this is a blog post A, yo")
        expect(contentOne).toBeDefined()
        expect(contentOne.nextElementSibling).toBeNull()
        
        cleanup()

        render(<Post data={secondPost.data} />)
        const contentTwo = await screen.getByText("this is a blog post B, yo")
        expect(contentTwo).toBeDefined()
        expect(contentTwo.tagName).toEqual("P")
        expect(contentTwo.nextElementSibling).toBeDefined()
        expect(contentTwo.nextElementSibling?.textContent).toEqual("this is a second blog post for B, yo")
        expect(contentTwo.nextElementSibling?.tagName).toEqual("P")

        render(<Post data={thirdPost.data} />)
        const contentThree = await screen.getByText("this is a blog post C, yo")
        expect(contentThree).toBeDefined()
        expect(contentThree.tagName).toEqual("P")
        expect(contentThree.nextElementSibling).toBeNull()
    })
})