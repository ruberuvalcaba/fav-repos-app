import React, { useState, useContext, useRef } from 'react'
import { Table, TableCaption, TableContainer } from '@chakra-ui/react'
import RepoLibraryHeader from './RepoLibraryHeader'
import RepoLibraryContent from './RepoLibraryContent'
import { DeleteAlert } from '../sharedComponents'
import { RepoContext } from '../../store/ReposStore'

const RepoLibrary = (): JSX.Element => {
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false)
  const { actions } = useContext(RepoContext)
  const repoId = useRef('')

  const handleRemoveRepoAlert = (id: string) => {
    setIsDeleteAlertOpen(true)
    repoId.current = id
  }
  const handleRemoveRepo = async () => {
    setIsDeleteAlertOpen(false)
    await actions.removeRepo(repoId.current)
  }

  return (
    <>
      <TableContainer>
        <Table variant="simple" size="sm">
          <TableCaption>List of all your repos, you can store up to 10</TableCaption>
          <RepoLibraryHeader />
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
