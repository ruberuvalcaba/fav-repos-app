import React from 'react'
import renderer from 'react-test-renderer'
import RepoSearch from '../RepoSearch'

it('RepoSearch component renders correctly', () => {
  const component = renderer.create(<RepoSearch />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
