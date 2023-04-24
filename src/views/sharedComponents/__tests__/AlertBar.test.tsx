import React from 'react'
import renderer from 'react-test-renderer'
import AlertBar from '../AlertBar'

it('AlertBar component renders correctly', () => {
  const component = renderer.create(
    <AlertBar
      message="Message Test"
      description="Description Test"
      status="error"
      onClose={() => {}}
    />
  )
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
