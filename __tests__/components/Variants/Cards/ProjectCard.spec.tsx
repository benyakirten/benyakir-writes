import * as React from 'react'
import { navigate } from 'gatsby'

import { render, cleanup, screen, fireEvent } from '@TestUtils'
import { ProjectCard } from '@Variants'
import { FlattenedProjectCard } from '@Types/posts'
import { allIcons } from '@TestProps'

describe('ProjectCard component', () => {
  jest.mock('gatsby')

  const flattenedProjects: FlattenedProjectCard[] = [
    {
      title: 'project title A',
      content: 'project content A',
      slug: 'projectaslug',
      shortTechnologies: ['py', 'ng'],
      longTechnologies: ['Python', 'Angular'],
      firstReleased: {
        date: new Date('09/15/2019'),
        short: 'SEP',
        full: 'September',
        month: 9,
        year: 2019,
      },
      meta: { does: true, not: true, matter: true },
      icons: [
        allIcons.find((i) => i.name === 'py')!,
        allIcons.find((i) => i.name === 'ng')!,
      ],
    },
    {
      title: 'project title B',
      content: 'project content B',
      slug: 'projectbslug',
      shortTechnologies: ['vue', 'react', 'ts', 'gql'],
      longTechnologies: ['Vue', 'React', 'TypeScript', 'GraphQL'],
      firstReleased: {
        date: new Date('10/15/2019'),
        short: 'OCT',
        full: 'October',
        month: 10,
        year: 2019,
      },
      mainLink: 'https://www.google.com',
      repoLink: 'https://www.github.com/example',
      hostedOn: 'Google',
      meta: { does: true, not: true, matter: true },
      icons: [
        allIcons.find((i) => i.name === 'vue')!,
        allIcons.find((i) => i.name === 'react')!,
        allIcons.find((i) => i.name === 'ts')!,
        allIcons.find((i) => i.name === 'gql')!,
      ],
    },
  ]

  beforeEach((navigate as any).mockClear)

  afterEach(cleanup)

  it('should render correctly', () => {
    expect(() =>
      render(<ProjectCard item={flattenedProjects[0]} />)
    ).not.toThrow()
    cleanup()
    expect(() =>
      render(<ProjectCard item={flattenedProjects[1]} />)
    ).not.toThrow()
  })

  it('should render a title that links to the project page', async () => {
    render(<ProjectCard item={flattenedProjects[0]} />)
    const titleOne = await screen.findByText('project title A')
    expect(titleOne).toBeTruthy()
    expect(titleOne.getAttribute('href')).toEqual('/project/projectaslug')
    expect(titleOne.parentElement?.tagName).toEqual('H3')

    cleanup()

    render(<ProjectCard item={flattenedProjects[1]} />)
    const titleTwo = await screen.findByText('project title B')
    expect(titleTwo).toBeTruthy()
    expect(titleTwo.getAttribute('href')).toEqual('/project/projectbslug')
    expect(titleTwo.parentElement?.tagName).toEqual('H3')
  })

  it('should render a div with a portion of the content next to the title', async () => {
    render(<ProjectCard item={flattenedProjects[0]} />)
    const titleOne = await screen.findByText('project title A')
    const contentOne = titleOne.parentElement?.nextElementSibling!
    expect(contentOne.textContent).toEqual('project content A')

    cleanup()

    render(<ProjectCard item={flattenedProjects[1]} />)
    const titleTwo = await screen.findByText('project title B')
    const contentTwo = titleTwo.parentElement?.nextElementSibling!
    expect(contentTwo.textContent).toEqual('project content B')
  })

  describe('buttons', () => {
    it('should render a button that navigates to the project page', async () => {
      render(<ProjectCard item={flattenedProjects[0]} />)
      const buttonOne = await screen.getByText('More Information')
      fireEvent.click(buttonOne)
      expect(navigate).toHaveBeenCalledTimes(1)
      expect(navigate).toHaveBeenCalledWith('/project/projectaslug')

      cleanup()

      render(<ProjectCard item={flattenedProjects[1]} />)
      const buttonTwo = await screen.getByText('More Information')
      fireEvent.click(buttonTwo)
      expect(navigate).toHaveBeenCalledTimes(2)
      expect(navigate).toHaveBeenCalledWith('/project/projectbslug')
    })

    it('should render a button if the project is hosted to it that navigates to the link', async () => {
      render(<ProjectCard item={flattenedProjects[1]} />)
      const button = await screen.getByText('On Google')
      fireEvent.click(button)
      expect(navigate).toHaveBeenCalledTimes(1)
      expect(navigate).toHaveBeenCalledWith('https://www.google.com')
    })

    it('should render a button if it has a repo to it that navigates to it', async () => {
      render(<ProjectCard item={flattenedProjects[1]} />)
      const button = await screen.getByText('On GitHub')
      fireEvent.click(button)
      expect(navigate).toHaveBeenCalledTimes(1)
      expect(navigate).toHaveBeenCalledWith('https://www.github.com/example')
    })

    it('should not render either button if there is no repo and no host', async () => {
      render(<ProjectCard item={flattenedProjects[0]} />)
      const buttons = await screen.findAllByRole('button')
      expect(buttons.length).toEqual(2)
    })
  })

  it('should render a title with an icon for every technology the project uses', async () => {
    render(<ProjectCard item={flattenedProjects[0]} />)
    const titleOne = await screen.findByText('Technologies Used')
    expect(titleOne.tagName).toEqual('H3')
    const iconsOne = await screen.findAllByRole('img')
    expect(iconsOne.length).toEqual(3)

    cleanup()

    render(<ProjectCard item={flattenedProjects[1]} />)
    const titleTwo = await screen.findByText('Technologies Used')
    expect(titleTwo.tagName).toEqual('H3')
    const iconsTwo = await screen.findAllByRole('img')
    expect(iconsTwo.length).toEqual(5)
  })
})
