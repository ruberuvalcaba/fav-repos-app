import React, { useState, useContext, useRef } from 'react'
import { Table, TableCaption, TableContainer } from '@chakra-ui/react'
import RepoLibraryHeader from './RepoLibraryHeader'
import RepoLibraryContent from './RepoLibraryContent'
import { DeleteAlert, AlertBar } from '../sharedComponents'
import { RepoContext } from '../../store/ReposStore'
import { Repo, AlerBarStatus } from '../../types'

const RepoLibrary = (): JSX.Element => {
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false)
  const [isAscSortOrder, setIsAscSortOrder] = useState(true)
  const [isAlertVisible, setIsAlertVisible] = useState<boolean>(false)
  const [alertInfo, setAlertInfo] = useState<{
    message: string
    description?: string
    status: AlerBarStatus
  }>({
    message: '',
    description: '',
    status: 'success',
  })
  const { actions, state } = useContext(RepoContext)
  const { reposList } = state
  const repoId = useRef('')

  const handleRemoveRepoAlert = (id: string) => {
    setIsDeleteAlertOpen(true)
    repoId.current = id
  }
  const handleRemoveRepo = async () => {
    setIsDeleteAlertOpen(false)
    const response = await actions.removeRepo(repoId.current)
    if (response?.status === 200) {
      setAlertInfo({ message: 'Repo was removed successfully!', status: 'success' })
    } else {
      setAlertInfo({
        message: 'Remove repo failed!',
        description: response?.statusText,
        status: 'error',
      })
    }
    setIsAlertVisible(true)
  }

  const handleSort = async (sortKey: keyof Repo) => {
    setIsAscSortOrder(!isAscSortOrder)
    await actions.sortData(reposList, sortKey, isAscSortOrder ? 'asc' : 'desc')
  }

  return (
    <>
      <AlertBar
        isOpen={isAlertVisible}
        message={alertInfo.message}
        description={alertInfo.description}
        status={alertInfo.status}
        onClose={() => setIsAlertVisible(false)}
      />
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
