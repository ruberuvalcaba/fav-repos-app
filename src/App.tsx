import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import FavReposManager from './views/FavReposManager'

function App() {
  return (
    <ChakraProvider>
      <FavReposManager />
    </ChakraProvider>
  )
}

export default App
