import React from 'react'
import renderer from 'react-test-renderer'
import TextWithEllipsis from '../TextWithEllipsis'

it('TextWithEllipsis component renders correctly', () => {
  const component = renderer.create(
    <TextWithEllipsis width="100px">This is a text example with ellipsis</TextWithEllipsis>
  )
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
