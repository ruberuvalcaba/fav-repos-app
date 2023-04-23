import React from 'react'
import { Box, List, ListItem, Text } from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'
import { Repo } from '../../types'

const SearchRepoResults = ({ reposList }: { reposList: Repo[] }): JSX.Element => {
  return (
    <Box
      mt={1}
      style={{
        height: 'calc(100vh - 150px)',
        overflow: 'auto',
        boxShadow: '0 2px 5px 0 rgba(0, 0, 0, 0.1)',
        borderRadius: '5px',
      }}
    >
      <List spacing={3} py={3} px={3} bg="white">
        {reposList.map((repo: Repo) => {
          return (
            <ListItem
              key={repo.id}
              bg="gray.100"
              p={3}
              style={{
                cursor: 'pointer',
                borderRadius: '5px',
              }}
            >
              <Text fontSize="sm" color="blackAlpha.900">
                {repo.name}
              </Text>
              <Text fontSize="xs" color="blackAlpha.700">
                {repo.description}
              </Text>

              <Box>
                <Box display="flex" mt="2" alignItems="center" justifyContent="space-between">
                  <Text fontSize="xs" color="blue.500">
                    {repo.language}
                  </Text>
                  <Box display="flex" alignItems="center">
                    <StarIcon w={4} h={4} color="gray.300" mr={1} />
                    <Text fontSize="2xs" color="blackAlpha.700">
                      {repo.stargazers_count}
                    </Text>
                  </Box>
                </Box>
              </Box>
            </ListItem>
          )
        })}
      </List>
    </Box>
  )
}

export default SearchRepoResults
