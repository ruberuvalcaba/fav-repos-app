import React, { useState } from 'react'
import { Thead, Tr, Th } from '@chakra-ui/react'
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import { Repo } from '../../types'
interface RepoLibraryHeaderProps {
  onSort: (sortKey: keyof Repo) => void
  isAscSortOrder: boolean
}
const RepoLibraryHeader = ({ onSort, isAscSortOrder }: RepoLibraryHeaderProps): JSX.Element => {
  const [activeColumn, setActiveColumn] = useState<string>('')
  const SortIcon = isAscSortOrder ? <ChevronDownIcon /> : <ChevronUpIcon />

  const handleSort = (sortKey: keyof Repo) => {
    setActiveColumn(sortKey)
    onSort(sortKey)
  }
  return (
    <Thead>
      <Tr>
        <Th>Name</Th>
        <Th>Language</Th>
        <Th>Url</Th>
        <Th onClick={() => handleSort('createdAt')} cursor="pointer" w="130px">
          Created at {activeColumn === 'createdAt' && SortIcon}
        </Th>
        <Th onClick={() => handleSort('stargazersCount')} cursor="pointer" w="101px">
          Stars {activeColumn === 'stargazersCount' && SortIcon}
        </Th>
        <Th px={0}></Th>
      </Tr>
    </Thead>
  )
}

export default RepoLibraryHeader
