import React from 'react'
import renderer from 'react-test-renderer'
import StarsCount from '../StarsCount'

it('StarsCount component renders correctly', () => {
  const component = renderer.create(<StarsCount stars={4000} />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
