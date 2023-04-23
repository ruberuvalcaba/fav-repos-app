import React from 'react'
import { Thead, Tr, Th } from '@chakra-ui/react'

const RepoLibraryHeader = (): JSX.Element => {
  return (
    <Thead>
      <Tr>
        <Th>Name</Th>
        <Th>Language</Th>
        <Th>Url</Th>
        <Th>Created at</Th>
        <Th isNumeric>Stars</Th>
        <Th>Actions</Th>
      </Tr>
    </Thead>
  )
}

export default RepoLibraryHeader
