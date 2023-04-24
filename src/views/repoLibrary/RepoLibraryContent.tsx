import React, { useContext, useEffect } from 'react'
import { ExternalLinkIcon, DeleteIcon } from '@chakra-ui/icons'
import { Tbody, Tr, Td, Link, Text, Box } from '@chakra-ui/react'
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
                <TextWithEllipsis width="300px">{repo.fullName}</TextWithEllipsis>
              </Td>
              <Td>
                <Text fontSize="xs">{repo.language}</Text>
              </Td>
              <Td>
                <Link href={repo.url} isExternal>
                  <TextWithEllipsis width="200px">
                    <ExternalLinkIcon mr={1} />
                    {repo.url}
                  </TextWithEllipsis>
                </Link>
              </Td>
              <Td>
                <Text fontSize="xs">{formatDate(repo.createdAt)}</Text>
              </Td>
              <Td isNumeric>
                <StarsCount stars={repo.stargazersCount || 0} />
              </Td>
              <Td cursor="pointer" px={0}>
                <Box display="flex" justifyContent="center">
                  <DeleteIcon
                    onClick={() => onRemoveRepo(repo.id)}
                    color="gray.400"
                    w={4}
                    h={4}
                    _hover={{
                      color: 'gray.600',
                    }}
                  />
                </Box>
              </Td>
            </Tr>
          )
        })}
    </Tbody>
  )
}

export default RepoLibraryContent
