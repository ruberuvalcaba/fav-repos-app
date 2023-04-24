import React from 'react'
import renderer from 'react-test-renderer'
import RepoLibrary from '../RepoLibrary'

it('RepoLibrary component renders correctly', () => {
  const component = renderer.create(<RepoLibrary />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
