import React, { useState, useEffect, useContext } from 'react'
import { Container, Input, Box, Spinner } from '@chakra-ui/react'

import { SearchIcon, CloseIcon } from '@chakra-ui/icons'
import SearchRepoResults from './RepoSearchResults'
import { RepoContext } from '../../store/ReposStore'
import API from '../../api'
import useDebounce from '../../hooks/useDebounce'
import { Repo, RepoPayload } from '../../types'
import { AlertBar } from '../sharedComponents'

const SearchRepo = (): JSX.Element => {
  const [searchValue, setSearchValue] = useState<string>('')
  const [reposListResults, setReposListResults] = useState<Repo[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isAlertVisible, setIsAlertVisible] = useState<boolean>(false)
  const [alertInfo, setAlertInfo] = useState({ message: '', description: '' })
  const { state, actions } = useContext(RepoContext)
  const { reposList } = state
  const debouncedSearchValue = useDebounce(searchValue, 400)

  const searchRepos = async () => {
    setIsLoading(true)
    const results = await API.searchAll(searchValue)

    if (results?.length) {
      const formattedResults = results.map((item: RepoPayload) => {
        const { id, name, full_name, description, url, created_at, stargazers_count, language } =
          item
        return {
          id: id.toString(),
          name,
          fullName: full_name,
          description,
          url,
          createdAt: created_at,
          stargazersCount: stargazers_count,
          language,
        }
      })
      setReposListResults(formattedResults)
    }
    setIsLoading(false)
  }

  // Search for repos based on user's search value after debounce timer
  useEffect(() => {
    if (searchValue.trim()) searchRepos()
  }, [debouncedSearchValue])

  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
  }

  const handleAdd = async (repo: Repo) => {
    if (reposList?.length >= 10) {
      setIsAlertVisible(true)
      setAlertInfo({
        message: 'Storage limit reached!',
        description:
          'Remove elements from the table to keep adding, you are allowed to add up to 10 items.',
      })
    } else if (reposList.find((item: Repo) => item.id === repo.id)) {
      setIsAlertVisible(true)
      setAlertInfo({
        message: 'Duplicated Repository!',
        description: 'This repository already exist, try adding a diffetent one.',
      })
    } else {
      const { name, description, ...restOfRepo } = repo
      const response = await actions.addRepo(restOfRepo)
      if (response?.id)
        setReposListResults(reposListResults.filter((item: Repo) => item.id !== repo.id)) //Removes selected repo from dropdown list
    }
  }

  const handleClearSearch = () => {
    setSearchValue('')
    setReposListResults([])
  }

  return (
    <>
      {isAlertVisible && (
        <AlertBar
          message={alertInfo.message}
          description={alertInfo.description}
          status="error"
          onClose={() => setIsAlertVisible(false)}
        />
      )}
      <Container p={8}>
        <Box display="flex" alignItems="center">
          <SearchIcon w={5} h={5} color="gray.300" />
          <Input
            value={searchValue}
            onChange={handleSearch}
            px={6}
            mx={-5}
            variant="flushed"
            placeholder="Search your favorite repo here..."
          />
          {searchValue && (
            <CloseIcon
              onClick={handleClearSearch}
              color="gray.300"
              style={{
                cursor: 'pointer',
                position: 'relative',
              }}
            />
          )}
        </Box>
        {isLoading && (
          <Box display="flex" justifyContent="center" my={20}>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </Box>
        )}
        {reposListResults?.length > 0 && !isLoading && (
          <SearchRepoResults results={reposListResults} onSelect={handleAdd} />
        )}
      </Container>
    </>
  )
}

export default SearchRepo
