import React, { useContext, useEffect } from 'react'
import { ExternalLinkIcon, DeleteIcon } from '@chakra-ui/icons'
import { Tbody, Tr, Td, Link, Text } from '@chakra-ui/react'
import { RepoContext } from '../../store/ReposStore'
import { Repo } from '../../types'
import { formatDate } from '../../utils'
import { StarsCount, TextWithEllipsis } from '../sharedComponents'

const RepoLibraryContent = ({
  onRemoveRepo,
}: {
  onRemoveRepo: (id: string) => void
}): JSX.Element => {
  const { state, actions } = useContext(RepoContext)
  const { reposList } = state
  const hasData = reposList?.length > 0

  //Initial load of repos list
  useEffect(() => {
    const getData = async () => {
      await actions.getReposList()
    }
    getData()
  }, [])
  return (
    <Tbody>
      {hasData &&
        reposList.map((repo: Repo) => {
          return (
            <Tr key={repo.id}>
              <Td>
                <TextWithEllipsis>{repo.fullName}</TextWithEllipsis>
              </Td>
              <Td>
                <Text fontSize="xs">{repo.language}</Text>
              </Td>
              <Td>
                <Link href={repo.url} isExternal>
                  <TextWithEllipsis>
                    <ExternalLinkIcon mr={1} />
                    {repo.url}
                  </TextWithEllipsis>
                </Link>
              </Td>
              <Td>
                <Text fontSize="xs">{formatDate(repo.createdAt)}</Text>
              </Td>
              <Td isNumeric>
                <StarsCount stars={repo.stargazersCount} />
              </Td>
              <Td display="flex" justifyContent="center" cursor="pointer">
                <DeleteIcon
                  onClick={() => onRemoveRepo(repo.id)}
                  color="gray.400"
                  _hover={{
                    color: 'gray.600',
                  }}
                />
              </Td>
            </Tr>
          )
        })}
    </Tbody>
  )
}

export default RepoLibraryContent
