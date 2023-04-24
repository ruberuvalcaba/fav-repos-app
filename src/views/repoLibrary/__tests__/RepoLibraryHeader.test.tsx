import React from 'react'
import { Table } from '@chakra-ui/react'
import renderer from 'react-test-renderer'
import RepoLibraryHeader from '../RepoLibraryHeader'

it('RepoLibraryHeader component renders correctly', () => {
  const component = renderer.create(
    <Table>
      <RepoLibraryHeader onSort={() => {}} isAscSortOrder={true} />
    </Table>
  )
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
