import React from 'react'
import renderer from 'react-test-renderer'
import FavReposManager from '../FavReposManager'

it('FavReposManager component renders correctly', () => {
  const component = renderer.create(<FavReposManager />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
