import React from 'react'
import { Table, TableCaption, TableContainer } from '@chakra-ui/react'
import RepoLibraryHeader from './RepoLibraryHeader'
import RepoLibraryContent from './RepoLibraryContent'

const RepoLibrary = (): JSX.Element => {
  return (
    <TableContainer>
      <Table variant="simple" size="sm">
        <TableCaption>List of all your repos, you can store up to 10</TableCaption>
        <RepoLibraryHeader />
        <RepoLibraryContent />
      </Table>
    </TableContainer>
  )
}

export default RepoLibrary
