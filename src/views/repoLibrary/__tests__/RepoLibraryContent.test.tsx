import React from 'react'
import { Table } from '@chakra-ui/react'
import renderer from 'react-test-renderer'
import RepoLibraryContent from '../RepoLibraryContent'

it('RepoLibraryContent component renders correctly', () => {
  const component = renderer.create(
    <Table>
      <RepoLibraryContent onRemoveRepo={() => {}} />
    </Table>
  )
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
