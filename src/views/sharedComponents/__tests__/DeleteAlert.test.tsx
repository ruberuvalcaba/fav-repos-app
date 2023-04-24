import React from 'react'
import renderer from 'react-test-renderer'
import DeleteAlert from '../DeleteAlert'

it('DeleteAlert component renders correctly', () => {
  const component = renderer.create(
    <DeleteAlert isOpen={true} onClose={() => {}} onAccept={() => {}} />
  )
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
