import React from 'react'
import * as Gatsby from 'gatsby'

import { cleanup, render, screen, fireEvent, mockDispatch } from '@TestUtils'

import Theme from '@/pages/theme'

import {
  copyThemeByID,
  createTheme,
  deleteThemeByID,
  reorderThemes,
  resetThemeOptions,
  setActiveThemeByID,
  setThemePreferenceByID,
  toggleUseComputerPreferences,
} from '@Store/theme/theme.slice'
import { DraggedOverPosition } from '@Utils/enums'
import { defaultDayTheme } from '@/store/theme/theme.state'

describe('theme page', () => {
  const useStaticQuery = jest.spyOn(Gatsby, 'useStaticQuery')
  useStaticQuery.mockImplementation(() => ({
    allFile: {
      nodes: [
        {
          name: '--test1',
          publicUrl: '/test/url1',
        },
        {
          name: '--test2',
          publicUrl: '/test/url2',
        },
        {
          name: '--test3',
          publicUrl: '/test/url3',
        },
        {
          name: '--test4',
          publicUrl: '/test/url4',
        },
      ],
    },
  }))
  beforeEach(cleanup)
  afterEach(mockDispatch.mockClear)

  it('should render properly', () => {
    expect(() => render(<Theme />)).not.toThrow()
  })

  it('should render a toggle that dispatches the toggleComputerPreferences action', async () => {
    render(<Theme />)
    expect(mockDispatch).toHaveBeenCalledTimes(1)

    const para = await screen.findByText('Use Computer Theme Preferences:')
    const toggle = para.nextElementSibling?.children[1]!
    fireEvent.click(toggle)

    expect(mockDispatch).toHaveBeenCalledTimes(2)
    expect(mockDispatch).toHaveBeenCalledWith(toggleUseComputerPreferences())
  })

  it('should render two lists, one with the day and night theme and one with the four options', async () => {
    render(<Theme />)
    const lists = await screen.getAllByRole('list')
    expect(lists.length).toEqual(2)

    expect(lists[0].children.length).toEqual(2)
    expect(lists[0].children[0].textContent).toEqual('day')
    expect(lists[0].children[1].textContent).toEqual('night')

    expect(lists[1].children.length).toEqual(4)
    expect(
      lists[1].children[0].textContent?.includes('Preferred Theme')
    ).toEqual(true)
    expect(lists[1].children[1].textContent?.includes('Active Theme')).toEqual(
      true
    )
    expect(lists[1].children[2].textContent?.includes('Copy Theme')).toEqual(
      true
    )
    expect(lists[1].children[3].textContent?.includes('Delete Theme')).toEqual(
      true
    )
  })

  it('should render the elements under Modify Theme if a theme is clicked', async () => {
    render(<Theme />)
    let listItems = await screen.getAllByRole('listitem')
    fireEvent.click(listItems[0].firstElementChild!.firstElementChild!)

    const textBox = await screen.getByRole('textbox')
    expect(textBox.getAttribute('value')).toEqual('day')

    const propertiesList =
      textBox.parentElement!.parentElement!.parentElement!.children[2]
    expect(propertiesList.children.length).toEqual(
      Object.keys(defaultDayTheme).length - 2
    )
  })

  it('should call dispatch the reorderThemes action if the first list items are dragged and dropped appropriately', async () => {
    render(<Theme />)
    expect(mockDispatch).toHaveBeenCalledTimes(1)

    const lists = await screen.getAllByRole('list')
    const themeList = lists[0]
    fireEvent.drop(themeList.children[0], {
      getAttribute: jest.fn((_) => 'test-data-value'),
    })

    expect(mockDispatch).toHaveBeenCalledTimes(2)
    expect(mockDispatch).toHaveBeenCalledWith(
      reorderThemes({
        start: '',
        end: '0',
        position: DraggedOverPosition.NONE,
      })
    )
  })

  it('should render two buttons, one to create a new theme and one to reset all theme props', async () => {
    render(<Theme />)
    expect(mockDispatch).toHaveBeenCalledTimes(1)

    const buttons = await screen.getAllByRole('button')
    expect(buttons.length).toEqual(13)
    const themeButtons = buttons.slice(10, 12)

    expect(themeButtons[0].textContent).toEqual('Create New Theme')
    expect(themeButtons[1].textContent).toEqual('Reset')

    fireEvent.click(themeButtons[0])
    expect(mockDispatch).toHaveBeenCalledTimes(2)
    expect(mockDispatch).toHaveBeenCalledWith(createTheme())

    fireEvent.click(themeButtons[1])
    expect(mockDispatch).toHaveBeenCalledTimes(3)
    expect(mockDispatch).toHaveBeenCalledWith(resetThemeOptions())
  })

  it('should render four buttons for every theme that calls the appropriate actions - and the delete button cannot be activated', async () => {
    render(<Theme />)
    expect(mockDispatch).toHaveBeenCalledTimes(1)

    const lists = await screen.findAllByRole('list')
    const themeList = lists[0]

    const buttons =
      themeList.children[0].firstElementChild!.children[1].children
    expect(buttons.length).toEqual(4)

    expect(buttons[0].getAttribute('alt')).toEqual('test1')
    expect(buttons[1].getAttribute('alt')).toEqual('test2')
    expect(buttons[2].getAttribute('alt')).toEqual('test3')
    expect(buttons[3].getAttribute('alt')).toEqual('test4')

    fireEvent.click(buttons[0])
    expect(mockDispatch).toHaveBeenCalledTimes(2)
    expect(mockDispatch).toHaveBeenCalledWith(setThemePreferenceByID('0'))

    fireEvent.click(buttons[1])
    expect(mockDispatch).toHaveBeenCalledTimes(3)
    expect(mockDispatch).toHaveBeenCalledWith(setActiveThemeByID('0'))

    fireEvent.click(buttons[2])
    expect(mockDispatch).toHaveBeenCalledTimes(4)
    expect(mockDispatch).toHaveBeenCalledWith(copyThemeByID('0'))

    fireEvent.click(buttons[3])
    expect(mockDispatch).toHaveBeenCalledTimes(4)
  })

  it('should dispatch the appropriate action if an item is dropped onto the second list', async () => {
    render(<Theme />)
    expect(mockDispatch).toHaveBeenCalledTimes(1)

    const lists = await screen.findAllByRole('list')
    const dropList = lists[1]

    const fakeDrop = {
      dataTransfer: {
        getData: jest.fn((_) => 'test-value'),
      },
    }

    fireEvent.drop(dropList.children[0], fakeDrop)
    expect(mockDispatch).toHaveBeenCalledTimes(2)
    expect(mockDispatch).toHaveBeenCalledWith(
      setThemePreferenceByID('test-value')
    )

    fireEvent.drop(dropList.children[1], fakeDrop)
    expect(mockDispatch).toHaveBeenCalledTimes(3)
    expect(mockDispatch).toHaveBeenCalledWith(setActiveThemeByID('test-value'))

    fireEvent.drop(dropList.children[2], fakeDrop)
    expect(mockDispatch).toHaveBeenCalledTimes(4)
    expect(mockDispatch).toHaveBeenCalledWith(copyThemeByID('test-value'))

    fireEvent.drop(dropList.children[3], fakeDrop)
    expect(mockDispatch).toHaveBeenCalledTimes(5)
    expect(mockDispatch).toHaveBeenCalledWith(deleteThemeByID('test-value'))
  })
})
