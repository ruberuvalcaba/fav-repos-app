import React, { useState, useEffect, useContext } from 'react'
import { Container, Input, Box, Spinner } from '@chakra-ui/react'
import { SearchIcon, CloseIcon } from '@chakra-ui/icons'
import SearchRepoResults from './RepoSearchResults'
import { RepoContext } from '../../store/ReposStore'
import API from '../../api'
import useDebounce from '../../hooks/useDebounce'
import { Repo, RepoPayload } from '../../types'

const SearchRepo = (): JSX.Element => {
  const [searchValue, setSearchValue] = useState<string>('')
  const [reposList, setReposList] = useState<Repo[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { actions } = useContext(RepoContext)
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
      setReposList(formattedResults)
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

  const handleSelection = async (repo: Repo) => {
    const response = await actions.addRepo(repo)
    if (response?.status === 200)
      setReposList(reposList.filter((item: Repo) => item.id !== repo.id)) //Removes selected repo from dropdown list
  }

  const handleClearSearch = () => {
    setSearchValue('')
    setReposList([])
  }

  return (
    <Container p={0}>
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
          <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
        </Box>
      )}
      {reposList?.length > 0 && !isLoading && (
        <SearchRepoResults reposList={reposList} onSelect={handleSelection} />
      )}
    </Container>
  )
}

export default SearchRepo
