import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import FavReposManager from './views/FavReposManager'
import { RepoProvider } from './store/ReposStore'

function App() {
  return (
    <ChakraProvider>
      <RepoProvider>
        <FavReposManager />
      </RepoProvider>
    </ChakraProvider>
  )
}

export default App
