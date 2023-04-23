import React from 'react'
import { Text } from '@chakra-ui/react'

const TextWithEllipsis = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <Text
      fontSize="xs"
      style={{
        display: 'block',
        width: '200px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}
      _hover={{
        overflow: 'visible',
      }}
    >
      <>{children}</>
    </Text>
  )
}

export default TextWithEllipsis
