import React, { useState, useContext, useRef } from 'react'
import { Table, TableCaption, TableContainer } from '@chakra-ui/react'
import RepoLibraryHeader from './RepoLibraryHeader'
import RepoLibraryContent from './RepoLibraryContent'
import { DeleteAlert } from '../sharedComponents'
import { RepoContext } from '../../store/ReposStore'
import { Repo } from '../../types'

const RepoLibrary = (): JSX.Element => {
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false)
  const [isAscSortOrder, setIsAscSortOrder] = useState(true)
  const { actions, state } = useContext(RepoContext)
  const { reposList } = state
  const repoId = useRef('')

  const handleRemoveRepoAlert = (id: string) => {
    setIsDeleteAlertOpen(true)
    repoId.current = id
  }
  const handleRemoveRepo = async () => {
    setIsDeleteAlertOpen(false)
    await actions.removeRepo(repoId.current)
  }

  const handleSort = async (sortKey: keyof Repo) => {
    setIsAscSortOrder(!isAscSortOrder)
    await actions.sortData(reposList, sortKey, isAscSortOrder ? 'asc' : 'desc')
  }

  return (
    <>
      <TableContainer>
        <Table variant="simple" size="sm">
          <TableCaption>List of all your repos, you can store up to 10</TableCaption>
          <RepoLibraryHeader onSort={handleSort} isAscSortOrder={isAscSortOrder} />
          <RepoLibraryContent onRemoveRepo={handleRemoveRepoAlert} />
        </Table>
      </TableContainer>
      <DeleteAlert
        isOpen={isDeleteAlertOpen}
        onClose={() => setIsDeleteAlertOpen(false)}
        onAccept={handleRemoveRepo}
      />
    </>
  )
}

export default RepoLibrary
